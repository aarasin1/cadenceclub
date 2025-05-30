// src/contexts/AuthContext.tsx
import React, {
  createContext,
  useContext, // ← add this
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { User } from "firebase/auth";
import { AuthService } from "../services/AuthService";
import { MemberService } from "../services/MemberService";
import type { Member } from "../models/Member";
import {
  useLoginMutation,
  useLogoutMutation,
  useSignUpMutation,
} from "../hooks/useAuthMutations";

interface AuthContextType {
  user: User | null;
  member: Member | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signUp: (
    email: string,
    password: string,
    profile: Omit<Member, "id" | "payments">
  ) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const qc = useQueryClient();
  const [user, setUser] = useState<User | null>(null);
  const [initializing, setInitializing] = useState(true);

  // 1) Listen for Firebase auth state
  useEffect(() => {
    const unsubscribe = AuthService.onAuthStateChanged((u: User | null) => {
      setUser(u);
      setInitializing(false);
      qc.invalidateQueries({ queryKey: ["member"] });
    });
    return unsubscribe;
  }, [qc]);

  // 2) Fetch Member record when `user` exists
  const { data: member, isLoading: memberLoading } = useQuery<Member, Error>({
    queryKey: ["member", user?.uid],
    queryFn: () => {
      if (!user) throw new Error("No authenticated user");
      return MemberService.getMemberById(user.uid);
    },
    enabled: Boolean(user),
    staleTime: 5 * 60 * 1000,
  });

  // 3) Auth mutations
  const loginMutation = useLoginMutation();
  const logoutMutation = useLogoutMutation();
  const signUpMutation = useSignUpMutation();

  // 4) Promise‑based wrappers
  const login = (email: string, password: string) =>
    loginMutation.mutateAsync({ email, password });
  const logout = () => logoutMutation.mutateAsync();
  const signUp = (
    email: string,
    password: string,
    profile: Omit<Member, "id" | "payments">
  ) => signUpMutation.mutateAsync({ email, password, profile });

  // 5) Combined loading state
  const loading =
    initializing ||
    memberLoading ||
    loginMutation.isLoading ||
    logoutMutation.isLoading ||
    signUpMutation.isLoading;

  return (
    <AuthContext.Provider
      value={{ user, member: member ?? null, loading, login, logout, signUp }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ✨ This was missing—export your hook here:
export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside <AuthProvider>");
  }
  return ctx;
}

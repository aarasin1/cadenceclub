// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { User } from "firebase/auth";
import { AuthService } from "../services/AuthService";
import { MemberService } from "../services/MemberService";
import type { Member } from "../models/Member";

interface AuthContextType {
  user: User | null;
  member: Member | null;
  authLoading: boolean;
  memberLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const qc = useQueryClient();

  // track raw Firebase user
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  // subscribe to Firebase auth state
  useEffect(() => {
    const unsubscribe = AuthService.onAuthStateChanged((u) => {
      setUser(u);
      setAuthLoading(false);
      // when auth state changes, invalidate member query
      qc.invalidateQueries({ queryKey: ["member"] });
    });
    return unsubscribe;
  }, [qc]);

  // fetch Member record for current user.uid
  const { data: member, isLoading: memberLoading } = useQuery<Member, Error>({
    queryKey: ["member", user?.uid ?? null],
    queryFn: () => {
      if (!user?.uid) throw new Error("No user UID");
      return MemberService.getMemberByUid(user.uid);
    },
    enabled: Boolean(user?.uid),
    staleTime: 1000 * 60 * 5,
  });

  // login mutation
  const { mutateAsync: signInMutation } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      AuthService.signIn(email, password),
    onSuccess: () => {
      // auth state listener will update user & invalidate member
    },
  });

  // logout mutation
  const { mutateAsync: signOutMutation } = useMutation({
    mutationFn: () => AuthService.signOut(),
    onSuccess: () => {
      // clear caches
      qc.clear();
    },
  });

  // wrapper to set loading flags
  const login = async (email: string, password: string) => {
    setAuthLoading(true);
    try {
      await signInMutation({ email, password });
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = async () => {
    setAuthLoading(true);
    try {
      await signOutMutation();
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        member: member ?? null,
        authLoading,
        memberLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};

// src/hooks/useAuthMutations.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthService } from "../services/AuthService";
import { MemberService } from "../services/MemberService";
import type { User } from "firebase/auth";
import type { Member } from "../models/Member";

interface CredentialVars {
  email: string;
  password: string;
}
interface SignUpVars extends CredentialVars {
  profile: Omit<Member, "id" | "payments">;
}

// LOGIN
export function useLoginMutation() {
  const qc = useQueryClient();
  return useMutation<User, Error, CredentialVars>({
    mutationFn: ({ email, password }) => AuthService.signIn(email, password),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["member"] }),
  });
}

// LOGOUT
export function useLogoutMutation() {
  const qc = useQueryClient();
  return useMutation<void, Error>({
    mutationFn: () => AuthService.signOut(),
    onSuccess: () => qc.clear(),
  });
}

// SIGN UP
export function useSignUpMutation() {
  const qc = useQueryClient();
  return useMutation<User, Error, SignUpVars>({
    mutationFn: async ({ email, password, profile }) => {
      const user = await AuthService.signUp(email, password);
      await MemberService.createMember({
        id: user.uid,
        ...profile,
        payments: [],
      });
      return user;
    },
    onSuccess: (user, vars) => {
      qc.setQueryData(["member", user.uid], {
        id: user.uid,
        ...vars.profile,
        payments: [],
      });
    },
  });
}

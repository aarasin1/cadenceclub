// src/hooks/useAuthMutations.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthService } from "../services/AuthService";

export function useLoginMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      AuthService.signIn(email, password),
    onSuccess: () => {
      // Invalidate the member query so it refetches after login
      qc.invalidateQueries({ queryKey: ["member"] });
    },
  });
}

export function useLogoutMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => AuthService.signOut(),
    onSuccess: () => {
      // Clear all queries on logout
      qc.clear();
    },
  });
}

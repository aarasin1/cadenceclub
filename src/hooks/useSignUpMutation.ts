// src/hooks/useSignUpMutation.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { User } from "firebase/auth";
import { AuthService } from "../services/AuthService";
import { MemberService } from "../services/MemberService";
import type { Member } from "../models/Member";

interface SignUpVariables {
  email: string;
  password: string;
  profile: Omit<Member, "id" | "payments">;
}

export function useSignUpMutation() {
  const queryClient = useQueryClient();

  return useMutation<
    User, // TData
    Error, // TError
    SignUpVariables, // TVariables
    unknown // TContext (optional)
  >({
    // 1) your mutation function
    mutationFn: async ({ email, password, profile }) => {
      const user = await AuthService.signUp(email, password);
      await MemberService.createMember({
        id: user.uid,
        ...profile,
        payments: [],
      });
      return user;
    },

    // 2) v5 onSuccess signature: (data, variables, context)
    onSuccess(data, variables) {
      queryClient.setQueryData<Member>(["member", data.uid], {
        id: data.uid,
        ...variables.profile,
        payments: [],
      });
    },
  });
}

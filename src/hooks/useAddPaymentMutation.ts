// src/hooks/useAddPaymentMutation.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MemberService } from "../services/MemberService";
import type { PaymentRecord } from "../models/Member";

interface AddPaymentVariables {
  memberId: string;
  payment: PaymentRecord;
}

export function useAddPaymentMutation() {
  const qc = useQueryClient();

  return useMutation<void, Error, AddPaymentVariables>({
    mutationFn: ({ memberId, payment }) =>
      MemberService.addPayment(memberId, payment),
    onSuccess: (_data, { memberId }) => {
      qc.invalidateQueries({ queryKey: ["member", memberId] });
    },
  });
}

// src/hooks/useCreatePaymentIntent.ts
import { useMutation } from "@tanstack/react-query";
import { PaymentService } from "../services/PaymentService";
import type { PaymentIntentResponse } from "../services/PaymentService";

export function useCreatePaymentIntent() {
  return useMutation<PaymentIntentResponse, Error, { amountCents: number }>({
    mutationFn: ({ amountCents }) =>
      PaymentService.createPaymentIntent(amountCents),
  });
}

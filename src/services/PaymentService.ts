// src/services/PaymentService.ts
export interface PaymentIntentResponse {
  client_secret: string;
}

export const PaymentService = {
  async createPaymentIntent(
    amountCents: number
  ): Promise<PaymentIntentResponse> {
    const functionsUrl = import.meta.env.VITE_FUNCTIONS_URL;
    console.log("functionsUrl", import.meta.env.VITE_FUNCTIONS_URL);
    console.log(functionsUrl);
    const resp = await fetch(`${functionsUrl}/createPaymentIntent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: amountCents }),
    });
    if (!resp.ok) throw new Error("Failed to create payment intent");
    return resp.json();
  },
};

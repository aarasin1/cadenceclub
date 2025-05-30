// src/components/join/PaymentStep.tsx
import React, { useState, useEffect } from "react";
import { useJoin } from "../../contexts/JoinContext";
import { useCreatePaymentIntent } from "../../hooks/useCreatePaymentIntent";
import { useAddPaymentMutation } from "../../hooks/useAddPaymentMutation";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useAuth } from "../../contexts/AuthContext";

const PaymentStep: React.FC<{ onContinue: () => void }> = ({ onContinue }) => {
  const { data } = useJoin();
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);

  const membershipFee = 199;
  const amountCents = membershipFee * 100;
  const { user } = useAuth();
  const memberId = user?.uid!;

  // Stripe intent mutation
  const {
    mutateAsync: createIntent,
    status: intentStatus,
    error: intentError,
  } = useCreatePaymentIntent();

  // Firestore payment‑record mutation
  const {
    mutateAsync: addPaymentRecord,
    status: recordStatus,
    error: recordError,
  } = useAddPaymentMutation();

  // Fetch the client_secret on mount
  useEffect(() => {
    createIntent({ amountCents })
      .then((res) => setClientSecret(res.client_secret))
      .catch(() => {
        /* intentError will be rendered below */
      });
  }, [createIntent, amountCents]);

  const isCreatingIntent = intentStatus === "pending";
  const isRecordingPayment = recordStatus === "pending";
  const isProcessing = isCreatingIntent || isRecordingPayment;

  // Consolidate errors
  const errorMessage =
    localError || intentError?.message || recordError?.message || null;

  const handlePay = async () => {
    setLocalError(null);

    if (!stripe || !elements) {
      setLocalError("Stripe.js has not loaded yet.");
      return;
    }
    if (!clientSecret) {
      setLocalError("Payment intent not initialized.");
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      setLocalError("Card element not found.");
      return;
    }

    // 1) Confirm the Stripe payment
    const { error: stripeError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card },
      });

    if (stripeError) {
      setLocalError(stripeError.message ?? "Payment failed");
      return;
    }
    if (paymentIntent?.status !== "succeeded") {
      setLocalError("Payment did not succeed.");
      return;
    }

    // 2) Record the payment in Firestore
    try {
      await addPaymentRecord({
        memberId,
        payment: {
          amount: membershipFee,
          paymentDate: new Date(),
          membershipYear: new Date().getFullYear(),
          transactionId: paymentIntent.id,
        },
      });
      // 3) On success, advance the wizard
      onContinue();
    } catch {
      // recordError will appear via errorMessage
    }
  };

  return (
    <div className="space-y-7">
      {/* User Info */}
      <div className="text-center">
        <p className="text-gray-600">Your Info:</p>
        <p className="font-medium text-gray-800">
          {data.firstName} {data.lastName} — {data.email}
        </p>
      </div>

      {/* Payment Form */}
      <div className="bg-white rounded-2xl shadow p-6 text-center space-y-6">
        <p className="text-gray-800 font-medium">
          Membership fee: <span className="text-xl">${membershipFee}</span>
        </p>

        <div className="w-full max-w-md mx-auto p-4 border rounded">
          <CardElement
            options={{
              style: {
                base: { fontSize: "16px", color: "#333" },
                invalid: { color: "#fa755a" },
              },
            }}
          />
        </div>

        <button
          onClick={handlePay}
          disabled={isProcessing}
          className={`
            mt-2 w-full px-6 py-3
            bg-navy text-bone font-medium rounded
            hover:bg-opacity-90 transition
            ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}
          `}
        >
          {isProcessing ? "Processing…" : "Pay & Finish Registration"}
        </button>

        {errorMessage && (
          <p className="text-sm text-red-600 mt-2">{errorMessage}</p>
        )}
      </div>

      {/* Agreement Link */}
      <div className="text-center">
        <p className="text-sm text-gray-500">
          By signing up you agree to our{" "}
          <a
            href="/images/Membership-Agreement.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-beige hover:text-navy"
          >
            Membership Agreement
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default PaymentStep;

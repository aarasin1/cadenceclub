// src/components/join/PaymentStep.tsx
import React, { useState, useEffect } from "react";
import { useJoin } from "../../contexts/JoinContext";
import { useCreatePaymentIntent } from "../../hooks/useCreatePaymentIntent";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { AuthService } from "../../services/AuthService";
import { MemberService } from "../../services/MemberService";

const PaymentStep: React.FC<{ onContinue: () => void }> = ({ onContinue }) => {
  const { data } = useJoin();
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const membershipFee = 199; // dollars
  const amountCents = membershipFee * 100;

  const { mutateAsync: createPaymentIntent, status: intentStatus } =
    useCreatePaymentIntent();

  // on mount, fetch a PaymentIntent client secret
  useEffect(() => {
    createPaymentIntent({ amountCents })
      .then((resp) => setClientSecret(resp.client_secret))
      .catch((err) => setErrorMessage(err.message));
  }, [createPaymentIntent, amountCents]);

  const handlePay = async () => {
    setErrorMessage(null);

    if (!stripe || !elements) {
      setErrorMessage("Stripe has not loaded yet.");
      return;
    }
    if (!clientSecret) {
      setErrorMessage("Unable to initialize payment.");
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setErrorMessage("Card element not found.");
      return;
    }

    // confirm the payment
    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      { payment_method: { card: cardElement } }
    );
    if (error) {
      setErrorMessage(error.message || "Payment failed.");
      return;
    }
    if (paymentIntent?.status !== "succeeded") {
      setErrorMessage("Payment did not succeed.");
      return;
    }

    // create user & member record
    try {
      const user = await AuthService.signUp(data.email, data.password);
      await MemberService.createMember({
        uid: user.uid,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        homeState: data.homeState,
        handicap: data.handicap,
        homeCourse: data.homeCourse,
        preferredPace: data.preferredPace,
      });
      onContinue();
    } catch (err: any) {
      setErrorMessage(err.message);
    }
  };

  const loading =
    intentStatus === "pending" || !clientSecret || !stripe || !elements;

  return (
    <div className="space-y-7">
      {/* User Info */}
      <div className="text-center">
        <p className="text-gray-600">Your Info:</p>
        <p className="font-medium text-gray-800">
          {data.firstName} {data.lastName} — {data.email}
        </p>
      </div>

      {/* Benefits Card */}
      <div className="bg-white rounded-2xl shadow p-6 text-center space-y-6">
        {/* Logo */}
        <img
          src="/images/cadence-club.png"
          alt="Cadence Club Logo"
          className="mx-auto mb-3 w-30 h-auto"
        />

        <h3 className="text-lg font-semibold text-navy">
          Cadence Club Membership — 2025
        </h3>

        <ul className="inline-block text-left list-disc list-inside space-y-2 text-gray-700">
          <li>Access to all events through 12/31/2025</li>
          <li>3.5 hour rounds at rotating public courses</li>
          <li>No more waiting behind slow groups</li>
          <li>On‑site staff to ensure fast play</li>
          <li>Community of like‑minded fast golfers</li>
        </ul>

        <p className="text-gray-800 font-medium">
          Membership fee: <span className="text-xl">${membershipFee}</span>
        </p>

        {/* Stripe Card Entry */}
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

        {/* Pay button moved inside card */}
        <button
          onClick={handlePay}
          disabled={loading}
          className="mt-2 w-85 px-6 py-3 bg-navy text-bone font-medium rounded hover:bg-opacity-90 transition disabled:opacity-50"
        >
          {loading ? "Processing…" : "Pay & Finish Registration"}
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

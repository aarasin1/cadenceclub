// src/components/join/PaymentStep.tsx
import React from "react";
import { useJoin } from "../../contexts/JoinContext";

const PaymentStep: React.FC<{ onContinue: () => void }> = ({ onContinue }) => {
  const { data } = useJoin();
  const membershipFee = 199; // example fee

  const handlePay = () => {
    // TODO: integrate payment provider
    onContinue();
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

        {/* Pay button moved inside card */}
        <button
          onClick={handlePay}
          className="mt-2 w-85 px-6 py-3 bg-navy text-bone font-medium rounded hover:bg-opacity-90 transition"
        >
          Pay &amp; Finish Registration
        </button>
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

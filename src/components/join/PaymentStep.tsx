import React from "react";
import { useJoin } from "../../contexts/JoinContext";

// You’d replace this with real Stripe/checkout integration
const PaymentStep: React.FC = () => {
  const { data } = useJoin();
  const membershipFee = 199; // example

  const handlePay = () => {
    // TODO: integrate Stripe or Firebase Functions
    alert(`Charging $${membershipFee} for ${data.email}`);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Confirm & Pay</h2>
      <div>
        <p>
          Membership fee: <strong>${membershipFee}</strong>
        </p>
        <p>
          Name: {data.firstName} {data.lastName}
        </p>
        <p>Email: {data.email}</p>
      </div>
      <button
        onClick={handlePay}
        className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Pay & Join
      </button>
    </div>
  );
};

export default PaymentStep;

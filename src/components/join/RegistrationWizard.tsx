import React from "react";
import { JoinProvider } from "../../contexts/JoinContext";
import RegistrationWizardInner from "./RegistrationWizardInner.tsx";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const RegistrationWizard: React.FC = () => (
  <JoinProvider>
    <Elements stripe={stripePromise}>
      <RegistrationWizardInner />
    </Elements>
  </JoinProvider>
);

export default RegistrationWizard;

// src/components/join/RegistrationWizardInner.tsx
import React from "react";
import { useJoin } from "../../contexts/JoinContext";
import { ArrowRight, ArrowLeft } from "lucide-react";

import InfoStep from "./InfoStep";
import AccountStep from "./AccountStep";
import ProfileStep from "./ProfileStep";
import PaymentStep from "./PaymentStep";

const steps = [
  { title: "Info Before Joining", Component: InfoStep },
  { title: "Create Account", Component: AccountStep },
  { title: "Your Profile", Component: ProfileStep },
  { title: "Membership Payment", Component: PaymentStep },
];

const RegistrationWizardInner: React.FC = () => {
  const { step, next, back } = useJoin();
  const { Component: StepComponent } = steps[step - 1];

  return (
    <div className="relative max-w-xl mx-auto p-6">
      {/* Top bar: 3 columns for Back, Indicator, Next */}
      <div
        className="grid items-center mb-6"
        style={{ gridTemplateColumns: "auto 1fr auto" }}
      >
        {/* Back arrow */}
        <div className="flex justify-start">
          {step > 1 && (
            <button
              onClick={back}
              aria-label="Previous Step"
              className="p-2 rounded-full hover:bg-gray-100 transition"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
          )}
        </div>

        {/* Step indicator */}
        <div className="flex justify-center text-sm text-gray-600 whitespace-nowrap">
          Step {step} of {steps.length}: {steps[step - 1].title}
        </div>

        {/* Next arrow */}
        <div className="flex justify-end">
          {step < steps.length && (
            <button
              onClick={next}
              aria-label="Next Step"
              className="p-2 rounded-full hover:bg-gray-100 transition"
            >
              <ArrowRight className="w-5 h-5 text-gray-600" />
            </button>
          )}
        </div>
      </div>

      {/* Step content */}
      <StepComponent onContinue={next} />

      {/* Bottom nav */}
      <div className="mt-6 flex justify-between">
        <button
          onClick={back}
          disabled={step === 1}
          className="flex items-center gap-x-1 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition disabled:opacity-50"
        >
          <span>Back</span>
        </button>
        <button
          onClick={next}
          className="flex items-center gap-x-1 px-4 py-2 bg-navy text-white rounded hover:bg-beige transition"
        >
          <span>{step === steps.length ? "Finish" : "Next"}</span>
        </button>
      </div>
    </div>
  );
};

export default RegistrationWizardInner;

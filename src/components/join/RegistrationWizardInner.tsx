// src/components/join/RegistrationWizardInner.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useJoin } from "../../contexts/JoinContext";
import { ArrowRight, ArrowLeft, X } from "lucide-react";

import InfoStep from "./InfoStep";
import AccountProfileStep from "./AccountProfileStep";
import PaymentStep from "./PaymentStep";

const steps = [
  { title: "Info Before Joining", Component: InfoStep },
  { title: "Create Account", Component: AccountProfileStep },
  { title: "Membership Payment", Component: PaymentStep },
];

const RegistrationWizardInner: React.FC = () => {
  const navigate = useNavigate();
  const { step, next, back, reset } = useJoin();
  const { Component: StepComponent } = steps[step - 1];

  // Advance or finish
  const handleNext = () => {
    // validate form on account/profile step
    if (step === 2) {
      const form = document.getElementById("account-form") as HTMLFormElement;
      if (form && !form.reportValidity()) return;
    }

    // if this is the last step, assume payment succeeded and exit
    if (step === steps.length) {
      navigate("/"); // or wherever you want to take them
      return;
    }

    next();
  };

  // Cancel out of the flow
  const handleCancel = () => {
    if (
      window.confirm(
        "Are you sure you want to cancel registration? All progress will be lost."
      )
    ) {
      reset();
      navigate("/");
    }
  };

  return (
    <div className="relative max-w-xl mx-auto p-6">
      {/* Top bar */}
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

        {/* Next arrow & cancel */}
        <div className="flex justify-end items-center space-x-2">
          {/* Only show next arrow when not on last step */}
          {step < steps.length && (
            <button
              onClick={handleNext}
              aria-label="Next Step"
              className="p-2 rounded-full hover:bg-gray-100 transition"
            >
              <ArrowRight className="w-5 h-5 text-gray-600" />
            </button>
          )}
          <button
            onClick={handleCancel}
            aria-label="Cancel Registration"
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Step content */}
      <StepComponent onContinue={handleNext} />

      {/* Bottom nav */}
      <div className="mt-6 flex justify-between">
        <button
          onClick={back}
          disabled={step === 1}
          className="flex items-center gap-x-1 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition disabled:opacity-50"
        >
          <ArrowLeft className="w-4 h-4 text-gray-600" />
          <span>Back</span>
        </button>

        {/* Only show Next on non-final steps */}
        {step < steps.length && (
          <button
            onClick={handleNext}
            className="flex items-center gap-x-1 px-4 py-2 bg-navy text-white rounded hover:bg-beige transition"
          >
            <span>Next</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        )}
      </div>
    </div>
  );
};

export default RegistrationWizardInner;

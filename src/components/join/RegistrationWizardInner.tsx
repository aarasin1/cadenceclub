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

  const handleNext = () => {
    // If we're on the Account & Profile step (step 2), validate the form
    if (step === 2) {
      const form = document.getElementById("account-form") as HTMLFormElement;
      if (form && !form.reportValidity()) {
        // reportValidity() will show native browser errors
        return; // don't advance
      }
    }
    // otherwise just go to next step
    next();
  };

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
      {/* Top bar with back, indicator, next, and cancel */}
      <div
        className="grid items-center mb-6"
        style={{ gridTemplateColumns: "auto 1fr auto" }}
      >
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

        <div className="flex justify-center text-sm text-gray-600 whitespace-nowrap">
          Step {step} of {steps.length}: {steps[step - 1].title}
        </div>

        <div className="flex justify-end items-center space-x-2">
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
        <button
          onClick={handleNext}
          className="flex items-center gap-x-1 px-4 py-2 bg-navy text-white rounded hover:bg-beige transition"
        >
          <span>{step === steps.length ? "Finish" : "Next"}</span>
          <ArrowRight className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  );
};

export default RegistrationWizardInner;

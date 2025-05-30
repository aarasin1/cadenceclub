// src/components/join/RegistrationWizardInner.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useJoin } from "../../contexts/JoinContext";
import type { JoinData } from "../../contexts/JoinContext";
import { useSignUpMutation } from "../../hooks/useSignUpMutation";
import { ArrowRight, ArrowLeft, X } from "lucide-react";

import InfoStep from "./InfoStep";
import AccountProfileStep from "./AccountProfileStep";
import PaymentStep from "./PaymentStep";

const steps = [
  "Info Before Joining",
  "Create Account",
  "Membership Payment",
] as const;

const RegistrationWizardInner: React.FC = () => {
  const navigate = useNavigate();
  const { data, setField, step, next, back, reset } = useJoin<JoinData>();

  const { mutateAsync: signUp, status, error } = useSignUpMutation();
  const isSigningUp = status === "pending";
  const signUpError = (error as Error)?.message;

  const handleNext = async () => {
    if (step === 2) {
      const form = document.getElementById("account-form") as HTMLFormElement;
      if (form && !form.reportValidity()) return;

      try {
        await signUp({
          email: data.email,
          password: data.password,
          profile: {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            homeState: data.homeState,
            handicap: data.handicap ?? "",
            homeCourse: data.homeCourse ?? "",
            preferredPace: data.preferredPace ?? 3.5,
          },
        });
      } catch {
        return; // leave step at 2 and show error
      }
    }

    if (step === steps.length) {
      navigate("/");
      return;
    }
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
      {/* Top bar */}
      <div
        className="grid items-center mb-6"
        style={{ gridTemplateColumns: "auto 1fr auto" }}
      >
        {/* Left slot: either back arrow, or placeholder */}
        <div className="flex justify-start">
          {step > 1 ? (
            <button
              onClick={back}
              aria-label="Previous Step"
              className="p-2 rounded-full hover:bg-gray-100 transition"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
          ) : (
            <div className="p-2 invisible" />
          )}
        </div>

        <div className="flex justify-center text-sm text-gray-600 whitespace-nowrap">
          Step {step} of {steps.length}: {steps[step - 1]}
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
      <div>
        {step === 1 && <InfoStep onContinue={handleNext} />}
        {step === 2 && (
          <AccountProfileStep
            data={data}
            setField={setField}
            isSubmitting={isSigningUp}
            errorMessage={signUpError}
            onContinue={handleNext}
          />
        )}
        {step === 3 && <PaymentStep onContinue={handleNext} />}
      </div>

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

        {step < steps.length && (
          <button
            onClick={handleNext}
            disabled={step === 2 && isSigningUp}
            className="flex items-center gap-x-1 px-4 py-2 bg-navy text-white rounded hover:bg-beige transition disabled:opacity-50"
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

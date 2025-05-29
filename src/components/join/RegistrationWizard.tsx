import React from "react";
import { JoinProvider } from "../../contexts/JoinContext";
import RegistrationWizardInner from "./RegistrationWizardInner";

const RegistrationWizard: React.FC = () => (
  <JoinProvider>
    <RegistrationWizardInner />
  </JoinProvider>
);

export default RegistrationWizard;

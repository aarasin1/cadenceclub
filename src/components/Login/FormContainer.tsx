import React from "react";
import type { ReactNode } from "react";

interface FormContainerProps {
  children: ReactNode;
}

const FormContainer: React.FC<FormContainerProps> = ({ children }) => (
  <div className="min-h-screen flex items-center justify-center bg-navy px-4">
    <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
      {children}
    </div>
  </div>
);

export default FormContainer;

import React from "react";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <div className="mb-4 text-red-600 text-sm text-center">{message}</div>
);

export default ErrorMessage;

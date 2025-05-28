import React from "react";

interface AuthButtonProps {
  label: string;
  loading: boolean;
  disabled?: boolean;
}

const AuthButton: React.FC<AuthButtonProps> = ({
  label,
  loading,
  disabled = false,
}) => (
  <button
    type="submit"
    disabled={loading || disabled}
    className={`
      w-full py-2 rounded-md text-white 
      font-medium font-serif
      ${
        loading ? "bg-gray-400" : "bg-navy hover:bg-beige hover: cursor-pointer"
      }
    `}
  >
    {loading ? "Signing in…" : label}
  </button>
);

export default AuthButton;

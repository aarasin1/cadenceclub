// src/components/Login/Login.tsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useLoginMutation } from "../hooks/useAuthMutations";

import FormContainer from "../components/Login/FormContainer";
import InputField from "../components/Login/InputField";
import AuthButton from "../components/Login/AuthButton";
import ErrorMessage from "../components/Login/ErrorMessage";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);

  const { mutateAsync: login, status, isError, error } = useLoginMutation();
  const loading = status === "pending";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    try {
      await login({ email, password });
      navigate("/");
    } catch (err: any) {
      setLocalError(err.message);
    }
  };

  return (
    <FormContainer>
      <h1 className="text-2xl font-serif font-semibold mb-6 text-center">
        Member Login
      </h1>

      {(isError || localError) && (
        <ErrorMessage message={localError ?? (error as Error).message} />
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <InputField
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          required
        />
        <InputField
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          required
        />
        <AuthButton
          label="Sign In"
          loading={loading}
        />
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Don’t have an account?{" "}
        <Link
          to="/join"
          className="text-navy font-semibold hover:underline"
        >
          Sign up
        </Link>
      </p>
    </FormContainer>
  );
};

export default Login;

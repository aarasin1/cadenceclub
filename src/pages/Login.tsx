// src/pages/Login.tsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useQueryClient } from "@tanstack/react-query";

import FormContainer from "../components/Login/FormContainer";
import InputField from "../components/Login/InputField";
import AuthButton from "../components/Login/AuthButton";
import ErrorMessage from "../components/Login/ErrorMessage";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);

      queryClient.invalidateQueries({ queryKey: ["member"] });
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer>
      <h1 className="text-2xl font-serif font-semibold mb-6 text-center">
        Member Login
      </h1>

      {error && <ErrorMessage message={error} />}

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
          className="text-navy hover:underline"
        >
          Join Now
        </Link>
      </p>
    </FormContainer>
  );
};

export default Login;

import React from "react";
import { useJoin } from "../../contexts/JoinContext";
import InputField from "../Login/InputField"; // re‑use

const AccountStep: React.FC = () => {
  const { data, setField } = useJoin();

  return (
    <form className="space-y-4">
      <InputField
        label="Email"
        type="email"
        value={data.email}
        onChange={(v) => setField("email", v)}
        required
      />
      <InputField
        label="Password"
        type="password"
        value={data.password}
        onChange={(v) => setField("password", v)}
        required
      />
    </form>
  );
};

export default AccountStep;

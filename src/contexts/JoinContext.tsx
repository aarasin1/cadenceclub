import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

export interface JoinData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  address?: string;
  handicap?: string;
  preferredPace?: string;
}

interface JoinContextType {
  data: JoinData;
  setField: <K extends keyof JoinData>(field: K, value: JoinData[K]) => void;
  step: number;
  next: () => void;
  back: () => void;
}

const defaultData: JoinData = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  phone: "",
};

const JoinContext = createContext<JoinContextType | undefined>(undefined);

export const useJoin = () => {
  const ctx = useContext(JoinContext);
  if (!ctx) throw new Error("useJoin must be inside JoinProvider");
  return ctx;
};

export const JoinProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<JoinData>(defaultData);
  const [step, setStep] = useState(1);

  const setField = <K extends keyof JoinData>(field: K, value: JoinData[K]) =>
    setData((prev) => ({ ...prev, [field]: value }));

  const next = () => setStep((s) => Math.min(4, s + 1));
  const back = () => setStep((s) => Math.max(1, s - 1));

  return (
    <JoinContext.Provider value={{ data, setField, step, next, back }}>
      {children}
    </JoinContext.Provider>
  );
};

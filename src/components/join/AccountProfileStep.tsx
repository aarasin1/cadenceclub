// src/components/join/AccountProfileStep.tsx
import React from "react";
import type { JoinData } from "../../contexts/JoinContext";

export interface AccountProfileStepProps {
  data: JoinData;
  setField: <K extends keyof JoinData>(field: K, value: JoinData[K]) => void;
  isSubmitting: boolean;
  errorMessage?: string;
  onContinue: () => void;
}

const US_STATES = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
];

const AccountProfileStep: React.FC<AccountProfileStepProps> = ({
  data,
  setField,
  isSubmitting,
  errorMessage,
}) => {
  return (
    <form
      id="account-form"
      className="space-y-6"
    >
      {/* Global error */}
      {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}

      {/* Required fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            required
            value={data.email}
            onChange={(e) => setField("email", e.target.value)}
            disabled={isSubmitting}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            required
            value={data.password}
            onChange={(e) => setField("password", e.target.value)}
            disabled={isSubmitting}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">First Name</label>
          <input
            required
            value={data.firstName}
            onChange={(e) => setField("firstName", e.target.value)}
            disabled={isSubmitting}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Last Name</label>
          <input
            required
            value={data.lastName}
            onChange={(e) => setField("lastName", e.target.value)}
            disabled={isSubmitting}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Phone</label>
          <input
            required
            value={data.phone}
            onChange={(e) => setField("phone", e.target.value)}
            disabled={isSubmitting}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Home State</label>
          <select
            required
            value={data.homeState}
            onChange={(e) => setField("homeState", e.target.value)}
            disabled={isSubmitting}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Select state</option>
            {US_STATES.map((st) => (
              <option
                key={st}
                value={st}
              >
                {st}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Optional Profile Info */}
      <details
        open
        className="border rounded-lg p-4"
      >
        <summary className="cursor-pointer font-medium mb-4">
          Profile Info (optional)
        </summary>
        <div className="space-y-4 mt-2">
          <div>
            <label className="block mb-1">Handicap Index</label>
            <input
              type="number"
              step="0.1"
              min="0"
              value={data.handicap ?? ""}
              onChange={(e) => setField("handicap", e.target.value)}
              disabled={isSubmitting}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block mb-1">Home Course</label>
            <input
              type="text"
              value={data.homeCourse ?? ""}
              onChange={(e) => setField("homeCourse", e.target.value)}
              disabled={isSubmitting}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block mb-1">Preferred Pace of Play</label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                step="0.1"
                min="0"
                value={data.preferredPace ?? ""}
                onChange={(e) => setField("preferredPace", e.target.value)}
                disabled={isSubmitting}
                className="w-full border rounded px-3 py-2"
              />
              <span className="text-gray-700">hrs</span>
            </div>
          </div>
        </div>
      </details>
    </form>
  );
};

export default AccountProfileStep;

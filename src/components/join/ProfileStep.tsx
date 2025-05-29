import React from "react";
import { useJoin } from "../../contexts/JoinContext";
import InputField from "../Login/InputField";

const ProfileStep: React.FC = () => {
  const { data, setField } = useJoin();
  const paceOptions = ["3h", "3h15", "3h30", "3h45"];

  return (
    <form className="space-y-4">
      <InputField
        label="First Name"
        value={data.firstName}
        onChange={(v) => setField("firstName", v)}
        required
      />
      <InputField
        label="Last Name"
        value={data.lastName}
        onChange={(v) => setField("lastName", v)}
        required
      />
      <InputField
        label="Phone Number"
        value={data.phone}
        onChange={(v) => setField("phone", v)}
        required
      />
      <InputField
        label="Mailing Address"
        value={data.address || ""}
        onChange={(v) => setField("address", v)}
      />
      <InputField
        label="Handicap Index"
        value={data.handicap || ""}
        onChange={(v) => setField("handicap", v)}
      />
      <div>
        <label className="block mb-1">Preferred Pace</label>
        <select
          value={data.preferredPace}
          onChange={(e) => setField("preferredPace", e.target.value)}
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Select one</option>
          {paceOptions.map((opt) => (
            <option
              key={opt}
              value={opt}
            >
              {opt}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
};

export default ProfileStep;

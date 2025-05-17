import React from "react";
import type { TeeTime } from "../../models/TeeTime";

interface Props {
  teeTimes: TeeTime[];
  loading: boolean;
  timezone: string;
}

const TeeTimesSection: React.FC<Props> = ({ teeTimes, loading, timezone }) => {
  if (loading) {
    return <p className="text-gray-600">Loading tee times...</p>;
  }

  return (
    <div className="space-y-4">
      {teeTimes.map((teeTime) => {
        const remaining = 4 - teeTime.booked.length;

        return (
          <button
            key={teeTime.time.toString()}
            className="w-full text-left border border-gray-300 bg-white rounded-lg px-4 py-3 shadow hover:bg-gray-100 transition"
          >
            <div className="flex justify-between items-center">
              <span className="font-medium text-navy">
                {teeTime.time.toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                  timeZone: timezone,
                  timeZoneName: "short",
                })}
              </span>
              <span className="text-sm text-gray-600">
                {remaining > 0
                  ? `${remaining} golfer${remaining > 1 ? "s" : ""} left`
                  : "Full"}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default TeeTimesSection;

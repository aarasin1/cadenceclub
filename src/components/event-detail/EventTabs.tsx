import React from "react";

interface EventTabsProps {
  activeTab: "details" | "teeTimes";
  setActiveTab: (tab: "details" | "teeTimes") => void;
  spotsRemaining: number;
}

const EventTabs: React.FC<EventTabsProps> = ({
  activeTab,
  setActiveTab,
  spotsRemaining,
}) => {
  return (
    <div className="flex border-b border-gray-300 mb-6">
      <button
        onClick={() => setActiveTab("details")}
        className={`px-4 py-2 text-sm font-medium ${
          activeTab === "details"
            ? "border-b-2 border-navy text-navy"
            : "text-gray-500"
        }`}
      >
        Details
      </button>

      <button
        onClick={() => setActiveTab("teeTimes")}
        className={`ml-4 px-4 py-2 text-sm font-medium relative ${
          activeTab === "teeTimes"
            ? "border-b-2 border-navy text-navy"
            : "text-gray-500"
        }`}
      >
        Tee Times
        <span className="ml-2 text-xs bg-navy text-white px-2 py-0.5 rounded-full">
          {spotsRemaining} left
        </span>
      </button>
    </div>
  );
};

export default EventTabs;

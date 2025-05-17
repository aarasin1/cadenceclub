import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/NavBar";
import { useEvents } from "../hooks/useEvents";

import EventTabs from "../components/event-detail/EventTabs";
import EventDetailsSection from "../components/event-detail/EventDetailsSection";
import TeeTimesSection from "../components/event-detail/TeeTimesSection";

const EventDetailPage: React.FC = () => {
  const { id: eventId } = useParams<{ id: string }>();
  const { events, loading: eventsLoading } = useEvents();
  const [activeTab, setActiveTab] = useState<"details" | "teeTimes">("details");

  const event = events.find((e) => e.id === eventId);

  if (eventsLoading || !event) {
    return (
      <div className="bg-bone min-h-screen">
        <Navbar />
        <p className="text-center py-10">Loading event...</p>
      </div>
    );
  }

  return (
    <div className="bg-bone min-h-screen">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Event Title */}
        <h1 className="text-3xl font-bold text-navy mb-6">{event.title}</h1>

        {/* Tabs */}
        <EventTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          spotsRemaining={event.spotsRemaining}
        />

        {/* Tab Content */}
        {activeTab === "details" && <EventDetailsSection event={event} />}
        {activeTab === "teeTimes" && (
          <TeeTimesSection
            teeTimes={event.teeTimes}
            loading={false}
            timezone={event.golf_course.timezone}
          />
        )}
      </div>
    </div>
  );
};

export default EventDetailPage;

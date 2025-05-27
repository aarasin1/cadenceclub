// src/pages/EventDetailPage.tsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/NavBar";
import { useEvents } from "../hooks/useEvents";
import EventTabs from "../components/event-detail/EventTabs";
import EventDetailsSection from "../components/event-detail/EventDetailsSection";
import TeeTimesSection from "../components/event-detail/TeeTimesSection";

const EventDetailPage: React.FC = () => {
  const { id: eventId } = useParams<{ id: string }>();
  const { data: events, isLoading, isError, error } = useEvents();
  const [activeTab, setActiveTab] = useState<"details" | "teeTimes">("details");

  // 1) Loading state
  if (isLoading) {
    return (
      <div className="bg-bone min-h-screen">
        <Navbar />
        <p className="text-center py-10">Loading event…</p>
      </div>
    );
  }

  // 2) Error state
  if (isError) {
    return (
      <div className="bg-bone min-h-screen">
        <Navbar />
        <p className="text-center py-10 text-red-600">
          Error loading events: {error.message}
        </p>
      </div>
    );
  }

  // 3) Find the matching event
  const event = events?.find((e) => e.id === eventId);

  // 4) Not-found state
  if (!event) {
    return (
      <div className="bg-bone min-h-screen">
        <Navbar />
        <p className="text-center py-10">Event not found.</p>
      </div>
    );
  }

  // 5) Render detail page
  return (
    <div className="bg-bone min-h-screen">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Title */}
        <h1 className="text-3xl font-bold text-navy mb-6">{event.title}</h1>

        {/* Tabs */}
        <EventTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          spotsRemaining={event.spotsRemaining}
        />

        {/* Content */}
        {activeTab === "details" ? (
          <EventDetailsSection event={event} />
        ) : (
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

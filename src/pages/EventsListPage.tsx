// src/pages/EventsListPage.tsx
import React from "react";
import { useEvents } from "../hooks/useEvents";
import EventCell from "../components/EventCell";
import Navbar from "../components/Navbar";

const EventsListPage: React.FC = () => {
  const { data: events, isLoading, isError, error } = useEvents();

  return (
    <div className="bg-bone min-h-screen">
      <Navbar />

      {isLoading && <p className="text-center py-10">Loading events…</p>}

      {isError && (
        <p className="text-center py-10 text-red-600">
          Error loading events: {error.message}
        </p>
      )}

      {!isLoading && !isError && (
        <section className="max-w-4xl mx-auto my-5 px-4">
          <h1 className="text-3xl text-navy font-bold mb-8 text-center">
            Upcoming Events
          </h1>

          {events && events.length > 0 ? (
            <div className="flex flex-col gap-6">
              {events.map((event) => (
                <EventCell
                  key={event.id}
                  event={event}
                />
              ))}
            </div>
          ) : (
            <p className="text-center py-10">No events found.</p>
          )}
        </section>
      )}
    </div>
  );
};

export default EventsListPage;

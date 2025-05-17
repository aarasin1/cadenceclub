import React from "react";
import { useEvents } from "../hooks/useEvents";
import EventCell from "../components/EventCell";
import Navbar from "../components/NavBar";

const EventsListPage: React.FC = () => {
  const { events, loading } = useEvents();

  if (loading) {
    return (
      <div className="bg-bone min-h-screen">
        <Navbar />

        {/* Logo Below Navbar */}
        <div className="flex flex-col items-start px-4 pt-4">
          <img
            src="/images/cadence-club.png"
            alt="Cadence Club logo"
            className="w-12 h-auto mb-4 ml-4"
          />
        </div>

        <p className="text-center py-10">Loading events...</p>
      </div>
    );
  }

  return (
    <div className="bg-bone min-h-screen">
      <Navbar />

      {/* Logo Below Navbar */}
      <div className="flex flex-col items-start px-4">
        <img
          src="/images/cadence-club.png"
          alt="Cadence Club logo"
          className="w-20 h-auto ml-4"
        />
      </div>

      <section className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl text-navy font-bold mb-8 text-center">
          Upcoming Events
        </h1>

        <div className="flex flex-col gap-6">
          {events.map((event) => (
            <EventCell
              key={event.id}
              event={event}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default EventsListPage;

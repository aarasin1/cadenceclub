import React from "react";
import { useEvents } from "../hooks/useEvents";
import EventCell from "../components/EventCell";
import Navbar from "../components/Navbar"; // ⬅️ make sure this path is correct

const EventsListPage: React.FC = () => {
  const { events, loading } = useEvents();

  if (loading) {
    return (
      <>
        <Navbar />
        <p className="text-center py-10">Loading events...</p>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-center">Upcoming Events</h1>

        <div className="flex flex-col gap-6">
          {events.map((event) => (
            <EventCell
              key={event.id}
              event={event}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default EventsListPage;

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

        <p className=" mx-auto text-center py-10">Loading events...</p>
      </div>
    );
  }

  return (
    <div className="bg-bone min-h-screen">
      <Navbar />
      <section className="max-w-4xl mx-auto my-5 px-4">
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

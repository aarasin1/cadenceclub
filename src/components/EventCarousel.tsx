import React, { useState } from "react";
import EventCard from "./EventCard";
import { useEvents } from "../hooks/useEvents";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const EventCarousel: React.FC = () => {
  const { events, loading } = useEvents();
  const [index, setIndex] = useState(0);

  const next = () => setIndex((index + 1) % events.length);
  const prev = () => setIndex((index - 1 + events.length) % events.length);

  if (loading) {
    return <p className="text-center py-10">Loading events...</p>;
  }

  return (
    <section className="my-10 px-4 text-center">
      <h2 className="text-2xl font-semibold mb-6">Upcoming Events</h2>

      <div className="relative flex justify-center items-center">
        <div className="relative w-full max-w-md">
          {/* Left Arrow */}
          <button
            onClick={prev}
            className="absolute left-[-2.75rem] top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 hover:bg-gray-100 z-10"
          >
            <FaChevronLeft className="text-xl" />
          </button>

          {/* Event Card */}
          <EventCard event={events[index]} />

          {/* Right Arrow */}
          <button
            onClick={next}
            className="absolute right-[-2.75rem] top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 hover:bg-gray-100 z-10"
          >
            <FaChevronRight className="text-xl" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default EventCarousel;

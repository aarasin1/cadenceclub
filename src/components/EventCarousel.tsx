// src/components/EventCarousel.tsx
import React, { useState } from "react";
import EventCard from "./EventCard";
import { useEvents } from "../hooks/useEvents";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const EventCarousel: React.FC = () => {
  const { data: events, isLoading, isError, error } = useEvents();
  const [index, setIndex] = useState(0);

  if (isLoading) {
    return <p className="text-center py-10">Loading events…</p>;
  }
  if (isError) {
    return (
      <p className="text-center py-10 text-red-600">
        Error loading events: {error.message}
      </p>
    );
  }
  if (!events || events.length === 0) {
    return <p className="text-center py-10">No events found.</p>;
  }

  const isFirst = index === 0;
  const isLast = index === events.length - 1;

  return (
    <section className="my-10 px-4 text-center">
      <h2 className="text-2xl font-semibold mb-6">Upcoming Events</h2>

      <div className="relative flex justify-center items-center">
        <div className="relative w-full max-w-md">
          {/* Left Arrow */}
          {!isFirst && (
            <button
              onClick={() => setIndex((i) => i - 1)}
              className="absolute left-[-2.75rem] top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 hover:bg-gray-100 z-10"
            >
              <FaChevronLeft className="text-xl" />
            </button>
          )}

          {/* Event Card */}
          <EventCard event={events[index]} />

          {/* Right Arrow */}
          {!isLast && (
            <button
              onClick={() => setIndex((i) => i + 1)}
              className="absolute right-[-2.75rem] top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 hover:bg-gray-100 z-10"
            >
              <FaChevronRight className="text-xl" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default EventCarousel;

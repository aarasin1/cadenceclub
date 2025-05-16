import React from "react";
import type { Event } from "../models/Event";
import { formatDate } from "../utils/formatDate";

interface EventCellProps {
  event: Event;
}

const EventCell: React.FC<EventCellProps> = ({ event }) => {
  return (
    <div className="flex items-center justify-center bg-white shadow-lg rounded-xl p-6">
      {/* Course Logo */}
      <img
        src={event.imageUrl}
        alt={event.title}
        className="w-16 h-16 object-cover rounded-full mr-4"
      />

      {/* Event Info */}
      <div className="flex-1">
        <h2 className="text-xl font-bold text-navy">{event.title}</h2>
        <p className="text-gray-600 text-md">
          {event.city} <span className="mx-2">|</span> {formatDate(event.date)}
        </p>
      </div>

      {/* Button + Spots Remaining */}
      <div className="flex flex-col items-end ml-4">
        <button className="bg-navy text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition">
          Register
        </button>
        <p className="text-sm text-gray-700 mt-2">
          {event.spotsRemaining} spots left!
        </p>
      </div>
    </div>
  );
};

export default EventCell;

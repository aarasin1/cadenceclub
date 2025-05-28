import React from "react";
import type { Event } from "../models/Event";
import { formatDate } from "../utils/formatDate";
import { useNavigate } from "react-router-dom";

interface EventCellProps {
  event: Event;
}

const EventCell: React.FC<EventCellProps> = ({ event }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/events/${event.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center justify-between bg-white shadow-md rounded-xl p-4 cursor-pointer hover:bg-gray-50 transition"
    >
      {/* Course Logo */}
      <img
        src={event.golf_course.logo}
        alt={event.title}
        className="w-16 h-16 object-contain rounded-full mr-4"
      />

      {/* Event Info */}
      <div className="flex-1">
        <h2 className="text-xl font-bold text-navy">{event.title}</h2>
        <p className="text-gray-600 text-md">
          {event.golf_course.generalLocation} <span className="mx-2">|</span>{" "}
          {formatDate(event.date)}
        </p>
      </div>

      {/* Right Column: Register and Spots Left */}
      <div className="flex flex-col items-end ml-4">
        <button
          className="bg-navy text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition"
          onClick={(e) => {
            e.stopPropagation(); // prevent click bubbling to outer div
            navigate(`/events/${event.id}`);
          }}
        >
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

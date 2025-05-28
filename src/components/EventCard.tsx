// src/components/EventCard.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Event } from "../models/Event";
import { formatDate } from "../utils/formatDate";

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate(`/events/${event.id}`);
  };

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden max-w-md mx-auto text-center">
      <img
        src={event.golf_course.imageUrl}
        alt={event.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6 flex flex-col items-center gap-y-2">
        {/* Title */}
        <h3 className="text-2xl font-bold mb-2">{event.title}</h3>

        {/* Centered info block with left-aligned emoji + text */}
        <div className="flex flex-col items-start text-left gap-y-1 mx-auto w-fit">
          <p className="pl-6 relative before:content-['📅'] before:absolute before:left-0">
            {formatDate(event.date)}
          </p>
          <p className="pl-6 relative before:content-['📍'] before:absolute before:left-0">
            {event.golf_course.generalLocation}
          </p>
          <p className="pl-6 relative before:content-['⛳'] before:absolute before:left-0">
            Spots Remaining: {event.spotsRemaining}
          </p>
        </div>

        {/* CTA Button */}
        <button
          onClick={handleRegister}
          className="mt-4 bg-slateblue text-white px-4 py-2 rounded-lg hover:bg-beige transition"
        >
          Register Now
        </button>
      </div>
    </div>
  );
};

export default EventCard;

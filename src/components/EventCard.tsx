import React from "react";

type Event = {
  title: string;
  date: string;
  spotsRemaining: number;
  imageUrl: string;
};

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden max-w-md mx-auto text-left">
      <img
        src={event.imageUrl}
        alt={event.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6 flex flex-col items-center justify-center">
        <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
        <p className="text-gray-600 mb-1">📅 {event.date}</p>
        <p className="text-gray-700 mb-4">
          ⛳ Spots Remaining: {event.spotsRemaining}
        </p>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          Register Now
        </button>
      </div>
    </div>
  );
};

export default EventCard;

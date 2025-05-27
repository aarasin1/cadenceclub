import React from "react";
import { formatDate } from "../../utils/formatDate";
import type { Event } from "../../models/Event";

const EventDetailsSection: React.FC<{ event: Event }> = ({ event }) => (
  <div className="space-y-4">
    <div className="flex items-center gap-4">
      <img
        src={event.golf_course.logo}
        alt={`${event.golf_course.name} logo`}
        className="w-20 h-20 object-contain p-1 rounded-full"
      />
      <div className="text-gray-700">
        <p className="text-lg font-semibold">{event.golf_course.location}</p>
        <p className="text-sm">{formatDate(event.date)}</p>
      </div>
    </div>
  </div>
);

export default EventDetailsSection;

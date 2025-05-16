import { useEffect, useState } from "react";
import type { Event } from "../models/Event";
import { getEvents } from "../services/EventService";

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      const data = await getEvents();
      setEvents(data);
      setLoading(false);
    };

    loadEvents();
  }, []);

  return { events, loading };
};

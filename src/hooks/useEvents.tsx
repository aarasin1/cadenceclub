// src/hooks/useEvents.ts
import { useQuery } from "@tanstack/react-query";
import { Event } from "../models/Event";
import { getEvents } from "../services/EventService";

export const useEvents = () => {
  return useQuery<Event[], Error>({
    queryKey: ["events"],
    queryFn: getEvents,
    // keep data fresh for 5 minutes:
    staleTime: 1000 * 60 * 5,
    // show “Loading…” while fetching:
    // onError you could toast or log
  });
};

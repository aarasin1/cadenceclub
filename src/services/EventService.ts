import type { Event } from "../models/Event";

export const getEvents = async (): Promise<Event[]> => {
  // Eventually replace this with a real API call
  return [
    {
      id: "1",
      title: "Bear's Best",
      date: "July 12, 2025",
      spotsRemaining: 12,
      imageUrl: "/images/bears-best-atlanta.jpeg",
    },
    {
      id: "2",
      title: "Twilight Tourney",
      date: "July 16, 2025",
      spotsRemaining: 8,
      imageUrl: "/images/twilight.jpg",
    },
    {
      id: "3",
      title: "Speed Golf Sunday",
      date: "July 19, 2025",
      spotsRemaining: 5,
      imageUrl: "/images/speedgolf.jpg",
    },
  ];
};

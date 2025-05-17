import type { Event } from "../models/Event";

export const getEvents = async (): Promise<Event[]> => {
  // Eventually replace this with a real API call
  return [
    {
      id: "1",
      title: "Bear's Best",
      date: new Date(2025, 6, 12),
      spotsRemaining: 12,
      golf_course: {
        name: "Bear's Best",
        logo: "/images/bears-best-logo.png",
        location: "Atlanta, GA",
        timezone: "America/New_York",
      },
      imageUrl: "/images/bears-best-atlanta.jpeg",
    },
    {
      id: "2",
      title: "Hamilton Mill",
      date: new Date(2025, 6, 26),
      spotsRemaining: 8,
      golf_course: {
        name: "Bear's Best",
        logo: "/images/bears-best-logo.png",
        location: "Atlanta, GA",
        timezone: "America/New_York",
      },
      imageUrl: "/images/hamilton-mill-atlanta.jpg",
    },
    {
      id: "3",
      title: "Cobblestone",
      date: new Date(2025, 7, 2),
      spotsRemaining: 5,
      golf_course: {
        name: "Bear's Best",
        logo: "/images/bears-best-logo.png",
        location: "Atlanta, GA",
        timezone: "America/New_York",
      },
      imageUrl: "/images/cobblestone-atlanta.jpg",
    },
  ];
};

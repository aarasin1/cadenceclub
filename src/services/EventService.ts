import { Event } from "../models/Event";

export const getEvents = async (): Promise<Event[]> => {
  // Eventually replace this with a real API call
  return [
    new Event({
      id: "1",
      title: "Bear's Best",
      date: new Date(2025, 6, 12),
      golf_course: {
        name: "Bear's Best",
        logo: "/images/bears-best-logo.png",
        location: "Atlanta, GA",
        timezone: "America/New_York",
      },
      teeTimes: [
        {
          time: new Date(2025, 6, 12, 7, 0),
          booked: [
            { name: "John Doe", id: "1", email: "exanple@gmail.com" },
            { name: "Jane Doe", id: "2", email: "example@yahoo.com" },
          ],
        },
        { time: new Date(2025, 6, 12, 7, 10), booked: [] },
        {
          time: new Date(2025, 6, 12, 7, 20),
          booked: [
            { name: "Phil Mickelson", id: "3", email: "Phil@gmail.com" },
          ],
        },
        {
          time: new Date(2025, 6, 12, 7, 30),
          booked: [{ name: "Tiger Woods", id: "4", email: "Tiger@gmail.com" }],
        },
      ],
      imageUrl: "/images/bears-best-atlanta.jpeg",
    }),
    new Event({
      id: "2",
      title: "Hamilton Mill",
      date: new Date(2025, 6, 26),
      golf_course: {
        name: "Bear's Best",
        logo: "/images/bears-best-logo.png",
        location: "Atlanta, GA",
        timezone: "America/New_York",
      },
      teeTimes: [
        {
          time: new Date(2025, 6, 26, 7, 0),
          booked: [],
        },
        {
          time: new Date(2025, 6, 26, 7, 10),
          booked: [
            { name: "Rickie Fowler", id: "5", email: "rickie@example.com" },
          ],
        },
        {
          time: new Date(2025, 6, 26, 7, 20),
          booked: [
            { name: "Annika Sörenstam", id: "6", email: "annika@pro.com" },
            { name: "Nancy Lopez", id: "7", email: "nancy@lpga.com" },
          ],
        },
        {
          time: new Date(2025, 6, 26, 7, 30),
          booked: [],
        },
      ],
      imageUrl: "/images/hamilton-mill-atlanta.jpg",
    }),
    new Event({
      id: "3",
      title: "Cobblestone",
      date: new Date(2025, 7, 2),
      golf_course: {
        name: "Bear's Best",
        logo: "/images/bears-best-logo.png",
        location: "Atlanta, GA",
        timezone: "America/New_York",
      },
      teeTimes: [
        {
          time: new Date(2025, 7, 2, 6, 50),
          booked: [],
        },
        {
          time: new Date(2025, 7, 2, 7, 0),
          booked: [{ name: "Jordan Spieth", id: "8", email: "jordan@pga.com" }],
        },
        {
          time: new Date(2025, 7, 2, 7, 10),
          booked: [
            { name: "Michelle Wie", id: "9", email: "michelle@lpga.com" },
          ],
        },
        {
          time: new Date(2025, 7, 2, 7, 20),
          booked: [
            { name: "Collin Morikawa", id: "10", email: "collin@pga.com" },
            { name: "Lexi Thompson", id: "11", email: "lexi@lpga.com" },
          ],
        },
      ],
      imageUrl: "/images/cobblestone-atlanta.jpg",
    }),
  ];
};

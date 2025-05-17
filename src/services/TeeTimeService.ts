import type { TeeTime } from "../models/TeeTime";

export const getTeeTimesForEvent = async (
  eventId: string
): Promise<TeeTime[]> => {
  // Simulated delay and data (in real case, use fetch/axios)
  await new Promise((resolve) => setTimeout(resolve, 300));
  switch (eventId) {
    case "1":
      return [
        {
          time: new Date(2025, 6, 12, 14, 0),
          booked: [
            { name: "John Doe", id: "1", email: "exanple@gmail.com" },
            { name: "Jane Doe", id: "2", email: "example@yahoo.com" },
          ],
        },
        { time: new Date(2025, 6, 12, 14, 10), booked: [] },
        {
          time: new Date(2025, 6, 12, 14, 20),
          booked: [
            { name: "Phil Mickelson", id: "3", email: "Phil@gmail.com" },
          ],
        },
        {
          time: new Date(2025, 6, 12, 14, 30),
          booked: [{ name: "Tiger Woods", id: "4", email: "Tiger@gmail.com" }],
        },
      ];

    case "2":
      return [
        {
          time: new Date(2025, 6, 26, 8, 0),
          booked: [],
        },
        {
          time: new Date(2025, 6, 26, 8, 10),
          booked: [
            { name: "Rickie Fowler", id: "5", email: "rickie@example.com" },
          ],
        },
        {
          time: new Date(2025, 6, 26, 8, 20),
          booked: [
            { name: "Annika Sörenstam", id: "6", email: "annika@pro.com" },
            { name: "Nancy Lopez", id: "7", email: "nancy@lpga.com" },
          ],
        },
        {
          time: new Date(2025, 6, 26, 8, 30),
          booked: [],
        },
      ];

    case "3":
      return [
        {
          time: new Date(2025, 7, 2, 7, 50),
          booked: [],
        },
        {
          time: new Date(2025, 7, 2, 8, 0),
          booked: [{ name: "Jordan Spieth", id: "8", email: "jordan@pga.com" }],
        },
        {
          time: new Date(2025, 7, 2, 8, 10),
          booked: [
            { name: "Michelle Wie", id: "9", email: "michelle@lpga.com" },
          ],
        },
        {
          time: new Date(2025, 7, 2, 8, 20),
          booked: [
            { name: "Collin Morikawa", id: "10", email: "collin@pga.com" },
            { name: "Lexi Thompson", id: "11", email: "lexi@lpga.com" },
          ],
        },
      ];

    default:
      return [];
  }
};

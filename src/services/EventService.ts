// src/services/EventService.ts
import {
  getFirestore,
  collection,
  doc as docRef,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { app } from "../firebaseConfig.ts";
import { Event } from "../models/Event";
import type { GolfCourse } from "../models/GolfCourse";
import type { TeeTime, bookedMembersDictionary } from "../models/TeeTime";

const db = getFirestore(app);

export const getEvents = async (): Promise<Event[]> => {
  // 1) compute cutoff = now + 6h
  const now = new Date();
  const cutoff = new Date(now.getTime() - 6 * 60 * 60 * 1_000);

  // 2) build our query
  const eventsCol = collection(db, "events");
  const eventsQuery = query(
    eventsCol,
    where("date", ">=", Timestamp.fromDate(cutoff)),
    orderBy("date", "asc")
  );

  // 3) fetch matching events
  const snap = await getDocs(eventsQuery);

  // 4) for each event, fetch its golf‑course and build an Event instance
  const events = await Promise.all(
    snap.docs.map(async (d) => {
      const data = d.data();
      console.log(data);
      // pull out the raw fields
      const golfCourseId = data.golfCourseId as string;
      const rawDate = data.date as Timestamp;
      const rawTeeTimes = data.teeTimes as Array<{
        time: Timestamp;
        bookedMembers: bookedMembersDictionary[];
      }>;

      // fetch the golf course doc
      const courseSnap = await getDoc(docRef(db, "golfCourses", golfCourseId));
      if (!courseSnap.exists()) {
        throw new Error(`GolfCourse ${golfCourseId} not found`);
      }
      const courseData = courseSnap.data() as GolfCourse;

      // convert teeTimes → TeeTime[]
      const teeTimes: TeeTime[] = rawTeeTimes.map((tt) => ({
        time: tt.time.toDate(),
        bookedMembers: tt.bookedMembers,
      }));

      // instantiate your Event model
      return new Event({
        id: d.id,
        title: data.title as string,
        date: rawDate.toDate(),
        golfCourseId,
        golf_course: {
          name: courseData.name,
          logo: courseData.logo,
          imageUrl: courseData.imageUrl,
          generalLocation: courseData.generalLocation,
          timezone: courseData.timezone,
          address: courseData.address,
        },
        teeTimes,
      });
    })
  );

  return events;
};

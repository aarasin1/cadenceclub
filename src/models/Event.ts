import type { GolfCourse } from "./GolfCourse.ts";

export interface Event {
  id: string;
  title: string;
  date: Date;
  spotsRemaining: number;
  imageUrl: string;
  golf_course: GolfCourse;
}

import type { GolfCourse } from "./GolfCourse";
import type { TeeTime } from "./TeeTime";

export class Event {
  id: string;
  title: string;
  date: Date;
  golf_course: GolfCourse;
  teeTimes: TeeTime[];
  golfCourseId: string;

  constructor(data: {
    id: string;
    title: string;
    date: Date;
    golf_course: GolfCourse;
    teeTimes: TeeTime[];
    golfCourseId: string;
  }) {
    this.id = data.id;
    this.title = data.title;
    this.date = data.date;
    this.golf_course = data.golf_course;
    this.teeTimes = data.teeTimes;
    this.golfCourseId = data.golfCourseId;
  }

  get spotsRemaining(): number {
    const totalSpots = this.teeTimes.length * 4;
    const bookedSpots = this.teeTimes.reduce(
      (sum, teeTime) => sum + teeTime.bookedMembers.length,
      0
    );
    return totalSpots - bookedSpots;
  }
}

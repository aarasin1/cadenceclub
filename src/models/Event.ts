import type { GolfCourse } from "./GolfCourse";
import type { TeeTime } from "./TeeTime";

export class Event {
  id: string;
  title: string;
  date: Date;
  golf_course: GolfCourse;
  teeTimes: TeeTime[];
  golfCourseId: string;
  allBookedMembers: string[] = [];

  constructor(data: {
    id: string;
    title: string;
    date: Date;
    golf_course: GolfCourse;
    teeTimes: TeeTime[];
    golfCourseId: string;
    allBookedMembers: string[];
  }) {
    this.id = data.id;
    this.title = data.title;
    this.date = data.date;
    this.golf_course = data.golf_course;
    this.teeTimes = data.teeTimes;
    this.golfCourseId = data.golfCourseId;
    this.allBookedMembers = data.allBookedMembers;
  }

  get spotsRemaining(): number {
    const MAX_PER_SLOT = 4;
    const totalSpots = this.teeTimes.length * MAX_PER_SLOT;
    const bookedSpots = this.allBookedMembers.length;
    return totalSpots - bookedSpots;
  }
}

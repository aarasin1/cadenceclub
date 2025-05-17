import type { GolfCourse } from "./GolfCourse";
import type { TeeTime } from "./TeeTime";

export class Event {
  id: string;
  title: string;
  date: Date;
  imageUrl: string;
  golf_course: GolfCourse;
  teeTimes: TeeTime[];

  constructor(data: {
    id: string;
    title: string;
    date: Date;
    imageUrl: string;
    golf_course: GolfCourse;
    teeTimes: TeeTime[];
  }) {
    this.id = data.id;
    this.title = data.title;
    this.date = data.date;
    this.imageUrl = data.imageUrl;
    this.golf_course = data.golf_course;
    this.teeTimes = data.teeTimes;
  }

  get spotsRemaining(): number {
    const totalSpots = this.teeTimes.length * 4;
    const bookedSpots = this.teeTimes.reduce(
      (sum, teeTime) => sum + teeTime.booked.length,
      0
    );
    return totalSpots - bookedSpots;
  }
}

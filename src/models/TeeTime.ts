import type { Member } from "./Member.ts";

export interface TeeTime {
  time: Date;
  booked: Member[];
}

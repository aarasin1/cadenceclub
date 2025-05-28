import type { MemberID } from "./Member.ts";

export interface TeeTime {
  time: Date;
  bookedMembers: MemberID[];
}

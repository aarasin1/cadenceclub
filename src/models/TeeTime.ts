import type { MemberID } from "./Member.ts";

export interface TeeTime {
  time: Date;
  bookedMembers: bookedMembersDictionary[];
}

export interface bookedMembersDictionary {
  memberId: MemberID;
}

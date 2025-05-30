export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  handicap?: string;
  homeCourse?: string;
  preferredPace?: string;
}

export type MemberID = Member["id"];

export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export type MemberID = Member["id"];

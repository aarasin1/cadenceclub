export interface Member {
  id: string;
  name: string;
  email: string;
}

export type MemberID = Member["id"];

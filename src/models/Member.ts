export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  homeState: string;
  handicap?: string;
  homeCourse?: string;
  preferredPace?: number;
  payments: PaymentRecord[];
}

export interface PaymentRecord {
  membershipYear: number;
  amount: number;
  paymentDate: Date;
  transactionId: string;
}

export type MemberID = Member["id"];

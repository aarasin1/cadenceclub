// src/services/MemberService.ts
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { app } from "../firebaseConfig";
import type { Member, PaymentRecord } from "../models/Member";

const db = getFirestore(app);

export const MemberService = {
  /** Fetch an existing member by their ID */
  async getMemberById(id: string): Promise<Member> {
    const snap = await getDoc(doc(db, "Members", id));
    if (!snap.exists()) throw new Error("Member not found");
    return snap.data() as Member;
  },

  /** Create a new member document under their ID */
  async createMember(member: Member): Promise<void> {
    await setDoc(doc(db, "Members", member.id), member);
  },

  /** Add a payment record to the member’s payments array */
  async addPayment(memberId: string, payment: PaymentRecord): Promise<void> {
    await updateDoc(doc(db, "Members", memberId), {
      payments: arrayUnion(payment),
    });
  },

  /** Check whether the member has paid for the given year */
  hasPaidForYear(member: Member, year: number): boolean {
    return member.payments.some((p) => p.membershipYear === year);
  },
};

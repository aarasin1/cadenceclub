// src/services/MemberService.ts
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "../firebaseConfig";
import type { Member } from "../models/Member";

const db = getFirestore(app);

export const MemberService = {
  async getMemberByUid(uid: string): Promise<Member> {
    const snap = await getDoc(doc(db, "Members", uid));
    if (!snap.exists()) throw new Error("Member not found");
    return snap.data() as Member;
  },
};

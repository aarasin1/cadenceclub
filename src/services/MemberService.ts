// src/services/MemberService.ts
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "../firebaseConfig";
import type { Member } from "../models/Member";

const db = getFirestore(app);

export async function getMember(memberId: string): Promise<Member> {
  const ref = doc(db, "Members", memberId);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    throw new Error(`Member ${memberId} not found`);
  }
  return snap.data() as Member;
}

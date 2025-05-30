// src/hooks/useMember.ts
import { useQuery } from "@tanstack/react-query";
import { MemberService } from "../services/MemberService";
import type { Member } from "../models/Member";
import { useAuth } from "../contexts/AuthContext";

export function useMember(uid: string | null) {
  const { user } = useAuth();
  return useQuery<Member, Error>({
    queryKey: ["member", uid],
    queryFn: async () => {
      if (!uid) {
        throw new Error("No UID provided");
      }
      return MemberService.getMemberById(uid);
    },
    enabled: Boolean(user?.uid),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

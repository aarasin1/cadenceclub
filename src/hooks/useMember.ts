// src/hooks/useMember.ts
import { useQuery } from "@tanstack/react-query";
import { getMember } from "../services/MemberService";
import type { Member } from "../models/Member";

export function useMember(memberId: string | null) {
  return useQuery<Member, Error>({
    queryKey: ["member", memberId],
    queryFn: () => {
      if (!memberId) {
        return Promise.reject(new Error("No memberId"));
      }
      return getMember(memberId);
    },
    enabled: Boolean(memberId),
    staleTime: 1000 * 60 * 5,
  });
}

import { useEffect, useState } from "react";
import type { TeeTime } from "../models/TeeTime";
import { getTeeTimesForEvent } from "../services/TeeTimeService";

export const useTeeTimes = (eventId: string) => {
  const [teeTimes, setTeeTimes] = useState<TeeTime[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeeTimes = async () => {
      setLoading(true);
      const data = await getTeeTimesForEvent(eventId);
      setTeeTimes(data);
      setLoading(false);
    };

    fetchTeeTimes();
  }, [eventId]);

  return { teeTimes, loading };
};

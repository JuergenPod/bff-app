import { useEffect, useState } from "react";
import { daysUntil } from "@/lib/utils";

export function useCountdown(dateStr: string): number {
  const [days, setDays] = useState(() => daysUntil(dateStr));
  useEffect(() => {
    const interval = setInterval(() => setDays(daysUntil(dateStr)), 60_000);
    return () => clearInterval(interval);
  }, [dateStr]);
  return days;
}

import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { useCountdown } from "@/hooks/useCountdown";

export function CountdownChip({ date }: { date: string }) {
  const days = useCountdown(date);
  if (days < 0) return null;
  const label = days === 0 ? "Today! 🎉" : days === 1 ? "Tomorrow!" : `${days} days`;
  return (
    <motion.span
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-violet-100 text-violet-600 text-xs font-medium"
    >
      <Calendar className="w-3 h-3" />
      {label}
    </motion.span>
  );
}

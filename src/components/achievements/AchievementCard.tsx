import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Achievement } from "@/types";

export function AchievementCard({ achievement }: { achievement: Achievement }) {
  return (
    <motion.div
      whileHover={achievement.unlocked ? { scale: 1.03 } : undefined}
      className={cn(
        "rounded-2xl p-4 text-center border transition-all",
        achievement.unlocked
          ? "bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200 shadow-sm dark:from-amber-900/20 dark:to-yellow-900/20 dark:border-amber-500/30"
          : "bg-gray-50 border-gray-100 opacity-50 grayscale dark:bg-white/5 dark:border-white/10"
      )}
    >
      <div className="text-4xl mb-2">{achievement.emoji}</div>
      <div className={cn("font-semibold text-sm mb-1", achievement.unlocked ? "text-amber-800 dark:text-amber-300" : "text-gray-400")}>
        {achievement.name}
      </div>
      <div className="text-xs text-gray-500 dark:text-gray-500 leading-snug">{achievement.description}</div>
      {achievement.unlocked && (
        <div className="mt-2 text-xs text-amber-500 dark:text-amber-400 font-medium">Unlocked ✓</div>
      )}
    </motion.div>
  );
}

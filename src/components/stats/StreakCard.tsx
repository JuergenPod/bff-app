import type { Stats } from "@/types";

export function StreakCard({ stats }: { stats: Stats }) {
  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-5 mb-4 dark:from-amber-900/20 dark:to-orange-900/20 dark:border-amber-500/30">
      <div className="flex items-center gap-3">
        <span className="text-4xl">🔥</span>
        <div>
          <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">{stats.currentStreak}</div>
          <div className="text-sm text-amber-700 dark:text-amber-300 font-medium">week streak</div>
        </div>
      </div>
      <div className="mt-3 text-xs text-amber-600 dark:text-amber-400">
        {stats.currentStreak > 0
          ? "You're on a roll! Keep making memories ✨"
          : "Start your streak — plan something this week!"}
      </div>
    </div>
  );
}

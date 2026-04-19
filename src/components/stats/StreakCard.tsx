import type { Stats } from "@/types";

export function StreakCard({ stats }: { stats: Stats }) {
  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-5 mb-4">
      <div className="flex items-center gap-3">
        <span className="text-4xl">🔥</span>
        <div>
          <div className="text-3xl font-bold text-amber-600">{stats.currentStreak}</div>
          <div className="text-sm text-amber-700 font-medium">week streak</div>
        </div>
      </div>
      <div className="mt-3 text-xs text-amber-600">
        {stats.currentStreak > 0
          ? "You're on a roll! Keep making memories ✨"
          : "Start your streak — plan something this week!"}
      </div>
    </div>
  );
}

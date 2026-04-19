import type { Stats } from "@/types";

interface StatCardProps { label: string; value: string | number; emoji: string; sub?: string }
function StatCard({ label, value, emoji, sub }: StatCardProps) {
  return (
    <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-4 shadow-sm dark:bg-white/5 dark:border-violet-500/20">
      <div className="text-3xl mb-1">{emoji}</div>
      <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">{value}</div>
      <div className="text-xs font-medium text-gray-500 dark:text-gray-400">{label}</div>
      {sub && <div className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{sub}</div>}
    </div>
  );
}

export function StatsGrid({ stats }: { stats: Stats }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
      <StatCard emoji="✅" label="Completed" value={stats.totalCompleted} />
      <StatCard emoji="📅" label="Planned" value={stats.totalPlanned} />
      <StatCard emoji="💫" label="Wishlist" value={stats.totalWishlist} />
      <StatCard
        emoji="⭐"
        label="Avg Rating"
        value={stats.averageRating != null ? stats.averageRating.toFixed(1) : "—"}
      />
    </div>
  );
}

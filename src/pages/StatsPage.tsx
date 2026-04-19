import { PageTransition } from "@/components/layout/PageTransition";
import { GradientHeading } from "@/components/shared/GradientHeading";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { StatsGrid } from "@/components/stats/StatsGrid";
import { StreakCard } from "@/components/stats/StreakCard";
import { ActivityTimeline } from "@/components/stats/ActivityTimeline";
import { useActivities } from "@/hooks/useActivities";
import { useStats } from "@/hooks/useStats";
import { CATEGORY_CONFIG } from "@/constants";
import type { Category } from "@/types";

export function StatsPage() {
  const { activities, loading } = useActivities();
  const stats = useStats(activities);

  return (
    <PageTransition>
      <GradientHeading className="text-2xl mb-6">Our Stats</GradientHeading>
      {loading ? <LoadingSpinner /> : (
        <>
          <StatsGrid stats={stats} />
          <StreakCard stats={stats} />

          {/* Category breakdown */}
          <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-5 mb-6 shadow-sm dark:bg-white/5 dark:border-violet-500/20">
            <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-4">By Category</h3>
            <div className="space-y-3">
              {(Object.entries(stats.byCategory) as [Category, number][]).map(([cat, count]) => {
                const cfg = CATEGORY_CONFIG[cat];
                const max = Math.max(...Object.values(stats.byCategory), 1);
                return (
                  <div key={cat} className="flex items-center gap-3">
                    <span className="text-xl w-8">{cfg.emoji}</span>
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-1">
                        <span className={cfg.color + " font-medium"}>{cfg.label}</span>
                        <span className="text-gray-500 dark:text-gray-400">{count}</span>
                      </div>
                      <div className="h-2 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${cfg.bg.replace("bg-", "bg-")}`}
                          style={{ width: `${(count / max) * 100}%`, transition: "width 0.5s ease" }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <ActivityTimeline activities={stats.recentMemories} />
        </>
      )}
    </PageTransition>
  );
}

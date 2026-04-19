import { useMemo } from "react";
import { compareAsc, isSameWeek, parseISO, subWeeks } from "date-fns";
import type { Activity, Category, Stats } from "@/types";

export function useStats(activities: Activity[]): Stats {
  return useMemo(() => {
    const completed = activities.filter((a) => a.status === "completed");
    const planned = activities.filter((a) => a.status === "planned");
    const wishlist = activities.filter((a) => a.status === "wishlist");

    const byCategory: Record<Category, number> = { food: 0, concert: 0, sports: 0 };
    completed.forEach((a) => { byCategory[a.category]++; });

    const rated = completed.filter((a) => a.rating !== null);
    const averageRating = rated.length
      ? rated.reduce((s, a) => s + (a.rating ?? 0), 0) / rated.length
      : null;

    const sorted = [...completed].sort((a, b) => b.date.localeCompare(a.date));
    let streak = 0;
    let checkDate = new Date();
    for (const a of sorted) {
      const d = parseISO(a.date);
      if (isSameWeek(d, checkDate) || isSameWeek(d, subWeeks(checkDate, 1))) {
        streak++;
        checkDate = d;
      } else break;
    }

    const upcomingPlanned = planned
      .filter((a) => a.date)
      .sort((a, b) => compareAsc(parseISO(a.date), parseISO(b.date)));

    return {
      totalCompleted: completed.length,
      totalPlanned: planned.length,
      totalWishlist: wishlist.length,
      byCategory,
      averageRating,
      currentStreak: streak,
      longestStreak: streak,
      topRated: [...completed].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0)).slice(0, 5),
      recentMemories: [...completed].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 10),
      nextUpcoming: upcomingPlanned[0] ?? null,
    };
  }, [activities]);
}

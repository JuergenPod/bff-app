import { ACHIEVEMENT_DEFS } from "@/constants";
import type { Achievement, Activity, Category } from "@/types";
import { isSameWeek, parseISO, subWeeks } from "date-fns";

function computeCurrentStreak(completed: Activity[]): number {
  if (!completed.length) return 0;
  const sorted = [...completed].sort((a, b) => b.date.localeCompare(a.date));
  let streak = 0;
  let checkDate = new Date();
  for (const a of sorted) {
    const actDate = parseISO(a.date);
    if (isSameWeek(actDate, checkDate) || isSameWeek(actDate, subWeeks(checkDate, 1))) {
      streak++;
      checkDate = actDate;
    } else {
      break;
    }
  }
  return streak;
}

export function computeAchievements(activities: Activity[]): Achievement[] {
  const completed = activities.filter((a) => a.status === "completed");
  const planned = activities.filter((a) => a.status === "planned");
  const wishlist = activities.filter((a) => a.status === "wishlist");
  const byCategory = (cat: Category) => completed.filter((a) => a.category === cat);
  const fiveStarCount = completed.filter((a) => a.rating === 5).length;
  const streak = computeCurrentStreak(completed);

  const results: Record<string, boolean> = {
    "first-activity": activities.length >= 1,
    "foodie-5": byCategory("food").length >= 5,
    "concert-3": byCategory("concert").length >= 3,
    "hike-5": byCategory("sports").length >= 5,
    "all-cats": (["food", "concert", "sports"] as Category[]).every((c) => byCategory(c).length >= 1),
    "wishlist-10": wishlist.length >= 10,
    "streak-4": streak >= 4,
    "perfect-rating": fiveStarCount >= 3,
    "planner-5": planned.length >= 5,
    "century": activities.length >= 100,
  };

  return ACHIEVEMENT_DEFS.map((def) => ({
    ...def,
    unlocked: results[def.id] ?? false,
  }));
}

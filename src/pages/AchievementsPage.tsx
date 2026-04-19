import { PageTransition } from "@/components/layout/PageTransition";
import { GradientHeading } from "@/components/shared/GradientHeading";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { AchievementGrid } from "@/components/achievements/AchievementGrid";
import { useActivities } from "@/hooks/useActivities";
import { computeAchievements } from "@/lib/achievements";

export function AchievementsPage() {
  const { activities, loading } = useActivities();
  const achievements = computeAchievements(activities);

  return (
    <PageTransition>
      <GradientHeading className="text-2xl mb-2">Badges</GradientHeading>
      <p className="text-gray-500 text-sm mb-6">Milestones you've reached together 🏆</p>
      {loading ? <LoadingSpinner /> : <AchievementGrid achievements={achievements} />}
    </PageTransition>
  );
}

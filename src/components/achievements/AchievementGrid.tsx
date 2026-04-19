import type { Achievement } from "@/types";
import { AchievementCard } from "./AchievementCard";

export function AchievementGrid({ achievements }: { achievements: Achievement[] }) {
  const unlocked = achievements.filter((a) => a.unlocked);
  return (
    <div>
      <p className="text-sm text-gray-500 mb-4">
        {unlocked.length} / {achievements.length} badges earned
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {achievements.map((a) => <AchievementCard key={a.id} achievement={a} />)}
      </div>
    </div>
  );
}

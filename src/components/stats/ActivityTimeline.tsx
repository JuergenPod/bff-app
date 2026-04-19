import type { Activity } from "@/types";
import { formatDate } from "@/lib/utils";
import { CATEGORY_CONFIG } from "@/constants";

export function ActivityTimeline({ activities }: { activities: Activity[] }) {
  if (activities.length === 0) return null;
  return (
    <div>
      <h3 className="font-semibold text-gray-800 mb-4">Memory Timeline</h3>
      <div className="relative pl-6 space-y-4">
        <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-gradient-to-b from-rose-300 via-violet-300 to-amber-300 rounded-full" />
        {activities.map((a) => (
          <div key={a.id} className="relative flex gap-3">
            <div className="absolute -left-4 w-3 h-3 rounded-full bg-white border-2 border-violet-400 mt-1 shrink-0" />
            <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-xl p-3 flex-1 shadow-sm">
              <div className="flex items-start justify-between">
                <p className="font-medium text-sm text-gray-800">{a.title}</p>
                <span className="text-lg ml-2">{CATEGORY_CONFIG[a.category].emoji}</span>
              </div>
              {a.date && <p className="text-xs text-gray-400 mt-0.5">{formatDate(a.date)}</p>}
              {a.location && <p className="text-xs text-gray-400">📍 {a.location}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

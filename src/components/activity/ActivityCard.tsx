import { useState } from "react";
import { motion } from "framer-motion";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import type { Activity } from "@/types";
import { cn, formatDate, isUpcoming } from "@/lib/utils";
import { CategoryIcon } from "./CategoryIcon";
import { ActivityStatusBadge } from "./ActivityStatusBadge";
import { RatingStars } from "./RatingStars";
import { CountdownChip } from "./CountdownChip";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { useApp } from "@/context/AppContext";
import { PhotoThumbnail } from "@/components/photos/PhotoThumbnail";

interface Props {
  activity: Activity;
  onEdit: (a: Activity) => void;
  onView: (a: Activity) => void;
}

export function ActivityCard({ activity, onEdit, onView }: Props) {
  const { deleteActivity } = useApp();
  const [showMenu, setShowMenu] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const hasCover = activity.photos.length > 0;

  return (
    <>
      <motion.div
        layoutId={`card-${activity.id}`}
        whileHover={{ scale: 1.02, y: -2 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl overflow-hidden shadow-md cursor-pointer dark:bg-white/5 dark:border-violet-500/20"
        onClick={() => onView(activity)}
      >
        {/* Cover photo or emoji banner */}
        <div className={cn("h-36 flex items-center justify-center", !hasCover && "bg-gradient-to-br from-rose-100 via-violet-100 to-amber-100 dark:from-rose-900/20 dark:via-violet-900/20 dark:to-amber-900/20")}>
          {hasCover ? (
            <PhotoThumbnail path={activity.photos[0]} className="w-full h-full object-cover" />
          ) : (
            <span className="text-5xl">{activity.emoji}</span>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-gray-800 dark:text-gray-100 line-clamp-2 flex-1 text-sm leading-snug pr-2">
              {activity.title}
            </h3>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setShowMenu((v) => !v); }}
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-400 dark:text-gray-500 shrink-0"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>

          {showMenu && (
            <div
              className="absolute right-4 top-44 bg-white rounded-xl shadow-xl border border-gray-100 z-10 py-1 min-w-28 dark:bg-slate-800 dark:border-slate-700"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => { setShowMenu(false); onEdit(activity); }}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-white/5 text-gray-700 dark:text-gray-200"
              >
                <Pencil className="w-4 h-4" /> Edit
              </button>
              <button
                onClick={() => { setShowMenu(false); setShowConfirm(true); }}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-red-50 text-red-600"
              >
                <Trash2 className="w-4 h-4" /> Delete
              </button>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-1.5 mb-2">
            <CategoryIcon category={activity.category} />
            <ActivityStatusBadge status={activity.status} />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400 dark:text-gray-500">{activity.date ? formatDate(activity.date) : "No date"}</span>
            {activity.status === "planned" && activity.date && isUpcoming(activity.date) && (
              <CountdownChip date={activity.date} />
            )}
            {activity.status === "completed" && activity.rating && (
              <RatingStars value={activity.rating} />
            )}
          </div>

          {activity.location && (
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 truncate">📍 {activity.location}</p>
          )}
        </div>
      </motion.div>

      <ConfirmDialog
        open={showConfirm}
        title="Delete activity?"
        description={`"${activity.title}" will be removed from your memories.`}
        onConfirm={async () => { setShowConfirm(false); await deleteActivity(activity.id); }}
        onCancel={() => setShowConfirm(false)}
      />
    </>
  );
}

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Pencil, MapPin, FileText, Calendar } from "lucide-react";
import type { Activity } from "@/types";
import { formatDate } from "@/lib/utils";
import { CategoryIcon } from "./CategoryIcon";
import { ActivityStatusBadge } from "./ActivityStatusBadge";
import { RatingStars } from "./RatingStars";
import { PhotoGallery } from "@/components/photos/PhotoGallery";
import { PhotoUploader } from "@/components/photos/PhotoUploader";
import { useApp } from "@/context/AppContext";

interface Props {
  activity: Activity | null;
  onClose: () => void;
  onEdit: (a: Activity) => void;
}

export function ActivityDetail({ activity, onClose, onEdit }: Props) {
  const { updateActivity } = useApp();

  if (!activity) return null;

  return (
    <Sheet open={!!activity} onOpenChange={(o) => !o && onClose()}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader className="mb-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl font-bold text-gray-800 pr-8">{activity.title}</SheetTitle>
            <Button size="sm" variant="outline" onClick={() => { onClose(); onEdit(activity); }} className="rounded-xl shrink-0">
              <Pencil className="w-3.5 h-3.5 mr-1" /> Edit
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            <CategoryIcon category={activity.category} size="md" />
            <ActivityStatusBadge status={activity.status} />
          </div>
        </SheetHeader>

        <div className="space-y-4">
          {/* Meta */}
          <div className="flex flex-col gap-2 text-sm text-gray-600">
            {activity.date && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                {formatDate(activity.date)}
              </div>
            )}
            {activity.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                {activity.location}
              </div>
            )}
          </div>

          {activity.status === "completed" && (
            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">Rating</p>
              <RatingStars
                value={activity.rating}
                onChange={(v) => updateActivity(activity.id, { rating: v })}
                size="md"
              />
            </div>
          )}

          {activity.notes && (
            <>
              <Separator />
              <div>
                <div className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-2">
                  <FileText className="w-4 h-4" /> Memories
                </div>
                <p className="text-sm text-gray-600 whitespace-pre-wrap">{activity.notes}</p>
              </div>
            </>
          )}

          <Separator />

          {/* Photos */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-3">Photos</p>
            <PhotoGallery activity={activity} />
            <div className="mt-3">
              <PhotoUploader activityId={activity.id} />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

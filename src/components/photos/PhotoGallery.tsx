import { useState } from "react";
import { Trash2 } from "lucide-react";
import type { Activity } from "@/types";
import { PhotoThumbnail } from "./PhotoThumbnail";
import { PhotoLightbox } from "./PhotoLightbox";
import { usePhotos } from "@/hooks/usePhotos";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";

export function PhotoGallery({ activity }: { activity: Activity }) {
  const { deletePhoto } = usePhotos();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  if (activity.photos.length === 0) {
    return <p className="text-sm text-gray-400 italic">No photos yet — add some memories!</p>;
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-2">
        {activity.photos.map((path, i) => (
          <div key={path} className="relative group aspect-square">
            <PhotoThumbnail
              path={path}
              className="w-full h-full cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => setLightboxIndex(i)}
            />
            <button
              onClick={(e) => { e.stopPropagation(); setDeleteTarget(path); }}
              className="absolute top-1 right-1 p-1 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
        ))}
      </div>

      {lightboxIndex !== null && (
        <PhotoLightbox
          paths={activity.photos}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete photo?"
        description="This photo will be permanently removed."
        onConfirm={async () => {
          if (deleteTarget) {
            await deletePhoto(activity.id, deleteTarget);
            setDeleteTarget(null);
          }
        }}
        onCancel={() => setDeleteTarget(null)}
      />
    </>
  );
}

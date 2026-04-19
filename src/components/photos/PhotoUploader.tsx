import { useRef, useState } from "react";
import { Upload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePhotos } from "@/hooks/usePhotos";
import { cn } from "@/lib/utils";

export function PhotoUploader({ activityId }: { activityId: string }) {
  const { uploadPhoto } = usePhotos();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    setProgress({ done: 0, total: files.length });
    for (let i = 0; i < files.length; i++) {
      try {
        await uploadPhoto(activityId, files[i]);
      } catch (e) {
        console.error("Upload failed:", e);
      }
      setProgress({ done: i + 1, total: files.length });
    }
    setUploading(false);
    setProgress(null);
  };

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
      className={cn(
        "border-2 border-dashed rounded-xl p-4 text-center transition-colors",
        dragOver ? "border-violet-400 bg-violet-50" : "border-gray-200 hover:border-gray-300"
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
      {uploading ? (
        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
          <Loader2 className="w-4 h-4 animate-spin" />
          {progress ? `Uploading ${progress.done}/${progress.total}...` : "Uploading..."}
        </div>
      ) : (
        <Button
          type="button"
          variant="ghost"
          onClick={() => inputRef.current?.click()}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          <Upload className="w-4 h-4 mr-2" />
          Add photos (drag & drop or click)
        </Button>
      )}
    </div>
  );
}

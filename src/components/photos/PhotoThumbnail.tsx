import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { fetchPhotoAsBlob } from "@/lib/github";
import { useGitHub } from "@/hooks/useGitHub";
import { useSettings } from "@/context/SettingsContext";
import { ImageIcon } from "lucide-react";

interface Props {
  path: string;
  className?: string;
  onClick?: () => void;
}

export function PhotoThumbnail({ path, className, onClick }: Props) {
  const { octokit } = useGitHub();
  const { owner, repo } = useSettings();
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!octokit) return;
    let url: string | null = null;
    fetchPhotoAsBlob(octokit, owner, repo, path)
      .then((u) => { url = u; setBlobUrl(u); })
      .catch(() => setError(true));
    return () => { if (url) URL.revokeObjectURL(url); };
  }, [octokit, owner, repo, path]);

  if (error) {
    return (
      <div className={cn("flex items-center justify-center bg-gray-100 rounded-xl", className)}>
        <ImageIcon className="w-6 h-6 text-gray-300" />
      </div>
    );
  }
  if (!blobUrl) {
    return <div className={cn("animate-pulse bg-gray-200 rounded-xl", className)} />;
  }
  return (
    <img
      src={blobUrl}
      alt=""
      className={cn("rounded-xl object-cover", className)}
      onClick={onClick}
    />
  );
}

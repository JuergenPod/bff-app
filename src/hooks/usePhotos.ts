import { useCallback } from "react";
import imageCompression from "browser-image-compression";
import * as github from "@/lib/github";
import { useGitHub } from "@/hooks/useGitHub";
import { useSettings } from "@/context/SettingsContext";
import { useApp } from "@/context/AppContext";
import { uuid } from "@/lib/utils";

export function usePhotos() {
  const { owner, repo } = useSettings();
  const { octokit } = useGitHub();
  const { addPhotoToActivity, removePhotoFromActivity } = useApp();

  const uploadPhoto = useCallback(async (activityId: string, file: File): Promise<void> => {
    if (!octokit) throw new Error("Not connected");
    const compressed = await imageCompression(file, {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 1200,
      useWebWorker: true,
      fileType: "image/jpeg",
    });
    const reader = new FileReader();
    const base64 = await new Promise<string>((resolve, reject) => {
      reader.onload = () => {
        const result = reader.result as string;
        // Strip data URL prefix
        resolve(result.split(",")[1]);
      };
      reader.onerror = reject;
      reader.readAsDataURL(compressed);
    });
    const filename = `${uuid()}.jpg`;
    const path = await github.uploadPhoto(octokit, owner, repo, activityId, filename, base64);
    await addPhotoToActivity(activityId, path);
  }, [octokit, owner, repo, addPhotoToActivity]);

  const deletePhoto = useCallback(async (activityId: string, path: string): Promise<void> => {
    if (!octokit) throw new Error("Not connected");
    await github.deletePhoto(octokit, owner, repo, path);
    await removePhotoFromActivity(activityId, path);
  }, [octokit, owner, repo, removePhotoFromActivity]);

  return { uploadPhoto, deletePhoto };
}

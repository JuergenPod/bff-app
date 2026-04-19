import React, { createContext, useCallback, useContext, useRef, useState } from "react";
import type { Activity } from "@/types";
import * as github from "@/lib/github";
import { useGitHub } from "@/hooks/useGitHub";
import { useSettings } from "@/context/SettingsContext";
import { uuid } from "@/lib/utils";

interface AppContextType {
  activities: Activity[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  createActivity: (data: Omit<Activity, "id" | "createdAt">) => Promise<void>;
  updateActivity: (id: string, data: Partial<Activity>) => Promise<void>;
  deleteActivity: (id: string) => Promise<void>;
  addPhotoToActivity: (activityId: string, path: string) => Promise<void>;
  removePhotoFromActivity: (activityId: string, path: string) => Promise<void>;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const { owner, repo } = useSettings();
  const { octokit } = useGitHub();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const shaRef = useRef<string>("");

  const refresh = useCallback(async () => {
    if (!octokit) return;
    setLoading(true);
    setError(null);
    try {
      const { activities: data, sha } = await github.fetchActivities(octokit, owner, repo);
      setActivities(data);
      shaRef.current = sha;
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Failed to load activities";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [octokit, owner, repo]);

  const save = useCallback(async (updated: Activity[], msg: string) => {
    if (!octokit) return;
    // Re-fetch latest SHA before every write to avoid conflicts
    const { activities: latest, sha } = await github.fetchActivities(octokit, owner, repo);
    // Merge: use updated list but ensure we have the latest SHA
    void latest;
    const newSha = await github.saveActivities(octokit, owner, repo, updated, sha, msg);
    shaRef.current = newSha;
  }, [octokit, owner, repo]);

  const createActivity = useCallback(async (data: Omit<Activity, "id" | "createdAt">) => {
    const newActivity: Activity = { ...data, id: uuid(), createdAt: new Date().toISOString() };
    const updated = [newActivity, ...activities];
    setActivities(updated);
    try {
      await save(updated, `feat: add "${newActivity.title}"`);
    } catch {
      setActivities(activities);
      setError("Failed to save. Please try again.");
    }
  }, [activities, save]);

  const updateActivity = useCallback(async (id: string, data: Partial<Activity>) => {
    const updated = activities.map((a) => (a.id === id ? { ...a, ...data } : a));
    setActivities(updated);
    try {
      await save(updated, `update: edit "${updated.find((a) => a.id === id)?.title ?? id}"`);
    } catch {
      setActivities(activities);
      setError("Failed to save. Please try again.");
    }
  }, [activities, save]);

  const deleteActivity = useCallback(async (id: string) => {
    const target = activities.find((a) => a.id === id);
    const updated = activities.filter((a) => a.id !== id);
    setActivities(updated);
    try {
      await save(updated, `delete: remove "${target?.title ?? id}"`);
    } catch {
      setActivities(activities);
      setError("Failed to delete. Please try again.");
    }
  }, [activities, save]);

  const addPhotoToActivity = useCallback(async (activityId: string, path: string) => {
    const activity = activities.find((a) => a.id === activityId);
    if (!activity) return;
    await updateActivity(activityId, { photos: [...activity.photos, path] });
  }, [activities, updateActivity]);

  const removePhotoFromActivity = useCallback(async (activityId: string, path: string) => {
    const activity = activities.find((a) => a.id === activityId);
    if (!activity) return;
    await updateActivity(activityId, { photos: activity.photos.filter((p) => p !== path) });
  }, [activities, updateActivity]);

  return (
    <AppContext.Provider value={{
      activities, loading, error, refresh,
      createActivity, updateActivity, deleteActivity,
      addPhotoToActivity, removePhotoFromActivity,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}

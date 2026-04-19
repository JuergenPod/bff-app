import { useMemo } from "react";
import { createOctokitClient } from "@/lib/github";
import { useSettings } from "@/context/SettingsContext";
import type { Octokit } from "@octokit/rest";

export function useGitHub(): { octokit: Octokit | null } {
  const { pat, isConfigured } = useSettings();
  const octokit = useMemo(
    () => (isConfigured ? createOctokitClient(pat) : null),
    [pat, isConfigured]
  );
  return { octokit };
}

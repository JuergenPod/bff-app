const KEYS = {
  PAT: "bff_pat",
  OWNER: "bff_owner",
  REPO: "bff_repo",
} as const;

export function saveSettings(pat: string, owner: string, repo: string) {
  localStorage.setItem(KEYS.PAT, pat);
  localStorage.setItem(KEYS.OWNER, owner);
  localStorage.setItem(KEYS.REPO, repo);
}

export function loadSettings() {
  return {
    pat: localStorage.getItem(KEYS.PAT) ?? "",
    owner: localStorage.getItem(KEYS.OWNER) ?? "",
    repo: localStorage.getItem(KEYS.REPO) ?? "",
  };
}

export function clearSettings() {
  localStorage.removeItem(KEYS.PAT);
  localStorage.removeItem(KEYS.OWNER);
  localStorage.removeItem(KEYS.REPO);
}

export function isConfigured(): boolean {
  const { pat, owner, repo } = loadSettings();
  return !!(pat && owner && repo);
}

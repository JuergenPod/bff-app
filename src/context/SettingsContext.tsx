import React, { createContext, useContext, useState } from "react";
import { saveSettings, loadSettings, clearSettings } from "@/lib/storage";

interface SettingsContextType {
  pat: string;
  owner: string;
  repo: string;
  isConfigured: boolean;
  saveConfig: (pat: string, owner: string, repo: string) => void;
  disconnect: () => void;
}

const SettingsContext = createContext<SettingsContextType | null>(null);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState(() => loadSettings());

  const saveConfig = (pat: string, owner: string, repo: string) => {
    saveSettings(pat, owner, repo);
    setSettings({ pat, owner, repo });
  };

  const disconnect = () => {
    clearSettings();
    setSettings({ pat: "", owner: "", repo: "" });
  };

  return (
    <SettingsContext.Provider
      value={{
        ...settings,
        isConfigured: !!(settings.pat && settings.owner && settings.repo),
        saveConfig,
        disconnect,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}

import { useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { useSettings } from "@/context/SettingsContext";

export function useActivities() {
  const app = useApp();
  const { isConfigured } = useSettings();

  useEffect(() => {
    if (isConfigured) {
      app.refresh();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConfigured]);

  return app;
}

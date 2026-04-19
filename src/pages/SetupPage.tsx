import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SetupWizard } from "@/components/setup/SetupWizard";
import { useSettings } from "@/context/SettingsContext";

export function SetupPage() {
  const { isConfigured } = useSettings();
  const navigate = useNavigate();
  useEffect(() => {
    if (isConfigured) navigate("/dashboard", { replace: true });
  }, [isConfigured, navigate]);
  return <SetupWizard />;
}

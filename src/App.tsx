import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AppShell } from "@/components/layout/AppShell";
import { SetupPage } from "@/pages/SetupPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { ActivitiesPage } from "@/pages/ActivitiesPage";
import { WishlistPage } from "@/pages/WishlistPage";
import { StatsPage } from "@/pages/StatsPage";
import { AchievementsPage } from "@/pages/AchievementsPage";
import { SettingsPage } from "@/pages/SettingsPage";
import { useSettings } from "@/context/SettingsContext";

function RequireSetup({ children }: { children: React.ReactNode }) {
  const { isConfigured } = useSettings();
  return isConfigured ? <>{children}</> : <Navigate to="/setup" replace />;
}

function AppRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/setup" element={<SetupPage />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<RequireSetup><AppShell><DashboardPage /></AppShell></RequireSetup>} />
        <Route path="/activities" element={<RequireSetup><AppShell><ActivitiesPage /></AppShell></RequireSetup>} />
        <Route path="/wishlist" element={<RequireSetup><AppShell><WishlistPage /></AppShell></RequireSetup>} />
        <Route path="/stats" element={<RequireSetup><AppShell><StatsPage /></AppShell></RequireSetup>} />
        <Route path="/achievements" element={<RequireSetup><AppShell><AchievementsPage /></AppShell></RequireSetup>} />
        <Route path="/settings" element={<RequireSetup><AppShell><SettingsPage /></AppShell></RequireSetup>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return <AppRoutes />;
}

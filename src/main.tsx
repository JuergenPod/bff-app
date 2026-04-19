import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter as BrowserRouter } from "react-router-dom";
import { SettingsProvider } from "@/context/SettingsContext";
import { AppProvider } from "@/context/AppContext";
import { Toaster } from "@/components/ui/sonner";
import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <SettingsProvider>
        <AppProvider>
          <App />
          <Toaster position="top-center" richColors />
        </AppProvider>
      </SettingsProvider>
    </BrowserRouter>
  </StrictMode>
);

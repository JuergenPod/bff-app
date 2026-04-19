import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter as BrowserRouter } from "react-router-dom";
import { SettingsProvider } from "@/context/SettingsContext";
import { AppProvider } from "@/context/AppContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { Toaster } from "@/components/ui/sonner";
import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <SettingsProvider>
          <AppProvider>
            <App />
            <Toaster position="top-center" richColors />
          </AppProvider>
        </SettingsProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);

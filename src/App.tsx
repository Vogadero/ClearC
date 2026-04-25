import { BrowserRouter, Routes, Route, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useConfigStore } from "@/stores/configStore";
import TitleBar from "@/components/layout/TitleBar";
import Sidebar from "@/components/layout/Sidebar";
import StatusBar from "@/components/layout/StatusBar";
import Onboarding from "@/components/modules/Onboarding";
import SmartClean from "@/components/modules/SmartClean";
import SystemJunk from "@/components/modules/SystemJunk";
import AppCache from "@/components/modules/AppCache";
import BigFile from "@/components/modules/BigFile";
import DuplicateFile from "@/components/modules/DuplicateFile";
import StorageMap from "@/components/modules/StorageMap";
import PrivacyClean from "@/components/modules/PrivacyClean";
import StartupManager from "@/components/modules/StartupManager";
import UpdateClean from "@/components/modules/UpdateClean";
import SpacePredict from "@/components/modules/SpacePredict";
import CleanImpact from "@/components/modules/CleanImpact";
import CleanSchedule from "@/components/modules/CleanSchedule";
import RollbackCenter from "@/components/modules/RollbackCenter";
import RuleEngine from "@/components/modules/RuleEngine";
import DiskMonitor from "@/components/modules/DiskMonitor";
import HelpCenter from "@/components/modules/HelpCenter";

function applyTheme(theme: "light" | "dark" | "system") {
  const root = document.documentElement;
  if (theme === "system") {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    root.classList.toggle("dark", prefersDark);
  } else {
    root.classList.toggle("dark", theme === "dark");
  }
}

function Layout() {
  const diskSpace = { totalBytes: 256 * 1024 * 1024 * 1024, usedBytes: 180 * 1024 * 1024 * 1024, freeBytes: 76 * 1024 * 1024 * 1024 };
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for tray events from Tauri backend
    let unlistenFn: (() => void) | null = null;
    import("@tauri-apps/api/event").then(({ listen }) => {
      listen<string>("tray-action", (event) => {
        if (event.payload === "quick-scan") {
          navigate("/");
        }
      }).then((fn) => { unlistenFn = fn; });
    }).catch(() => {
      // Running in browser dev mode without Tauri
    });
    return () => { if (unlistenFn) unlistenFn(); };
  }, [navigate]);

  return (
    <div className="flex flex-col h-full" style={{ background: "var(--color-canvas)" }}>
      <TitleBar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
      <StatusBar {...diskSpace} />
    </div>
  );
}

export default function App() {
  const theme = useConfigStore((s) => s.theme);
  const initialized = useConfigStore((s) => s.initialized);
  const [showOnboarding, setShowOnboarding] = useState(!initialized);

  useEffect(() => {
    applyTheme(theme);
    if (theme === "system") {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = () => applyTheme("system");
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }
  }, [theme]);

  useEffect(() => {
    if (initialized && showOnboarding) setShowOnboarding(false);
  }, [initialized, showOnboarding]);

  if (showOnboarding) {
    return <div className="h-full"><Onboarding /></div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<SmartClean />} />
          <Route path="/system-junk" element={<SystemJunk />} />
          <Route path="/app-cache" element={<AppCache />} />
          <Route path="/big-file" element={<BigFile />} />
          <Route path="/duplicate" element={<DuplicateFile />} />
          <Route path="/storage-map" element={<StorageMap />} />
          <Route path="/privacy" element={<PrivacyClean />} />
          <Route path="/startup" element={<StartupManager />} />
          <Route path="/update-clean" element={<UpdateClean />} />
          <Route path="/space-predict" element={<SpacePredict />} />
          <Route path="/clean-impact" element={<CleanImpact />} />
          <Route path="/schedule" element={<CleanSchedule />} />
          <Route path="/rollback" element={<RollbackCenter />} />
          <Route path="/rules" element={<RuleEngine />} />
          <Route path="/monitor" element={<DiskMonitor />} />
          <Route path="/help" element={<HelpCenter />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

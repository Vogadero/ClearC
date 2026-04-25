import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "light" | "dark" | "system";
type CleanPreference = "conservative" | "standard" | "deep";

interface ConfigState {
  theme: Theme;
  sidebarCollapsed: boolean;
  cleanPreference: CleanPreference;
  autoBackup: boolean;
  initialized: boolean;
  setTheme: (theme: Theme) => void;
  toggleSidebar: () => void;
  setCleanPreference: (pref: CleanPreference) => void;
  setAutoBackup: (enabled: boolean) => void;
  setInitialized: (val: boolean) => void;
}

export const useConfigStore = create<ConfigState>()(
  persist(
    (set) => ({
      theme: "system",
      sidebarCollapsed: false,
      cleanPreference: "standard",
      autoBackup: true,
      initialized: false,
      setTheme: (theme) => set({ theme }),
      toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
      setCleanPreference: (pref) => set({ cleanPreference: pref }),
      setAutoBackup: (enabled) => set({ autoBackup: enabled }),
      setInitialized: (val) => set({ initialized: val }),
    }),
    {
      name: "clearc-config",
    }
  )
);

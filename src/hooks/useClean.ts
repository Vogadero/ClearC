import { useState, useCallback } from "react";
import type { CleanReport } from "@/utils/constants";

interface CleanState {
  cleaning: boolean;
  progress: number;
  report: CleanReport | null;
  error: string | null;
}

export function useClean() {
  const [state, setState] = useState<CleanState>({
    cleaning: false,
    progress: 0,
    report: null,
    error: null,
  });

  const startClean = useCallback(async (_paths: string[]) => {
    setState({ cleaning: true, progress: 0, report: null, error: null });

    try {
      // TODO: Replace with actual Tauri IPC call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const mockReport: CleanReport = {
        freed_space: 0,
        cleaned_files: 0,
        elapsed_ms: 1500,
      };
      setState({ cleaning: false, progress: 100, report: mockReport, error: null });
    } catch (err) {
      setState((s) => ({ ...s, cleaning: false, error: String(err) }));
    }
  }, []);

  const cancelClean = useCallback(async () => {
    // TODO: await invoke("cancel_clean");
    setState((s) => ({ ...s, cleaning: false }));
  }, []);

  return { ...state, startClean, cancelClean };
}

import { useState, useCallback, useRef } from "react";
import type { ScanResult } from "@/utils/constants";

interface ScanState {
  scanning: boolean;
  progress: number;
  currentPath: string;
  scannedFiles: number;
  elapsedMs: number;
  result: ScanResult | null;
  error: string | null;
}

export function useScan(module: string) {
  const [state, setState] = useState<ScanState>({
    scanning: false,
    progress: 0,
    currentPath: "",
    scannedFiles: 0,
    elapsedMs: 0,
    result: null,
    error: null,
  });

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startScan = useCallback(async () => {
    setState((s) => ({ ...s, scanning: true, progress: 0, error: null, result: null }));
    const startTime = Date.now();

    timerRef.current = setInterval(() => {
      setState((s) => ({
        ...s,
        elapsedMs: Date.now() - startTime,
      }));
    }, 100);

    try {
      // TODO: Replace with actual Tauri IPC call
      // const result = await invoke<ScanResult>("start_scan", { module });
      // For now, simulate a scan result
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const mockResult: ScanResult = {
        module,
        items: [],
        total_size: 0,
        file_count: 0,
        elapsed_ms: Date.now() - startTime,
      };
      setState((s) => ({
        ...s,
        scanning: false,
        progress: 100,
        result: mockResult,
      }));
    } catch (err) {
      setState((s) => ({
        ...s,
        scanning: false,
        error: String(err),
      }));
    } finally {
      if (timerRef.current) clearInterval(timerRef.current);
    }
  }, [module]);

  const cancelScan = useCallback(async () => {
    // TODO: await invoke("cancel_scan");
    if (timerRef.current) clearInterval(timerRef.current);
    setState((s) => ({ ...s, scanning: false }));
  }, []);

  return { ...state, startScan, cancelScan };
}

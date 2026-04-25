// Tauri IPC bridge hooks - connects frontend to Rust backend
// Falls back to mock data in browser dev mode

import { useState, useCallback, useRef } from "react";
import type { ScanResult, CleanReport } from "@/utils/constants";

async function invoke<T>(cmd: string, args?: Record<string, unknown>): Promise<T> {
  const { invoke: tauriInvoke } = await import("@tauri-apps/api/core");
  return tauriInvoke<T>(cmd, args);
}

function isTauriAvailable(): boolean {
  return typeof window !== "undefined" && "__TAURI_INTERNALS__" in window;
}

// ─── Disk Space ────────────────────────────────────────────

export interface DiskSpaceInfo {
  total_bytes: number;
  used_bytes: number;
  free_bytes: number;
}

export async function getDiskSpace(): Promise<DiskSpaceInfo> {
  if (!isTauriAvailable()) {
    return { total_bytes: 256 * 1024 * 1024 * 1024, used_bytes: 180 * 1024 * 1024 * 1024, free_bytes: 76 * 1024 * 1024 * 1024 };
  }
  return invoke<DiskSpaceInfo>("get_disk_space");
}

// ─── App State ─────────────────────────────────────────────

export async function checkInitialized(): Promise<boolean> {
  if (!isTauriAvailable()) return false;
  return invoke<boolean>("check_initialized");
}

export async function setInitialized(): Promise<void> {
  if (!isTauriAvailable()) return;
  return invoke<void>("set_initialized");
}

// ─── Scan ──────────────────────────────────────────────────

export type ScanType = "smart" | "system_junk" | "app_cache" | "big_file" | "duplicate" | "privacy" | "startup" | "update";

export async function startScan(scanType: ScanType): Promise<void> {
  if (!isTauriAvailable()) return;
  return invoke<void>("start_scan", { scanType });
}

export async function cancelScan(): Promise<void> {
  if (!isTauriAvailable()) return;
  return invoke<void>("cancel_scan");
}

export async function getScanResult(): Promise<ScanResult | null> {
  if (!isTauriAvailable()) return null;
  return invoke<ScanResult | null>("get_scan_result");
}

// ─── Clean ─────────────────────────────────────────────────

export interface CleanOptions {
  paths: string[];
  createBackup: boolean;
  skipProtected: boolean;
}

export async function startClean(options: CleanOptions): Promise<void> {
  if (!isTauriAvailable()) return;
  return invoke<void>("start_clean", { options });
}

export async function cancelClean(): Promise<void> {
  if (!isTauriAvailable()) return;
  return invoke<void>("cancel_clean");
}

export async function getCleanReport(): Promise<CleanReport | null> {
  if (!isTauriAvailable()) return null;
  return invoke<CleanReport | null>("get_clean_report");
}

// ─── Monitor ───────────────────────────────────────────────

export async function startMonitor(): Promise<void> {
  if (!isTauriAvailable()) return;
  return invoke<void>("start_monitor");
}

export async function stopMonitor(): Promise<void> {
  if (!isTauriAvailable()) return;
  return invoke<void>("stop_monitor");
}

// ─── Backup ────────────────────────────────────────────────

export interface BackupRecord {
  id: string;
  date: string;
  module: string;
  size: number;
  files: number;
  expires_at: string;
}

export async function listBackups(): Promise<BackupRecord[]> {
  if (!isTauriAvailable()) return [];
  return invoke<BackupRecord[]>("list_backups");
}

export async function restoreBackup(backupId: string): Promise<void> {
  if (!isTauriAvailable()) return;
  return invoke<void>("restore_backup", { backupId });
}

export async function deleteBackup(backupId: string): Promise<void> {
  if (!isTauriAvailable()) return;
  return invoke<void>("delete_backup", { backupId });
}

// ─── Rules ─────────────────────────────────────────────────

export interface Rule {
  id: string;
  name: string;
  conditions: string;
  action: string;
  priority: number;
  enabled: boolean;
}

export async function createRule(rule: Omit<Rule, "id">): Promise<Rule> {
  return invoke<Rule>("create_rule", { rule });
}

export async function testRule(ruleId: string): Promise<{ matchCount: number; totalSize: number }> {
  return invoke<{ matchCount: number; totalSize: number }>("test_rule", { ruleId });
}

// ─── Hook: useTauriEvent ───────────────────────────────────

export function useTauriEvent<T>(event: string, handler: (payload: T) => void) {
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  const startListening = useCallback(() => {
    if (!isTauriAvailable()) return () => {};
    let unlisten: (() => void) | null = null;

    import("@tauri-apps/api/event").then(({ listen }) => {
      listen<T>(event, (e) => handlerRef.current(e.payload)).then((fn) => {
        unlisten = fn;
      });
    }).catch(() => {});

    return () => { if (unlisten) unlisten(); };
  }, [event]);

  return { startListening };
}

// ─── Hook: useIpcCall ──────────────────────────────────────

export function useIpcCall<T, A extends unknown[]>(
  fn: (...args: A) => Promise<T>
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const call = useCallback(async (...args: A): Promise<T | null> => {
    setLoading(true);
    setError(null);
    try {
      const result = await fn(...args);
      return result;
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setError(msg);
      return null;
    } finally {
      setLoading(false);
    }
  }, [fn]);

  return { call, loading, error };
}

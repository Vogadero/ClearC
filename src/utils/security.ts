// Security utilities for frontend

export interface PathCheckResult {
  isProtected: boolean;
  requiresAdmin: boolean;
}

/**
 * Check if a path is protected (in whitelist) or requires admin privileges.
 * Falls back to heuristics in browser dev mode.
 */
export async function checkPathSafety(path: string): Promise<PathCheckResult> {
  try {
    const { invoke } = await import("@tauri-apps/api/core");
    const [isProtected, requiresAdmin] = await Promise.all([
      invoke<boolean>("check_path_protected", { path }),
      invoke<boolean>("check_path_requires_admin", { path }),
    ]);
    return { isProtected, requiresAdmin };
  } catch {
    // Browser fallback: use heuristics
    const lower = path.toLowerCase();
    const isProtected = [
      "c:\\windows\\system32",
      "c:\\windows\\system",
      "c:\\windows\\winsxs",
      "c:\\program files",
      "c:\\program files (x86)",
    ].some((p) => lower.startsWith(p));
    const requiresAdmin = lower.startsWith("c:\\windows") || lower.startsWith("c:\\programdata");
    return { isProtected, requiresAdmin };
  }
}

/**
 * Check if the app is running with admin privileges.
 */
export async function isAdmin(): Promise<boolean> {
  try {
    const { invoke } = await import("@tauri-apps/api/core");
    return await invoke<boolean>("check_admin_privilege");
  } catch {
    return false;
  }
}

/**
 * Get the list of protected directories for display.
 */
export async function getProtectedDirs(): Promise<string[]> {
  try {
    const { invoke } = await import("@tauri-apps/api/core");
    return await invoke<string[]>("get_protected_dirs");
  } catch {
    return [];
  }
}

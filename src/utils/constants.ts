/** Risk level types matching Rust backend */
export type RiskLevel = "safe" | "warning" | "danger";

/** Scan result item */
export interface ScanItem {
  path: string;
  size: number;
  category: string;
  risk_level: RiskLevel;
  description: string;
}

/** Scan result from backend */
export interface ScanResult {
  module: string;
  items: ScanItem[];
  total_size: number;
  file_count: number;
  elapsed_ms: number;
}

/** Clean report from backend */
export interface CleanReport {
  freed_space: number;
  cleaned_files: number;
  elapsed_ms: number;
}

/** Disk space info */
export interface DiskSpace {
  total_bytes: number;
  used_bytes: number;
  free_bytes: number;
}

/** Navigation item definition */
export interface NavItem {
  id: string;
  label: string;
  icon: string;
  path: string;
}

/** Module navigation configuration */
export const NAV_ITEMS: NavItem[] = [
  { id: "smart-clean", label: "一键清理", icon: "Clean", path: "/" },
  { id: "system-junk", label: "系统垃圾", icon: "Delete", path: "/system-junk" },
  { id: "app-cache", label: "应用缓存", icon: "Application", path: "/app-cache" },
  { id: "big-file", label: "大文件分析", icon: "FileSearch", path: "/big-file" },
  { id: "duplicate", label: "重复检测", icon: "Copy", path: "/duplicate" },
  { id: "storage-map", label: "存储热力图", icon: "ChartPie", path: "/storage-map" },
  { id: "privacy", label: "隐私清理", icon: "Lock", path: "/privacy" },
  { id: "startup", label: "启动项", icon: "Startup", path: "/startup" },
  { id: "update-clean", label: "更新清理", icon: "UpdateRotation", path: "/update-clean" },
  { id: "space-predict", label: "空间预测", icon: "TrendTwo", path: "/space-predict" },
  { id: "clean-impact", label: "影响评估", icon: "Analysis", path: "/clean-impact" },
  { id: "schedule", label: "定时计划", icon: "Time", path: "/schedule" },
  { id: "rollback", label: "回滚中心", icon: "Undo", path: "/rollback" },
  { id: "rules", label: "规则引擎", icon: "SettingConfig", path: "/rules" },
  { id: "monitor", label: "磁盘监控", icon: "Monitor", path: "/monitor" },
  { id: "help", label: "帮助中心", icon: "Help", path: "/help" },
];

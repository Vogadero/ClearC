import { useState } from "react";
import { Save, FileText, Refresh, Folder, Help } from "@icon-park/react";
import { formatBytes } from "@/utils/format";
import Button from "@/components/common/Button";
import Badge from "@/components/common/Badge";
import StatsCard from "@/components/common/StatsCard";

interface BackupRecord { id: string; date: string; module: string; size: number; files: number; expiresAt: string }
interface CleanupLog { id: string; date: string; module: string; freedSpace: number; files: number; backupId: string | null }

const MOCK_BACKUPS: BackupRecord[] = [
  { id: "b1", date: "2026-04-25 14:30", module: "系统垃圾", size: 3_200_000_000, files: 12450, expiresAt: "2026-05-25" },
  { id: "b2", date: "2026-04-24 09:15", module: "应用缓存", size: 1_800_000_000, files: 3200, expiresAt: "2026-05-24" },
  { id: "b3", date: "2026-04-20 03:00", module: "定时清理", size: 2_400_000_000, files: 8900, expiresAt: "2026-05-20" },
];

const MOCK_LOGS: CleanupLog[] = [
  { id: "l1", date: "2026-04-25 14:31", module: "系统垃圾", freedSpace: 3_200_000_000, files: 12450, backupId: "b1" },
  { id: "l2", date: "2026-04-24 09:16", module: "应用缓存", freedSpace: 1_800_000_000, files: 3200, backupId: "b2" },
  { id: "l3", date: "2026-04-20 03:01", module: "定时清理", freedSpace: 2_400_000_000, files: 8900, backupId: "b3" },
  { id: "l4", date: "2026-04-18 10:22", module: "隐私清理", freedSpace: 120_000_000, files: 560, backupId: null },
];

export default function RollbackCenter() {
  const [activeTab, setActiveTab] = useState<"backups" | "logs">("backups");
  const totalBackupSize = MOCK_BACKUPS.reduce((s, b) => s + b.size, 0);
  const totalFreed = MOCK_LOGS.reduce((s, l) => s + l.freedSpace, 0);

  return (
    <div className="max-w-[960px] mx-auto">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-h1" style={{ color: "var(--color-text-primary)" }}>清理回滚中心</h1>
          <p className="mt-1 text-body-sm" style={{ color: "var(--color-text-tertiary)" }}>记录所有清理操作，支持从备份恢复已清理的文件</p>
        </div>
        <button className="p-1.5 rounded-md transition-colors" style={{ color: "var(--color-text-tertiary)" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "var(--color-surface-inset)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}>
          <Help size={18} theme="outline" />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <StatsCard label="备份数量" value={MOCK_BACKUPS.length} format="number" icon={<Save size={20} theme="outline" />} />
        <StatsCard label="备份总大小" value={totalBackupSize} format="bytes" />
        <StatsCard label="累计释放" value={totalFreed} format="bytes" variant="safe" />
      </div>

      <div className="flex gap-1 mb-4 p-1 rounded-lg" style={{ background: "var(--color-surface-inset)" }}>
        {[{ key: "backups" as const, label: "备份列表" }, { key: "logs" as const, label: "清理日志" }].map((tab) => (
          <button key={tab.key} className="flex-1 py-1.5 rounded-md text-sm transition-colors text-center"
            style={{ background: activeTab === tab.key ? "var(--color-surface)" : "transparent", color: activeTab === tab.key ? "var(--color-brand)" : "var(--color-text-secondary)", fontWeight: activeTab === tab.key ? 600 : 400 }}
            onClick={() => setActiveTab(tab.key)}>
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "backups" && (
        <div className="space-y-2">
          {MOCK_BACKUPS.map((backup) => (
            <div key={backup.id} className="p-4 rounded-lg" style={{ background: "var(--color-surface)", border: "1px solid var(--color-border-default)" }}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Save size={16} theme="outline" style={{ color: "var(--color-brand)" }} />
                  <span className="text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>{backup.module}</span>
                  <Badge variant="info">{backup.files.toLocaleString()} 文件</Badge>
                </div>
                <span className="text-sm font-medium" style={{ color: "var(--color-text-secondary)", fontVariantNumeric: "tabular-nums" }}>{formatBytes(backup.size)}</span>
              </div>
              <div className="flex items-center justify-between text-xs" style={{ color: "var(--color-text-tertiary)" }}>
                <span>创建: {backup.date}</span>
                <span>过期: {backup.expiresAt}</span>
              </div>
              <div className="flex gap-2 mt-3">
                <Button variant="primary" size="sm"><Refresh size={14} theme="outline" /> 恢复</Button>
                <Button variant="ghost" size="sm"><Folder size={14} theme="outline" /> 导出</Button>
                <Button variant="ghost" size="sm">删除备份</Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "logs" && (
        <div className="space-y-1">
          {MOCK_LOGS.map((log) => (
            <div key={log.id} className="flex items-center justify-between p-3 rounded-lg" style={{ background: "var(--color-surface)", border: "1px solid var(--color-border-default)" }}>
              <div className="flex items-center gap-3">
                <FileText size={16} theme="outline" style={{ color: "var(--color-brand)" }} />
                <div>
                  <span className="text-sm" style={{ color: "var(--color-text-primary)" }}>{log.module}</span>
                  <span className="text-xs ml-2" style={{ color: "var(--color-text-tertiary)" }}>{log.date}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs" style={{ color: "var(--color-text-tertiary)" }}>{log.files.toLocaleString()} 文件</span>
                <span className="text-sm font-medium" style={{ color: "var(--color-safe)", fontVariantNumeric: "tabular-nums" }}>
                  +{formatBytes(log.freedSpace)}
                </span>
                {log.backupId && <Badge variant="safe">有备份</Badge>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

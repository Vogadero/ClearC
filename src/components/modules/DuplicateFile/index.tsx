import { useState } from "react";
import { Copy, Lightning, Aiming, Protect, Help } from "@icon-park/react";
import { formatBytes } from "@/utils/format";
import Button from "@/components/common/Button";
import Badge from "@/components/common/Badge";
import StatsCard from "@/components/common/StatsCard";
import EmptyState from "@/components/common/EmptyState";

interface DuplicateGroup {
  hash: string;
  fileName: string;
  fileSize: number;
  files: { path: string; modified: string; depth: number }[];
  wasteSpace: number;
}

type ScanMode = "quick" | "standard" | "exact";
type KeepStrategy = "shallowest" | "newest" | "oldest";

const MOCK_GROUPS: DuplicateGroup[] = [
  { hash: "a1b2c3", fileName: "report_2024.pdf", fileSize: 45_000_000, files: [
    { path: "C:\\Users\\Admin\\Documents\\report_2024.pdf", modified: "2026-03-15", depth: 3 },
    { path: "C:\\Users\\Admin\\Backup\\report_2024.pdf", modified: "2026-02-10", depth: 3 },
    { path: "D:\\Sync\\report_2024.pdf", modified: "2026-01-05", depth: 2 },
  ], wasteSpace: 90_000_000 },
  { hash: "d4e5f6", fileName: "photo_batch.zip", fileSize: 890_000_000, files: [
    { path: "C:\\Users\\Admin\\Downloads\\photo_batch.zip", modified: "2025-12-20", depth: 3 },
    { path: "C:\\Users\\Admin\\Archives\\photo_batch.zip", modified: "2025-11-15", depth: 3 },
  ], wasteSpace: 890_000_000 },
  { hash: "g7h8i9", fileName: "node_modules (目录)", fileSize: 1_200_000_000, files: [
    { path: "C:\\project-a\\node_modules", modified: "2026-01-20", depth: 2 },
    { path: "C:\\project-b\\node_modules", modified: "2026-02-15", depth: 2 },
    { path: "C:\\project-c\\node_modules", modified: "2026-03-10", depth: 2 },
  ], wasteSpace: 2_400_000_000 },
];

export default function DuplicateFile() {
  const [scanMode, setScanMode] = useState<ScanMode>("standard");
  const [groups, setGroups] = useState<DuplicateGroup[]>([]);
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
  const [keepStrategy, setKeepStrategy] = useState<KeepStrategy>("shallowest");
  const [toDelete, setToDelete] = useState<Set<string>>(new Set());

  const totalWaste = groups.reduce((s, g) => s + g.wasteSpace, 0);
  const deleteSize = groups.reduce((s, g) => {
    const kept = g.files[0]?.path;
    return s + g.files.filter((f) => f.path !== kept && toDelete.has(f.path)).reduce((ss) => ss + g.fileSize, 0);
  }, 0);

  const handleScan = () => { setGroups(MOCK_GROUPS); setToDelete(new Set()); };

  const autoSelect = () => {
    const paths = new Set<string>();
    groups.forEach((g) => {
      const keepIdx = keepStrategy === "shallowest" ? g.files.findIndex((f) => f.depth === Math.min(...g.files.map((ff) => ff.depth)))
        : keepStrategy === "newest" ? 0 : g.files.length - 1;
      g.files.forEach((f, i) => { if (i !== keepIdx) paths.add(f.path); });
    });
    setToDelete(paths);
  };

  const toggleFile = (path: string) => {
    setToDelete((prev) => { const n = new Set(prev); if (n.has(path)) n.delete(path); else n.add(path); return n; });
  };

  const MODES: { key: ScanMode; label: string; desc: string; icon: React.ComponentType<{ size?: number; theme?: "outline" | "filled" | "two-tone" | "multi-color"; style?: React.CSSProperties }> }[] = [
    { key: "quick", label: "快速", desc: "大小+文件名", icon: Lightning },
    { key: "standard", label: "标准", desc: "大小+头尾hash", icon: Aiming },
    { key: "exact", label: "精确", desc: "全文件SHA-256", icon: Protect },
  ];

  return (
    <div className="max-w-[960px] mx-auto">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-h1" style={{ color: "var(--color-text-primary)" }}>重复文件检测</h1>
          <p className="mt-1 text-body-sm" style={{ color: "var(--color-text-tertiary)" }}>基于hash算法检测重复文件，智能推荐保留策略</p>
        </div>
        <button className="p-1.5 rounded-md transition-colors" style={{ color: "var(--color-text-tertiary)" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "var(--color-surface-inset)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}>
          <Help size={18} theme="outline" />
        </button>
      </div>

      {groups.length === 0 && (
        <>
          <div className="flex gap-2 mb-6">
            {MODES.map((mode) => {
              const Icon = mode.icon;
              return (
                <button key={mode.key} className="flex-1 p-4 rounded-lg text-left transition-colors"
                  style={{ background: scanMode === mode.key ? "var(--color-brand-subtle)" : "var(--color-surface)", border: `1px solid ${scanMode === mode.key ? "var(--color-brand)" : "var(--color-border-default)"}` }}
                  onClick={() => setScanMode(mode.key)}>
                  <div className="flex items-center gap-2 mb-1">
                    <Icon size={18} theme="outline" style={{ color: scanMode === mode.key ? "var(--color-brand)" : "var(--color-text-secondary)" }} />
                    <span className="text-sm font-medium" style={{ color: scanMode === mode.key ? "var(--color-brand)" : "var(--color-text-primary)" }}>{mode.label}</span>
                  </div>
                  <p className="text-xs" style={{ color: "var(--color-text-tertiary)" }}>{mode.desc}</p>
                </button>
              );
            })}
          </div>
          <EmptyState icon={<Copy size={64} theme="outline" />} title="检测重复文件" description="选择扫描模式后开始检测"
            action={<Button variant="primary" onClick={handleScan}>开始检测</Button>} />
        </>
      )}

      {groups.length > 0 && (
        <>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <StatsCard label="重复组" value={groups.length} format="number" />
            <StatsCard label="浪费空间" value={totalWaste} format="bytes" variant="danger" />
            <StatsCard label="可回收" value={deleteSize} format="bytes" variant="safe" />
          </div>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm" style={{ color: "var(--color-text-secondary)" }}>保留策略:</span>
            <select value={keepStrategy} onChange={(e) => setKeepStrategy(e.target.value as KeepStrategy)}
              className="h-7 px-2 rounded-md text-sm outline-none" style={{ background: "var(--color-surface-inset)", border: "1px solid var(--color-border-default)", color: "var(--color-text-primary)" }}>
              <option value="shallowest">保留路径最浅的</option><option value="newest">保留最近修改的</option><option value="oldest">保留最早的</option>
            </select>
            <Button variant="secondary" size="sm" onClick={autoSelect}>自动选择</Button>
            <Button variant="ghost" size="sm" onClick={() => { setGroups([]); setToDelete(new Set()); }}>重新扫描</Button>
          </div>

          <div className="space-y-2 mb-6">
            {groups.map((group) => {
              const isExpanded = expandedGroup === group.hash;
              return (
                <div key={group.hash} className="rounded-lg overflow-hidden" style={{ border: "1px solid var(--color-border-default)" }}>
                  <button className="w-full flex items-center justify-between p-3"
                    style={{ background: "var(--color-surface)" }}
                    onClick={() => setExpandedGroup(isExpanded ? null : group.hash)}>
                    <div className="flex items-center gap-3">
                      <Copy size={18} theme="outline" style={{ color: "var(--color-brand)" }} />
                      <div className="text-left">
                        <p className="text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>{group.fileName}</p>
                        <p className="text-xs" style={{ color: "var(--color-text-tertiary)" }}>{group.files.length} 个副本</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="danger">浪费 {formatBytes(group.wasteSpace)}</Badge>
                      <span className="text-sm" style={{ color: "var(--color-text-secondary)", fontVariantNumeric: "tabular-nums" }}>{formatBytes(group.fileSize)}/个</span>
                    </div>
                  </button>
                  {isExpanded && (
                    <div style={{ background: "var(--color-surface-inset)" }}>
                      {group.files.map((file, idx) => {
                        const isKept = idx === 0;
                        const isMarkedDelete = toDelete.has(file.path);
                        return (
                          <div key={file.path} className="flex items-center justify-between px-4 py-2" style={{ borderBottom: idx < group.files.length - 1 ? "1px solid var(--color-border-subtle)" : "none" }}>
                            <div className="flex items-center gap-2 min-w-0 flex-1">
                              <input type="checkbox" checked={isMarkedDelete} onChange={() => toggleFile(file.path)} className="accent-[var(--color-danger)]" disabled={isKept} />
                              <span className="text-sm font-mono truncate" style={{ color: isKept ? "var(--color-safe)" : "var(--color-text-primary)" }}>{file.path}</span>
                              {isKept && <Badge variant="safe">保留</Badge>}
                            </div>
                            <span className="text-xs shrink-0" style={{ color: "var(--color-text-tertiary)" }}>{file.modified}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="sticky bottom-0 flex items-center justify-between p-4 rounded-lg" style={{ background: "var(--color-surface)", border: "1px solid var(--color-border-default)" }}>
            <span className="text-sm" style={{ color: "var(--color-text-secondary)" }}>标记删除 {toDelete.size} 个文件 / 可回收 {formatBytes(deleteSize)}</span>
            <Button variant="danger" disabled={toDelete.size === 0}>删除重复文件</Button>
          </div>
        </>
      )}
    </div>
  );
}

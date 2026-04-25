import { useState } from "react";
import { FileSearch, Video, Music, Picture, FileText, FileZip, Install, FileFailed, Help } from "@icon-park/react";
import { formatBytes } from "@/utils/format";
import type { ScanItem } from "@/utils/constants";
import Button from "@/components/common/Button";
import Badge from "@/components/common/Badge";
import StatsCard from "@/components/common/StatsCard";
import EmptyState from "@/components/common/EmptyState";

interface BigFile extends ScanItem {
  lastAccessed: string;
  isOrphan: boolean;
  orphanReason?: string;
}

const TYPE_ICONS: Record<string, React.ComponentType<{ size?: number; theme?: "outline" | "filled" | "two-tone" | "multi-color"; style?: React.CSSProperties }>> = {
  video: Video, audio: Music, image: Picture, document: FileText,
  archive: FileZip, installer: Install, other: FileFailed,
};

const MOCK_DATA: BigFile[] = [
  { path: "C:\\Users\\Admin\\Downloads\\ubuntu-24.04.iso", size: 5_200_000_000, category: "installer", risk_level: "warning", description: "Ubuntu安装镜像", lastAccessed: "2025-08-15", isOrphan: true, orphanReason: "下载目录中超过90天未访问" },
  { path: "C:\\Users\\Admin\\Videos\\vacation_2024.mp4", size: 4_800_000_000, category: "video", risk_level: "warning", description: "视频文件", lastAccessed: "2025-12-01", isOrphan: false },
  { path: "C:\\Users\\Admin\\Downloads\\node-v22.pkg", size: 3_100_000_000, category: "installer", risk_level: "warning", description: "Node.js安装包", lastAccessed: "2025-06-20", isOrphan: true, orphanReason: "下载目录中超过90天未访问" },
  { path: "C:\\Users\\Admin\\AppData\\Local\\Temp\\extract_x7f2\\", size: 2_800_000_000, category: "other", risk_level: "danger", description: "临时解压目录残留", lastAccessed: "2025-11-10", isOrphan: true, orphanReason: "疑似临时解压目录残留" },
  { path: "C:\\Users\\Admin\\Documents\\backup_2024.zip", size: 2_400_000_000, category: "archive", risk_level: "safe", description: "压缩备份文件", lastAccessed: "2026-01-15", isOrphan: false },
  { path: "C:\\ProgramData\\OldApp\\data.db", size: 1_900_000_000, category: "other", risk_level: "danger", description: "已卸载程序遗留文件", lastAccessed: "2025-03-01", isOrphan: true, orphanReason: "已卸载程序遗留目录" },
  { path: "C:\\Users\\Admin\\Music\\collection.flac", size: 1_500_000_000, category: "audio", risk_level: "safe", description: "无损音乐文件", lastAccessed: "2026-02-10", isOrphan: false },
  { path: "C:\\Users\\Admin\\Pictures\\raw_photos.tar", size: 1_200_000_000, category: "archive", risk_level: "safe", description: "RAW照片归档", lastAccessed: "2026-03-20", isOrphan: false },
];

type SortKey = "size" | "accessed";

export default function BigFile() {
  const [threshold, setThreshold] = useState(100);
  const [sortBy, setSortBy] = useState<SortKey>("size");
  const [filterType, setFilterType] = useState<string>("all");
  const [selectedPaths, setSelectedPaths] = useState<Set<string>>(new Set());

  const sorted = [...MOCK_DATA].sort((a, b) => sortBy === "size" ? b.size - a.size : new Date(a.lastAccessed).getTime() - new Date(b.lastAccessed).getTime());
  const filtered = filterType === "all" ? sorted : sorted.filter((f) => f.category === filterType);
  const totalSize = filtered.reduce((s, f) => s + f.size, 0);
  const selectedSize = filtered.filter((f) => selectedPaths.has(f.path)).reduce((s, f) => s + f.size, 0);
  const orphanCount = filtered.filter((f) => f.isOrphan).length;

  return (
    <div className="max-w-[960px] mx-auto">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-h1" style={{ color: "var(--color-text-primary)" }}>大文件分析器</h1>
          <p className="mt-1 text-body-sm" style={{ color: "var(--color-text-tertiary)" }}>扫描C盘中的大文件，多维度分析与可视化呈现</p>
        </div>
        <button className="p-1.5 rounded-md transition-colors" style={{ color: "var(--color-text-tertiary)" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "var(--color-surface-inset)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}>
          <Help size={18} theme="outline" />
        </button>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4 mb-6 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="text-sm" style={{ color: "var(--color-text-secondary)" }}>阈值:</span>
          <select value={threshold} onChange={(e) => setThreshold(Number(e.target.value))}
            className="h-8 px-2 rounded-md text-sm outline-none" style={{ background: "var(--color-surface-inset)", border: "1px solid var(--color-border-default)", color: "var(--color-text-primary)" }}>
            <option value={10}>10 MB</option><option value={50}>50 MB</option><option value={100}>100 MB</option><option value={500}>500 MB</option><option value={1000}>1 GB</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm" style={{ color: "var(--color-text-secondary)" }}>排序:</span>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value as SortKey)}
            className="h-8 px-2 rounded-md text-sm outline-none" style={{ background: "var(--color-surface-inset)", border: "1px solid var(--color-border-default)", color: "var(--color-text-primary)" }}>
            <option value="size">按大小</option><option value="accessed">按访问时间</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm" style={{ color: "var(--color-text-secondary)" }}>类型:</span>
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)}
            className="h-8 px-2 rounded-md text-sm outline-none" style={{ background: "var(--color-surface-inset)", border: "1px solid var(--color-border-default)", color: "var(--color-text-primary)" }}>
            <option value="all">全部</option><option value="video">视频</option><option value="audio">音频</option><option value="image">图片</option>
            <option value="document">文档</option><option value="archive">压缩包</option><option value="installer">安装包</option><option value="other">其他</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatsCard label="大文件数" value={filtered.length} format="number" icon={<FileSearch size={20} theme="outline" />} />
        <StatsCard label="总大小" value={totalSize} format="bytes" />
        <StatsCard label="孤立文件" value={orphanCount} format="number" variant={orphanCount > 0 ? "warn" : "default"} />
        <StatsCard label="已选择" value={selectedSize} format="bytes" variant={selectedSize > 0 ? "safe" : "default"} />
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={<FileSearch size={64} theme="outline" />} title="没有找到大文件" description="尝试降低阈值或更换筛选条件" />
      ) : (
        <>
          <div className="space-y-2 mb-6">
            {filtered.map((file, idx) => {
              const Icon = TYPE_ICONS[file.category] || FileFailed;
              const isSelected = selectedPaths.has(file.path);
              return (
                <div key={idx} className="p-4 rounded-lg transition-colors"
                  style={{ background: file.isOrphan ? "var(--color-warn-subtle)" : "var(--color-surface)", border: `1px solid ${file.isOrphan ? "var(--color-warn)" : "var(--color-border-default)"}` }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <input type="checkbox" checked={isSelected} onChange={() => {
                        setSelectedPaths((prev) => { const n = new Set(prev); if (n.has(file.path)) n.delete(file.path); else n.add(file.path); return n; });
                      }} className="accent-[var(--color-brand)] shrink-0" />
                      <Icon size={20} theme="outline" style={{ color: "var(--color-brand)" }} />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium truncate" style={{ color: "var(--color-text-primary)" }}>{file.path}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs" style={{ color: "var(--color-text-tertiary)" }}>最后访问: {file.lastAccessed}</span>
                          {file.isOrphan && <Badge variant="warn">孤立文件</Badge>}
                        </div>
                        {file.isOrphan && file.orphanReason && (
                          <p className="text-xs mt-1" style={{ color: "var(--color-warn)" }}>原因: {file.orphanReason}</p>
                        )}
                      </div>
                    </div>
                    <span className="text-sm font-medium shrink-0 ml-2" style={{ color: "var(--color-text-secondary)", fontVariantNumeric: "tabular-nums" }}>{formatBytes(file.size)}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="sticky bottom-0 flex items-center justify-between p-4 rounded-lg" style={{ background: "var(--color-surface)", border: "1px solid var(--color-border-default)" }}>
            <span className="text-sm" style={{ color: "var(--color-text-secondary)" }}>已选 {selectedPaths.size} 项 / 可释放 {formatBytes(selectedSize)}</span>
            <Button variant="primary" disabled={selectedPaths.size === 0}>删除选中项</Button>
          </div>
        </>
      )}
    </div>
  );
}

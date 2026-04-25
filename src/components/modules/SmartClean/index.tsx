import { useState, useCallback } from "react";
import { Clear, Help } from "@icon-park/react";
import { useScan } from "@/hooks/useScan";
import { useClean } from "@/hooks/useClean";
import { formatBytes } from "@/utils/format";
import type { RiskLevel, ScanItem } from "@/utils/constants";
import Button from "@/components/common/Button";
import Badge from "@/components/common/Badge";
import ScanProgress from "@/components/common/ScanProgress";
import CleanConfirm from "@/components/common/CleanConfirm";
import CleanReport from "@/components/common/CleanReport";
import StatsCard from "@/components/common/StatsCard";
import EmptyState from "@/components/common/EmptyState";
import FileList from "@/components/common/FileList";

// Mock scan results for development
const MOCK_ITEMS: ScanItem[] = [
  { path: "%TEMP%", size: 2_450_000_000, category: "临时文件", risk_level: "safe", description: "用户临时目录" },
  { path: "C:\\Windows\\Temp", size: 1_230_000_000, category: "系统临时文件", risk_level: "safe", description: "系统临时目录" },
  { path: "%LOCALAPPDATA%\\Microsoft\\Windows\\Explorer\\thumbcache_*", size: 890_000_000, category: "缩略图缓存", risk_level: "safe", description: "资源管理器缩略图" },
  { path: "%LOCALAPPDATA%\\Google\\Chrome\\User Data\\Default\\Cache", size: 1_560_000_000, category: "Chrome缓存", risk_level: "warning", description: "浏览器HTTP缓存" },
  { path: "%APPDATA%\\npm-cache", size: 670_000_000, category: "npm缓存", risk_level: "warning", description: "Node.js包管理器缓存" },
  { path: "C:\\Windows\\SoftwareDistribution\\Download", size: 3_200_000_000, category: "更新缓存", risk_level: "warning", description: "Windows Update下载缓存" },
  { path: "HKCU\\...\\RunMRU", size: 4_096, category: "运行历史", risk_level: "danger", description: "注册表运行对话框记录" },
];

const RISK_LABEL: Record<RiskLevel, string> = {
  safe: "可安全清理",
  warning: "建议确认",
  danger: "谨慎操作",
};

export default function SmartClean() {
  const { scanning, progress, currentPath, scannedFiles, elapsedMs, result, startScan, cancelScan } = useScan("smart");
  const { cleaning, startClean, cancelClean, report } = useClean();

  const [showConfirm, setShowConfirm] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [selectedPaths, setSelectedPaths] = useState<Set<string>>(new Set());
  const [scanItems, setScanItems] = useState<ScanItem[]>([]);

  const displayItems = scanItems.length > 0 ? scanItems : (result?.items ?? []);

  const handleStartScan = useCallback(async () => {
    setSelectedPaths(new Set());
    setScanItems([]);
    await startScan();
    setScanItems(MOCK_ITEMS);
  }, [startScan]);

  const handleClean = useCallback(() => {
    setShowConfirm(true);
  }, []);

  const handleConfirmClean = useCallback(async (paths: string[]) => {
    setShowConfirm(false);
    await startClean(paths);
    setShowReport(true);
  }, [startClean]);

  const handleToggleSelect = useCallback((path: string) => {
    setSelectedPaths((prev) => {
      const next = new Set(prev);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return next;
    });
  }, []);

  const safeItems = displayItems.filter((i) => i.risk_level === "safe");
  const warnItems = displayItems.filter((i) => i.risk_level === "warning");
  const dangerItems = displayItems.filter((i) => i.risk_level === "danger");

  const safeSize = safeItems.reduce((s, i) => s + i.size, 0);
  const warnSize = warnItems.reduce((s, i) => s + i.size, 0);
  const dangerSize = dangerItems.reduce((s, i) => s + i.size, 0);

  const selectedSize = displayItems
    .filter((i) => selectedPaths.has(i.path))
    .reduce((s, i) => s + i.size, 0);

  return (
    <div className="max-w-[960px] mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-h1" style={{ color: "var(--color-text-primary)" }}>
            一键智能清理
          </h1>
          <p className="mt-1 text-body-sm" style={{ color: "var(--color-text-tertiary)" }}>
            自动扫描C盘可清理项目，一键释放磁盘空间
          </p>
        </div>
        <button
          className="p-1.5 rounded-md transition-colors"
          style={{ color: "var(--color-text-tertiary)" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "var(--color-surface-inset)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
          title="帮助"
        >
          <Help size={18} theme="outline" />
        </button>
      </div>

      {/* Scanning state */}
      {scanning && (
        <div className="mb-6">
          <ScanProgress
            progress={progress}
            currentPath={currentPath}
            scannedFiles={scannedFiles}
            elapsedMs={elapsedMs}
            onCancel={cancelScan}
          />
        </div>
      )}

      {/* Cleaning state */}
      {cleaning && (
        <div className="mb-6">
          <ScanProgress
            progress={50}
            currentPath="正在清理..."
            scannedFiles={0}
            elapsedMs={0}
            onCancel={cancelClean}
          />
        </div>
      )}

      {/* Before scan - empty state */}
      {!scanning && !cleaning && displayItems.length === 0 && (
        <EmptyState
          icon={<Clear size={64} theme="outline" />}
          title="开始扫描"
          description="点击下方按钮扫描C盘可清理项目"
          action={
            <Button variant="primary" onClick={handleStartScan}>
              开始扫描
            </Button>
          }
        />
      )}

      {/* Scan results */}
      {!scanning && !cleaning && displayItems.length > 0 && (
        <>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <StatsCard label="可安全清理" value={safeSize} format="bytes" variant="safe" />
            <StatsCard label="建议确认" value={warnSize} format="bytes" variant="warn" />
            <StatsCard label="谨慎操作" value={dangerSize} format="bytes" variant="danger" />
          </div>

          <div className="space-y-4 mb-6">
            {safeItems.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="safe">{RISK_LABEL.safe}</Badge>
                  <span className="text-caption" style={{ color: "var(--color-text-tertiary)" }}>
                    {safeItems.length} 项 / {formatBytes(safeSize)}
                  </span>
                </div>
                <FileList files={safeItems} selectedPaths={selectedPaths} onToggleSelect={handleToggleSelect} />
              </div>
            )}
            {warnItems.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="warn">{RISK_LABEL.warning}</Badge>
                  <span className="text-caption" style={{ color: "var(--color-text-tertiary)" }}>
                    {warnItems.length} 项 / {formatBytes(warnSize)}
                  </span>
                </div>
                <FileList files={warnItems} selectedPaths={selectedPaths} onToggleSelect={handleToggleSelect} />
              </div>
            )}
            {dangerItems.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="danger">{RISK_LABEL.danger}</Badge>
                  <span className="text-caption" style={{ color: "var(--color-text-tertiary)" }}>
                    {dangerItems.length} 项 / {formatBytes(dangerSize)}
                  </span>
                </div>
                <FileList files={dangerItems} selectedPaths={selectedPaths} onToggleSelect={handleToggleSelect} />
              </div>
            )}
          </div>

          <div
            className="sticky bottom-0 flex items-center justify-between p-4 rounded-lg"
            style={{ background: "var(--color-surface)", border: "1px solid var(--color-border-default)" }}
          >
            <div className="flex items-center gap-4">
              <span className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                已选 {selectedPaths.size} 项
              </span>
              <span className="text-sm font-medium" style={{ color: "var(--color-brand)", fontVariantNumeric: "tabular-nums" }}>
                可释放 {formatBytes(selectedSize)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" onClick={handleStartScan}>重新扫描</Button>
              <Button variant="primary" onClick={handleClean} disabled={selectedPaths.size === 0}>
                清理选中项
              </Button>
            </div>
          </div>
        </>
      )}

      {showConfirm && (
        <CleanConfirm
          items={displayItems.filter((i) => selectedPaths.has(i.path))}
          onConfirm={handleConfirmClean}
          onCancel={() => setShowConfirm(false)}
        />
      )}

      {showReport && report && (
        <CleanReport
          freedSpace={report.freed_space}
          cleanedFiles={report.cleaned_files}
          elapsedMs={report.elapsed_ms}
          onClose={() => {
            setShowReport(false);
            setSelectedPaths(new Set());
            setScanItems([]);
          }}
        />
      )}
    </div>
  );
}

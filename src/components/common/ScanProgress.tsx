import { formatDuration } from "@/utils/format";
import Badge from "./Badge";
import Button from "./Button";

interface ScanProgressProps {
  progress: number; // 0-100
  currentPath?: string;
  scannedFiles: number;
  totalFiles?: number;
  elapsedMs: number;
  onCancel?: () => void;
}

export default function ScanProgress({
  progress,
  currentPath,
  scannedFiles,
  totalFiles,
  elapsedMs,
  onCancel,
}: ScanProgressProps) {
  return (
    <div
      className="p-4 rounded-lg"
      style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-border-default)",
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Badge variant="info">扫描中</Badge>
          <span className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
            {scannedFiles.toLocaleString()} 个文件
            {totalFiles && ` / ${totalFiles.toLocaleString()}`}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-caption" style={{ color: "var(--color-text-tertiary)" }}>
            {formatDuration(elapsedMs)}
          </span>
          {onCancel && (
            <Button variant="ghost" size="sm" onClick={onCancel}>
              取消
            </Button>
          )}
        </div>
      </div>

      {/* Progress bar */}
      <div
        className="h-1.5 rounded-full mb-2"
        style={{ background: "var(--color-surface-inset)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{
            width: `${progress}%`,
            background: "var(--color-brand)",
          }}
        />
      </div>

      {currentPath && (
        <p
          className="text-xs font-mono truncate"
          style={{ color: "var(--color-text-tertiary)" }}
          title={currentPath}
        >
          {currentPath}
        </p>
      )}
    </div>
  );
}

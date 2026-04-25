import { formatBytes, formatDuration } from "@/utils/format";
import { CheckOne } from "@icon-park/react";

interface CleanReportProps {
  freedSpace: number;
  cleanedFiles: number;
  elapsedMs: number;
  onClose: () => void;
}

export default function CleanReport({ freedSpace, cleanedFiles, elapsedMs, onClose }: CleanReportProps) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ background: "rgba(0,0,0,0.5)" }}
    >
      <div
        className="w-full max-w-sm rounded-xl p-6 text-center"
        style={{
          background: "var(--color-surface-elevated)",
          boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
        }}
      >
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ background: "var(--color-safe-subtle)" }}
        >
          <CheckOne size={24} theme="outline" style={{ color: "var(--color-safe)" }} />
        </div>

        <h2 className="text-h1 mb-1" style={{ color: "var(--color-text-primary)" }}>
          清理完成
        </h2>
        <p className="text-body-sm mb-4" style={{ color: "var(--color-text-tertiary)" }}>
          已成功释放磁盘空间
        </p>

        <div
          className="text-display mb-4"
          style={{ color: "var(--color-safe)", fontVariantNumeric: "tabular-nums" }}
        >
          {formatBytes(freedSpace)}
        </div>

        <div className="flex justify-center gap-6 mb-4">
          <div>
            <span className="text-caption" style={{ color: "var(--color-text-tertiary)" }}>
              清理文件
            </span>
            <p className="text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>
              {cleanedFiles.toLocaleString()} 个
            </p>
          </div>
          <div>
            <span className="text-caption" style={{ color: "var(--color-text-tertiary)" }}>
              耗时
            </span>
            <p className="text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>
              {formatDuration(elapsedMs)}
            </p>
          </div>
        </div>

        <button
          className="w-full h-8 rounded-md text-white text-sm font-medium transition-colors"
          style={{ background: "var(--color-brand)" }}
          onClick={onClose}
          onMouseEnter={(e) => { e.currentTarget.style.background = "var(--color-brand-hover)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "var(--color-brand)"; }}
        >
          完成
        </button>
      </div>
    </div>
  );
}

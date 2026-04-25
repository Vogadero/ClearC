import { formatBytes } from "@/utils/format";

interface StatusBarProps {
  totalBytes: number;
  usedBytes: number;
  freeBytes: number;
}

export default function StatusBar({ totalBytes, usedBytes, freeBytes }: StatusBarProps) {
  const usedPercent = totalBytes > 0 ? (usedBytes / totalBytes) * 100 : 0;

  return (
    <div
      className="flex items-center h-9 px-4 shrink-0 gap-4"
      style={{
        background: "var(--color-surface)",
        borderTop: "1px solid var(--color-border-default)",
      }}
    >
      {/* Progress bar */}
      <div className="flex items-center gap-2 flex-1 max-w-xs">
        <span className="text-caption whitespace-nowrap" style={{ color: "var(--color-text-tertiary)" }}>
          C盘
        </span>
        <div
          className="flex-1 h-1.5 rounded-full"
          style={{ background: "var(--color-surface-inset)" }}
        >
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${usedPercent}%`,
              background:
                usedPercent > 90
                  ? "var(--color-danger)"
                  : usedPercent > 75
                  ? "var(--color-warn)"
                  : "var(--color-brand)",
            }}
          />
        </div>
      </div>
      <span className="text-caption" style={{ color: "var(--color-text-tertiary)" }}>
        {formatBytes(freeBytes)} 可用 / {formatBytes(totalBytes)} 总计
      </span>
    </div>
  );
}

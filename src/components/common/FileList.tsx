import Badge from "./Badge";
import type { RiskLevel } from "@/utils/constants";
import { formatBytes } from "@/utils/format";

interface FileItem {
  path: string;
  size: number;
  category: string;
  risk_level: RiskLevel;
  description: string;
}

interface FileListProps {
  files: FileItem[];
  onSelect?: (file: FileItem) => void;
  selectedPaths?: Set<string>;
  onToggleSelect?: (path: string) => void;
}

const RISK_VARIANT: Record<RiskLevel, "safe" | "warn" | "danger"> = {
  safe: "safe",
  warning: "warn",
  danger: "danger",
};

export default function FileList({ files, onSelect, selectedPaths, onToggleSelect }: FileListProps) {
  return (
    <div className="rounded-lg overflow-hidden" style={{ border: "1px solid var(--color-border-default)" }}>
      {files.map((file, idx) => {
        const isSelected = selectedPaths?.has(file.path);
        return (
          <div
            key={idx}
            className="flex items-center gap-3 px-4 h-9 cursor-pointer transition-colors"
            style={{
              background: isSelected ? "var(--color-brand-subtle)" : "var(--color-surface)",
              borderBottom: idx < files.length - 1 ? "1px solid var(--color-border-subtle)" : "none",
            }}
            onClick={() => onSelect?.(file)}
            onMouseEnter={(e) => {
              if (!isSelected) e.currentTarget.style.background = "var(--color-surface-inset)";
            }}
            onMouseLeave={(e) => {
              if (!isSelected) e.currentTarget.style.background = "var(--color-surface)";
            }}
          >
            {onToggleSelect && (
              <input
                type="checkbox"
                checked={isSelected}
                onChange={(e) => {
                  e.stopPropagation();
                  onToggleSelect(file.path);
                }}
                className="shrink-0 accent-[var(--color-brand)]"
              />
            )}
            <span className="flex-1 text-sm truncate font-mono" style={{ color: "var(--color-text-primary)" }}>
              {file.path}
            </span>
            <Badge variant={RISK_VARIANT[file.risk_level]}>
              {file.category}
            </Badge>
            <span
              className="text-sm shrink-0"
              style={{ color: "var(--color-text-secondary)", fontVariantNumeric: "tabular-nums" }}
            >
              {formatBytes(file.size)}
            </span>
          </div>
        );
      })}
    </div>
  );
}

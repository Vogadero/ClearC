import { formatBytes } from "@/utils/format";

interface StatsCardProps {
  label: string;
  value: number;
  format?: "bytes" | "number" | "percent";
  icon?: React.ReactNode;
  variant?: "default" | "safe" | "warn" | "danger";
}

export default function StatsCard({
  label,
  value,
  format = "number",
  icon,
  variant = "default",
}: StatsCardProps) {
  const displayValue = () => {
    switch (format) {
      case "bytes":
        return formatBytes(value);
      case "percent":
        return `${value}%`;
      default:
        return value.toLocaleString();
    }
  };

  const accentColors: Record<string, string> = {
    default: "var(--color-brand)",
    safe: "var(--color-safe)",
    warn: "var(--color-warn)",
    danger: "var(--color-danger)",
  };

  return (
    <div
      className="flex flex-col gap-1 p-4 rounded-lg"
      style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-border-default)",
      }}
    >
      <div className="flex items-center gap-2">
        {icon && (
          <span style={{ color: accentColors[variant] }}>{icon}</span>
        )}
        <span className="text-caption" style={{ color: "var(--color-text-tertiary)" }}>
          {label}
        </span>
      </div>
      <span
        className="text-display"
        style={{ color: "var(--color-text-primary)", fontVariantNumeric: "tabular-nums" }}
      >
        {displayValue()}
      </span>
    </div>
  );
}

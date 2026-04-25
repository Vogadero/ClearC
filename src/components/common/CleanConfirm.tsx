import Button from "./Button";
import Badge from "./Badge";
import { formatBytes } from "@/utils/format";
import type { RiskLevel } from "@/utils/constants";

interface ScanItem {
  path: string;
  size: number;
  category: string;
  risk_level: RiskLevel;
  description: string;
}

interface CleanConfirmProps {
  items: ScanItem[];
  onConfirm: (selectedPaths: string[]) => void;
  onCancel: () => void;
}

const RISK_VARIANT: Record<RiskLevel, "safe" | "warn" | "danger"> = {
  safe: "safe",
  warning: "warn",
  danger: "danger",
};

const RISK_LABEL: Record<RiskLevel, string> = {
  safe: "可安全清理",
  warning: "建议确认",
  danger: "谨慎操作",
};

export default function CleanConfirm({ items, onConfirm, onCancel }: CleanConfirmProps) {
  const totalSize = items.reduce((sum, item) => sum + item.size, 0);
  const safeItems = items.filter((i) => i.risk_level === "safe");

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ background: "rgba(0,0,0,0.5)" }}
    >
      <div
        className="w-full max-w-md rounded-xl p-6"
        style={{
          background: "var(--color-surface-elevated)",
          boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
        }}
      >
        <h2 className="text-h2 mb-1" style={{ color: "var(--color-text-primary)" }}>
          确认清理
        </h2>
        <p className="text-body-sm mb-4" style={{ color: "var(--color-text-tertiary)" }}>
          以下项目将被清理，请确认选择
        </p>

        {/* Summary */}
        <div
          className="flex items-center justify-between p-3 rounded-lg mb-4"
          style={{ background: "var(--color-brand-subtle)" }}
        >
          <span className="text-sm" style={{ color: "var(--color-brand)" }}>
            预计释放空间
          </span>
          <span
            className="text-h2"
            style={{ color: "var(--color-brand)", fontVariantNumeric: "tabular-nums" }}
          >
            {formatBytes(totalSize)}
          </span>
        </div>

        {/* Item list */}
        <div className="max-h-48 overflow-y-auto mb-4 space-y-1">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between py-1.5 px-2 rounded"
              style={{ background: "var(--color-surface-inset)" }}
            >
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <Badge variant={RISK_VARIANT[item.risk_level]}>
                  {RISK_LABEL[item.risk_level]}
                </Badge>
                <span className="text-sm truncate" style={{ color: "var(--color-text-primary)" }}>
                  {item.category}
                </span>
              </div>
              <span
                className="text-sm shrink-0 ml-2"
                style={{ color: "var(--color-text-secondary)", fontVariantNumeric: "tabular-nums" }}
              >
                {formatBytes(item.size)}
              </span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={onCancel}>
            取消
          </Button>
          <Button
            variant="primary"
            onClick={() => onConfirm(safeItems.map((i) => i.path))}
          >
            清理选中项
          </Button>
        </div>
      </div>
    </div>
  );
}

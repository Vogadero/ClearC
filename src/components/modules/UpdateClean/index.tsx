import { useState } from "react";
import { UpdateRotation, History, DataServer, HardDisk, Help } from "@icon-park/react";
import { formatBytes } from "@/utils/format";
import Button from "@/components/common/Button";
import Badge from "@/components/common/Badge";
import StatsCard from "@/components/common/StatsCard";

interface UpdateItem { key: string; label: string; icon: React.ComponentType<{ size?: number; theme?: "outline" | "filled" | "two-tone" | "multi-color"; style?: React.CSSProperties }>; size: number; risk: "safe" | "warning" | "danger"; detail: string; needsAdmin: boolean }

const MOCK_ITEMS: UpdateItem[] = [
  { key: "windows_old", label: "旧版本 Windows 备份", icon: History, size: 28_000_000_000, risk: "danger", detail: "C:\\Windows.old - 系统升级前的备份", needsAdmin: true },
  { key: "update_cache", label: "更新安装缓存", icon: UpdateRotation, size: 3_200_000_000, risk: "safe", detail: "C:\\Windows\\SoftwareDistribution\\Download", needsAdmin: false },
  { key: "winsxs", label: "组件存储清理", icon: DataServer, size: 5_600_000_000, risk: "warning", detail: "WinSxS 组件存储冗余数据", needsAdmin: true },
  { key: "driver_backup", label: "驱动备份清理", icon: HardDisk, size: 1_800_000_000, risk: "safe", detail: "旧版本驱动备份（保留当前版本）", needsAdmin: false },
];

export default function UpdateClean() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const totalSize = MOCK_ITEMS.reduce((s, i) => s + i.size, 0);
  const selectedSize = MOCK_ITEMS.filter((i) => selected.has(i.key)).reduce((s, i) => s + i.size, 0);

  const toggle = (key: string) => {
    setSelected((prev) => { const n = new Set(prev); if (n.has(key)) n.delete(key); else n.add(key); return n; });
  };

  return (
    <div className="max-w-[960px] mx-auto">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-h1" style={{ color: "var(--color-text-primary)" }}>系统更新清理</h1>
          <p className="mt-1 text-body-sm" style={{ color: "var(--color-text-tertiary)" }}>清理 Windows 系统更新产生的冗余文件</p>
        </div>
        <button className="p-1.5 rounded-md transition-colors" style={{ color: "var(--color-text-tertiary)" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "var(--color-surface-inset)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}>
          <Help size={18} theme="outline" />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <StatsCard label="可清理项" value={MOCK_ITEMS.length} format="number" icon={<UpdateRotation size={20} theme="outline" />} />
        <StatsCard label="总计大小" value={totalSize} format="bytes" />
        <StatsCard label="已选择" value={selectedSize} format="bytes" variant={selectedSize > 0 ? "safe" : "default"} />
      </div>

      <div className="space-y-2 mb-6">
        {MOCK_ITEMS.map((item) => {
          const Icon = item.icon;
          const isSelected = selected.has(item.key);
          const RISK_BADGE: Record<string, "safe" | "warn" | "danger"> = { safe: "safe", warning: "warn", danger: "danger" };
          return (
            <div key={item.key} className="p-4 rounded-lg cursor-pointer transition-colors"
              style={{ background: isSelected ? "var(--color-brand-subtle)" : "var(--color-surface)", border: `1px solid ${isSelected ? "var(--color-brand)" : "var(--color-border-default)"}` }}
              onClick={() => toggle(item.key)}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <input type="checkbox" checked={isSelected} onChange={() => toggle(item.key)} className="accent-[var(--color-brand)]" onClick={(e) => e.stopPropagation()} />
                  <Icon size={20} theme="outline" style={{ color: "var(--color-brand)" }} />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>{item.label}</span>
                      <Badge variant={RISK_BADGE[item.risk]}>{item.risk === "safe" ? "安全" : item.risk === "warning" ? "需确认" : "需管理员"}</Badge>
                    </div>
                    <p className="text-xs mt-0.5 font-mono" style={{ color: "var(--color-text-tertiary)" }}>{item.detail}</p>
                  </div>
                </div>
                <span className="text-sm font-medium" style={{ color: "var(--color-text-secondary)", fontVariantNumeric: "tabular-nums" }}>{formatBytes(item.size)}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="sticky bottom-0 flex items-center justify-between p-4 rounded-lg" style={{ background: "var(--color-surface)", border: "1px solid var(--color-border-default)" }}>
        <span className="text-sm" style={{ color: "var(--color-text-secondary)" }}>已选 {selected.size} 项 / 可释放 {formatBytes(selectedSize)}</span>
        <Button variant="primary" disabled={selected.size === 0}>清理选中项</Button>
      </div>
    </div>
  );
}

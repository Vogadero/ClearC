import { useState } from "react";
import { ChartPie, Export, Help } from "@icon-park/react";
import { formatBytes } from "@/utils/format";
import Button from "@/components/common/Button";
import StatsCard from "@/components/common/StatsCard";

const DIR_DATA = [
  { name: "Users", size: 86_000_000_000, percent: 33.6, color: "#1677FF" },
  { name: "Windows", size: 42_000_000_000, percent: 16.4, color: "#3C8AFF" },
  { name: "Program Files", size: 38_000_000_000, percent: 14.8, color: "#5A9AFF" },
  { name: "Program Files (x86)", size: 28_000_000_000, percent: 10.9, color: "#7AB8FF" },
  { name: "ProgramData", size: 34_000_000_000, percent: 13.3, color: "#9ECDFF" },
  { name: "其他", size: 28_000_000_000, percent: 10.9, color: "#C2E0FF" },
];

// Simple Treemap using CSS grid
function SimpleTreemap() {
  return (
    <div className="grid gap-0.5 rounded-lg overflow-hidden" style={{ height: 300, gridTemplateColumns: "1fr 1fr 1fr", gridTemplateRows: "1fr 1fr" }}>
      {DIR_DATA.slice(0, 6).map((dir, idx) => (
        <div key={dir.name} className="flex flex-col items-center justify-center cursor-pointer transition-opacity hover:opacity-80"
          style={{ background: dir.color, ...(idx === 0 ? { gridColumn: "span 2", gridRow: "span 1" } : {}) }}
          title={`${dir.name}: ${formatBytes(dir.size)} (${dir.percent}%)`}>
          <span className="text-white text-sm font-medium truncate px-2">{dir.name}</span>
          <span className="text-white/70 text-xs">{formatBytes(dir.size)}</span>
        </div>
      ))}
    </div>
  );
}

function RingChart() {
  const total = DIR_DATA.reduce((s, d) => s + d.size, 0);
  let cumulativePercent = 0;
  const segments = DIR_DATA.map((dir) => {
    const start = cumulativePercent;
    cumulativePercent += dir.percent;
    return { ...dir, start, end: cumulativePercent };
  });

  // SVG donut chart
  const radius = 80;
  const cx = 100, cy = 100;
  const strokeWidth = 30;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="flex items-center gap-6">
      <svg width="200" height="200" viewBox="0 0 200 200">
        {segments.map((seg, i) => {
          const dashLength = (seg.percent / 100) * circumference;
          const dashOffset = -(seg.start / 100) * circumference;
          return (
            <circle key={i} cx={cx} cy={cy} r={radius} fill="none" stroke={seg.color}
              strokeWidth={strokeWidth} strokeDasharray={`${dashLength} ${circumference - dashLength}`}
              strokeDashoffset={dashOffset} transform={`rotate(-90 ${cx} ${cy})`} />
          );
        })}
        <text x={cx} y={cy - 8} textAnchor="middle" className="text-sm font-semibold" fill="var(--color-text-primary)">
          C盘
        </text>
        <text x={cx} y={cy + 12} textAnchor="middle" className="text-xs" fill="var(--color-text-tertiary)">
          {formatBytes(total)} 总计
        </text>
      </svg>
      <div className="space-y-2">
        {DIR_DATA.map((dir) => (
          <div key={dir.name} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm shrink-0" style={{ background: dir.color }} />
            <span className="text-sm" style={{ color: "var(--color-text-primary)" }}>{dir.name}</span>
            <span className="text-xs ml-auto" style={{ color: "var(--color-text-tertiary)" }}>{dir.percent}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function StorageMap() {
  const [activeTab, setActiveTab] = useState<"treemap" | "ring" | "timeline">("treemap");
  const total = DIR_DATA.reduce((s, d) => s + d.size, 0);
  const used = 180_000_000_000;
  const free = 76_000_000_000;

  return (
    <div className="max-w-[960px] mx-auto">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-h1" style={{ color: "var(--color-text-primary)" }}>存储热力图</h1>
          <p className="mt-1 text-body-sm" style={{ color: "var(--color-text-tertiary)" }}>可视化C盘的空间占用情况，直观看到空间流向</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-1.5 rounded-md transition-colors" style={{ color: "var(--color-text-tertiary)" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--color-surface-inset)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}>
            <Help size={18} theme="outline" />
          </button>
          <Button variant="ghost" size="sm"><Export size={14} theme="outline" /> 导出报告</Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <StatsCard label="C盘总计" value={total} format="bytes" icon={<ChartPie size={20} theme="outline" />} />
        <StatsCard label="已使用" value={used} format="bytes" variant="warn" />
        <StatsCard label="剩余" value={free} format="bytes" variant="safe" />
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-4 p-1 rounded-lg" style={{ background: "var(--color-surface-inset)" }}>
        {[{ key: "treemap" as const, label: "Treemap" }, { key: "ring" as const, label: "环形图" }, { key: "timeline" as const, label: "时间线" }].map((tab) => (
          <button key={tab.key} className="flex-1 py-1.5 rounded-md text-sm transition-colors text-center"
            style={{ background: activeTab === tab.key ? "var(--color-surface)" : "transparent", color: activeTab === tab.key ? "var(--color-brand)" : "var(--color-text-secondary)", fontWeight: activeTab === tab.key ? 600 : 400, boxShadow: activeTab === tab.key ? "0 1px 3px rgba(0,0,0,0.08)" : "none" }}
            onClick={() => setActiveTab(tab.key)}>
            {tab.label}
          </button>
        ))}
      </div>

      <div className="rounded-lg p-6" style={{ background: "var(--color-surface)", border: "1px solid var(--color-border-default)" }}>
        {activeTab === "treemap" && <SimpleTreemap />}
        {activeTab === "ring" && <RingChart />}
        {activeTab === "timeline" && (
          <div className="text-center py-8">
            <p className="text-sm" style={{ color: "var(--color-text-tertiary)" }}>空间变化时间线需要多次扫描数据</p>
            <p className="text-xs mt-1" style={{ color: "var(--color-text-tertiary)" }}>完成2次以上扫描后，将自动生成变化趋势图</p>
          </div>
        )}
      </div>
    </div>
  );
}

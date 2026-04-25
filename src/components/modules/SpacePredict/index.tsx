import { TrendTwo, Data, Alarm, Ranking, Help } from "@icon-park/react";
import { formatBytes } from "@/utils/format";
import StatsCard from "@/components/common/StatsCard";

const MOCK_PREDICTION = {
  dailyRate: 0.8 * 1024 * 1024 * 1024, // 0.8 GB/day
  daysUntilFull: 95,
  topGrowth: [
    { dir: "C:\\Users\\Admin\\AppData\\Local\\Google", rate: 250_000_000, source: "Chrome浏览器缓存" },
    { dir: "C:\\Users\\Admin\\Documents", rate: 180_000_000, source: "用户文档" },
    { dir: "C:\\Users\\Admin\\AppData\\Local\\WeChat", rate: 150_000_000, source: "微信缓存" },
    { dir: "C:\\Windows\\SoftwareDistribution", rate: 80_000_000, source: "Windows Update" },
    { dir: "C:\\Users\\Admin\\AppData\\Local\\npm-cache", rate: 60_000_000, source: "npm缓存" },
  ],
  thresholds: { warning: 20_000_000_000, critical: 10_000_000_000, current: 76_000_000_000 },
};

export default function SpacePredict() {
  const { dailyRate, daysUntilFull, topGrowth, thresholds } = MOCK_PREDICTION;
  const status = thresholds.current > thresholds.warning ? "safe" : thresholds.current > thresholds.critical ? "warn" : "danger";
  const statusColor = status === "safe" ? "var(--color-safe)" : status === "warn" ? "var(--color-warn)" : "var(--color-danger)";

  return (
    <div className="max-w-[960px] mx-auto">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-h1" style={{ color: "var(--color-text-primary)" }}>智能空间预测</h1>
          <p className="mt-1 text-body-sm" style={{ color: "var(--color-text-tertiary)" }}>基于历史数据预测C盘空间变化趋势，提前预警</p>
        </div>
        <button className="p-1.5 rounded-md transition-colors" style={{ color: "var(--color-text-tertiary)" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "var(--color-surface-inset)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}>
          <Help size={18} theme="outline" />
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatsCard label="每日消耗" value={dailyRate} format="bytes" icon={<TrendTwo size={20} theme="outline" />} />
        <StatsCard label="预计耗尽" value={daysUntilFull} format="number" icon={<Alarm size={20} theme="outline" />} variant={daysUntilFull < 30 ? "danger" : daysUntilFull < 90 ? "warn" : "safe"} />
        <StatsCard label="当前剩余" value={thresholds.current} format="bytes" />
        <div className="p-4 rounded-lg" style={{ background: "var(--color-surface)", border: "1px solid var(--color-border-default)" }}>
          <span className="text-caption" style={{ color: "var(--color-text-tertiary)" }}>预警状态</span>
          <p className="text-h2 mt-1" style={{ color: statusColor }}>{status === "safe" ? "正常" : status === "warn" ? "注意" : "紧急"}</p>
        </div>
      </div>

      {/* Prediction chart placeholder */}
      <div className="p-6 rounded-lg mb-6" style={{ background: "var(--color-surface)", border: "1px solid var(--color-border-default)" }}>
        <h3 className="text-h3 mb-4" style={{ color: "var(--color-text-primary)" }}>
          <Data size={16} theme="outline" className="inline mr-1" />空间趋势预测
        </h3>
        <div className="h-48 flex items-end gap-1">
          {[76, 75, 74, 73, 71, 69, 66, 62, 57, 50, 42, 32, 20, 8].map((val, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full rounded-t" style={{ height: `${(val / 76) * 100}%`, background: val > 50 ? "var(--color-brand)" : val > 20 ? "var(--color-warn)" : "var(--color-danger)", minHeight: 4 }} />
              <span className="text-xs" style={{ color: "var(--color-text-tertiary)" }}>{i === 0 ? "现在" : i === 13 ? `+${i}天` : ""}</span>
            </div>
          ))}
        </div>
        <p className="text-xs mt-2" style={{ color: "var(--color-text-tertiary)" }}>
          预计 {daysUntilFull} 天后C盘剩余不足10GB
        </p>
      </div>

      {/* Growth sources */}
      <div className="rounded-lg p-6" style={{ background: "var(--color-surface)", border: "1px solid var(--color-border-default)" }}>
        <h3 className="text-h3 mb-4" style={{ color: "var(--color-text-primary)" }}>
          <Ranking size={16} theme="outline" className="inline mr-1" />增长源分析 (Top 5)
        </h3>
        <div className="space-y-2">
          {topGrowth.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 rounded" style={{ background: "var(--color-surface-inset)" }}>
              <div className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs text-white font-medium" style={{ background: "var(--color-brand)" }}>{idx + 1}</span>
                <div>
                  <p className="text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>{item.source}</p>
                  <p className="text-xs font-mono" style={{ color: "var(--color-text-tertiary)" }}>{item.dir}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium" style={{ color: "var(--color-text-secondary)", fontVariantNumeric: "tabular-nums" }}>+{formatBytes(item.rate)}/天</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alert config */}
      <div className="mt-6 p-4 rounded-lg flex items-center justify-between" style={{ background: "var(--color-surface)", border: "1px solid var(--color-border-default)" }}>
        <div>
          <h3 className="text-h3" style={{ color: "var(--color-text-primary)" }}>
            <Alarm size={16} theme="outline" className="inline mr-1" />空间预警配置
          </h3>
          <p className="text-xs mt-1" style={{ color: "var(--color-text-tertiary)" }}>当C盘剩余空间低于阈值时触发预警通知</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm" style={{ color: "var(--color-text-secondary)" }}>预警阈值:</span>
          <select className="h-7 px-2 rounded-md text-sm outline-none" style={{ background: "var(--color-surface-inset)", border: "1px solid var(--color-border-default)", color: "var(--color-text-primary)" }}>
            <option>20 GB</option><option>10 GB</option><option>5 GB</option>
          </select>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Shield, Link, Lamp, Help } from "@icon-park/react";
import Button from "@/components/common/Button";
import Badge from "@/components/common/Badge";

interface ImpactItem { name: string; risk: "none" | "low" | "medium" | "high"; impact: string; duration: string; process?: string }

const MOCK_IMPACTS: ImpactItem[] = [
  { name: "Chrome缓存", risk: "low", impact: "网页加载可能暂时变慢", duration: "短期", process: "chrome.exe (PID: 1234)" },
  { name: "npm缓存", risk: "low", impact: "下次npm install需要重新下载", duration: "一次性" },
  { name: "微信缓存", risk: "medium", impact: "历史图片/视频需重新下载查看", duration: "持续" },
  { name: "Windows Update缓存", risk: "none", impact: "无影响，已安装的更新不受影响", duration: "无" },
  { name: "注册表运行历史", risk: "high", impact: "可能影响部分程序自动启动配置", duration: "持续" },
  { name: "系统日志", risk: "low", impact: "无法回溯7天前的系统事件", duration: "永久" },
];

const RISK_VARIANT: Record<string, "safe" | "warn" | "danger" | "info"> = { none: "info", low: "safe", medium: "warn", high: "danger" };
const RISK_LABEL: Record<string, string> = { none: "无风险", low: "低风险", medium: "中风险", high: "高风险" };

export default function CleanImpact() {
  const [selectedImpact, setSelectedImpact] = useState<string | null>(null);

  return (
    <div className="max-w-[960px] mx-auto">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-h1" style={{ color: "var(--color-text-primary)" }}>清理影响评估</h1>
          <p className="mt-1 text-body-sm" style={{ color: "var(--color-text-tertiary)" }}>分析清理操作可能产生的影响，避免误删导致应用异常</p>
        </div>
        <button className="p-1.5 rounded-md transition-colors" style={{ color: "var(--color-text-tertiary)" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "var(--color-surface-inset)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}>
          <Help size={18} theme="outline" />
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {[{ label: "无风险", count: MOCK_IMPACTS.filter((i) => i.risk === "none").length, variant: "info" },
          { label: "低风险", count: MOCK_IMPACTS.filter((i) => i.risk === "low").length, variant: "safe" },
          { label: "中风险", count: MOCK_IMPACTS.filter((i) => i.risk === "medium").length, variant: "warn" },
          { label: "高风险", count: MOCK_IMPACTS.filter((i) => i.risk === "high").length, variant: "danger" },
        ].map((s) => (
          <div key={s.label} className="p-4 rounded-lg" style={{ background: "var(--color-surface)", border: "1px solid var(--color-border-default)" }}>
            <span className="text-caption" style={{ color: "var(--color-text-tertiary)" }}>{s.label}</span>
            <p className="text-display" style={{ color: `var(--color-${s.variant === "info" ? "brand" : s.variant})` }}>{s.count}</p>
          </div>
        ))}
      </div>

      <div className="space-y-2 mb-6">
        {MOCK_IMPACTS.map((item) => {
          const isSelected = selectedImpact === item.name;
          return (
            <div key={item.name} className="p-4 rounded-lg cursor-pointer transition-colors"
              style={{ background: isSelected ? "var(--color-brand-subtle)" : "var(--color-surface)", border: `1px solid ${isSelected ? "var(--color-brand)" : "var(--color-border-default)"}` }}
              onClick={() => setSelectedImpact(isSelected ? null : item.name)}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Badge variant={RISK_VARIANT[item.risk]}>{RISK_LABEL[item.risk]}</Badge>
                  <span className="text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>{item.name}</span>
                </div>
                <Badge variant="info">影响: {item.duration}</Badge>
              </div>
              <div className="flex items-center gap-2 ml-0">
                <Lamp size={14} theme="outline" style={{ color: "var(--color-warn)" }} />
                <span className="text-sm" style={{ color: "var(--color-text-secondary)" }}>{item.impact}</span>
              </div>
              {item.process && (
                <div className="flex items-center gap-2 mt-2 p-2 rounded" style={{ background: "var(--color-surface-inset)" }}>
                  <Link size={14} theme="outline" style={{ color: "var(--color-brand)" }} />
                  <span className="text-xs" style={{ color: "var(--color-text-tertiary)" }}>被占用: {item.process}</span>
                  <Button variant="ghost" size="sm" className="ml-auto">关闭应用</Button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="p-4 rounded-lg" style={{ background: "var(--color-safe-subtle)", border: "1px solid var(--color-safe)" }}>
        <div className="flex items-center gap-2 mb-1">
          <Shield size={16} theme="outline" style={{ color: "var(--color-safe)" }} />
          <span className="text-sm font-medium" style={{ color: "var(--color-safe)" }}>智能建议</span>
        </div>
        <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
          已自动取消高风险项的勾选。对于中风险的微信缓存，建议仅清理30天前的缓存文件。
        </p>
      </div>
    </div>
  );
}

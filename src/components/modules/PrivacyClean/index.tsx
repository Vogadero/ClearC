import { useState } from "react";
import { Shield, Computer, ApplicationTwo, Help } from "@icon-park/react";
import Button from "@/components/common/Button";
import StatsCard from "@/components/common/StatsCard";
import Badge from "@/components/common/Badge";

interface PrivacyItem { category: string; items: { name: string; count: number; risk: "low" | "medium" | "high" }[] }

const MOCK_BROWSER: PrivacyItem = { category: "浏览器隐私", items: [
  { name: "浏览历史", count: 12450, risk: "low" }, { name: "Cookie", count: 890, risk: "medium" },
  { name: "表单数据", count: 234, risk: "low" }, { name: "下载历史", count: 567, risk: "low" },
] };

const MOCK_SYSTEM: PrivacyItem = { category: "系统隐私", items: [
  { name: "最近打开文件", count: 320, risk: "low" }, { name: "运行历史", count: 45, risk: "low" },
  { name: "搜索历史", count: 128, risk: "low" }, { name: "剪贴板历史", count: 25, risk: "medium" },
] };

const MOCK_APP: PrivacyItem = { category: "应用隐私", items: [
  { name: "Office最近文档", count: 67, risk: "low" }, { name: "媒体播放历史", count: 89, risk: "low" },
  { name: "资源管理器历史", count: 156, risk: "low" },
] };

const RISK_BADGE: Record<string, "safe" | "warn" | "danger"> = { low: "safe", medium: "warn", high: "danger" };
const RISK_LABEL: Record<string, string> = { low: "低风险", medium: "中风险", high: "高风险" };

export default function PrivacyClean() {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const allItems = [MOCK_BROWSER, MOCK_SYSTEM, MOCK_APP];
  const totalCount = allItems.reduce((s, cat) => s + cat.items.reduce((ss, i) => ss + i.count, 0), 0);

  // Privacy score: 100 - weighted sum
  const score = Math.max(0, 100 - allItems.reduce((s, cat) => s + cat.items.reduce((ss, i) => ss + (i.risk === "high" ? 3 : i.risk === "medium" ? 1 : 0.3) * Math.min(i.count, 100), 0), 0));
  const scoreColor = score >= 80 ? "var(--color-safe)" : score >= 50 ? "var(--color-warn)" : "var(--color-danger)";

  const toggleItem = (name: string) => {
    setCheckedItems((prev) => { const n = new Set(prev); if (n.has(name)) n.delete(name); else n.add(name); return n; });
  };

  return (
    <div className="max-w-[960px] mx-auto">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-h1" style={{ color: "var(--color-text-primary)" }}>隐私痕迹清理</h1>
          <p className="mt-1 text-body-sm" style={{ color: "var(--color-text-tertiary)" }}>清理系统中可能泄露用户隐私的数据痕迹</p>
        </div>
        <button className="p-1.5 rounded-md transition-colors" style={{ color: "var(--color-text-tertiary)" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "var(--color-surface-inset)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}>
          <Help size={18} theme="outline" />
        </button>
      </div>

      {/* Privacy Score */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="col-span-1 flex flex-col items-center justify-center p-4 rounded-lg" style={{ background: "var(--color-surface)", border: "1px solid var(--color-border-default)" }}>
          <svg width="80" height="80" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="34" fill="none" stroke="var(--color-surface-inset)" strokeWidth="6" />
            <circle cx="40" cy="40" r="34" fill="none" stroke={scoreColor} strokeWidth="6"
              strokeDasharray={`${(score / 100) * 2 * Math.PI * 34} ${2 * Math.PI * 34 - (score / 100) * 2 * Math.PI * 34}`}
              strokeDashoffset={2 * Math.PI * 34 / 4} transform="rotate(-90 40 40)" strokeLinecap="round" />
            <text x="40" y="38" textAnchor="middle" dominantBaseline="middle" className="text-display" fill={scoreColor} fontSize="20" fontWeight="600">{Math.round(score)}</text>
            <text x="40" y="52" textAnchor="middle" className="text-xs" fill="var(--color-text-tertiary)">隐私评分</text>
          </svg>
        </div>
        <StatsCard label="浏览器痕迹" value={MOCK_BROWSER.items.reduce((s, i) => s + i.count, 0)} format="number" icon={<Shield size={20} theme="outline" />} />
        <StatsCard label="系统痕迹" value={MOCK_SYSTEM.items.reduce((s, i) => s + i.count, 0)} format="number" icon={<Computer size={20} theme="outline" />} />
        <StatsCard label="应用痕迹" value={MOCK_APP.items.reduce((s, i) => s + i.count, 0)} format="number" icon={<ApplicationTwo size={20} theme="outline" />} />
      </div>

      {/* Categories */}
      <div className="space-y-4 mb-6">
        {allItems.map((cat) => {
          const CatIcon = cat.category === "浏览器隐私" ? Shield : cat.category === "系统隐私" ? Computer : ApplicationTwo;
          return (
            <div key={cat.category} className="rounded-lg p-4" style={{ background: "var(--color-surface)", border: "1px solid var(--color-border-default)" }}>
              <div className="flex items-center gap-2 mb-3">
                <CatIcon size={18} theme="outline" style={{ color: "var(--color-brand)" }} />
                <h3 className="text-h3" style={{ color: "var(--color-text-primary)" }}>{cat.category}</h3>
              </div>
              <div className="space-y-1">
                {cat.items.map((item) => (
                  <div key={item.name} className="flex items-center justify-between py-2 px-3 rounded" style={{ background: "var(--color-surface-inset)" }}>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" checked={checkedItems.has(item.name)} onChange={() => toggleItem(item.name)} className="accent-[var(--color-brand)]" />
                      <span className="text-sm" style={{ color: "var(--color-text-primary)" }}>{item.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs" style={{ color: "var(--color-text-tertiary)" }}>{item.count.toLocaleString()} 条</span>
                      <Badge variant={RISK_BADGE[item.risk]}>{RISK_LABEL[item.risk]}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="sticky bottom-0 flex items-center justify-between p-4 rounded-lg" style={{ background: "var(--color-surface)", border: "1px solid var(--color-border-default)" }}>
        <span className="text-sm" style={{ color: "var(--color-text-secondary)" }}>已选 {checkedItems.size} 项 / 共 {totalCount} 条痕迹</span>
        <Button variant="primary" disabled={checkedItems.size === 0}>清理选中项</Button>
      </div>
    </div>
  );
}

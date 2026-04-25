import { useState } from "react";
import { Application, Browser, Code, Communication, Game, Bydesign, Trend, Help } from "@icon-park/react";
import { formatBytes } from "@/utils/format";
import Button from "@/components/common/Button";
import StatsCard from "@/components/common/StatsCard";

interface AppCacheItem {
  name: string;
  category: "browser" | "dev" | "chat" | "game" | "design";
  cacheSize: number;
  subCategories?: { label: string; size: number }[];
  trend?: { date: string; size: number }[];
}

const MOCK_DATA: AppCacheItem[] = [
  { name: "Chrome", category: "browser", cacheSize: 1_560_000_000, subCategories: [{ label: "HTTP缓存", size: 800_000_000 }, { label: "Cookie", size: 20_000_000 }, { label: "浏览历史", size: 50_000_000 }] },
  { name: "Edge", category: "browser", cacheSize: 890_000_000, subCategories: [{ label: "HTTP缓存", size: 600_000_000 }, { label: "Cookie", size: 10_000_000 }] },
  { name: "Firefox", category: "browser", cacheSize: 450_000_000 },
  { name: "npm", category: "dev", cacheSize: 670_000_000 },
  { name: "yarn", category: "dev", cacheSize: 340_000_000 },
  { name: "pnpm", category: "dev", cacheSize: 520_000_000 },
  { name: "pip", category: "dev", cacheSize: 280_000_000 },
  { name: "Maven", category: "dev", cacheSize: 1_200_000_000 },
  { name: "Cargo", category: "dev", cacheSize: 450_000_000 },
  { name: "微信", category: "chat", cacheSize: 3_800_000_000, subCategories: [{ label: "图片", size: 1_200_000_000 }, { label: "视频", size: 1_500_000_000 }, { label: "文件", size: 800_000_000 }, { label: "语音", size: 300_000_000 }] },
  { name: "QQ", category: "chat", cacheSize: 2_100_000_000, subCategories: [{ label: "图片", size: 800_000_000 }, { label: "视频", size: 900_000_000 }, { label: "文件", size: 400_000_000 }] },
  { name: "钉钉", category: "chat", cacheSize: 560_000_000 },
  { name: "飞书", category: "chat", cacheSize: 340_000_000 },
  { name: "Steam", category: "game", cacheSize: 2_400_000_000 },
  { name: "Epic Games", category: "game", cacheSize: 890_000_000 },
  { name: "Figma", category: "design", cacheSize: 450_000_000 },
  { name: "Adobe CC", category: "design", cacheSize: 1_100_000_000 },
];

const TABS = [
  { key: "browser" as const, label: "浏览器", icon: Browser },
  { key: "dev" as const, label: "开发工具", icon: Code },
  { key: "chat" as const, label: "聊天应用", icon: Communication },
  { key: "game" as const, label: "游戏平台", icon: Game },
  { key: "design" as const, label: "设计工具", icon: Bydesign },
];

export default function AppCache() {
  const [activeTab, setActiveTab] = useState<"browser" | "dev" | "chat" | "game" | "design">("browser");
  const [selectedApps, setSelectedApps] = useState<Set<string>>(new Set());

  const filteredData = MOCK_DATA.filter((d) => d.category === activeTab);
  const totalSize = MOCK_DATA.reduce((s, d) => s + d.cacheSize, 0);
  const selectedSize = MOCK_DATA.filter((d) => selectedApps.has(d.name)).reduce((s, d) => s + d.cacheSize, 0);

  const toggleApp = (name: string) => {
    setSelectedApps((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name); else next.add(name);
      return next;
    });
  };

  return (
    <div className="max-w-[960px] mx-auto">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-h1" style={{ color: "var(--color-text-primary)" }}>应用缓存清理</h1>
          <p className="mt-1 text-body-sm" style={{ color: "var(--color-text-tertiary)" }}>扫描常用应用程序产生的缓存数据，按应用维度管理清理</p>
        </div>
        <button className="p-1.5 rounded-md transition-colors" style={{ color: "var(--color-text-tertiary)" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "var(--color-surface-inset)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}>
          <Help size={18} theme="outline" />
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <StatsCard label="应用总数" value={MOCK_DATA.length} format="number" icon={<Application size={20} theme="outline" />} />
        <StatsCard label="缓存总量" value={totalSize} format="bytes" />
        <StatsCard label="已选择" value={selectedSize} format="bytes" variant={selectedSize > 0 ? "safe" : "default"} />
      </div>

      {/* Trend alert */}
      <div className="flex items-center gap-2 p-3 rounded-lg mb-6" style={{ background: "var(--color-warn-subtle)" }}>
        <Trend size={16} theme="outline" style={{ color: "var(--color-warn)" }} />
        <span className="text-sm" style={{ color: "var(--color-warn)" }}>微信缓存7天内增长超过2GB，建议清理</span>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-4 p-1 rounded-lg" style={{ background: "var(--color-surface-inset)" }}>
        {TABS.map((tab) => {
          const Icon = tab.icon;
          return (
            <button key={tab.key} className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-colors flex-1 justify-center"
              style={{ background: activeTab === tab.key ? "var(--color-surface)" : "transparent", color: activeTab === tab.key ? "var(--color-brand)" : "var(--color-text-secondary)", fontWeight: activeTab === tab.key ? 600 : 400, boxShadow: activeTab === tab.key ? "0 1px 3px rgba(0,0,0,0.08)" : "none" }}
              onClick={() => setActiveTab(tab.key)}>
              <Icon size={16} theme="outline" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* App list */}
      <div className="space-y-2 mb-6">
        {filteredData.map((app) => {
          const isSelected = selectedApps.has(app.name);
          return (
            <div key={app.name} className="p-4 rounded-lg transition-colors cursor-pointer"
              style={{ background: isSelected ? "var(--color-brand-subtle)" : "var(--color-surface)", border: `1px solid ${isSelected ? "var(--color-brand)" : "var(--color-border-default)"}` }}
              onClick={() => toggleApp(app.name)}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <input type="checkbox" checked={isSelected} onChange={() => toggleApp(app.name)} className="accent-[var(--color-brand)]" onClick={(e) => e.stopPropagation()} />
                  <span className="text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>{app.name}</span>
                </div>
                <span className="text-sm font-medium" style={{ color: "var(--color-text-secondary)", fontVariantNumeric: "tabular-nums" }}>{formatBytes(app.cacheSize)}</span>
              </div>
              {app.subCategories && (
                <div className="flex flex-wrap gap-2 ml-7">
                  {app.subCategories.map((sub) => (
                    <span key={sub.label} className="text-xs px-2 py-0.5 rounded" style={{ background: "var(--color-surface-inset)", color: "var(--color-text-tertiary)" }}>
                      {sub.label}: {formatBytes(sub.size)}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="sticky bottom-0 flex items-center justify-between p-4 rounded-lg" style={{ background: "var(--color-surface)", border: "1px solid var(--color-border-default)" }}>
        <span className="text-sm" style={{ color: "var(--color-text-secondary)" }}>已选 {selectedApps.size} 个应用 / 可释放 {formatBytes(selectedSize)}</span>
        <Button variant="primary" disabled={selectedApps.size === 0}>清理选中项</Button>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Play, Pause, Timer, Help } from "@icon-park/react";
import Badge from "@/components/common/Badge";

interface StartupItem {
  name: string; publisher: string; command: string; source: string;
  impact: "low" | "medium" | "high"; safety: "safe" | "unknown" | "risk";
  enabled: boolean; delayed: boolean;
}

const MOCK_ITEMS: StartupItem[] = [
  { name: "Windows Security", publisher: "Microsoft", command: "C:\\Windows\\System32\\SecurityHealthSystray.exe", source: "HKLM\\...\\Run", impact: "low", safety: "safe", enabled: true, delayed: false },
  { name: "OneDrive", publisher: "Microsoft", command: "C:\\Program Files\\Microsoft OneDrive\\OneDrive.exe", source: "HKCU\\...\\Run", impact: "medium", safety: "safe", enabled: true, delayed: false },
  { name: "WeChat", publisher: "Tencent", command: "C:\\Program Files\\Tencent\\WeChat\\WeChat.exe", source: "HKCU\\...\\Run", impact: "medium", safety: "safe", enabled: true, delayed: true },
  { name: "DingTalk", publisher: "Alibaba", command: "C:\\Program Files\\DingDing\\Dingtalk.exe", source: "启动文件夹", impact: "medium", safety: "safe", enabled: true, delayed: false },
  { name: "Feishu", publisher: "ByteDance", command: "C:\\Program Files\\Feishu\\Feishu.exe", source: "HKCU\\...\\Run", impact: "medium", safety: "safe", enabled: false, delayed: false },
  { name: "UnknownTool", publisher: "未知", command: "C:\\Users\\Admin\\AppData\\tool.exe", source: "HKCU\\...\\Run", impact: "high", safety: "risk", enabled: true, delayed: false },
  { name: "Steam", publisher: "Valve", command: "C:\\Program Files\\Steam\\Steam.exe", source: "HKCU\\...\\Run", impact: "low", safety: "safe", enabled: true, delayed: true },
];

const IMPACT_BADGE: Record<string, "safe" | "warn" | "danger"> = { low: "safe", medium: "warn", high: "danger" };
const SAFETY_BADGE: Record<string, "safe" | "warn" | "danger"> = { safe: "safe", unknown: "warn", risk: "danger" };

export default function StartupManager() {
  const [items, setItems] = useState(MOCK_ITEMS);
  const enabledCount = items.filter((i) => i.enabled).length;

  const toggleEnabled = (idx: number) => {
    setItems((prev) => prev.map((item, i) => i === idx ? { ...item, enabled: !item.enabled } : item));
  };

  const toggleDelayed = (idx: number) => {
    setItems((prev) => prev.map((item, i) => i === idx ? { ...item, delayed: !item.delayed } : item));
  };

  return (
    <div className="max-w-[960px] mx-auto">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-h1" style={{ color: "var(--color-text-primary)" }}>启动项管理</h1>
          <p className="mt-1 text-body-sm" style={{ color: "var(--color-text-tertiary)" }}>管理系统启动时自动运行的程序与服务</p>
        </div>
        <button className="p-1.5 rounded-md transition-colors" style={{ color: "var(--color-text-tertiary)" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "var(--color-surface-inset)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}>
          <Help size={18} theme="outline" />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded-lg" style={{ background: "var(--color-surface)", border: "1px solid var(--color-border-default)" }}>
          <span className="text-caption" style={{ color: "var(--color-text-tertiary)" }}>启动项总数</span>
          <p className="text-display" style={{ color: "var(--color-text-primary)" }}>{items.length}</p>
        </div>
        <div className="p-4 rounded-lg" style={{ background: "var(--color-surface)", border: "1px solid var(--color-border-default)" }}>
          <span className="text-caption" style={{ color: "var(--color-text-tertiary)" }}>已启用</span>
          <p className="text-display" style={{ color: "var(--color-safe)" }}>{enabledCount}</p>
        </div>
        <div className="p-4 rounded-lg" style={{ background: "var(--color-surface)", border: "1px solid var(--color-border-default)" }}>
          <span className="text-caption" style={{ color: "var(--color-text-tertiary)" }}>风险项</span>
          <p className="text-display" style={{ color: items.some((i) => i.safety === "risk") ? "var(--color-danger)" : "var(--color-text-primary)" }}>
            {items.filter((i) => i.safety === "risk").length}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        {items.map((item, idx) => (
          <div key={idx} className="p-4 rounded-lg" style={{
            background: item.safety === "risk" ? "var(--color-danger-subtle)" : "var(--color-surface)",
            border: `1px solid ${item.safety === "risk" ? "var(--color-danger)" : "var(--color-border-default)"}`,
            opacity: item.enabled ? 1 : 0.6,
          }}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>{item.name}</span>
                <Badge variant={SAFETY_BADGE[item.safety]}>{item.safety === "safe" ? "安全" : item.safety === "unknown" ? "未知" : "风险"}</Badge>
                <Badge variant={IMPACT_BADGE[item.impact]}>{item.impact === "low" ? "低影响" : item.impact === "medium" ? "中影响" : "高影响"}</Badge>
                {item.delayed && <Badge variant="info">延迟启动</Badge>}
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => toggleDelayed(idx)} className="p-1.5 rounded-md transition-colors"
                  style={{ color: item.delayed ? "var(--color-brand)" : "var(--color-text-tertiary)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "var(--color-surface-inset)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }} title="延迟启动">
                  <Timer size={16} theme="outline" />
                </button>
                <button onClick={() => toggleEnabled(idx)} className="p-1.5 rounded-md transition-colors"
                  style={{ color: item.enabled ? "var(--color-safe)" : "var(--color-text-tertiary)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "var(--color-surface-inset)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }} title={item.enabled ? "禁用" : "启用"}>
                  {item.enabled ? <Pause size={16} theme="outline" /> : <Play size={16} theme="outline" />}
                </button>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs" style={{ color: "var(--color-text-tertiary)" }}>
              <span>{item.publisher}</span>
              <span className="font-mono truncate">{item.command}</span>
            </div>
            <div className="text-xs mt-1" style={{ color: "var(--color-text-tertiary)" }}>来源: {item.source}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

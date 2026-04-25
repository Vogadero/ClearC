import { useState } from "react";
import { Ruler, Copy, TestTube, Help } from "@icon-park/react";
import Button from "@/components/common/Button";
import Badge from "@/components/common/Badge";

interface RuleItem { id: string; name: string; conditions: string; action: string; priority: number; enabled: boolean }

const BUILTIN_TEMPLATES = [
  { name: "清理下载目录中超过90天的安装包", desc: "Downloads目录 .exe/.msi/.zip 超过90天未访问" },
  { name: "压缩超过30天的日志文件", desc: "Logs目录中超过30天的.log文件压缩归档" },
  { name: "移动大视频文件到D盘", desc: "C盘超过1GB的视频文件移动到D盘对应目录" },
];

const MOCK_RULES: RuleItem[] = [
  { id: "r1", name: "清理npm旧缓存", conditions: "路径: npm-cache & 大小 > 500MB & 年龄 > 30天", action: "删除", priority: 1, enabled: true },
  { id: "r2", name: "归档旧日志", conditions: "路径: *.log & 年龄 > 30天", action: "压缩归档", priority: 2, enabled: true },
];

export default function RuleEngine() {
  const [rules, setRules] = useState(MOCK_RULES);
  const [activeTab, setActiveTab] = useState<"rules" | "templates">("rules");
  const [showTestResult, setShowTestResult] = useState(false);

  const toggleRule = (id: string) => {
    setRules((prev) => prev.map((r) => r.id === id ? { ...r, enabled: !r.enabled } : r));
  };

  return (
    <div className="max-w-[960px] mx-auto">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-h1" style={{ color: "var(--color-text-primary)" }}>存储规则引擎</h1>
          <p className="mt-1 text-body-sm" style={{ color: "var(--color-text-tertiary)" }}>自定义清理规则，实现个性化自动化存储管理</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-1.5 rounded-md transition-colors" style={{ color: "var(--color-text-tertiary)" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--color-surface-inset)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}>
            <Help size={18} theme="outline" />
          </button>
          <Button variant="primary" size="sm"><Ruler size={14} theme="outline" /> 新建规则</Button>
        </div>
      </div>

      <div className="flex gap-1 mb-4 p-1 rounded-lg" style={{ background: "var(--color-surface-inset)" }}>
        {[{ key: "rules" as const, label: "我的规则" }, { key: "templates" as const, label: "规则模板" }].map((tab) => (
          <button key={tab.key} className="flex-1 py-1.5 rounded-md text-sm transition-colors text-center"
            style={{ background: activeTab === tab.key ? "var(--color-surface)" : "transparent", color: activeTab === tab.key ? "var(--color-brand)" : "var(--color-text-secondary)", fontWeight: activeTab === tab.key ? 600 : 400 }}
            onClick={() => setActiveTab(tab.key)}>
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "rules" && (
        <div className="space-y-2">
          {rules.map((rule) => (
            <div key={rule.id} className="p-4 rounded-lg" style={{ background: "var(--color-surface)", border: "1px solid var(--color-border-default)", opacity: rule.enabled ? 1 : 0.6 }}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Ruler size={16} theme="outline" style={{ color: "var(--color-brand)" }} />
                  <span className="text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>{rule.name}</span>
                  <Badge variant={rule.enabled ? "safe" : "info"}>{rule.enabled ? "已启用" : "已禁用"}</Badge>
                  <Badge variant="info">优先级: {rule.priority}</Badge>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" onClick={() => setShowTestResult(!showTestResult)}>
                    <TestTube size={14} theme="outline" /> 测试
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => toggleRule(rule.id)}>
                    {rule.enabled ? "禁用" : "启用"}
                  </Button>
                </div>
              </div>
              <div className="text-xs space-y-1" style={{ color: "var(--color-text-tertiary)" }}>
                <p>条件: {rule.conditions}</p>
                <p>动作: {rule.action}</p>
              </div>
              {showTestResult && (
                <div className="mt-3 p-3 rounded" style={{ background: "var(--color-surface-inset)" }}>
                  <p className="text-xs" style={{ color: "var(--color-safe)" }}>Dry Run: 匹配 23 个文件，共计 1.2GB</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {activeTab === "templates" && (
        <div className="space-y-2">
          {BUILTIN_TEMPLATES.map((tpl, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 rounded-lg" style={{ background: "var(--color-surface)", border: "1px solid var(--color-border-default)" }}>
              <div className="flex items-center gap-3">
                <Copy size={20} theme="outline" style={{ color: "var(--color-brand)" }} />
                <div>
                  <p className="text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>{tpl.name}</p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--color-text-tertiary)" }}>{tpl.desc}</p>
                </div>
              </div>
              <Button variant="secondary" size="sm">应用</Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

import { useState } from "react";
import {
  FileQuestion, Bug, Lightning, Info,
  Down, Up, Search,
} from "@icon-park/react";
import Button from "@/components/common/Button";

interface FAQItem {
  category: string;
  items: { q: string; a: string }[];
}

const FAQ_DATA: FAQItem[] = [
  {
    category: "清理安全",
    items: [
      { q: "清理操作安全吗？会不会误删重要文件？", a: "ClearC 采用多重安全保护：系统关键目录受白名单保护；所有清理操作需用户确认；清理前自动创建备份，支持一键回滚恢复。" },
      { q: "清理浏览器缓存会影响我的登录状态吗？", a: "默认仅清理HTTP缓存和下载历史，不会删除Cookie。如果您勾选了Cookie清理项，支持白名单保留指定站点的登录状态。" },
      { q: "清理后软件运行异常怎么办？", a: "ClearC 支持清理回滚，您可以在「回滚中心」找到对应的备份记录，选择需要恢复的文件还原到原始位置。" },
    ],
  },
  {
    category: "空间分析",
    items: [
      { q: "扫描时间太长怎么办？", a: "一键清理使用快速扫描模式（约5秒）。完整扫描可能需要更长时间，您可以在扫描过程中随时取消。" },
      { q: "存储热力图显示的文件可以直接删除吗？", a: "热力图中的文件点击后可查看详情，但删除操作需要您明确确认，不会自动删除任何文件。" },
    ],
  },
  {
    category: "权限相关",
    items: [
      { q: "某些目录提示权限不足怎么办？", a: "部分系统目录（如Windows Update缓存）需要管理员权限才能清理。ClearC 会在需要时提示您授权。" },
      { q: "为什么需要管理员权限？", a: "清理系统临时文件、Windows Update缓存等操作需要访问受系统保护的目录，这些目录需要管理员权限才能操作。" },
    ],
  },
  {
    category: "监控预警",
    items: [
      { q: "托盘图标不显示怎么办？", a: "请检查Windows任务栏设置，确保允许显示系统托盘图标。ClearC 在设置中可以配置托盘显示选项。" },
      { q: "实时监控会影响电脑性能吗？", a: "ClearC 的监控模块仅监控关键目录的文件变更事件，资源占用极低（空闲时约50MB内存），不会影响正常使用。" },
    ],
  },
];

const TROUBLESHOOT = [
  {
    title: "清理失败",
    steps: ["检查目标文件是否被其他程序占用，尝试关闭相关应用后重试", "确认是否拥有管理员权限，部分系统文件需要提权", "查看清理日志了解具体失败原因"],
  },
  {
    title: "扫描无结果",
    steps: ["确认扫描目录配置正确，检查排除规则是否过于严格", "部分系统目录需要管理员权限才能扫描", "尝试切换扫描模式（快速/标准/精确）"],
  },
  {
    title: "权限不足",
    steps: ["以管理员身份运行 ClearC", "检查Windows用户账户控制(UAC)设置", "确认当前用户是否具有文件系统访问权限"],
  },
  {
    title: "托盘图标不显示",
    steps: ["检查Windows任务栏设置 -> 系统托盘图标 -> 开启ClearC", "重启ClearC应用", "检查是否有安全软件阻止托盘功能"],
  },
];

export default function HelpCenter() {
  const [activeTab, setActiveTab] = useState<"faq" | "troubleshoot" | "shortcuts" | "about">("faq");
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const tabs = [
    { id: "faq" as const, label: "常见问题", icon: FileQuestion },
    { id: "troubleshoot" as const, label: "问题排查", icon: Bug },
    { id: "shortcuts" as const, label: "快捷操作", icon: Lightning },
    { id: "about" as const, label: "关于", icon: Info },
  ];

  const filteredFaq = searchQuery
    ? FAQ_DATA.map((cat) => ({
        ...cat,
        items: cat.items.filter(
          (item) => item.q.includes(searchQuery) || item.a.includes(searchQuery)
        ),
      })).filter((cat) => cat.items.length > 0)
    : FAQ_DATA;

  return (
    <div className="max-w-[960px] mx-auto">
      <div className="mb-6">
        <h1 className="text-h1" style={{ color: "var(--color-text-primary)" }}>
          帮助中心
        </h1>
        <p className="mt-1 text-body-sm" style={{ color: "var(--color-text-tertiary)" }}>
          使用帮助、常见问题与问题排查
        </p>
      </div>

      {/* Tab navigation */}
      <div
        className="flex gap-1 mb-6 p-1 rounded-lg"
        style={{ background: "var(--color-surface-inset)" }}
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-colors flex-1 justify-center"
              style={{
                background: activeTab === tab.id ? "var(--color-surface)" : "transparent",
                color: activeTab === tab.id ? "var(--color-brand)" : "var(--color-text-secondary)",
                fontWeight: activeTab === tab.id ? 600 : 400,
                boxShadow: activeTab === tab.id ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
              }}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon size={16} theme="outline" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* FAQ Tab */}
      {activeTab === "faq" && (
        <div>
          {/* Search */}
          <div className="relative mb-4">
            <Search
              size={16}
              theme="outline"
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: "var(--color-text-tertiary)" }}
            />
            <input
              type="text"
              placeholder="搜索常见问题..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-8 pl-9 pr-3 rounded-md text-sm outline-none transition-colors"
              style={{
                background: "var(--color-surface-inset)",
                border: "1px solid var(--color-border-default)",
                color: "var(--color-text-primary)",
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = "var(--color-brand)"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "var(--color-border-default)"; }}
            />
          </div>

          {/* FAQ categories */}
          <div className="space-y-4">
            {filteredFaq.map((category) => (
              <div key={category.category}>
                <h3 className="text-h3 mb-2" style={{ color: "var(--color-text-primary)" }}>
                  {category.category}
                </h3>
                <div className="space-y-1">
                  {category.items.map((item, idx) => {
                    const key = `${category.category}-${idx}`;
                    const expanded = expandedFaq === key;
                    return (
                      <div
                        key={key}
                        className="rounded-lg overflow-hidden"
                        style={{ border: "1px solid var(--color-border-default)" }}
                      >
                        <button
                          className="w-full flex items-center justify-between p-3 text-left"
                          style={{ background: "var(--color-surface)" }}
                          onClick={() => setExpandedFaq(expanded ? null : key)}
                        >
                          <span className="text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>
                            {item.q}
                          </span>
                          {expanded ? (
                            <Up size={14} theme="outline" style={{ color: "var(--color-text-tertiary)" }} />
                          ) : (
                            <Down size={14} theme="outline" style={{ color: "var(--color-text-tertiary)" }} />
                          )}
                        </button>
                        {expanded && (
                          <div className="p-3" style={{ background: "var(--color-surface-inset)" }}>
                            <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                              {item.a}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Troubleshoot Tab */}
      {activeTab === "troubleshoot" && (
        <div className="space-y-4">
          {TROUBLESHOOT.map((item) => (
            <div
              key={item.title}
              className="p-4 rounded-lg"
              style={{ background: "var(--color-surface)", border: "1px solid var(--color-border-default)" }}
            >
              <h3 className="text-h3 mb-3" style={{ color: "var(--color-text-primary)" }}>
                {item.title}
              </h3>
              <ol className="space-y-2">
                {item.steps.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center text-xs text-white shrink-0 mt-0.5"
                      style={{ background: "var(--color-brand)" }}
                    >
                      {idx + 1}
                    </span>
                    <span className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      )}

      {/* Shortcuts Tab */}
      {activeTab === "shortcuts" && (
        <div className="space-y-2">
          {[
            { label: "重新触发新手指南", desc: "重新查看ClearC的功能介绍和配置向导", action: "restart_onboarding" },
            { label: "重置所有设置", desc: "将所有配置恢复为默认值", action: "reset_settings" },
            { label: "打开日志目录", desc: "在资源管理器中打开ClearC日志文件目录", action: "open_logs" },
            { label: "导出诊断信息", desc: "导出系统信息、应用配置和最近日志", action: "export_diag" },
          ].map((item) => (
            <div
              key={item.action}
              className="flex items-center justify-between p-3 rounded-lg"
              style={{ background: "var(--color-surface)", border: "1px solid var(--color-border-default)" }}
            >
              <div>
                <p className="text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>
                  {item.label}
                </p>
                <p className="text-xs mt-0.5" style={{ color: "var(--color-text-tertiary)" }}>
                  {item.desc}
                </p>
              </div>
              <Button variant="ghost" size="sm">执行</Button>
            </div>
          ))}
        </div>
      )}

      {/* About Tab */}
      {activeTab === "about" && (
        <div
          className="p-6 rounded-lg text-center"
          style={{ background: "var(--color-surface)", border: "1px solid var(--color-border-default)" }}
        >
          <h2
            className="text-display mb-1"
            style={{ color: "var(--color-brand)" }}
          >
            ClearC
          </h2>
          <p className="text-sm mb-4" style={{ color: "var(--color-text-secondary)" }}>
            版本 0.1.0
          </p>
          <p className="text-body-sm mb-4" style={{ color: "var(--color-text-tertiary)" }}>
            一款基于 Tauri 框架的 Windows C盘智能清理工具
          </p>
          <div className="space-y-1 text-xs" style={{ color: "var(--color-text-tertiary)" }}>
            <p>图标库: ByteDance IconPark (@icon-park/react)</p>
            <p>设计规范: DESIGN.md (awesome-design-md 格式)</p>
            <p>前端: React + TypeScript + TailwindCSS</p>
            <p>后端: Rust + Tauri</p>
          </div>
        </div>
      )}
    </div>
  );
}

import { useState } from "react";
import { Right, Left, Shield, Setting, Logout } from "@icon-park/react";
import Button from "@/components/common/Button";
import { useConfigStore } from "@/stores/configStore";

type Step = "welcome" | "feature-1" | "feature-2" | "feature-3" | "safety" | "config";

const STEPS: Step[] = ["welcome", "feature-1", "feature-2", "feature-3", "safety", "config"];

const FEATURE_DATA: Record<string, { title: string; desc: string; details: string[] }> = {
  "feature-1": {
    title: "智能清理",
    desc: "一键扫描C盘，智能识别可清理项目",
    details: [
      "自动扫描临时文件、缓存、日志等系统垃圾",
      "按安全等级分类：绿色可安全清理、黄色建议确认、红色谨慎操作",
      "清理前展示预估释放空间，清理后生成详细报告",
    ],
  },
  "feature-2": {
    title: "空间分析",
    desc: "可视化C盘空间占用，精准定位大文件",
    details: [
      "存储热力图：Treemap可视化，直观看到空间流向",
      "大文件分析器：快速找出占用空间最大的文件",
      "重复文件检测：三种扫描策略，智能推荐保留文件",
    ],
  },
  "feature-3": {
    title: "实时监控",
    desc: "后台监控C盘变化，异常写入及时预警",
    details: [
      "实时监控C盘空间变化，大文件写入自动提醒",
      "追踪写入源进程，定位空间增长根源",
      "系统托盘驻留，随时掌握磁盘状态",
    ],
  },
};

type CleanPreference = "conservative" | "standard" | "deep";
type Theme = "light" | "dark" | "system";

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState<Step>("welcome");
  const [cleanPreference, setCleanPreference] = useState<CleanPreference>("standard");
  const [theme, setTheme] = useState<Theme>("system");
  const { setCleanPreference: savePreference, setTheme: saveTheme, setInitialized, setAutoBackup } = useConfigStore();
  const [autoBackup, setAutoBackupState] = useState(true);

  const stepIndex = STEPS.indexOf(currentStep);

  const goNext = () => {
    const next = STEPS[stepIndex + 1];
    if (next) setCurrentStep(next);
  };

  const goPrev = () => {
    const prev = STEPS[stepIndex - 1];
    if (prev) setCurrentStep(prev);
  };

  const handleFinish = () => {
    savePreference(cleanPreference);
    saveTheme(theme);
    setAutoBackup(autoBackup);
    setInitialized(true);
  };

  const handleSkip = () => {
    setInitialized(true);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center" style={{ background: "var(--color-canvas)" }}>
      <div
        className="w-full max-w-lg rounded-xl p-8"
        style={{ background: "var(--color-surface)", border: "1px solid var(--color-border-default)" }}
      >
        {/* Step indicator */}
        <div className="flex items-center justify-center gap-1.5 mb-8">
          {STEPS.map((step, idx) => (
            <div key={step} className="flex items-center">
              <div
                className="w-2 h-2 rounded-full transition-colors"
                style={{
                  background: idx === stepIndex ? "var(--color-brand)" : idx < stepIndex ? "var(--color-brand)" : "var(--color-border-default)",
                }}
              />
              {idx < STEPS.length - 1 && (
                <div
                  className="w-4 h-0.5"
                  style={{ background: idx < stepIndex ? "var(--color-brand)" : "var(--color-border-default)" }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Welcome step */}
        {currentStep === "welcome" && (
          <div className="text-center">
            <h1
              className="text-display mb-2"
              style={{ color: "var(--color-brand)" }}
            >
              ClearC
            </h1>
            <p className="text-h2 mb-2" style={{ color: "var(--color-text-primary)" }}>
              让C盘空间尽在掌握
            </p>
            <p className="text-body-sm mb-8" style={{ color: "var(--color-text-tertiary)" }}>
              ClearC 是一款专业的 Windows C盘清理工具，提供智能清理、空间分析和实时监控三大核心能力。
            </p>
          </div>
        )}

        {/* Feature steps */}
        {currentStep.startsWith("feature-") && (
          <div>
            <h2 className="text-h1 mb-2" style={{ color: "var(--color-text-primary)" }}>
              {FEATURE_DATA[currentStep]?.title}
            </h2>
            <p className="text-body-sm mb-4" style={{ color: "var(--color-text-tertiary)" }}>
              {FEATURE_DATA[currentStep]?.desc}
            </p>
            <div className="space-y-3">
              {FEATURE_DATA[currentStep]?.details.map((detail, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-lg"
                  style={{ background: "var(--color-brand-subtle)" }}
                >
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-xs text-white font-medium mt-0.5"
                    style={{ background: "var(--color-brand)" }}
                  >
                    {idx + 1}
                  </div>
                  <span className="text-sm" style={{ color: "var(--color-text-primary)" }}>
                    {detail}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Safety step */}
        {currentStep === "safety" && (
          <div>
            <h2 className="text-h1 mb-2" style={{ color: "var(--color-text-primary)" }}>
              安全承诺
            </h2>
            <p className="text-body-sm mb-4" style={{ color: "var(--color-text-tertiary)" }}>
              ClearC 将安全放在首位，多重保护确保清理无忧
            </p>
            <div className="space-y-3 mb-6">
              {[
                { icon: <Shield size={20} theme="outline" />, title: "白名单保护", desc: "系统关键目录受白名单保护，不会被扫描或清理" },
                { icon: <Shield size={20} theme="outline" />, title: "清理前备份", desc: "所有清理操作前自动创建备份，支持一键回滚" },
                { icon: <Shield size={20} theme="outline" />, title: "清理前确认", desc: "不会自动删除任何文件，每次清理都需您确认" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-lg" style={{ background: "var(--color-safe-subtle)" }}>
                  <span style={{ color: "var(--color-safe)" }}>{item.icon}</span>
                  <div>
                    <p className="text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>{item.title}</p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--color-text-secondary)" }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={autoBackup}
                onChange={(e) => setAutoBackupState(e.target.checked)}
                className="accent-[var(--color-brand)]"
              />
              <span className="text-sm" style={{ color: "var(--color-text-primary)" }}>
                清理前自动备份（推荐）
              </span>
            </label>
          </div>
        )}

        {/* Config step */}
        {currentStep === "config" && (
          <div>
            <h2 className="text-h1 mb-2" style={{ color: "var(--color-text-primary)" }}>
              初始配置
            </h2>
            <p className="text-body-sm mb-4" style={{ color: "var(--color-text-tertiary)" }}>
              选择您的偏好设置，可随时在设置中修改
            </p>

            <div className="space-y-5">
              {/* Theme */}
              <div>
                <label className="text-h3 mb-2 block" style={{ color: "var(--color-text-primary)" }}>
                  <Setting size={16} theme="outline" className="inline mr-1" />
                  外观主题
                </label>
                <div className="flex gap-2">
                  {([
                    { value: "light" as Theme, label: "浅色" },
                    { value: "dark" as Theme, label: "深色" },
                    { value: "system" as Theme, label: "跟随系统" },
                  ]).map((opt) => (
                    <button
                      key={opt.value}
                      className="flex-1 h-9 rounded-md text-sm transition-colors"
                      style={{
                        background: theme === opt.value ? "var(--color-brand-subtle)" : "var(--color-surface-inset)",
                        color: theme === opt.value ? "var(--color-brand)" : "var(--color-text-secondary)",
                        border: theme === opt.value ? "1px solid var(--color-brand)" : "1px solid transparent",
                        fontWeight: theme === opt.value ? 600 : 400,
                      }}
                      onClick={() => setTheme(opt.value)}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clean preference */}
              <div>
                <label className="text-h3 mb-2 block" style={{ color: "var(--color-text-primary)" }}>
                  <Setting size={16} theme="outline" className="inline mr-1" />
                  清理偏好
                </label>
                <div className="space-y-2">
                  {([
                    { value: "conservative" as CleanPreference, label: "保守模式", desc: "仅清理绝对安全的文件" },
                    { value: "standard" as CleanPreference, label: "标准模式", desc: "推荐设置，安全与效果兼顾" },
                    { value: "deep" as CleanPreference, label: "深度模式", desc: "深度清理，部分操作需谨慎确认" },
                  ]).map((opt) => (
                    <button
                      key={opt.value}
                      className="w-full text-left p-3 rounded-lg transition-colors"
                      style={{
                        background: cleanPreference === opt.value ? "var(--color-brand-subtle)" : "var(--color-surface-inset)",
                        border: cleanPreference === opt.value ? "1px solid var(--color-brand)" : "1px solid transparent",
                      }}
                      onClick={() => setCleanPreference(opt.value)}
                    >
                      <span
                        className="text-sm font-medium block"
                        style={{ color: cleanPreference === opt.value ? "var(--color-brand)" : "var(--color-text-primary)" }}
                      >
                        {opt.label}
                      </span>
                      <span className="text-xs" style={{ color: "var(--color-text-tertiary)" }}>
                        {opt.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          <div>
            {currentStep !== "welcome" && (
              <Button variant="ghost" onClick={goPrev}>
                <Left size={14} theme="outline" />
                <span className="ml-1">上一步</span>
              </Button>
            )}
          </div>
          <div className="flex items-center gap-2">
            {currentStep !== "config" && (
              <button
                className="text-xs transition-colors"
                style={{ color: "var(--color-text-tertiary)" }}
                onClick={handleSkip}
                onMouseEnter={(e) => { e.currentTarget.style.color = "var(--color-text-secondary)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "var(--color-text-tertiary)"; }}
              >
                <Logout size={12} theme="outline" className="inline mr-0.5" />
                跳过引导
              </button>
            )}
            {currentStep === "config" ? (
              <Button variant="primary" onClick={handleFinish}>
                完成配置
              </Button>
            ) : (
              <Button variant="primary" onClick={goNext}>
                <span className="mr-1">下一步</span>
                <Right size={14} theme="outline" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

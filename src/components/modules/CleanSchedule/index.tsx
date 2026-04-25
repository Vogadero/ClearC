import { useState } from "react";
import { Time, Add, Play, History, Help } from "@icon-park/react";
import Button from "@/components/common/Button";
import Badge from "@/components/common/Badge";

interface ScheduleItem { id: string; name: string; frequency: string; modules: string[]; condition: string; enabled: boolean; lastRun: string | null }

const MOCK_SCHEDULES: ScheduleItem[] = [
  { id: "1", name: "每日系统垃圾清理", frequency: "每日 03:00", modules: ["系统垃圾", "缩略图缓存"], condition: "可清理 > 500MB", enabled: true, lastRun: "2026-04-25 03:00" },
  { id: "2", name: "每周应用缓存清理", frequency: "每周日 02:00", modules: ["浏览器缓存", "开发工具缓存"], condition: "可清理 > 1GB", enabled: true, lastRun: "2026-04-20 02:00" },
  { id: "3", name: "每月深度清理", frequency: "每月1日 01:00", modules: ["全模块"], condition: "无", enabled: false, lastRun: null },
];

export default function CleanSchedule() {
  const [schedules, setSchedules] = useState(MOCK_SCHEDULES);

  const toggleEnabled = (id: string) => {
    setSchedules((prev) => prev.map((s) => s.id === id ? { ...s, enabled: !s.enabled } : s));
  };

  return (
    <div className="max-w-[960px] mx-auto">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-h1" style={{ color: "var(--color-text-primary)" }}>定时清理计划</h1>
          <p className="mt-1 text-body-sm" style={{ color: "var(--color-text-tertiary)" }}>设置定时自动清理任务，无需手动操作</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-1.5 rounded-md transition-colors" style={{ color: "var(--color-text-tertiary)" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--color-surface-inset)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}>
            <Help size={18} theme="outline" />
          </button>
          <Button variant="primary" size="sm"><Add size={14} theme="outline" /> 新建计划</Button>
        </div>
      </div>

      {schedules.length === 0 ? (
        <div className="text-center py-16">
          <Time size={64} theme="outline" style={{ color: "var(--color-text-tertiary)" }} />
          <h3 className="text-h3 mt-3" style={{ color: "var(--color-text-primary)" }}>暂无清理计划</h3>
          <p className="text-body-sm mt-1" style={{ color: "var(--color-text-tertiary)" }}>创建定时计划自动清理C盘</p>
        </div>
      ) : (
        <div className="space-y-2">
          {schedules.map((schedule) => (
            <div key={schedule.id} className="p-4 rounded-lg" style={{
              background: "var(--color-surface)", border: "1px solid var(--color-border-default)",
              opacity: schedule.enabled ? 1 : 0.6,
            }}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>{schedule.name}</span>
                  <Badge variant={schedule.enabled ? "safe" : "info"}>{schedule.enabled ? "已启用" : "已暂停"}</Badge>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" onClick={() => toggleEnabled(schedule.id)}>
                    {schedule.enabled ? "暂停" : "启用"}
                  </Button>
                  <Button variant="ghost" size="sm">编辑</Button>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs" style={{ color: "var(--color-text-tertiary)" }}>
                <span><Play size={12} theme="outline" className="inline mr-0.5" />{schedule.frequency}</span>
                <span>模块: {schedule.modules.join(", ")}</span>
                {schedule.condition !== "无" && <span>条件: {schedule.condition}</span>}
              </div>
              {schedule.lastRun && (
                <div className="text-xs mt-1" style={{ color: "var(--color-text-tertiary)" }}>
                  <History size={12} theme="outline" className="inline mr-0.5" />上次执行: {schedule.lastRun}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

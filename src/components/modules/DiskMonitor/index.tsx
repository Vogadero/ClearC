import { useState } from "react";
import { Monitor, Target, Remind, Help } from "@icon-park/react";
import { formatBytes } from "@/utils/format";
import Button from "@/components/common/Button";
import Badge from "@/components/common/Badge";
import StatsCard from "@/components/common/StatsCard";

interface WriteEvent { time: string; process: string; pid: number; path: string; rate: number }
interface Notification { id: string; type: "space_low" | "large_write" | "growth" | "clean_done"; message: string; time: string; read: boolean }

const MOCK_EVENTS: WriteEvent[] = [
  { time: "14:32:15", process: "chrome.exe", pid: 1234, path: "C:\\Users\\Admin\\AppData\\Local\\Google\\Chrome\\...", rate: 150_000_000 },
  { time: "14:28:03", process: "WeChat.exe", pid: 5678, path: "C:\\Users\\Admin\\Documents\\WeChat Files\\...", rate: 80_000_000 },
  { time: "13:15:42", process: "steam.exe", pid: 9012, path: "C:\\Program Files\\Steam\\...", rate: 500_000_000 },
  { time: "12:45:18", process: "Windows Update", pid: 3456, path: "C:\\Windows\\SoftwareDistribution\\...", rate: 320_000_000 },
];

const MOCK_NOTIFICATIONS: Notification[] = [
  { id: "n1", type: "large_write", message: "steam.exe 写入 500MB 数据到 Steam目录", time: "13:15", read: false },
  { id: "n2", type: "space_low", message: "C盘剩余空间低于 80GB", time: "12:00", read: false },
  { id: "n3", type: "clean_done", message: "定时清理完成，释放 3.2GB", time: "03:01", read: true },
];

const NOTIF_BADGE: Record<string, "safe" | "warn" | "danger" | "info"> = { space_low: "danger", large_write: "warn", growth: "warn", clean_done: "safe" };

export default function DiskMonitor() {
  const [monitoring, setMonitoring] = useState(true);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="max-w-[960px] mx-auto">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-h1" style={{ color: "var(--color-text-primary)" }}>实时磁盘监控</h1>
          <p className="mt-1 text-body-sm" style={{ color: "var(--color-text-tertiary)" }}>实时监控C盘空间变化，异常写入及时提醒</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-1.5 rounded-md transition-colors" style={{ color: "var(--color-text-tertiary)" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--color-surface-inset)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}>
            <Help size={18} theme="outline" />
          </button>
          <Button variant={monitoring ? "ghost" : "primary"} size="sm" onClick={() => setMonitoring(!monitoring)}>
            <Monitor size={14} theme="outline" /> {monitoring ? "暂停监控" : "开始监控"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <StatsCard label="C盘剩余" value={76_000_000_000} format="bytes" variant="safe" icon={<Monitor size={20} theme="outline" />} />
        <StatsCard label="监控状态" value={monitoring ? 1 : 0} format="number" variant={monitoring ? "safe" : "warn"} />
        <div className="p-4 rounded-lg" style={{ background: "var(--color-surface)", border: "1px solid var(--color-border-default)" }}>
          <span className="text-caption" style={{ color: "var(--color-text-tertiary)" }}>未读通知</span>
          <p className="text-display" style={{ color: unreadCount > 0 ? "var(--color-warn)" : "var(--color-text-primary)" }}>{unreadCount}</p>
        </div>
      </div>

      {/* Real-time chart placeholder */}
      <div className="p-6 rounded-lg mb-6" style={{ background: "var(--color-surface)", border: "1px solid var(--color-border-default)" }}>
        <h3 className="text-h3 mb-4" style={{ color: "var(--color-text-primary)" }}>C盘空间变化</h3>
        <div className="h-32 flex items-end gap-0.5">
          {[76, 76, 75, 75, 74, 74, 73, 73, 73, 72, 72, 71, 70, 68, 66, 64, 64, 63, 62, 60].map((val, i) => (
            <div key={i} className="flex-1 rounded-t" style={{ height: `${(val / 76) * 100}%`, background: val > 70 ? "var(--color-brand)" : val > 60 ? "var(--color-warn)" : "var(--color-danger)", minHeight: 2 }} />
          ))}
        </div>
        <p className="text-xs mt-2" style={{ color: "var(--color-text-tertiary)" }}>近2小时空间变化趋势</p>
      </div>

      {/* Write events */}
      <div className="mb-6">
        <h3 className="text-h3 mb-3" style={{ color: "var(--color-text-primary)" }}>
          <Target size={16} theme="outline" className="inline mr-1" />写入源追踪
        </h3>
        <div className="space-y-1">
          {MOCK_EVENTS.map((event, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 rounded-lg" style={{ background: "var(--color-surface)", border: "1px solid var(--color-border-default)" }}>
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono" style={{ color: "var(--color-text-tertiary)" }}>{event.time}</span>
                <div>
                  <span className="text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>{event.process}</span>
                  <span className="text-xs ml-1" style={{ color: "var(--color-text-tertiary)" }}>PID: {event.pid}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono truncate max-w-48" style={{ color: "var(--color-text-tertiary)" }}>{event.path}</span>
                <Badge variant={event.rate > 500_000_000 ? "danger" : event.rate > 100_000_000 ? "warn" : "info"}>
                  {formatBytes(event.rate)}/s
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notifications */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-h3" style={{ color: "var(--color-text-primary)" }}>
            <Remind size={16} theme="outline" className="inline mr-1" />通知中心
          </h3>
          {unreadCount > 0 && <Button variant="ghost" size="sm" onClick={markAllRead}>全部已读</Button>}
        </div>
        <div className="space-y-1">
          {notifications.map((notif) => (
            <div key={notif.id} className="flex items-center justify-between p-3 rounded-lg" style={{
              background: notif.read ? "var(--color-surface)" : "var(--color-brand-subtle)",
              border: `1px solid ${notif.read ? "var(--color-border-default)" : "var(--color-brand)"}`,
            }}>
              <div className="flex items-center gap-2">
                <Badge variant={NOTIF_BADGE[notif.type]}>{notif.type === "space_low" ? "空间不足" : notif.type === "large_write" ? "大量写入" : notif.type === "growth" ? "持续增长" : "清理完成"}</Badge>
                <span className="text-sm" style={{ color: "var(--color-text-primary)" }}>{notif.message}</span>
              </div>
              <span className="text-xs shrink-0" style={{ color: "var(--color-text-tertiary)" }}>{notif.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

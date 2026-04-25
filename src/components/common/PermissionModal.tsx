import { useState } from "react";
import { Shield, Info } from "@icon-park/react";
import Button from "@/components/common/Button";

interface PermissionModalProps {
  title: string;
  description: string;
  requiresAdmin: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function PermissionModal({ title, description, requiresAdmin, onConfirm, onCancel }: PermissionModalProps) {
  const [dontShowAgain, setDontShowAgain] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="w-full max-w-md mx-4 rounded-xl overflow-hidden" style={{ background: "var(--color-surface)", border: "1px solid var(--color-border-default)", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: requiresAdmin ? "var(--color-danger-subtle)" : "var(--color-warn-subtle)" }}>
              <Shield size={20} theme="outline" style={{ color: requiresAdmin ? "var(--color-danger)" : "var(--color-warn)" }} />
            </div>
            <h2 className="text-h3" style={{ color: "var(--color-text-primary)" }}>{title}</h2>
          </div>

          <p className="text-sm mb-4" style={{ color: "var(--color-text-secondary)" }}>{description}</p>

          {requiresAdmin && (
            <div className="flex items-start gap-2 p-3 rounded-lg mb-4" style={{ background: "var(--color-danger-subtle)", border: "1px solid var(--color-danger)" }}>
              <Info size={16} theme="outline" style={{ color: "var(--color-danger)", marginTop: 2 }} />
              <div>
                <p className="text-sm font-medium" style={{ color: "var(--color-danger)" }}>需要管理员权限</p>
                <p className="text-xs mt-0.5" style={{ color: "var(--color-text-tertiary)" }}>此操作需要以管理员身份运行，系统将弹出 UAC 提权提示</p>
              </div>
            </div>
          )}

          <label className="flex items-center gap-2 mb-4 cursor-pointer">
            <input type="checkbox" checked={dontShowAgain} onChange={(e) => setDontShowAgain(e.target.checked)} className="accent-[var(--color-brand)]" />
            <span className="text-xs" style={{ color: "var(--color-text-tertiary)" }}>不再提示此操作</span>
          </label>
        </div>

        <div className="flex justify-end gap-2 px-6 py-4" style={{ borderTop: "1px solid var(--color-border-default)", background: "var(--color-surface-inset)" }}>
          <Button variant="ghost" onClick={onCancel}>取消</Button>
          <Button variant={requiresAdmin ? "danger" : "primary"} onClick={onConfirm}>
            {requiresAdmin ? "以管理员身份继续" : "确认执行"}
          </Button>
        </div>
      </div>
    </div>
  );
}

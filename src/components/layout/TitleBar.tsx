import { Minus, Square, Close } from "@icon-park/react";

async function getTauriWindow() {
  try {
    const { getCurrentWindow } = await import("@tauri-apps/api/window");
    return getCurrentWindow();
  } catch {
    return null;
  }
}

export default function TitleBar() {
  const handleMinimize = async () => {
    const win = await getTauriWindow();
    if (win) win.minimize();
  };
  const handleMaximize = async () => {
    const win = await getTauriWindow();
    if (win) win.toggleMaximize();
  };
  const handleClose = async () => {
    const win = await getTauriWindow();
    if (win) {
      // Close is intercepted by Rust side to hide to tray instead
      win.close();
    }
  };

  return (
    <div
      className="flex items-center justify-between h-9 px-4 select-none"
      style={{ background: "var(--color-surface)", borderBottom: "1px solid var(--color-border-subtle)" }}
      data-tauri-drag-region
    >
      <div className="flex items-center gap-2" data-tauri-drag-region>
        <span
          className="text-sm font-semibold"
          style={{ color: "var(--color-brand)" }}
        >
          ClearC
        </span>
        <span className="text-caption" style={{ color: "var(--color-text-tertiary)" }}>
          C盘智能清理工具
        </span>
      </div>
      <div className="flex items-center gap-0.5">
        <button
          onClick={handleMinimize}
          className="flex items-center justify-center w-10 h-9 rounded-none transition-colors hover:bg-[var(--color-surface-inset)]"
          style={{ color: "var(--color-text-secondary)" }}
        >
          <Minus size={16} />
        </button>
        <button
          onClick={handleMaximize}
          className="flex items-center justify-center w-10 h-9 rounded-none transition-colors hover:bg-[var(--color-surface-inset)]"
          style={{ color: "var(--color-text-secondary)" }}
        >
          <Square size={14} />
        </button>
        <button
          onClick={handleClose}
          className="flex items-center justify-center w-10 h-9 rounded-none transition-colors hover:bg-[var(--color-danger)] hover:text-white"
          style={{ color: "var(--color-text-secondary)" }}
        >
          <Close size={16} />
        </button>
      </div>
    </div>
  );
}

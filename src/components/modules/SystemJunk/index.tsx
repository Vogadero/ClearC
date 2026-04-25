import { useState, useCallback } from "react";
import { Delete, FolderLock, Download, Log, PictureOne, DeleteFour, Report, Text, Send, Help } from "@icon-park/react";
import { useScan } from "@/hooks/useScan";
import { formatBytes } from "@/utils/format";
import type { ScanItem } from "@/utils/constants";
import Button from "@/components/common/Button";
import ScanProgress from "@/components/common/ScanProgress";
import StatsCard from "@/components/common/StatsCard";
import EmptyState from "@/components/common/EmptyState";

const JUNK_CATEGORIES = [
  { key: "temp", label: "Windows 临时文件", icon: FolderLock, paths: ["%TEMP%", "C:\\Windows\\Temp"] },
  { key: "update", label: "Windows Update 缓存", icon: Download, paths: ["C:\\Windows\\SoftwareDistribution\\Download"] },
  { key: "logs", label: "系统日志文件", icon: Log, paths: ["C:\\Windows\\Logs", "C:\\Windows\\System32\\winevt\\Logs"] },
  { key: "thumbs", label: "缩略图缓存", icon: PictureOne, paths: ["%LOCALAPPDATA%\\Microsoft\\Windows\\Explorer\\thumbcache_*"] },
  { key: "recycle", label: "回收站", icon: DeleteFour, paths: ["回收站"] },
  { key: "wer", label: "Windows 错误报告", icon: Report, paths: ["%LOCALAPPDATA%\\Microsoft\\Windows\\WER"] },
  { key: "fonts", label: "字体缓存", icon: Text, paths: ["C:\\Windows\\ServiceProfiles\\LocalService\\AppData\\Local\\FontCache"] },
  { key: "delivery", label: "传递优化文件", icon: Send, paths: ["C:\\Windows\\SoftwareDistribution\\DeliveryOptimization"] },
];

const MOCK_DATA: ScanItem[] = [
  { path: "%TEMP%", size: 2_450_000_000, category: "临时文件", risk_level: "safe", description: "用户临时目录" },
  { path: "C:\\Windows\\Temp", size: 1_230_000_000, category: "系统临时文件", risk_level: "safe", description: "系统临时目录" },
  { path: "C:\\Windows\\SoftwareDistribution\\Download", size: 3_200_000_000, category: "更新缓存", risk_level: "safe", description: "Windows Update下载缓存" },
  { path: "C:\\Windows\\Logs", size: 560_000_000, category: "系统日志", risk_level: "safe", description: "系统日志目录" },
  { path: "%LOCALAPPDATA%\\...\\thumbcache_*", size: 890_000_000, category: "缩略图缓存", risk_level: "safe", description: "资源管理器缩略图" },
  { path: "回收站", size: 1_800_000_000, category: "回收站", risk_level: "warning", description: "已删除文件暂存" },
  { path: "%LOCALAPPDATA%\\Microsoft\\Windows\\WER", size: 340_000_000, category: "错误报告", risk_level: "safe", description: "Windows错误报告" },
  { path: "FontCache", size: 120_000_000, category: "字体缓存", risk_level: "safe", description: "系统字体缓存" },
  { path: "DeliveryOptimization", size: 450_000_000, category: "传递优化", risk_level: "safe", description: "更新传递优化缓存" },
];

export default function SystemJunk() {
  const { scanning, progress, currentPath, scannedFiles, elapsedMs, startScan, cancelScan } = useScan("system_junk");
  const [items, setItems] = useState<ScanItem[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());

  const handleScan = useCallback(async () => {
    setSelectedKeys(new Set());
    setItems([]);
    await startScan();
    setItems(MOCK_DATA);
  }, [startScan]);

  const totalSize = items.reduce((s, i) => s + i.size, 0);
  const selectedSize = items.filter((i) => selectedKeys.has(i.path)).reduce((s, i) => s + i.size, 0);

  const toggleSelect = (key: string) => {
    setSelectedKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key); else next.add(key);
      return next;
    });
  };

  return (
    <div className="max-w-[960px] mx-auto">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-h1" style={{ color: "var(--color-text-primary)" }}>系统垃圾清理</h1>
          <p className="mt-1 text-body-sm" style={{ color: "var(--color-text-tertiary)" }}>扫描并清理 Windows 系统产生的各类临时文件与无用数据</p>
        </div>
        <button className="p-1.5 rounded-md transition-colors" style={{ color: "var(--color-text-tertiary)" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "var(--color-surface-inset)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }} title="帮助">
          <Help size={18} theme="outline" />
        </button>
      </div>

      {scanning && <div className="mb-6"><ScanProgress progress={progress} currentPath={currentPath} scannedFiles={scannedFiles} elapsedMs={elapsedMs} onCancel={cancelScan} /></div>}

      {!scanning && items.length === 0 && (
        <EmptyState icon={<Delete size={64} theme="outline" />} title="扫描系统垃圾" description="点击按钮扫描8类系统垃圾文件"
          action={<Button variant="primary" onClick={handleScan}>开始扫描</Button>} />
      )}

      {!scanning && items.length > 0 && (
        <>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <StatsCard label="可清理项目" value={items.length} format="number" />
            <StatsCard label="总计大小" value={totalSize} format="bytes" />
            <StatsCard label="已选择" value={selectedSize} format="bytes" variant={selectedSize > 0 ? "safe" : "default"} />
          </div>

          <div className="space-y-2 mb-6">
            {JUNK_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const catItems = items.filter((i) => cat.paths.some((p) => i.path.includes(p.replace("%TEMP%", "").replace("%LOCALAPPDATA%", "")) || i.path === p || i.category.includes(cat.label.replace("Windows ", ""))));
              if (catItems.length === 0) return null;
              const catSize = catItems.reduce((s, i) => s + i.size, 0);
              const isSelected = selectedKeys.has(cat.key);
              return (
                <div key={cat.key} className="flex items-center justify-between p-4 rounded-lg cursor-pointer transition-colors"
                  style={{ background: isSelected ? "var(--color-brand-subtle)" : "var(--color-surface)", border: `1px solid ${isSelected ? "var(--color-brand)" : "var(--color-border-default)"}` }}
                  onClick={() => toggleSelect(cat.key)}>
                  <div className="flex items-center gap-3">
                    <input type="checkbox" checked={isSelected} onChange={() => toggleSelect(cat.key)} className="accent-[var(--color-brand)]" onClick={(e) => e.stopPropagation()} />
                    <Icon size={20} theme="outline" style={{ color: "var(--color-brand)" }} />
                    <div>
                      <p className="text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>{cat.label}</p>
                      <p className="text-xs mt-0.5" style={{ color: "var(--color-text-tertiary)" }}>{catItems.length} 个项目</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium" style={{ color: "var(--color-text-secondary)", fontVariantNumeric: "tabular-nums" }}>{formatBytes(catSize)}</span>
                </div>
              );
            })}
          </div>

          <div className="sticky bottom-0 flex items-center justify-between p-4 rounded-lg" style={{ background: "var(--color-surface)", border: "1px solid var(--color-border-default)" }}>
            <span className="text-sm" style={{ color: "var(--color-text-secondary)" }}>已选 {selectedKeys.size} 类 / 可释放 {formatBytes(selectedSize)}</span>
            <div className="flex gap-2">
              <Button variant="ghost" onClick={handleScan}>重新扫描</Button>
              <Button variant="primary" disabled={selectedKeys.size === 0}>清理选中项</Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

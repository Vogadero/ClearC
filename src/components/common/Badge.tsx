import { CheckOne, Caution, CloseRemind, Info } from "@icon-park/react";

type BadgeVariant = "safe" | "warn" | "danger" | "info";

interface BadgeProps {
  variant: BadgeVariant;
  children: React.ReactNode;
}

const VARIANT_STYLES: Record<BadgeVariant, { bg: string; color: string }> = {
  safe: { bg: "var(--color-safe-subtle)", color: "var(--color-safe)" },
  warn: { bg: "var(--color-warn-subtle)", color: "var(--color-warn)" },
  danger: { bg: "var(--color-danger-subtle)", color: "var(--color-danger)" },
  info: { bg: "var(--color-brand-subtle)", color: "var(--color-brand)" },
};

const VARIANT_ICONS: Record<BadgeVariant, React.ComponentType<{ size?: number; theme?: "outline" | "filled" | "two-tone" | "multi-color" }>> = {
  safe: CheckOne,
  warn: Caution,
  danger: CloseRemind,
  info: Info,
};

export default function Badge({ variant, children }: BadgeProps) {
  const style = VARIANT_STYLES[variant];
  const IconComponent = VARIANT_ICONS[variant];

  return (
    <span
      className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-medium"
      style={{ background: style.bg, color: style.color }}
    >
      <IconComponent size={12} theme="outline" />
      {children}
    </span>
  );
}

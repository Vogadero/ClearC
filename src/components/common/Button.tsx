interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md";
  children: React.ReactNode;
}

export default function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const base = "inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed";
  const sizes = size === "sm" ? "h-7 px-3 text-xs" : "h-8 px-4 text-sm";
  const variants: Record<string, string> = {
    primary: "text-white",
    secondary: "bg-transparent border",
    ghost: "bg-transparent",
    danger: "text-white",
  };

  const styleMap: Record<string, React.CSSProperties> = {
    primary: { background: "var(--color-brand)" },
    secondary: {
      color: "var(--color-brand)",
      borderColor: "var(--color-brand)",
    },
    ghost: { color: "var(--color-text-secondary)" },
    danger: { background: "var(--color-danger)" },
  };

  return (
    <button
      className={`${base} ${sizes} ${variants[variant]} ${className}`}
      style={styleMap[variant]}
      disabled={disabled}
      onMouseEnter={(e) => {
        if (disabled) return;
        const hoverMap: Record<string, React.CSSProperties> = {
          primary: { background: "var(--color-brand-hover)" },
          secondary: { background: "var(--color-brand-subtle)" },
          ghost: { background: "var(--color-surface-inset)", color: "var(--color-text-primary)" },
          danger: { background: "#CC3030" },
        };
        Object.assign(e.currentTarget.style, hoverMap[variant]);
      }}
      onMouseLeave={(e) => {
        if (disabled) return;
        Object.assign(e.currentTarget.style, styleMap[variant]);
        if (variant === "ghost") {
          e.currentTarget.style.color = "var(--color-text-secondary)";
        }
      }}
      {...props}
    >
      {children}
    </button>
  );
}

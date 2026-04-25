interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export default function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="mb-3" style={{ color: "var(--color-text-tertiary)" }}>
        {icon}
      </div>
      <h3 className="text-h3 mb-1" style={{ color: "var(--color-text-primary)" }}>
        {title}
      </h3>
      {description && (
        <p className="text-body-sm mb-4" style={{ color: "var(--color-text-tertiary)" }}>
          {description}
        </p>
      )}
      {action}
    </div>
  );
}

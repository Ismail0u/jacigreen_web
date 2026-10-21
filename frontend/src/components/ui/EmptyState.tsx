export function EmptyState({ children }: { children: React.ReactNode }) {
  return (
    <p className="border border-dashed border-border-strong p-8 text-center text-ink-muted">
      {children}
    </p>
  );
}

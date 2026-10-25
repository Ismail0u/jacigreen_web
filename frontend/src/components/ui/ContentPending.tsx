interface ContentPendingProps {
  children?: string;
  className?: string;
}

export function ContentPending({
  children = "Contenu en attente de validation éditoriale par JACIGREEN.",
  className = "",
}: ContentPendingProps) {
  return (
    <p
      role="note"
      className={`flex min-h-24 items-center gap-4 border border-outline-variant bg-surface-container-lowest p-6 text-small text-on-surface-variant ${className}`}
    >
      <span aria-hidden="true" className="material-symbols-outlined shrink-0 text-secondary">
        pending_actions
      </span>
      <span>{children}</span>
    </p>
  );
}

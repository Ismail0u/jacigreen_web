import type { ReactNode } from "react";

interface FormFieldProps {
  id: string;
  label: string;
  error?: string | undefined;
  hint?: string;
  required?: boolean;
  /** Reçoit les attributs d'accessibilité à appliquer au champ. */
  children: (aria: {
    id: string;
    "aria-invalid": boolean;
    "aria-describedby": string | undefined;
  }) => ReactNode;
}

export function FormField({ id, label, error, hint, required = false, children }: FormFieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;
  return (
    <div>
      <label htmlFor={id} className="block font-display text-small font-semibold text-ink">
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </label>
      {hint ? (
        <p id={hintId} className="mt-1 text-small text-ink-muted">
          {hint}
        </p>
      ) : null}
      <div className="mt-2">
        {children({ id, "aria-invalid": Boolean(error), "aria-describedby": describedBy })}
      </div>
      {error ? (
        <p id={errorId} className="mt-1 text-small font-semibold text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export const INPUT_CLASSES =
  "block min-h-11 w-full rounded-sm border border-border-strong bg-surface-raised px-3 py-2 text-body text-ink aria-[invalid=true]:border-danger";

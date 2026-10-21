import type { ReactNode } from "react";

type Tone = "neutral" | "prototype" | "demo";

const TONES: Record<Tone, string> = {
  neutral: "bg-surface-alt text-ink",
  prototype: "bg-surface-alt text-ochre-text",
  demo: "bg-danger text-surface-raised",
};

export function Badge({ tone = "neutral", children }: { tone?: Tone; children: ReactNode }) {
  return (
    <span
      className={`inline-block rounded-sm px-2 py-1 font-display text-label font-semibold tracking-(--tracking-label) uppercase ${TONES[tone]}`}
    >
      {children}
    </span>
  );
}

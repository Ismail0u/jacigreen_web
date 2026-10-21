import { Link } from "react-router";

import { Badge } from "~/components/ui/Badge";
import { DemoBadge } from "~/components/ui/DemoNotice";
import type { SolutionSummary } from "~/types/api";

const CATEGORY_LABELS: Record<SolutionSummary["category"], string> = {
  energy: "Énergie",
  fertilizer: "Fertilisation",
  water: "Eau",
  other: "Autre",
};

export function SolutionCard({ solution }: { solution: SolutionSummary }) {
  return (
    <article className="relative flex h-full flex-col border border-hairline bg-surface-raised p-6 focus-within:outline focus-within:outline-3 focus-within:outline-offset-3 focus-within:outline-focus">
      {solution.cover_image ? (
        <img
          src={solution.cover_image}
          alt={solution.cover_alt}
          loading="lazy"
          className="mb-5 aspect-[4/3] w-full object-cover"
        />
      ) : null}
      <div className="flex flex-wrap gap-2">
        <Badge>{CATEGORY_LABELS[solution.category]}</Badge>
        {solution.maturity === "prototype" ? <Badge tone="prototype">En prototypage</Badge> : null}
        <DemoBadge show={solution.is_demo} />
      </div>
      <h3 className="mt-4 text-h3">
        <Link
          to={`/solutions/${solution.slug}`}
          className="after:absolute after:inset-0 hover:underline"
        >
          {solution.name}
        </Link>
      </h3>
      {solution.tagline ? (
        <p className="mt-1 font-display text-small text-ochre-text">{solution.tagline}</p>
      ) : null}
      <p className="mt-3 text-ink-muted">{solution.summary}</p>
    </article>
  );
}

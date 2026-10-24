import { Link } from "react-router";

import { Badge } from "~/components/ui/Badge";
import { DemoBadge } from "~/components/ui/DemoNotice";
import { MediaFrame } from "~/components/ui/MediaFrame";
import type { SolutionSummary } from "~/types/api";

const CATEGORY_LABELS: Record<SolutionSummary["category"], string> = {
  energy: "Énergie",
  fertilizer: "Fertilisation",
  water: "Eau",
  other: "Autre",
};

export function SolutionCard({ solution }: { solution: SolutionSummary }) {
  const icon =
    solution.category === "energy"
      ? "solar_power"
      : solution.category === "fertilizer"
        ? "agriculture"
        : solution.category === "water"
          ? "water_drop"
          : "eco";

  return (
    <article className="relative flex h-full flex-col border-t-2 border-on-tertiary-container bg-surface-container-lowest pb-space-lg transition-colors focus-within:outline focus-within:outline-3 focus-within:outline-offset-3 focus-within:outline-focus hover:bg-surface-container-low">
      <MediaFrame
        src={solution.cover_image}
        alt={solution.cover_alt}
        aspect="4/3"
        icon={icon}
        className="border-0"
      />
      <div className="flex flex-wrap gap-space-sm px-space-lg pt-space-lg">
        <Badge>{CATEGORY_LABELS[solution.category]}</Badge>
        {solution.maturity === "prototype" ? <Badge tone="prototype">En prototypage</Badge> : null}
        <DemoBadge show={solution.is_demo} />
      </div>
      <h3 className="mt-space-md px-space-lg font-headline-md text-headline-md">
        <Link
          to={`/solutions/${solution.slug}`}
          className="after:absolute after:inset-0 after:content-[''] hover:text-secondary hover:underline"
        >
          {solution.name}
        </Link>
      </h3>
      {solution.tagline ? (
        <p className="mt-1 px-space-lg font-body-sm text-body-sm text-on-surface-variant">
          {solution.tagline}
        </p>
      ) : null}
      <p className="mt-space-md px-space-lg font-body-md text-body-md text-on-surface-variant">
        {solution.summary}
      </p>
    </article>
  );
}

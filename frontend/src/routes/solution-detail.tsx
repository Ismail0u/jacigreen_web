import { Badge } from "~/components/ui/Badge";
import { ButtonLink } from "~/components/ui/Button";
import { Container } from "~/components/ui/Container";
import { DemoBanner } from "~/components/ui/DemoNotice";
import { MediaFrame } from "~/components/ui/MediaFrame";
import { Prose } from "~/components/ui/Prose";
import { buildMeta } from "~/lib/seo";
import { getSolution } from "~/services/api/content";

import type { Route } from "./+types/solution-detail";

export async function loader({ params }: Route.LoaderArgs) {
  return { solution: await getSolution(params.slug) };
}

export function meta({ loaderData }: Route.MetaArgs) {
  const solution = (loaderData as typeof loaderData | undefined)?.solution;
  if (!solution) return [{ title: "Solution introuvable | JACIGREEN" }];
  return buildMeta({
    title: solution.name,
    description: solution.summary,
    path: `/solutions/${solution.slug}`,
    image: solution.cover_image,
  });
}

export default function SolutionDetail({ loaderData }: Route.ComponentProps) {
  const { solution } = loaderData;
  return (
    <>
      <DemoBanner show={solution.is_demo} />
      <article className="py-16">
        <Container>
          <div className="flex flex-wrap gap-2">
            {solution.maturity === "prototype" ? (
              <Badge tone="prototype">En prototypage</Badge>
            ) : null}
          </div>
          <h1 className="mt-4 text-h1 md:text-display">{solution.name}</h1>
          {solution.tagline ? (
            <p className="mt-3 font-display text-lead text-ochre-text">{solution.tagline}</p>
          ) : null}
          <MediaFrame
            src={solution.cover_image}
            alt={solution.cover_alt}
            aspect="16/9"
            icon={solution.category === "energy" ? "solar_power" : "eco"}
            className="mt-10 max-w-4xl"
          />
          <div className="mt-10">
            <Prose text={solution.description} />
          </div>
          <div className="mt-12 flex flex-wrap gap-4">
            <ButtonLink to="/contact?objet=quote">Demander un devis</ButtonLink>
            <ButtonLink to="/solutions" variant="secondary">
              Toutes les solutions
            </ButtonLink>
          </div>
        </Container>
      </article>
    </>
  );
}

import { Container } from "~/components/ui/Container";
import { ContentPending } from "~/components/ui/ContentPending";
import { DemoBanner } from "~/components/ui/DemoNotice";
import { PageHeader } from "~/components/ui/PageHeader";
import { SolutionCard } from "~/features/solutions/SolutionCard";
import { buildMeta } from "~/lib/seo";
import { listSolutions } from "~/services/api/content";

import type { Route } from "./+types/solutions";

export async function loader() {
  return { solutions: await listSolutions() };
}

export function meta() {
  return buildMeta({
    title: "Solutions",
    description: "Découvrez les solutions publiées par JACIGREEN.",
    path: "/solutions",
  });
}

export default function Solutions({ loaderData }: Route.ComponentProps) {
  const { solutions } = loaderData;

  return (
    <>
      <DemoBanner show={solutions.some((solution) => solution.is_demo)} />
      <PageHeader
        eyebrow="Solutions"
        title="Nos solutions"
        intro="Découvrez les solutions présentées par JACIGREEN."
      />
      <section className="py-space-xl md:py-20">
        <Container>
          {solutions.length > 0 ? (
            <div className="grid grid-cols-1 gap-gutter sm:grid-cols-2 lg:grid-cols-3">
              {solutions.map((solution) => (
                <SolutionCard key={solution.slug} solution={solution} />
              ))}
            </div>
          ) : (
            <ContentPending>Aucune solution n’est actuellement publiée.</ContentPending>
          )}
        </Container>
      </section>
    </>
  );
}

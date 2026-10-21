import { Container } from "~/components/ui/Container";
import { DemoBanner } from "~/components/ui/DemoNotice";
import { EmptyState } from "~/components/ui/EmptyState";
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
    description:
      "Les solutions JACIGREEN : biogaz, biofertilisants et valorisation des ressources locales.",
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
        intro="Des solutions conçues à partir des ressources disponibles localement."
      />
      <section className="py-16">
        <Container>
          {solutions.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {solutions.map((solution) => (
                <SolutionCard key={solution.slug} solution={solution} />
              ))}
            </div>
          ) : (
            <EmptyState>Aucune solution n'est publiée pour le moment.</EmptyState>
          )}
        </Container>
      </section>
    </>
  );
}

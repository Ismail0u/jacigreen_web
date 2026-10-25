import { Container } from "~/components/ui/Container";
import { ContentPending } from "~/components/ui/ContentPending";
import { DemoBanner } from "~/components/ui/DemoNotice";
import { PageHeader } from "~/components/ui/PageHeader";
import { SolutionCard } from "~/features/solutions/SolutionCard";
import { useOutletContext } from "react-router";

import type { SolutionsRouteData } from "./solutions-layout";

export default function Solutions() {
  const { solutions } = useOutletContext<SolutionsRouteData>();
  if (!solutions) {
    throw new Error("Les données de la liste des solutions ne sont pas disponibles.");
  }

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

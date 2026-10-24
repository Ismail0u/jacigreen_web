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
    description: "Consultez les solutions publiées par JACIGREEN.",
    path: "/solutions",
  });
}

export default function Solutions({ loaderData }: Route.ComponentProps) {
  const { solutions } = loaderData;
  const categoryLabels = {
    energy: "Énergie",
    fertilizer: "Fertilisation",
    water: "Eau",
    other: "Autre",
  } as const;
  const categories = [...new Set(solutions.map((solution) => solution.category))];
  return (
    <>
      <DemoBanner show={solutions.some((solution) => solution.is_demo)} />
      <PageHeader
        eyebrow="Solutions"
        title="Nos solutions"
        intro="Consultez les fiches de solutions publiées par JACIGREEN."
      />
      <section className="py-space-xl md:py-20">
        <Container>
          {solutions.length > 0 ? (
            <>
              <nav aria-label="Aller à une catégorie de solutions" className="mb-space-xl">
                <ul className="flex flex-wrap gap-space-sm">
                  {categories.map((category) => (
                    <li key={category}>
                      <a
                        href={`#solutions-${category}`}
                        className="inline-flex min-h-11 items-center border border-outline px-space-md font-label-md text-label-md font-semibold text-primary-container underline-offset-4 transition-colors hover:bg-surface-container-low hover:underline"
                      >
                        {categoryLabels[category]}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="space-y-space-xl">
                {categories.map((category) => {
                  const groupedSolutions = solutions.filter(
                    (solution) => solution.category === category,
                  );
                  return (
                    <section
                      key={category}
                      id={`solutions-${category}`}
                      aria-labelledby={`solutions-heading-${category}`}
                    >
                      <h2
                        id={`solutions-heading-${category}`}
                        className="mb-space-lg font-headline-xl text-headline-xl"
                      >
                        {categoryLabels[category]}
                      </h2>
                      <div className="grid grid-cols-1 gap-gutter sm:grid-cols-2 lg:grid-cols-3">
                        {groupedSolutions.map((solution) => (
                          <SolutionCard key={solution.slug} solution={solution} />
                        ))}
                      </div>
                    </section>
                  );
                })}
              </div>
            </>
          ) : (
            <ContentPending>
              Aucune solution publiée pour le moment. Les fiches apparaîtront ici après validation
              éditoriale.
            </ContentPending>
          )}
        </Container>
      </section>
    </>
  );
}

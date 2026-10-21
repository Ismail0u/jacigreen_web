import { useSearchParams } from "react-router";

import { Container } from "~/components/ui/Container";
import { DemoBanner } from "~/components/ui/DemoNotice";
import { EmptyState } from "~/components/ui/EmptyState";
import { PageHeader } from "~/components/ui/PageHeader";
import { ProjectCard } from "~/features/projects/ProjectCard";
import { buildMeta } from "~/lib/seo";
import { listProjects } from "~/services/api/content";

import type { Route } from "./+types/projects";

export async function loader() {
  return { projects: await listProjects() };
}

export function meta() {
  return buildMeta({
    title: "Réalisations",
    description: "Les réalisations et projets de terrain de JACIGREEN.",
    path: "/realisations",
  });
}

export default function Projects({ loaderData }: Route.ComponentProps) {
  const { projects } = loaderData;
  const [params, setParams] = useSearchParams();
  const country = params.get("pays");
  const countries = [...new Map(projects.map((p) => [p.country, p.country_label])).entries()];
  const visible = country ? projects.filter((project) => project.country === country) : projects;

  return (
    <>
      <DemoBanner show={projects.some((project) => project.is_demo)} />
      <PageHeader eyebrow="Réalisations" title="Nos réalisations" />
      <section className="py-16">
        <Container>
          {countries.length > 1 ? (
            <div role="group" aria-label="Filtrer par pays" className="mb-8 flex flex-wrap gap-3">
              <button
                type="button"
                aria-pressed={!country}
                onClick={() => {
                  setParams({});
                }}
                className="min-h-11 rounded-sm border border-brand px-4 text-small font-semibold aria-pressed:bg-brand aria-pressed:text-on-brand"
              >
                Tous les pays
              </button>
              {countries.map(([code, label]) => (
                <button
                  key={code}
                  type="button"
                  aria-pressed={country === code}
                  onClick={() => {
                    setParams({ pays: code });
                  }}
                  className="min-h-11 rounded-sm border border-brand px-4 text-small font-semibold aria-pressed:bg-brand aria-pressed:text-on-brand"
                >
                  {label}
                </button>
              ))}
            </div>
          ) : null}
          {visible.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {visible.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          ) : (
            <EmptyState>Aucune réalisation à afficher.</EmptyState>
          )}
        </Container>
      </section>
    </>
  );
}

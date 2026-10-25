import { useSearchParams } from "react-router";

import { Container } from "~/components/ui/Container";
import { ContentPending } from "~/components/ui/ContentPending";
import { DemoBanner } from "~/components/ui/DemoNotice";
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
    description: "Projets et réalisations publiés par JACIGREEN.",
    path: "/realisations",
  });
}

export default function Projects({ loaderData }: Route.ComponentProps) {
  const { projects } = loaderData;
  const [params, setParams] = useSearchParams();
  const country = params.get("pays");
  const countries = [
    ...new Map(projects.map((project) => [project.country, project.country_label])),
  ];
  const visible = country ? projects.filter((project) => project.country === country) : projects;

  return (
    <>
      <DemoBanner show={projects.some((project) => project.is_demo)} />
      <PageHeader
        eyebrow="Réalisations"
        title="Projets et réalisations"
        intro="Les réalisations publiées par JACIGREEN sont présentées ici."
      />
      <section className="py-space-xl md:py-20">
        <Container>
          {countries.length > 1 ? (
            <div
              role="group"
              aria-label="Filtrer les réalisations par pays"
              className="mb-space-xl flex flex-wrap gap-space-sm"
            >
              <button
                type="button"
                aria-pressed={!country}
                onClick={() => {
                  setParams({});
                }}
                className="min-h-11 border border-outline px-space-md font-label-md text-label-md font-semibold transition-colors hover:bg-surface-container-low aria-pressed:border-primary-container aria-pressed:bg-primary-container aria-pressed:text-on-primary"
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
                  className="min-h-11 border border-outline px-space-md font-label-md text-label-md font-semibold transition-colors hover:bg-surface-container-low aria-pressed:border-primary-container aria-pressed:bg-primary-container aria-pressed:text-on-primary"
                >
                  {label}
                </button>
              ))}
            </div>
          ) : null}
          {visible.length > 0 ? (
            <div className="grid grid-cols-1 gap-gutter md:grid-cols-2">
              {visible.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          ) : (
            <ContentPending>
              {projects.length === 0
                ? "Aucune réalisation n’est actuellement publiée."
                : "Aucune réalisation ne correspond à ce filtre."}
            </ContentPending>
          )}
        </Container>
      </section>
    </>
  );
}

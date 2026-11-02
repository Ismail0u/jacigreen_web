import { ArticleCard } from "~/features/news/ArticleCard";
import { ProjectCard } from "~/features/projects/ProjectCard";
import { SolutionCard } from "~/features/solutions/SolutionCard";
import { ButtonLink } from "~/components/ui/Button";
import { Container } from "~/components/ui/Container";
import { ContentPending } from "~/components/ui/ContentPending";
import { DemoBanner } from "~/components/ui/DemoNotice";
import { HomeHeroCluster } from "~/components/home/HomeHeroCluster";
import { positioning } from "~/content/institutional";
import { buildMeta, organizationJsonLd } from "~/lib/seo";
import { listLatestArticles, listProjects, listSolutions } from "~/services/api/content";

import type { Route } from "./+types/home";

export async function loader() {
  const [solutions, articles, projects] = await Promise.all([
    listSolutions(),
    listLatestArticles(3),
    listProjects(),
  ]);
  return { solutions: solutions.slice(0, 3), articles, projects: projects.slice(0, 3) };
}

export function meta() {
  return [
    ...buildMeta({
      title: "JACIGREEN",
      description: positioning.short,
      path: "/",
    }),
    organizationJsonLd(),
  ];
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { solutions, articles, projects } = loaderData;
  const hasDemo = [...solutions, ...articles, ...projects].some((item) => item.is_demo);
  const principles = [
    "Accessibilité",
    "Responsive",
    "Performance",
    "Ergonomie",
    "UX & IHM",
  ];

  return (
    <>
      <DemoBanner show={hasDemo} />
      <section className="on-dark bg-primary-container py-space-xl text-on-primary md:py-20">
        <Container className="grid grid-cols-1 items-center gap-gutter lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="home-hero__copy py-4 md:py-8">
            <p className="font-label-md text-label-md font-semibold text-on-primary uppercase">
              JACIGREEN
            </p>
            <h1 className="text-fluid-heading mt-space-md max-w-4xl font-headline-2xl-mobile text-on-primary md:font-headline-2xl">
              Transformer les défis environnementaux en ressources utiles
            </h1>
            <p className="mt-space-md font-label-md text-label-md font-semibold text-on-primary/90">
              {positioning.tagline}
            </p>
            <p className="mt-space-lg max-w-reading font-body-lg text-body-lg text-on-primary/90">
              {positioning.short}
            </p>

            <div className="mt-space-xl flex flex-wrap gap-2">
              {principles.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center rounded-full border border-white/20 bg-white/8 px-3 py-1.5 font-label-md text-label-md text-on-primary/90 backdrop-blur-sm"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-space-xl flex flex-wrap gap-space-md">
              <ButtonLink to="/solutions" variant="accent">
                Découvrir nos solutions
              </ButtonLink>
              <ButtonLink
                to="/contact"
                variant="secondary"
                className="border-on-primary text-on-primary hover:bg-on-primary hover:text-primary-container"
              >
                Nous contacter
              </ButtonLink>
            </div>
          </div>
          <HomeHeroCluster />
        </Container>
      </section>

      <section className="py-space-xl md:py-20" aria-labelledby="approche">
        <Container className="grid grid-cols-1 gap-gutter lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="font-label-md text-label-md font-semibold text-ochre-text uppercase">
              Notre approche
            </p>
            <h2 id="approche" className="text-fluid-section-heading mt-2 max-w-lg font-headline-xl">
              Valoriser les ressources disponibles localement
            </h2>
          </div>
          <p className="max-w-reading font-body-lg text-body-lg text-on-surface-variant">
            {positioning.expertise}
          </p>
        </Container>
      </section>

      <section
        className="bg-surface-container-low py-space-xl md:py-20"
        aria-labelledby="solutions"
      >
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-space-md">
            <div>
              <p className="font-label-md text-label-md font-semibold text-ochre-text uppercase">
                Solutions
              </p>
              <h2 id="solutions" className="text-fluid-section-heading mt-2 font-headline-xl">
                Solutions publiées
              </h2>
            </div>
            <ButtonLink to="/solutions" variant="secondary">
              Toutes les solutions <span aria-hidden="true">→</span>
            </ButtonLink>
          </div>
          {solutions.length > 0 ? (
            <div className="mt-space-xl grid gap-gutter sm:grid-cols-2 lg:grid-cols-3">
              {solutions.map((solution) => (
                <SolutionCard key={solution.slug} solution={solution} />
              ))}
            </div>
          ) : (
            <div className="mt-space-xl">
              <ContentPending>Aucune solution n’est actuellement publiée.</ContentPending>
            </div>
          )}
        </Container>
      </section>

      <section className="py-space-xl md:py-20" aria-labelledby="realisations">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-space-md">
            <div>
              <p className="font-label-md text-label-md font-semibold text-ochre-text uppercase">
                Réalisations
              </p>
              <h2 id="realisations" className="text-fluid-section-heading mt-2 font-headline-xl">
                Projets publiés
              </h2>
            </div>
            <ButtonLink to="/realisations" variant="secondary">
              Toutes les réalisations <span aria-hidden="true">→</span>
            </ButtonLink>
          </div>
          {projects.length > 0 ? (
            <div className="mt-space-xl grid gap-gutter md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          ) : (
            <div className="mt-space-xl">
              <ContentPending>Aucune réalisation n’est actuellement publiée.</ContentPending>
            </div>
          )}
        </Container>
      </section>

      <section
        className="bg-surface-container-low py-space-xl md:py-20"
        aria-labelledby="actualites"
      >
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-space-md">
            <div>
              <p className="font-label-md text-label-md font-semibold text-ochre-text uppercase">
                Actualités
              </p>
              <h2 id="actualites" className="text-fluid-section-heading mt-2 font-headline-xl">
                Publications récentes
              </h2>
            </div>
            <ButtonLink to="/actualites" variant="secondary">
              Toutes les actualités <span aria-hidden="true">→</span>
            </ButtonLink>
          </div>
          {articles.length > 0 ? (
            <div className="mt-space-xl grid gap-gutter sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          ) : (
            <div className="mt-space-xl">
              <ContentPending>Aucune actualité n’est actuellement publiée.</ContentPending>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}

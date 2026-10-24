import { ArticleCard } from "~/features/news/ArticleCard";
import { ProjectCard } from "~/features/projects/ProjectCard";
import { SolutionCard } from "~/features/solutions/SolutionCard";
import { ButtonLink } from "~/components/ui/Button";
import { Container } from "~/components/ui/Container";
import { ContentPending } from "~/components/ui/ContentPending";
import { DemoBanner } from "~/components/ui/DemoNotice";
import { MediaFrame } from "~/components/ui/MediaFrame";
import { MEDIA } from "~/content/media";
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
      description: "Présentation institutionnelle de JACIGREEN en attente de validation.",
      path: "/",
    }),
    organizationJsonLd(),
  ];
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { solutions, articles, projects } = loaderData;
  const hasDemo = [...solutions, ...articles, ...projects].some((item) => item.is_demo);

  return (
    <>
      <DemoBanner show={hasDemo} />
      <section className="on-dark bg-primary-container py-space-xl text-on-primary md:py-20">
        <Container className="grid grid-cols-1 items-center gap-gutter lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="py-4 md:py-8">
            <p className="font-label-md text-label-md font-semibold text-on-primary uppercase">
              JACIGREEN
            </p>
            <h1 className="mt-space-md max-w-4xl font-headline-2xl-mobile text-headline-2xl-mobile text-on-primary md:font-headline-2xl md:text-headline-2xl">
              Présentation institutionnelle
            </h1>
            <div className="mt-space-lg max-w-reading">
              <ContentPending>
                La présentation de l'organisation et de ses activités sera publiée après validation
                institutionnelle.
              </ContentPending>
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
          <MediaFrame
            src={MEDIA.homeHero.src}
            alt={MEDIA.homeHero.alt}
            aspect={MEDIA.homeHero.aspect}
            icon={MEDIA.homeHero.icon}
            priority
            className="border-on-primary/20 bg-on-primary/10"
          />
        </Container>
      </section>

      <section className="py-space-xl md:py-20" aria-labelledby="demarche">
        <Container>
          <div className="grid grid-cols-1 gap-gutter lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="font-label-md text-label-md font-semibold text-ochre-text uppercase">
                Présentation
              </p>
              <h2 id="demarche" className="mt-2 max-w-lg font-headline-xl text-headline-xl">
                Positionnement et chaîne de valeur
              </h2>
            </div>
            <ContentPending>
              Les formulations de présentation et les étapes de la chaîne de valeur issues du
              référentiel interne attendent une validation avant publication.
            </ContentPending>
          </div>
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
                Expertise
              </p>
              <h2 id="solutions" className="mt-2 font-headline-xl text-headline-xl">
                Nos solutions
              </h2>
            </div>
            <ButtonLink to="/solutions" variant="secondary">
              Explorer les solutions <span aria-hidden="true">→</span>
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
              <ContentPending>
                Les solutions seront affichées après publication de contenus validés.
              </ContentPending>
            </div>
          )}
        </Container>
      </section>

      <section className="py-space-xl md:py-20" aria-labelledby="realisations">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-space-md">
            <div>
              <p className="font-label-md text-label-md font-semibold text-ochre-text uppercase">
                Sur le terrain
              </p>
              <h2 id="realisations" className="mt-2 max-w-3xl font-headline-xl text-headline-xl">
                Réalisations et projets
              </h2>
            </div>
            <ButtonLink to="/realisations" variant="secondary">
              Voir les réalisations <span aria-hidden="true">→</span>
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
              <ContentPending>
                Les réalisations seront présentées dès qu'elles auront été validées.
              </ContentPending>
            </div>
          )}
        </Container>
      </section>

      <section className="on-dark bg-primary-container py-space-xl text-on-primary md:py-20">
        <Container className="grid grid-cols-1 items-center gap-gutter md:grid-cols-[1fr_auto]">
          <div>
            <p className="font-label-md text-label-md font-semibold text-on-primary uppercase">
              Un projet ou une question ?
            </p>
            <h2 className="mt-2 max-w-3xl font-headline-xl text-headline-xl text-on-primary">
              Échanger autour de votre besoin
            </h2>
            <p className="mt-space-md max-w-reading font-body-md text-body-md text-on-primary/90">
              Le formulaire de contact permet de préciser votre demande et de la transmettre à
              JACIGREEN.
            </p>
          </div>
          <ButtonLink
            to="/contact"
            variant="secondary"
            className="w-fit border-on-primary text-on-primary hover:bg-on-primary hover:text-primary-container"
          >
            Nous contacter <span aria-hidden="true">→</span>
          </ButtonLink>
        </Container>
      </section>

      <section className="py-space-xl md:py-20" aria-labelledby="impact">
        <Container className="grid grid-cols-1 items-start gap-gutter lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="font-label-md text-label-md font-semibold text-ochre-text uppercase">
              Informations institutionnelles
            </p>
            <h2 id="impact" className="mt-2 font-headline-xl text-headline-xl">
              Données d'impact et reconnaissances
            </h2>
          </div>
          <ContentPending>
            Les indicateurs, partenariats ou distinctions éventuellement publiés nécessitent des
            sources vérifiables et une validation préalable.
          </ContentPending>
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
              <h2 id="actualites" className="mt-2 font-headline-xl text-headline-xl">
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
              <ContentPending>
                Les actualités apparaîtront après publication de contenus validés.
              </ContentPending>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}

import { ArticleCard } from "~/features/news/ArticleCard";
import { ProjectCard } from "~/features/projects/ProjectCard";
import { SolutionCard } from "~/features/solutions/SolutionCard";
import { ButtonLink } from "~/components/ui/Button";
import { Container } from "~/components/ui/Container";
import { DemoBanner } from "~/components/ui/DemoNotice";
import { MediaFrame } from "~/components/ui/MediaFrame";
import { MEDIA } from "~/content/media";
import { COMPANY_INTRO, HERO_TITLE, VALUE_CHAIN } from "~/content/site-copy";
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
      title: "JACIGREEN | Valorisation des ressources naturelles et des déchets",
      description: COMPANY_INTRO,
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
      <section className="on-dark bg-brand py-20 text-on-brand md:py-28">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="font-display text-label font-semibold tracking-(--tracking-label) uppercase opacity-90">
              Ingénierie environnementale
            </p>
            <h1 className="mt-4 max-w-4xl text-h1 text-on-brand md:text-display">{HERO_TITLE}</h1>
            <p className="mt-6 max-w-reading text-lead opacity-95">{COMPANY_INTRO}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <ButtonLink to="/solutions" variant="accent">
                Découvrir nos solutions
              </ButtonLink>
              <ButtonLink
                to="/contact"
                variant="secondary"
                className="border-on-brand text-on-brand hover:bg-on-brand hover:text-brand"
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
            className="border-on-brand/20 bg-on-brand/10"
          />
        </Container>
      </section>

      <section className="py-16 md:py-20" aria-labelledby="demarche">
        <Container>
          <h2 id="demarche" className="text-h2">
            Notre démarche
          </h2>
          <ol className="mt-10 grid gap-8 md:grid-cols-5">
            {VALUE_CHAIN.map((step, index) => (
              <li key={step.label} className="border-t-2 border-ochre pt-4">
                <p className="font-display text-label font-semibold tracking-(--tracking-label) text-ochre-text uppercase">
                  Étape {index + 1}
                </p>
                <h3 className="mt-1 text-h3">{step.label}</h3>
                <p className="mt-2 text-small text-ink-muted">{step.description}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="bg-surface-alt py-16 md:py-20" aria-labelledby="solutions">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="solutions" className="text-h2">
              Nos solutions
            </h2>
            <ButtonLink to="/solutions" variant="secondary">
              Toutes les solutions
            </ButtonLink>
          </div>
          {solutions.length > 0 ? (
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {solutions.map((solution) => (
                <SolutionCard key={solution.slug} solution={solution} />
              ))}
            </div>
          ) : (
            <p className="mt-8 text-ink-muted">Les solutions seront présentées prochainement.</p>
          )}
        </Container>
      </section>

      <section className="bg-surface-alt py-16 md:py-20" aria-labelledby="realisations">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="realisations" className="text-h2">
              Des projets ancrés dans les territoires
            </h2>
            <ButtonLink to="/realisations" variant="secondary">
              Toutes les réalisations
            </ButtonLink>
          </div>
          {projects.length > 0 ? (
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          ) : (
            <p className="mt-8 text-ink-muted">Aucune réalisation publiée pour le moment.</p>
          )}
        </Container>
      </section>

      <section className="py-16 md:py-20" aria-labelledby="actualites">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="actualites" className="text-h2">
              Actualités
            </h2>
            <ButtonLink to="/actualites" variant="secondary">
              Toutes les actualités
            </ButtonLink>
          </div>
          {articles.length > 0 ? (
            <div className="mt-10 grid gap-8 md:grid-cols-3">
              {articles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          ) : (
            <p className="mt-8 text-ink-muted">Aucune actualité publiée pour le moment.</p>
          )}
        </Container>
      </section>
    </>
  );
}

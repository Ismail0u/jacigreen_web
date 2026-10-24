import { Container } from "~/components/ui/Container";
import { ContentPending } from "~/components/ui/ContentPending";
import { DemoBanner } from "~/components/ui/DemoNotice";
import { PageHeader } from "~/components/ui/PageHeader";
import { ArticleCard } from "~/features/news/ArticleCard";
import { buildMeta } from "~/lib/seo";
import { listArticles } from "~/services/api/content";

import type { Route } from "./+types/news";

export async function loader() {
  return { articles: await listArticles() };
}

export function meta() {
  return buildMeta({
    title: "Actualités",
    description: "Les actualités et ressources de JACIGREEN.",
    path: "/actualites",
  });
}

export default function News({ loaderData }: Route.ComponentProps) {
  const { articles } = loaderData;
  const categoryLabels = {
    news: "Actualités",
    project: "Projets",
    resource: "Ressources",
  } as const;
  const categories = [...new Set(articles.map((article) => article.category))];
  return (
    <>
      <DemoBanner show={articles.some((article) => article.is_demo)} />
      <PageHeader eyebrow="Actualités" title="Actualités et ressources" />
      <section className="py-space-xl md:py-20">
        <Container>
          {articles.length > 0 ? (
            <>
              <nav aria-label="Aller à une catégorie de publication" className="mb-space-xl">
                <ul className="flex flex-wrap gap-space-sm">
                  {categories.map((category) => (
                    <li key={category}>
                      <a
                        href={`#publications-${category}`}
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
                  const groupedArticles = articles.filter(
                    (article) => article.category === category,
                  );
                  return (
                    <section
                      key={category}
                      id={`publications-${category}`}
                      aria-labelledby={`publications-heading-${category}`}
                    >
                      <h2
                        id={`publications-heading-${category}`}
                        className="mb-space-lg font-headline-xl text-headline-xl"
                      >
                        {categoryLabels[category]}
                      </h2>
                      <div className="grid grid-cols-1 gap-gutter sm:grid-cols-2 lg:grid-cols-3">
                        {groupedArticles.map((article) => (
                          <ArticleCard key={article.slug} article={article} />
                        ))}
                      </div>
                    </section>
                  );
                })}
              </div>
            </>
          ) : (
            <ContentPending>
              Aucune actualité n'est publiée pour le moment. Les publications apparaîtront ici après
              validation.
            </ContentPending>
          )}
        </Container>
      </section>
    </>
  );
}

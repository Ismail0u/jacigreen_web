import { Container } from "~/components/ui/Container";
import { DemoBanner } from "~/components/ui/DemoNotice";
import { EmptyState } from "~/components/ui/EmptyState";
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
  return (
    <>
      <DemoBanner show={articles.some((article) => article.is_demo)} />
      <PageHeader eyebrow="Actualités" title="Actualités et ressources" />
      <section className="py-16">
        <Container>
          {articles.length > 0 ? (
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          ) : (
            <EmptyState>Aucune actualité n'est publiée pour le moment.</EmptyState>
          )}
        </Container>
      </section>
    </>
  );
}

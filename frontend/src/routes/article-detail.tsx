import { ButtonLink } from "~/components/ui/Button";
import { Container } from "~/components/ui/Container";
import { DemoBanner } from "~/components/ui/DemoNotice";
import { MediaFrame } from "~/components/ui/MediaFrame";
import { Prose } from "~/components/ui/Prose";
import { formatDate } from "~/lib/format";
import { buildMeta } from "~/lib/seo";
import { getArticle } from "~/services/api/content";

import type { Route } from "./+types/article-detail";

export async function loader({ params }: Route.LoaderArgs) {
  return { article: await getArticle(params.slug) };
}

export function meta({ loaderData }: Route.MetaArgs) {
  const article = (loaderData as typeof loaderData | undefined)?.article;
  if (!article) return [{ title: "Article introuvable | JACIGREEN" }];
  return buildMeta({
    title: article.title,
    description: article.excerpt,
    path: `/actualites/${article.slug}`,
    type: "article",
    image: article.cover_image,
  });
}

export default function ArticleDetail({ loaderData }: Route.ComponentProps) {
  const { article } = loaderData;
  return (
    <>
      <DemoBanner show={article.is_demo} />
      <article className="py-16">
        <Container>
          <p className="text-small text-ink-muted">
            <time dateTime={article.published_at ?? undefined}>
              {formatDate(article.published_at)}
            </time>
            {article.author_name ? ` · ${article.author_name}` : ""}
          </p>
          <h1 className="mt-3 max-w-4xl text-h1 md:text-display">{article.title}</h1>
          <p className="mt-5 max-w-reading text-lead text-ink-muted">{article.excerpt}</p>
          <MediaFrame
            src={article.cover_image}
            alt={article.cover_alt}
            aspect="16/9"
            className="mt-10 max-w-4xl"
          />
          <div className="mt-10">
            <Prose text={article.body} />
          </div>
          <div className="mt-12">
            <ButtonLink to="/actualites" variant="secondary">
              Toutes les actualités
            </ButtonLink>
          </div>
        </Container>
      </article>
    </>
  );
}

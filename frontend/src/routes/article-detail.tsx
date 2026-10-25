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
      <article className="py-space-xl md:py-20">
        <Container>
          <div className="max-w-5xl">
            <p className="font-code-technical text-code-technical text-on-surface-variant">
              <time dateTime={article.published_at ?? undefined}>
                {formatDate(article.published_at)}
              </time>
              {article.author_name ? ` · ${article.author_name}` : ""}
            </p>
            <h1 className="mt-space-md max-w-4xl font-headline-2xl-mobile text-headline-2xl-mobile md:font-headline-2xl md:text-headline-2xl">
              {article.title}
            </h1>
            <p className="mt-space-md max-w-reading font-body-lg text-body-lg text-on-surface-variant">
              {article.excerpt}
            </p>
            <MediaFrame
              src={article.cover_image}
              alt={article.cover_alt}
              aspect="16/9"
              className="mt-space-xl"
            />
            <div className="mt-space-xl max-w-reading">
              <Prose text={article.body} />
            </div>
          </div>
          <div className="mt-space-xl border-t border-outline-variant pt-space-lg">
            <ButtonLink to="/actualites" variant="secondary">
              Toutes les actualités
            </ButtonLink>
          </div>
        </Container>
      </article>
    </>
  );
}

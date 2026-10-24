import { Link } from "react-router";

import { DemoBadge } from "~/components/ui/DemoNotice";
import { MediaFrame } from "~/components/ui/MediaFrame";
import { formatDate } from "~/lib/format";
import type { ArticleSummary } from "~/types/api";

export function ArticleCard({ article }: { article: ArticleSummary }) {
  return (
    <article className="group border-t-2 border-primary-container pt-space-md pb-space-lg">
      <MediaFrame
        src={article.cover_image}
        alt={article.cover_alt}
        aspect="4/3"
        icon="eco"
        className="mb-space-lg border-0"
      />
      <p className="flex items-center gap-space-sm font-code-technical text-code-technical text-on-surface-variant">
        <time dateTime={article.published_at ?? undefined}>{formatDate(article.published_at)}</time>
        <DemoBadge show={article.is_demo} />
      </p>
      <h3 className="mt-space-md font-headline-md text-headline-md">
        <Link
          to={`/actualites/${article.slug}`}
          className="underline-offset-4 group-hover:text-secondary hover:underline"
        >
          {article.title}
        </Link>
      </h3>
      <p className="mt-space-md font-body-md text-body-md text-on-surface-variant">
        {article.excerpt}
      </p>
      <Link
        to={`/actualites/${article.slug}`}
        className="mt-space-md inline-flex items-center gap-2 font-label-md text-label-md font-semibold text-primary-container uppercase underline-offset-4 hover:text-secondary hover:underline"
      >
        Lire l'article <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}

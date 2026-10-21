import { Link } from "react-router";

import { DemoBadge } from "~/components/ui/DemoNotice";
import { formatDate } from "~/lib/format";
import type { ArticleSummary } from "~/types/api";

export function ArticleCard({ article }: { article: ArticleSummary }) {
  return (
    <article className="border-t border-brand pt-5">
      <p className="flex items-center gap-3 text-small text-ink-muted">
        <time dateTime={article.published_at ?? undefined}>{formatDate(article.published_at)}</time>
        <DemoBadge show={article.is_demo} />
      </p>
      <h3 className="mt-2 text-h3">
        <Link to={`/actualites/${article.slug}`} className="hover:underline">
          {article.title}
        </Link>
      </h3>
      <p className="mt-2 text-ink-muted">{article.excerpt}</p>
    </article>
  );
}

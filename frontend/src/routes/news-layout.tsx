import { Outlet } from "react-router";

import { buildMeta } from "~/lib/seo";
import { getArticle, listArticles } from "~/services/api/content";

import type { ArticleDetail, ArticleSummary } from "~/types/api";
import type { Route } from "./+types/news-layout";

export type NewsRouteData =
  { articles: ArticleSummary[]; article: null } | { articles: null; article: ArticleDetail };

async function loadNewsRouteData(params: Route.LoaderArgs["params"]) {
  if (params.slug) {
    return { articles: null, article: await getArticle(params.slug) };
  }
  return { articles: await listArticles(), article: null };
}

export async function loader({ params }: Route.LoaderArgs) {
  return loadNewsRouteData(params);
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  return loadNewsRouteData(params);
}
clientLoader.hydrate = true as const;

export function meta({ loaderData }: Route.MetaArgs) {
  if (loaderData.article) {
    return buildMeta({
      title: loaderData.article.title,
      description: loaderData.article.excerpt,
      path: `/actualites/${loaderData.article.slug}`,
      type: "article",
      image: loaderData.article.cover_image,
    });
  }
  return buildMeta({
    title: "Actualités",
    description: "Actualités et ressources publiées par JACIGREEN.",
    path: "/actualites",
  });
}

export default function NewsLayout({ loaderData }: Route.ComponentProps) {
  return <Outlet context={loaderData} />;
}

import type {
  ArticleDetail,
  ArticleSummary,
  Project,
  Service,
  SolutionDetail,
  SolutionSummary,
} from "~/types/api";
import { apiFetch, fetchAllPages } from "./client";

export const listSolutions = () => fetchAllPages<SolutionSummary>("/api/v1/solutions/");
export const getSolution = (slug: string) =>
  apiFetch<SolutionDetail>(`/api/v1/solutions/${encodeURIComponent(slug)}/`);

export const listServices = () => fetchAllPages<Service>("/api/v1/services/");
export const listProjects = () => fetchAllPages<Project>("/api/v1/projects/");

export const listArticles = () => fetchAllPages<ArticleSummary>("/api/v1/articles/");
export const getArticle = (slug: string) =>
  apiFetch<ArticleDetail>(`/api/v1/articles/${encodeURIComponent(slug)}/`);

/** Les trois contenus les plus récents, pour la page d'accueil. */
export async function listLatestArticles(limit = 3): Promise<ArticleSummary[]> {
  const page = await apiFetch<{ results: ArticleSummary[] }>(
    `/api/v1/articles/?page_size=${limit}`,
  );
  return page.results;
}

/** Types du contrat de l'API Django (/api/v1/). À maintenir synchronisés avec docs/architecture/api.md. */

export interface Paginated<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export type SolutionCategory = "energy" | "fertilizer" | "water" | "other";
export type SolutionMaturity = "available" | "prototype";

export interface SolutionSummary {
  slug: string;
  name: string;
  tagline: string;
  category: SolutionCategory;
  maturity: SolutionMaturity;
  summary: string;
  cover_image: string | null;
  cover_alt: string;
  is_demo: boolean;
}

export interface SolutionDetail extends SolutionSummary {
  description: string;
  published_at: string | null;
  updated_at: string;
}

export interface Service {
  slug: string;
  title: string;
  summary: string;
  description: string;
  is_demo: boolean;
}

export interface Project {
  slug: string;
  title: string;
  summary: string;
  description: string;
  country: string;
  country_label: string;
  year_start: number | null;
  year_end: number | null;
  cover_image: string | null;
  cover_alt: string;
  is_demo: boolean;
}

export type ArticleCategory = "news" | "project" | "resource";

export interface ArticleSummary {
  slug: string;
  title: string;
  excerpt: string;
  category: ArticleCategory;
  published_at: string | null;
  cover_image: string | null;
  cover_alt: string;
  is_demo: boolean;
}

export interface ArticleDetail extends ArticleSummary {
  body: string;
  author_name: string;
  updated_at: string;
}

export type ContactSubject =
  "general" | "quote" | "training" | "partnership" | "buyback_info" | "other";

export interface ContactRequestPayload {
  subject: ContactSubject;
  name: string;
  email: string;
  organization: string;
  message: string;
  consent: boolean;
  /** Champ piège anti-robot : doit rester vide. */
  website: string;
}

/** Format d'erreur uniforme de l'API : { error: { code, message, details } }. */
export interface ApiErrorBody {
  error: { code: string; message: string; details: Record<string, string[]> | null };
}

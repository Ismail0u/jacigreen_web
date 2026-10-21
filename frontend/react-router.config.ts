import type { Config } from "@react-router/dev/config";

/**
 * Stratégie de rendu : SPA + pré-rendu statique au build (ssr: false + prerender).
 * Chaque page publique est générée en HTML complet. Voir docs/architecture/seo.md.
 *
 * Les routes dynamiques (fiches solutions, articles) sont listées à partir de l'API
 * Django. Le build ÉCHOUE si l'API est injoignable : un site publié sans ses contenus
 * serait pire qu'un build interrompu (échec rapide, « fail fast »).
 */
const STATIC_PATHS = [
  "/",
  "/a-propos",
  "/solutions",
  "/services",
  "/realisations",
  "/actualites",
  "/contact",
  "/mentions-legales",
];

type Page = { next: string | null; results: Array<{ slug: string }> };

async function fetchSlugs(resource: string): Promise<string[]> {
  const base = process.env.API_INTERNAL_URL ?? process.env.VITE_API_URL;
  if (!base) {
    throw new Error(
      "API_INTERNAL_URL (ou VITE_API_URL) est requis pour pré-rendre les routes dynamiques.",
    );
  }
  const slugs: string[] = [];
  let url: string | null = `${base.replace(/\/$/, "")}/api/v1/${resource}/?page_size=50`;
  while (url) {
    const response = await fetch(url, { signal: AbortSignal.timeout(15_000) });
    if (!response.ok) {
      throw new Error(`Pré-rendu impossible : ${url} a répondu HTTP ${response.status}.`);
    }
    const page = (await response.json()) as Page;
    slugs.push(...page.results.map((item) => item.slug));
    url = page.next;
  }
  return slugs;
}

export default {
  appDirectory: "src",
  ssr: false,
  async prerender() {
    const [solutions, articles] = await Promise.all([
      fetchSlugs("solutions"),
      fetchSlugs("articles"),
    ]);
    return [
      ...STATIC_PATHS,
      ...solutions.map((slug) => `/solutions/${slug}`),
      ...articles.map((slug) => `/actualites/${slug}`),
    ];
  },
} satisfies Config;

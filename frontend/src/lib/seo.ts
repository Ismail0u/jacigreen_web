import { getSiteUrl } from "./env";
import { SITE_NAME } from "./site";

export interface SeoInput {
  /** Titre de la page, sans le nom du site. */
  title: string;
  description: string;
  /** Chemin absolu de la page, ex. « /solutions/jacibiogaz ». */
  path: string;
  type?: "website" | "article";
  /** Image de partage (URL absolue). Omise tant qu'aucun visuel officiel n'est validé. */
  image?: string | null;
  noindex?: boolean;
}

type MetaDescriptor = Record<string, string | boolean | Record<string, unknown>>;

export function canonicalUrl(path: string): string {
  const normalized = path === "/" ? "/" : path.replace(/\/+$/, "");
  return `${getSiteUrl()}${normalized}`;
}

/** Construit les balises <title>, description, canonique, Open Graph et Twitter/X d'une page. */
export function buildMeta(input: SeoInput): MetaDescriptor[] {
  const fullTitle = input.path === "/" ? input.title : `${input.title} | ${SITE_NAME}`;
  const url = canonicalUrl(input.path);
  const meta: MetaDescriptor[] = [
    { title: fullTitle },
    { name: "description", content: input.description },
    { tagName: "link", rel: "canonical", href: url },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:locale", content: "fr_FR" },
    { property: "og:type", content: input.type ?? "website" },
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: input.description },
    { property: "og:url", content: url },
    { name: "twitter:card", content: input.image ? "summary_large_image" : "summary" },
    { name: "twitter:title", content: fullTitle },
    { name: "twitter:description", content: input.description },
  ];
  if (input.image) {
    meta.push({ property: "og:image", content: input.image });
    meta.push({ name: "twitter:image", content: input.image });
  }
  if (input.noindex) {
    meta.push({ name: "robots", content: "noindex, nofollow" });
  }
  return meta;
}

/** Données structurées minimales : uniquement des faits non contestables (nom, URL). */
export function organizationJsonLd(): MetaDescriptor {
  return {
    "script:ld+json": {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: SITE_NAME,
      url: getSiteUrl(),
    },
  };
}

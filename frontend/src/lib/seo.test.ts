import { beforeEach, describe, expect, it, vi } from "vitest";

import { buildMeta, canonicalUrl, organizationJsonLd } from "./seo";

const find = (meta: ReturnType<typeof buildMeta>, key: string, value: string) =>
  meta.find((entry) => entry[key] === value);

describe("buildMeta", () => {
  beforeEach(() => {
    vi.stubEnv("VITE_SITE_URL", "https://www.exemple.test/");
  });

  it("produit titre, description, canonique et Open Graph", () => {
    const meta = buildMeta({ title: "Solutions", description: "Desc", path: "/solutions" });
    expect(meta).toContainEqual({ title: "Solutions | JACIGREEN" });
    expect(find(meta, "rel", "canonical")).toMatchObject({
      href: "https://www.exemple.test/solutions",
    });
    expect(find(meta, "property", "og:url")).toMatchObject({
      content: "https://www.exemple.test/solutions",
    });
    expect(find(meta, "name", "twitter:card")).toMatchObject({ content: "summary" });
    expect(find(meta, "name", "robots")).toBeUndefined();
  });

  it("n'ajoute pas le suffixe du site au titre de l'accueil", () => {
    const meta = buildMeta({ title: "JACIGREEN | Accueil", description: "d", path: "/" });
    expect(meta).toContainEqual({ title: "JACIGREEN | Accueil" });
    expect(canonicalUrl("/")).toBe("https://www.exemple.test/");
  });

  it("ajoute l'image de partage et la grande carte Twitter quand une image est fournie", () => {
    const meta = buildMeta({
      title: "A",
      description: "d",
      path: "/a",
      image: "https://img.test/a.jpg",
    });
    expect(find(meta, "property", "og:image")).toBeDefined();
    expect(find(meta, "name", "twitter:card")).toMatchObject({ content: "summary_large_image" });
  });

  it("marque les pages noindex", () => {
    const meta = buildMeta({ title: "L", description: "d", path: "/l", noindex: true });
    expect(find(meta, "name", "robots")).toMatchObject({ content: "noindex, nofollow" });
  });

  it("normalise les barres obliques finales", () => {
    expect(canonicalUrl("/solutions/")).toBe("https://www.exemple.test/solutions");
  });

  it("limite les données structurées à des faits non contestables", () => {
    const ld = organizationJsonLd()["script:ld+json"] as Record<string, unknown>;
    expect(Object.keys(ld).sort()).toEqual(["@context", "@type", "name", "url"]);
  });
});

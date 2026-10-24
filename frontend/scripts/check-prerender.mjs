#!/usr/bin/env node
/**
 * Contrôle du HTML pré-rendu (exigence SEO). Échoue (code 1) si une page publique :
 *  - n'existe pas dans build/client,
 *  - n'a pas de <title>, description, lien canonique, balises Open Graph ou de <h1> unique,
 *  - n'affiche pas, dans son HTML initial, le contenu attendu depuis l'API.
 * Options : --forbid-demo (aucun contenu « [DÉMO] » toléré), --production (URL canonique non locale).
 * Variables : API_INTERNAL_URL (ou VITE_API_URL), VITE_SITE_URL.
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const BUILD_DIR = join(import.meta.dirname, "..", "build", "client");
const API = (process.env.API_INTERNAL_URL ?? process.env.VITE_API_URL ?? "").replace(/\/+$/, "");
const SITE_URL = (process.env.VITE_SITE_URL ?? "http://localhost:5173").replace(/\/+$/, "");
const FORBID_DEMO = process.argv.includes("--forbid-demo");
const PRODUCTION = process.argv.includes("--production");

const failures = [];
const fail = (route, message) => failures.push(`${route} : ${message}`);

const decode = (text) =>
  text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'");

function htmlFor(route) {
  const file = join(BUILD_DIR, route === "/" ? "index.html" : `${route.slice(1)}/index.html`);
  if (!existsSync(file)) {
    fail(route, "fichier HTML absent du build");
    return null;
  }
  return readFileSync(file, "utf8");
}

function checkPage(route, { noindex = false, expectInH1 } = {}) {
  const html = htmlFor(route);
  if (html === null) return;
  const tag = (pattern) => pattern.exec(html)?.[1];
  const title = tag(/<title>([^<]+)<\/title>/);
  if (!title) fail(route, "balise <title> absente ou vide");
  if (!tag(/<meta name="description" content="([^"]+)"/)) fail(route, "meta description absente");
  const canonical = tag(/<link rel="canonical" href="([^"]+)"/);
  const expectedCanonical = route === "/" ? `${SITE_URL}/` : `${SITE_URL}${route}`;
  if (canonical !== expectedCanonical)
    fail(route, `canonique inattendue (${canonical} au lieu de ${expectedCanonical})`);
  if (PRODUCTION && /localhost|127\.0\.0\.1/.test(canonical ?? ""))
    fail(route, "canonique locale en production");
  for (const property of ["og:title", "og:description", "og:url", "og:type"]) {
    if (!html.includes(`property="${property}"`)) fail(route, `balise ${property} absente`);
  }
  if (!html.includes('name="twitter:card"')) fail(route, "balise twitter:card absente");
  const h1Count = (html.match(/<h1[\s>]/g) ?? []).length;
  if (h1Count !== 1) fail(route, `${h1Count} balise(s) <h1> (1 attendue)`);
  const hasNoindex = /<meta name="robots" content="[^"]*noindex/.test(html);
  if (noindex !== hasNoindex) fail(route, noindex ? "noindex attendu" : "noindex inattendu");
  if (expectInH1) {
    const h1 = decode(tag(/<h1[^>]*>([\s\S]*?)<\/h1>/) ?? "");
    if (!h1.includes(expectInH1)) fail(route, `le <h1> ne contient pas « ${expectInH1} »`);
  }
  if (FORBID_DEMO && /Contenu de démonstration|Démonstration/.test(html))
    fail(route, "marqueur visible de contenu de démonstration présent");
}

async function allItems(resource) {
  const items = [];
  let url = `${API}/api/v1/${resource}/?page_size=50`;
  while (url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`${url} : HTTP ${response.status}`);
    const page = await response.json();
    items.push(...page.results);
    url = page.next;
  }
  return items;
}

function checkNoDemoItems(resource, items, routeForItem) {
  if (!FORBID_DEMO) return;
  for (const item of items) {
    if (item.is_demo !== false) {
      const identifier = item.slug ?? item.id ?? "élément sans identifiant";
      fail(
        routeForItem(item),
        `${resource}/${identifier} : is_demo doit être false (valeur reçue : ${String(item.is_demo)})`,
      );
    }
  }
}

const STATIC_ROUTES = [
  "/",
  "/a-propos",
  "/solutions",
  "/services",
  "/realisations",
  "/actualites",
  "/contact",
];
for (const route of STATIC_ROUTES) checkPage(route);
checkPage("/mentions-legales", { noindex: true });

if (API) {
  const solutions = await allItems("solutions");
  checkNoDemoItems("solutions", solutions, (solution) => `/solutions/${solution.slug}`);
  for (const solution of solutions) {
    checkPage(`/solutions/${solution.slug}`, { expectInH1: solution.name });
  }

  const articles = await allItems("articles");
  checkNoDemoItems("articles", articles, (article) => `/actualites/${article.slug}`);
  for (const article of articles) {
    checkPage(`/actualites/${article.slug}`, { expectInH1: article.title });
  }

  checkNoDemoItems("services", await allItems("services"), () => "/services");
  checkNoDemoItems("projects", await allItems("projects"), () => "/realisations");
} else {
  fail("(api)", "API_INTERNAL_URL absente : routes dynamiques non vérifiées");
}

const sitemapFile = join(BUILD_DIR, "sitemap.xml");
if (!existsSync(sitemapFile)) fail("/sitemap.xml", "fichier absent");
else {
  const sitemap = readFileSync(sitemapFile, "utf8");
  if (!sitemap.includes(`<loc>${SITE_URL}/</loc>`)) fail("/sitemap.xml", "page d'accueil absente");
  if (sitemap.includes("mentions-legales"))
    fail("/sitemap.xml", "page noindex présente dans le sitemap");
}
if (!existsSync(join(BUILD_DIR, "robots.txt"))) fail("/robots.txt", "fichier absent");
if (!existsSync(join(BUILD_DIR, "__spa-fallback.html")))
  fail("(fallback)", "__spa-fallback.html absent");

if (failures.length > 0) {
  console.error(`✗ ${failures.length} problème(s) de pré-rendu :\n- ${failures.join("\n- ")}`);
  process.exit(1);
}
console.log(
  "✓ Pré-rendu conforme : HTML complet, métadonnées, canoniques, sitemap et robots.txt vérifiés.",
);

#!/usr/bin/env node
/**
 * Génère sitemap.xml et robots.txt à partir des pages réellement pré-rendues.
 * - Les pages marquées « noindex » sont exclues du sitemap.
 * - DISALLOW_INDEXING=true produit un robots.txt qui interdit tout (préproduction).
 */
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, relative, sep } from "node:path";

const BUILD_DIR = join(import.meta.dirname, "..", "build", "client");
const configuredSiteUrl = process.env.VITE_SITE_URL;
if (!configuredSiteUrl) {
  throw new Error("VITE_SITE_URL doit être défini pour générer le sitemap.");
}
const SITE_URL = configuredSiteUrl.replace(/\/+$/, "");

function* walk(dir) {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) yield* walk(path);
    else yield path;
  }
}

const routes = [];
for (const file of walk(BUILD_DIR)) {
  if (!file.endsWith("index.html")) continue;
  const html = readFileSync(file, "utf8");
  if (/<meta name="robots" content="[^"]*noindex/i.test(html)) continue;
  const dir = relative(BUILD_DIR, join(file, ".."));
  routes.push(dir === "" ? "/" : `/${dir.split(sep).join("/")}`);
}
routes.sort();

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...routes.map((route) => `  <url><loc>${SITE_URL}${route === "/" ? "/" : route}</loc></url>`),
  "</urlset>",
  "",
].join("\n");
writeFileSync(join(BUILD_DIR, "sitemap.xml"), xml);

const disallowAll = process.env.DISALLOW_INDEXING === "true";
writeFileSync(
  join(BUILD_DIR, "robots.txt"),
  disallowAll
    ? "User-agent: *\nDisallow: /\n"
    : `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
);
console.log(
  `sitemap.xml : ${routes.length} URL(s) | robots.txt : ${disallowAll ? "Disallow all" : "Allow"}`,
);

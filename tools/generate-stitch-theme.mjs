#!/usr/bin/env node
/**
 * Traduit la config Tailwind des maquettes Stitch (script #tailwind-config d'un code.html)
 * en bloc @theme Tailwind 4. Les classes du code Stitch (bg-primary-container,
 * text-headline-lg, p-space-lg...) fonctionnent alors telles quelles dans le projet.
 * Usage : node tools/generate-stitch-theme.mjs design/stitch/jacigreen_accueil_institutional/code.html
 */
import { readFileSync, writeFileSync } from "node:fs";

const [, , htmlPath = "design/stitch/jacigreen_accueil_institutional/code.html"] = process.argv;
const OUT = "frontend/src/styles/stitch-theme.css";
const SKIP_COLORS = new Set(["surface"]); // déjà défini dans tokens.css (même valeur)

const html = readFileSync(htmlPath, "utf8");
const script = html.match(/<script id="tailwind-config">([\s\S]*?)<\/script>/)?.[1];
if (!script) throw new Error("Script #tailwind-config introuvable dans " + htmlPath);
const tailwind = {};
new Function("tailwind", script)(tailwind);
const { colors, spacing, fontFamily, fontSize, borderRadius } = tailwind.config.theme.extend;

const FAMILY = { Inter: "var(--font-sans)", "DM Sans": "var(--font-display)", "Source Serif 4": "var(--font-serif)" };
const family = (names) => FAMILY[String(names[0]).replaceAll('"', "")] ?? "var(--font-sans)";

const lines = [
  "/*",
  " * GÉNÉRÉ par tools/generate-stitch-theme.mjs à partir des maquettes Google Stitch.",
  " * Permet d'utiliser les classes du code Stitch telles quelles (voir design/README.md).",
  " * Ne pas modifier à la main : relancer le script si les maquettes changent.",
  " * Rayons : Stitch redéfinit aussi `rounded` (0,125rem) et `rounded-full` (0,75rem) ;",
  " * ces deux-là ne passent pas par le thème Tailwind 4 : utiliser rounded-sm ou rounded-lg.",
  " */",
  "@theme {",
  "  /* Couleurs (rôles type Material) */",
  ...Object.entries(colors).filter(([k]) => !SKIP_COLORS.has(k)).map(([k, v]) => `  --color-${k}: ${v};`),
  "",
  "  /* Espacements nommés : p-space-lg, gap-gutter, px-margin... */",
  ...Object.entries(spacing).map(([k, v]) => `  --spacing-${k}: ${v};`),
  "",
  "  /* Familles : font-headline-lg, font-body-md, font-quote-editorial... */",
  ...Object.entries(fontFamily).map(([k, v]) => `  --font-${k}: ${family(v)};`),
  "",
  "  /* Tailles : text-headline-lg, text-body-md, text-label-md... */",
  ...Object.entries(fontSize).flatMap(([k, [size, o]]) => [
    `  --text-${k}: ${size};`,
    `  --text-${k}--line-height: ${o.lineHeight};`,
    ...(o.letterSpacing ? [`  --text-${k}--letter-spacing: ${o.letterSpacing};`] : []),
    ...(o.fontWeight ? [`  --text-${k}--font-weight: ${o.fontWeight};`] : []),
  ]),
  "",
  "  /* Rayons */",
  `  --radius-lg: ${borderRadius.lg};`,
  `  --radius-xl: ${borderRadius.xl};`,
  "}",
  "",
];
writeFileSync(OUT, lines.join("\n"));
console.log(`${OUT} : ${Object.keys(colors).length} couleurs, ${Object.keys(fontSize).length} tailles, ${Object.keys(spacing).length} espacements`);

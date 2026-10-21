import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { THEME_COLOR } from "~/lib/site";

const css = readFileSync(join(import.meta.dirname, "tokens.css"), "utf8");
const colors = new Map<string, string>(
  [...css.matchAll(/--color-([a-z-]+):\s*(#[0-9a-fA-F]{6})/g)].map((m) => [m[1] ?? "", m[2] ?? ""]),
);

function luminance(hex: string): number {
  const channels = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const [r = 0, g = 0, b = 0] = channels.map((c) =>
    c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4,
  );
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(foreground: string, background: string): number {
  const fg = colors.get(foreground);
  const bg = colors.get(background);
  if (!fg || !bg) throw new Error(`Token inconnu : ${foreground} ou ${background}`);
  const [light, dark] = [luminance(fg), luminance(bg)].sort((a, b) => b - a);
  return ((light ?? 0) + 0.05) / ((dark ?? 0) + 0.05);
}

/** [texte, fond, ratio minimal] : 4,5 pour le texte courant, 3 pour les composants d'interface (WCAG 2.2 AA). */
const REQUIRED_PAIRS: ReadonlyArray<readonly [string, string, number]> = [
  ["ink", "surface", 4.5],
  ["ink", "surface-alt", 4.5],
  ["ink", "surface-raised", 4.5],
  ["ink-muted", "surface", 4.5],
  ["ink-muted", "surface-alt", 4.5],
  ["brand", "surface", 4.5],
  ["brand", "surface-alt", 4.5],
  ["on-brand", "brand", 4.5],
  ["accent", "surface", 4.5],
  ["accent", "surface-alt", 4.5],
  ["ochre-text", "surface", 4.5],
  ["ochre-text", "surface-alt", 4.5],
  ["on-ochre-strong", "ochre-strong", 4.5],
  ["magenta-text", "surface", 4.5],
  ["danger", "surface", 4.5],
  ["danger", "surface-raised", 4.5],
  ["surface-raised", "danger", 4.5],
  ["success", "surface-raised", 4.5],
  ["border-strong", "surface-raised", 3],
  ["focus", "surface", 3],
  ["focus-on-dark", "brand", 3],
];

describe("design tokens : contrastes WCAG 2.2 AA", () => {
  it.each(REQUIRED_PAIRS)("%s sur %s atteint au moins %s:1", (foreground, background, minimum) => {
    expect(contrast(foreground, background)).toBeGreaterThanOrEqual(minimum);
  });

  it("documente les couleurs décoratives qui échouent en texte (garde-fou)", () => {
    expect(contrast("ochre", "surface")).toBeLessThan(4.5);
    expect(contrast("logo-magenta", "surface")).toBeLessThan(4.5);
  });
});

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) return sourceFiles(path);
    return path.endsWith(".tsx") ? [path] : [];
  });
}

describe("cohérence des constantes dupliquées", () => {
  it("THEME_COLOR (balise meta) égale le token brand", () => {
    expect(THEME_COLOR.toLowerCase()).toBe(colors.get("brand")?.toLowerCase());
  });
});

describe("usage des tokens dans les composants", () => {
  const files = sourceFiles(join(import.meta.dirname, ".."));

  it("n'utilise pas les couleurs décoratives en couleur de texte", () => {
    for (const file of files) {
      const content = readFileSync(file, "utf8");
      expect(content, file).not.toMatch(/text-(ochre|logo-green|logo-magenta|logo-grey)(?![-\w])/);
    }
  });

  it("n'écrit aucune couleur hexadécimale en dur", () => {
    for (const file of files) {
      expect(readFileSync(file, "utf8"), file).not.toMatch(/#[0-9a-fA-F]{6}\b/);
    }
  });
});

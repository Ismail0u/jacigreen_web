#!/usr/bin/env node
/**
 * Génère de vraies captures d'écran (bureau 1440 px et mobile 390 px) de chaque maquette Stitch,
 * pour que Copilot Chat puisse « voir » le design en haute définition.
 * Nécessite Internet (les maquettes chargent Tailwind et les polices depuis des CDN).
 * Usage (depuis la racine du dépôt) :  npx playwright install chromium   puis   node design/render-screens.mjs
 */
import { spawnSync } from "node:child_process";
import { existsSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = resolve("design/stitch");
const SIZES = [
  ["desktop", "1440,900"],
  ["mobile", "390,844"],
];

for (const dir of readdirSync(ROOT).filter((name) => name.startsWith("jacigreen_"))) {
  const html = join(ROOT, dir, "code.html");
  if (!existsSync(html)) continue;
  for (const [label, size] of SIZES) {
    const out = join(ROOT, dir, `${label}.png`);
    const result = spawnSync(
      "npx",
      ["playwright", "screenshot", "--full-page", `--viewport-size=${size}`, "--wait-for-timeout=2500", pathToFileURL(html).href, out],
      { stdio: "inherit", shell: process.platform === "win32" },
    );
    console.log(result.status === 0 ? `✓ ${dir}/${label}.png` : `✗ échec : ${dir} (${label})`);
  }
}

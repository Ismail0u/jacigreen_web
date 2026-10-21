/**
 * Accès centralisé à la configuration. Les variables VITE_* sont publiques.
 * API_INTERNAL_URL n'existe que côté Node (build, développement) : elle permet aux
 * loaders de joindre l'API par le réseau interne (ex. http://backend:8000 sous Docker).
 */

function trimTrailingSlash(value: string): string {
  return value.replace(/\/+$/, "");
}

/** URL de l'API pour l'environnement courant (serveur de build ou navigateur). */
export function getApiBaseUrl(): string {
  const internal = typeof process === "undefined" ? undefined : process.env.API_INTERNAL_URL;
  const url = internal ?? import.meta.env.VITE_API_URL;
  if (!url) {
    throw new Error("VITE_API_URL n'est pas défini (voir frontend/.env.example).");
  }
  return trimTrailingSlash(url);
}

/** URL publique du site (liens canoniques, Open Graph, sitemap). */
export function getSiteUrl(): string {
  return trimTrailingSlash(import.meta.env.VITE_SITE_URL ?? "http://localhost:5173");
}

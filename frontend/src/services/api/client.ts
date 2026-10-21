import { getApiBaseUrl } from "~/lib/env";
import type { ApiErrorBody } from "~/types/api";

const DEFAULT_TIMEOUT_MS = 10_000;

/** Erreur normalisée de l'API : le code et le message viennent du backend (format uniforme). */
export class ApiError extends Error {
  readonly status: number;
  readonly code: string;
  readonly details: Record<string, string[]> | null;

  constructor(
    status: number,
    code: string,
    message: string,
    details: Record<string, string[]> | null = null,
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

function isApiErrorBody(value: unknown): value is ApiErrorBody {
  return typeof value === "object" && value !== null && "error" in value;
}

export interface RequestOptions {
  method?: "GET" | "POST";
  body?: unknown;
  signal?: AbortSignal;
}

/** Point d'entrée UNIQUE des appels HTTP vers l'API (aucun fetch dispersé dans les composants). */
export async function apiFetch<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = "GET", body, signal } = options;
  const timeout = AbortSignal.timeout(DEFAULT_TIMEOUT_MS);
  let response: Response;
  try {
    response = await fetch(`${getApiBaseUrl()}${path}`, {
      method,
      headers: {
        Accept: "application/json",
        ...(body === undefined ? {} : { "Content-Type": "application/json" }),
      },
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: signal ? AbortSignal.any([signal, timeout]) : timeout,
    });
  } catch {
    throw new ApiError(
      0,
      "network_error",
      "Le serveur est injoignable. Réessayez dans un instant.",
    );
  }

  const payload: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    if (isApiErrorBody(payload)) {
      const { code, message, details } = payload.error;
      throw new ApiError(response.status, code, message, details);
    }
    throw new ApiError(response.status, "http_error", `Erreur HTTP ${response.status}.`);
  }
  return payload as T;
}

/** Récupère toutes les pages d'une ressource paginée (pour les listes complètes pré-rendues). */
export async function fetchAllPages<T>(path: string): Promise<T[]> {
  const items: T[] = [];
  let next: string | null = `${path}${path.includes("?") ? "&" : "?"}page_size=50`;
  while (next) {
    const pageData: { results: T[]; next: string | null } = await apiFetch(next);
    items.push(...pageData.results);
    next = pageData.next ? pageData.next.replace(getApiBaseUrl(), "") : null;
  }
  return items;
}

import { getApiBaseUrl } from "~/lib/env";
import type { ApiErrorBody } from "~/types/api";

const DEFAULT_TIMEOUT_MS = 10_000;
const MAX_GET_ATTEMPTS = 2;
const RETRYABLE_STATUSES = new Set([502, 503, 504]);

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

function normalizeAbortReason(reason: unknown, fallback: Error): Error {
  if (reason instanceof Error) {
    return reason;
  }
  return fallback instanceof DOMException ? fallback : new DOMException("Aborted", "AbortError");
}

function retryDelay(attempt: number, signal?: AbortSignal): Promise<void> {
  const delay = 250 * 2 ** attempt + Math.floor(Math.random() * 250);
  if (signal?.aborted) {
    return Promise.reject(
      normalizeAbortReason(signal.reason, new DOMException("Aborted", "AbortError")),
    );
  }

  return new Promise((resolve, reject) => {
    const finish = () => {
      signal?.removeEventListener("abort", abort);
      resolve();
    };
    const abort = () => {
      clearTimeout(timer);
      signal?.removeEventListener("abort", abort);
      reject(
        normalizeAbortReason(signal?.reason, new DOMException("Aborted", "AbortError")),
      );
    };
    const timer = setTimeout(finish, delay);
    signal?.addEventListener("abort", abort, { once: true });
  });
}

function isRetryableRequestError(error: ApiError): boolean {
  return error.code === "network_error" || error.code === "timeout_error";
}

async function parseResponse(response: Response): Promise<unknown> {
  try {
    return await response.json();
  } catch (error) {
    if (response.ok) {
      throw new ApiError(
        response.status,
        "invalid_response",
        "Le serveur a renvoyé une réponse illisible.",
      );
    }
    if (error instanceof SyntaxError) return null;
    throw error;
  }
}

/** Point d'entrée UNIQUE des appels HTTP vers l'API (aucun fetch dispersé dans les composants). */
export async function apiFetch<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = "GET", body, signal } = options;
  const attempts = method === "GET" ? MAX_GET_ATTEMPTS : 1;

  for (let attempt = 0; attempt < attempts; attempt += 1) {
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
    } catch (error) {
      if (signal?.aborted) {
        throw normalizeAbortReason(signal.reason, error instanceof Error ? error : new Error("Aborted"));
      }

      const requestError = timeout.aborted
        ? new ApiError(0, "timeout_error", "Le serveur met trop de temps à répondre.")
        : error instanceof TypeError
          ? new ApiError(
              0,
              "network_error",
              "Le serveur est injoignable. Réessayez dans un instant.",
            )
          : null;

      if (!requestError) throw error;
      if (attempt + 1 < attempts && isRetryableRequestError(requestError)) {
        await retryDelay(attempt, signal);
        continue;
      }
      throw requestError;
    }

    if (
      method === "GET" &&
      RETRYABLE_STATUSES.has(response.status) &&
      attempt + 1 < attempts
    ) {
      if (response.body) await response.body.cancel();
      await retryDelay(attempt, signal);
      continue;
    }

    const payload = await parseResponse(response);
    if (!response.ok) {
      if (isApiErrorBody(payload)) {
        const { code, message, details } = payload.error;
        throw new ApiError(response.status, code, message, details);
      }
      throw new ApiError(response.status, "http_error", `Erreur HTTP ${response.status}.`);
    }
    return payload as T;
  }

  throw new Error("La requête API s'est terminée sans réponse.");
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

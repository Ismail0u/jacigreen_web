import { getApiBaseUrl } from "~/lib/env";
import type { ApiErrorBody, Paginated } from "~/types/api";

const DEFAULT_TIMEOUT_MS = 20_000;
const DEFAULT_POST_TIMEOUT_MS = 10_000;
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

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isErrorDetails(value: unknown): value is Record<string, string[]> {
  return (
    isRecord(value) &&
    Object.values(value).every(
      (messages) =>
        Array.isArray(messages) && messages.every((message) => typeof message === "string"),
    )
  );
}

function isApiErrorBody(value: unknown): value is ApiErrorBody {
  if (!isRecord(value) || !isRecord(value.error)) return false;
  const { code, message, details } = value.error;
  return (
    typeof code === "string" &&
    typeof message === "string" &&
    (details === null || isErrorDetails(details))
  );
}

export interface RequestOptions {
  method?: "GET" | "POST";
  body?: unknown;
  signal?: AbortSignal;
  timeoutMs?: number;
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
      reject(normalizeAbortReason(signal?.reason, new DOMException("Aborted", "AbortError")));
    };
    const timer = setTimeout(finish, delay);
    signal?.addEventListener("abort", abort, { once: true });
    if (signal?.aborted) abort();
  });
}

function isRetryableRequestError(error: ApiError): boolean {
  return error.code === "network_error";
}

async function parseResponse(response: Response): Promise<unknown> {
  try {
    return await response.json();
  } catch (error) {
    if (error instanceof SyntaxError && response.ok) {
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

function isPaginatedResponse(value: unknown): value is Paginated<unknown> {
  if (typeof value !== "object" || value === null) return false;
  if (
    !("count" in value) ||
    !("next" in value) ||
    !("previous" in value) ||
    !("results" in value)
  ) {
    return false;
  }
  return (
    typeof value.count === "number" &&
    (typeof value.next === "string" || value.next === null) &&
    (typeof value.previous === "string" || value.previous === null) &&
    Array.isArray(value.results)
  );
}

function withPageSize(path: string): string {
  const url = new URL(path, `${getApiBaseUrl()}/`);
  if (!url.searchParams.has("page_size")) url.searchParams.set("page_size", "50");
  return `${url.pathname}${url.search}`;
}

function normalizeNextPageUrl(next: string): string {
  try {
    const url = new URL(next, `${getApiBaseUrl()}/`);
    if (!url.pathname.startsWith("/api/v1/")) {
      throw new Error("Pagination URL is outside the API.");
    }
    return `${url.pathname}${url.search}`;
  } catch {
    throw new ApiError(
      200,
      "invalid_response",
      "Le serveur a renvoyé un lien de pagination invalide.",
    );
  }
}

/** Point d'entrée UNIQUE des appels HTTP vers l'API (aucun fetch dispersé dans les composants). */
export async function apiFetch<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = "GET", body, signal } = options;
  const timeoutMs =
    options.timeoutMs ?? (method === "GET" ? DEFAULT_TIMEOUT_MS : DEFAULT_POST_TIMEOUT_MS);
  if (!Number.isFinite(timeoutMs) || timeoutMs <= 0) {
    throw new RangeError("timeoutMs doit être un nombre positif.");
  }
  const attempts = method === "GET" ? MAX_GET_ATTEMPTS : 1;

  for (let attempt = 0; attempt < attempts; attempt += 1) {
    const timeoutController = new AbortController();
    const timer = setTimeout(() => {
      timeoutController.abort(new DOMException("Timeout", "TimeoutError"));
    }, timeoutMs);
    const requestSignal = signal
      ? AbortSignal.any([signal, timeoutController.signal])
      : timeoutController.signal;
    let result: { response: Response; payload: unknown };

    try {
      const response = await fetch(`${getApiBaseUrl()}${path}`, {
        method,
        headers: {
          Accept: "application/json",
          ...(body === undefined ? {} : { "Content-Type": "application/json" }),
        },
        body: body === undefined ? undefined : JSON.stringify(body),
        signal: requestSignal,
      });
      const isRetryableStatus =
        method === "GET" && RETRYABLE_STATUSES.has(response.status) && attempt + 1 < attempts;
      result = {
        response,
        payload: isRetryableStatus ? null : await parseResponse(response),
      };
    } catch (error) {
      if (signal?.aborted) {
        throw normalizeAbortReason(
          signal.reason,
          error instanceof Error ? error : new Error("Aborted"),
        );
      }

      const requestError = timeoutController.signal.aborted
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
    } finally {
      clearTimeout(timer);
    }

    const { response, payload } = result;
    if (method === "GET" && RETRYABLE_STATUSES.has(response.status) && attempt + 1 < attempts) {
      if (response.body) await response.body.cancel();
      await retryDelay(attempt, signal);
      continue;
    }

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

/** Récupère une page DRF en vérifiant le contrat de pagination documenté. */
export async function fetchPage<T>(path: string): Promise<Paginated<T>> {
  const payload = await apiFetch<unknown>(path);
  if (!isPaginatedResponse(payload)) {
    throw new ApiError(
      200,
      "invalid_response",
      "Le serveur a renvoyé une liste incompatible avec le format attendu.",
    );
  }
  return payload as Paginated<T>;
}

/** Récupère toutes les pages d'une ressource paginée (pour les listes complètes pré-rendues). */
export async function fetchAllPages<T>(path: string): Promise<T[]> {
  const items: T[] = [];
  const visited = new Set<string>();
  let next: string | null = withPageSize(path);
  while (next) {
    if (visited.has(next)) {
      throw new ApiError(
        200,
        "invalid_response",
        "Le serveur a renvoyé une pagination qui boucle.",
      );
    }
    visited.add(next);
    const pageData: Paginated<T> = await fetchPage<T>(next);
    items.push(...pageData.results);
    next = pageData.next ? normalizeNextPageUrl(pageData.next) : null;
  }
  return items;
}

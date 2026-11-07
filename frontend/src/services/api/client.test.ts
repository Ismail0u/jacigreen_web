import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ApiError, apiFetch, fetchAllPages } from "./client";

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

const page = <T>(results: T[], next: string | null = null) => ({
  count: results.length,
  next,
  previous: null,
  results,
});

describe("apiFetch", () => {
  beforeEach(() => {
    vi.stubEnv("VITE_API_URL", "https://api.exemple.test/");
    delete process.env.API_INTERNAL_URL;
  });
  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("appelle l'URL de base normalisée et renvoie le JSON", async () => {
    const fetchMock = vi.fn().mockResolvedValue(json({ ok: true }));
    vi.stubGlobal("fetch", fetchMock);
    await expect(apiFetch("/api/v1/health/")).resolves.toEqual({ ok: true });
    expect(fetchMock.mock.calls[0]?.[0]).toBe("https://api.exemple.test/api/v1/health/");
  });

  it("préfère API_INTERNAL_URL côté Node", async () => {
    process.env.API_INTERNAL_URL = "http://backend:8000";
    const fetchMock = vi.fn().mockResolvedValue(json({}));
    vi.stubGlobal("fetch", fetchMock);
    await apiFetch("/x/");
    expect(fetchMock.mock.calls[0]?.[0]).toBe("http://backend:8000/x/");
    delete process.env.API_INTERNAL_URL;
  });

  it("convertit une erreur du format uniforme en ApiError", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        json(
          {
            error: {
              code: "validation_error",
              message: "Invalide",
              details: { email: ["Mauvais"] },
            },
          },
          400,
        ),
      ),
    );
    const error = await apiFetch("/x/").catch((e: unknown) => e);
    expect(error).toBeInstanceOf(ApiError);
    expect(error).toMatchObject({
      status: 400,
      code: "validation_error",
      details: { email: ["Mauvais"] },
    });
  });

  it("réessaie une fois une réponse temporaire sur GET", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0);
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(new Response("indisponible", { status: 503 }))
      .mockResolvedValueOnce(json({ ok: true }));
    vi.stubGlobal("fetch", fetchMock);
    await expect(apiFetch("/x/")).resolves.toEqual({ ok: true });
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("réessaie une fois les erreurs réseau des GET puis signale l'échec", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0);
    const fetchMock = vi
      .fn()
      .mockRejectedValueOnce(new TypeError("fetch failed"))
      .mockRejectedValueOnce(new TypeError("fetch failed"));
    vi.stubGlobal("fetch", fetchMock);
    await expect(apiFetch("/x/")).rejects.toMatchObject({
      status: 0,
      code: "network_error",
    });
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("distingue un délai dépassé d'une erreur réseau", async () => {
    vi.useFakeTimers();
    const fetchMock = vi.fn(
      (_url: RequestInfo | URL, init?: RequestInit) =>
        new Promise<Response>((_resolve, reject) => {
          init?.signal?.addEventListener(
            "abort",
            () => {
              reject(new DOMException("Aborted", "AbortError"));
            },
            {
              once: true,
            },
          );
        }),
    );
    vi.stubGlobal("fetch", fetchMock);
    const request = apiFetch("/x/", { timeoutMs: 25 });
    const assertion = expect(request).rejects.toMatchObject({
      status: 0,
      code: "timeout_error",
    });
    await vi.advanceTimersByTimeAsync(25);
    await assertion;
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("applique le délai configuré aussi à la lecture du corps", async () => {
    vi.useFakeTimers();
    const fetchMock = vi.fn((_url: RequestInfo | URL, init?: RequestInit) => {
      const response = json({ ok: true });
      vi.spyOn(response, "json").mockImplementation(
        () =>
          new Promise<unknown>((_resolve, reject) => {
            init?.signal?.addEventListener(
              "abort",
              () => {
                reject(new DOMException("Aborted", "AbortError"));
              },
              {
                once: true,
              },
            );
          }),
      );
      return Promise.resolve(response);
    });
    vi.stubGlobal("fetch", fetchMock);
    const request = apiFetch("/x/", { timeoutMs: 25 });
    const assertion = expect(request).rejects.toMatchObject({
      status: 0,
      code: "timeout_error",
    });
    await vi.advanceTimersByTimeAsync(25);
    await assertion;
  });

  it("préserve l'annulation du demandeur sans la convertir en erreur réseau", async () => {
    const controller = new AbortController();
    const abortError = new DOMException("aborted", "AbortError");
    controller.abort(abortError);
    const fetchMock = vi.fn((_url: RequestInfo | URL, init?: RequestInit) => {
      const reason =
        init?.signal?.reason instanceof Error
          ? init.signal.reason
          : new DOMException("aborted", "AbortError");
      return Promise.reject(reason);
    });
    vi.stubGlobal("fetch", fetchMock);
    await expect(apiFetch("/x/", { signal: controller.signal })).rejects.toMatchObject({
      name: "AbortError",
    });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("signale une réponse JSON illisible au lieu de renvoyer une valeur vide", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("{", { status: 200 })));
    await expect(apiFetch("/x/")).rejects.toMatchObject({
      status: 200,
      code: "invalid_response",
    });
  });

  it("envoie le corps en JSON pour un POST", async () => {
    const fetchMock = vi.fn().mockResolvedValue(json({ detail: "ok" }, 201));
    vi.stubGlobal("fetch", fetchMock);
    await apiFetch("/x/", { method: "POST", body: { a: 1 } });
    const init = fetchMock.mock.calls[0]?.[1] as RequestInit;
    expect(init.method).toBe("POST");
    expect(init.body).toBe('{"a":1}');
  });

  it("ne rejoue pas un POST après une erreur réseau", async () => {
    const fetchMock = vi.fn().mockRejectedValue(new TypeError("fetch failed"));
    vi.stubGlobal("fetch", fetchMock);
    await expect(apiFetch("/x/", { method: "POST", body: { a: 1 } })).rejects.toMatchObject({
      status: 0,
      code: "network_error",
    });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("ne rejoue pas une erreur client", async () => {
    const fetchMock = vi.fn().mockResolvedValue(json({ error: {} }, 400));
    vi.stubGlobal("fetch", fetchMock);
    await expect(apiFetch("/x/")).rejects.toMatchObject({
      status: 400,
      code: "http_error",
    });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});

describe("fetchAllPages", () => {
  it("suit les pages suivantes jusqu'à la fin", async () => {
    vi.stubEnv("VITE_API_URL", "https://api.exemple.test");
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(json(page([1, 2], "https://api.exemple.test/api/v1/s/?page=2")))
      .mockResolvedValueOnce(json(page([3])));
    vi.stubGlobal("fetch", fetchMock);
    await expect(fetchAllPages<number>("/api/v1/s/")).resolves.toEqual([1, 2, 3]);
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock.mock.calls[0]?.[0]).toBe("https://api.exemple.test/api/v1/s/?page_size=50");
    expect(fetchMock.mock.calls[1]?.[0]).toBe("https://api.exemple.test/api/v1/s/?page=2");
  });

  it("signale une enveloppe incompatible plutôt qu'une erreur de propagation", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(json({ results: "invalid" })));
    await expect(fetchAllPages<number>("/api/v1/s/")).rejects.toMatchObject({
      status: 200,
      code: "invalid_response",
    });
  });

  it("ajoute la taille de page sans dupliquer une valeur existante", async () => {
    const fetchMock = vi.fn().mockResolvedValue(json(page([1])));
    vi.stubGlobal("fetch", fetchMock);
    await expect(fetchAllPages<number>("/api/v1/s/?page_size=10")).resolves.toEqual([1]);
    expect(fetchMock.mock.calls[0]?.[0]).toBe("https://api.exemple.test/api/v1/s/?page_size=10");
  });
});

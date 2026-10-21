import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ApiError, apiFetch, fetchAllPages } from "./client";

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

describe("apiFetch", () => {
  beforeEach(() => {
    vi.stubEnv("VITE_API_URL", "https://api.exemple.test/");
    delete process.env.API_INTERNAL_URL;
  });
  afterEach(() => {
    vi.unstubAllGlobals();
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

  it("gère une réponse d'erreur sans corps JSON", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("boom", { status: 502 })));
    await expect(apiFetch("/x/")).rejects.toMatchObject({ status: 502, code: "http_error" });
  });

  it("signale une erreur réseau sans exposer de détail technique", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("fetch failed")));
    await expect(apiFetch("/x/")).rejects.toMatchObject({ status: 0, code: "network_error" });
  });

  it("envoie le corps en JSON pour un POST", async () => {
    const fetchMock = vi.fn().mockResolvedValue(json({ detail: "ok" }, 201));
    vi.stubGlobal("fetch", fetchMock);
    await apiFetch("/x/", { method: "POST", body: { a: 1 } });
    const init = fetchMock.mock.calls[0]?.[1] as RequestInit;
    expect(init.method).toBe("POST");
    expect(init.body).toBe('{"a":1}');
  });
});

describe("fetchAllPages", () => {
  it("suit les pages suivantes jusqu'à la fin", async () => {
    vi.stubEnv("VITE_API_URL", "https://api.exemple.test");
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        json({ results: [1, 2], next: "https://api.exemple.test/api/v1/s/?page=2" }),
      )
      .mockResolvedValueOnce(json({ results: [3], next: null }));
    vi.stubGlobal("fetch", fetchMock);
    await expect(fetchAllPages<number>("/api/v1/s/")).resolves.toEqual([1, 2, 3]);
    expect(fetchMock).toHaveBeenCalledTimes(2);
    vi.unstubAllGlobals();
  });
});

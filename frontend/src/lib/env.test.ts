import { beforeEach, describe, expect, it, vi } from "vitest";

import { getSiteUrl } from "./env";

describe("getSiteUrl", () => {
  beforeEach(() => {
    vi.stubEnv("VITE_SITE_URL", "https://site.example.test/");
  });

  it("normalise les barres finales de l’URL publique", () => {
    expect(getSiteUrl()).toBe("https://site.example.test");
  });

  it("échoue si l’URL publique n’est pas configurée", () => {
    vi.stubEnv("VITE_SITE_URL", "");
    expect(() => getSiteUrl()).toThrow(/VITE_SITE_URL/);
  });
});

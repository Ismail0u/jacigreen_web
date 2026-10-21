import { describe, expect, it } from "vitest";

import { formatDate, toParagraphs } from "./format";

describe("toParagraphs", () => {
  it("découpe sur les lignes vides et ignore les blocs vides", () => {
    expect(toParagraphs("Un\n\nDeux\n   \n\nTrois\n")).toEqual(["Un", "Deux", "Trois"]);
  });

  it("ne transforme pas le HTML (le rendu est échappé par React)", () => {
    expect(toParagraphs("<script>alert(1)</script>")).toEqual(["<script>alert(1)</script>"]);
  });
});

describe("formatDate", () => {
  it("formate en français", () => {
    expect(formatDate("2026-10-15T09:00:00Z")).toBe("15 octobre 2026");
  });

  it("retourne une chaîne vide sans date", () => {
    expect(formatDate(null)).toBe("");
  });
});

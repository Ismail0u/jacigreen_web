import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { MediaFrame } from "./MediaFrame";

describe("MediaFrame", () => {
  it("affiche un emplacement décoratif sans source", () => {
    render(<MediaFrame alt="" aspect="4/3" icon="water_drop" />);

    expect(screen.getByText("water_drop")).toBeInTheDocument();
    expect(document.querySelector("[data-placeholder]")).toHaveAttribute("aria-hidden", "true");
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("dimensionne et charge une source en fonction de sa priorité", () => {
    render(
      <MediaFrame src="/images/validated-photo.jpg" alt="Photo validée" aspect="16/9" priority />,
    );

    expect(screen.getByRole("img", { name: "Photo validée" })).toHaveAttribute("loading", "eager");
    expect(screen.getByRole("img")).toHaveAttribute("decoding", "async");
    expect(screen.getByRole("img")).toHaveAttribute("width", "1600");
    expect(screen.getByRole("img")).toHaveAttribute("height", "900");
  });
});

function tsxFiles(directory: string): string[] {
  return readdirSync(directory).flatMap((entry) => {
    const path = join(directory, entry);
    if (statSync(path).isDirectory()) return tsxFiles(path);
    return path.endsWith(".tsx") ? [path] : [];
  });
}

describe("sources d'images du frontend", () => {
  it("n'intègre pas d'URL d'image externe dans les composants TSX", () => {
    const imageTag = /<img\b[^>]*>/gis;
    const srcAttribute = /\bsrc\s*=\s*(?:"[^"]*"|'[^']*'|\{[^}]*\})/is;
    const externalSource = /googleusercontent|https?:\/\//i;
    const files = tsxFiles(join(import.meta.dirname, "../.."));

    for (const file of files) {
      const source = readFileSync(file, "utf8");
      for (const [tag] of source.matchAll(imageTag)) {
        const src = tag.match(srcAttribute)?.[0];
        if (src) expect(src, file).not.toMatch(externalSource);
      }
    }
  });
});

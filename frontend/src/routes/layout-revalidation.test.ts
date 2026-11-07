import { shouldRevalidate as shouldRevalidateNews } from "./news-layout";
import { shouldRevalidate as shouldRevalidateSolutions } from "./solutions-layout";

import type { ShouldRevalidateFunctionArgs } from "react-router";

const makeArgs = (
  currentSlug: string | undefined,
  nextSlug: string | undefined,
  defaultShouldRevalidate: boolean,
): ShouldRevalidateFunctionArgs => ({
  currentUrl: new URL("https://example.test/"),
  currentParams: { slug: currentSlug },
  nextUrl: new URL("https://example.test/"),
  nextParams: { slug: nextSlug },
  defaultShouldRevalidate,
});

describe.each([
  ["solutions", shouldRevalidateSolutions],
  ["news", shouldRevalidateNews],
])("%s layout revalidation", (_name, shouldRevalidate) => {
  it("revalidates when navigating between the index and a slug", () => {
    expect(shouldRevalidate(makeArgs(undefined, "entry", false))).toBe(true);
    expect(shouldRevalidate(makeArgs("entry", undefined, false))).toBe(true);
  });

  it("revalidates when navigating between different slugs", () => {
    expect(shouldRevalidate(makeArgs("first", "second", false))).toBe(true);
  });

  it("preserves React Router's default decision when the slug is unchanged", () => {
    expect(shouldRevalidate(makeArgs("entry", "entry", false))).toBe(false);
    expect(shouldRevalidate(makeArgs("entry", "entry", true))).toBe(true);
  });
});

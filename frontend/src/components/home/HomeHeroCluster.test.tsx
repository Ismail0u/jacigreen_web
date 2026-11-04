import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HomeHeroCluster } from "./HomeHeroCluster";

describe("HomeHeroCluster", () => {
  it("présente trois photos descriptives et charge d'abord le visuel principal", () => {
    render(<HomeHeroCluster />);

    const cluster = screen.getByRole("group", {
      name: "Photos de biofertilisant, de biodigesteur et de récolte",
    });
    const images = within(cluster).getAllByRole("img");

    expect(images).toHaveLength(3);
    expect(images[0]).toHaveAccessibleName(
      "Du biofertilisant est recueilli dans un bassin sur un site maraîcher.",
    );
    expect(images[0]).toHaveAttribute("loading", "eager");
    expect(images[1]).toHaveAttribute("loading", "lazy");
    expect(images[2]).toHaveAttribute("loading", "lazy");
  });
});

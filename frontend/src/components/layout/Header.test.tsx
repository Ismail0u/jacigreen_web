import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";

import { MAIN_NAV } from "~/lib/site";

import { Header } from "./Header";

const setup = () =>
  render(
    <MemoryRouter initialEntries={["/solutions"]}>
      <Header />
    </MemoryRouter>,
  );

describe("Header", () => {
  it("expose tous les liens de navigation principaux", () => {
    setup();
    for (const item of MAIN_NAV) {
      expect(screen.getAllByRole("link", { name: item.label }).length).toBeGreaterThan(0);
    }
  });

  it("indique la page courante avec aria-current", () => {
    setup();
    const current = screen.getAllByRole("link", { name: "Solutions" });
    expect(current.some((link) => link.getAttribute("aria-current") === "page")).toBe(true);
  });

  it("ouvre et ferme le menu mobile (bouton et touche Échap)", async () => {
    const user = userEvent.setup();
    setup();
    const toggle = screen.getByRole("button", { name: "Menu" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    await user.click(toggle);
    expect(screen.getByRole("button", { name: "Fermer" })).toHaveAttribute("aria-expanded", "true");
    await user.keyboard("{Escape}");
    expect(screen.getByRole("button", { name: "Menu" })).toHaveAttribute("aria-expanded", "false");
  });
});

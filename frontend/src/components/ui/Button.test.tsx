import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { describe, expect, it, vi } from "vitest";

import { Button, ButtonLink } from "./Button";

describe("Button", () => {
  it("déclenche onClick et reste de type button par défaut", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Valider</Button>);
    const button = screen.getByRole("button", { name: "Valider" });
    expect(button).toHaveAttribute("type", "button");
    await userEvent.click(button);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("ne se déclenche pas quand il est désactivé", async () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Envoyer
      </Button>,
    );
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });
});

describe("ButtonLink", () => {
  it("rend un vrai lien de navigation", () => {
    render(
      <MemoryRouter>
        <ButtonLink to="/contact">Nous contacter</ButtonLink>
      </MemoryRouter>,
    );
    expect(screen.getByRole("link", { name: "Nous contacter" })).toHaveAttribute(
      "href",
      "/contact",
    );
  });
});

import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { afterEach, describe, expect, it, vi } from "vitest";

import { MobileHeroCarousel } from "./MobileHeroCarousel";

function renderCarousel(reducedMotion = false) {
  const preference = {
    matches: reducedMotion,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  };
  vi.stubGlobal(
    "matchMedia",
    vi.fn(() => preference),
  );

  return render(
    <MemoryRouter>
      <MobileHeroCarousel />
    </MemoryRouter>,
  );
}

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("MobileHeroCarousel", () => {
  it("permet de sélectionner une image avec son indicateur", () => {
    renderCarousel();

    const secondSlide = screen.getByRole("button", {
      name: "Afficher l’image 2 : Innovation technologique",
    });
    fireEvent.click(secondSlide);

    expect(secondSlide).toHaveAttribute("aria-current", "true");
    expect(screen.getByText("JACIGREEN — Innovation technologique")).toBeInTheDocument();
  });

  it("désactive la lecture automatique lorsque la réduction des animations est demandée", async () => {
    vi.useFakeTimers();
    renderCarousel(true);

    const firstSlide = screen.getByRole("button", {
      name: "Afficher l’image 1 : Énergie durable",
    });
    expect(
      screen.queryByRole("button", { name: "Mettre le carrousel en pause" }),
    ).not.toBeInTheDocument();

    await act(async () => {
      await vi.advanceTimersByTimeAsync(7000);
    });

    expect(firstSlide).toHaveAttribute("aria-current", "true");
  });

  it("met la lecture automatique en pause quand la navigation clavier entre dans le carrousel", async () => {
    vi.useFakeTimers();
    renderCarousel();

    const firstSlide = screen.getByRole("button", {
      name: "Afficher l’image 1 : Énergie durable",
    });
    fireEvent.focus(firstSlide);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(7000);
    });

    expect(firstSlide).toHaveAttribute("aria-current", "true");
  });

  it("permet de mettre en pause et de reprendre la lecture automatique", async () => {
    vi.useFakeTimers();
    renderCarousel();

    const pauseButton = screen.getByRole("button", { name: "Mettre le carrousel en pause" });
    fireEvent.focus(pauseButton);
    fireEvent.click(pauseButton);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(7000);
    });

    expect(
      screen.getByRole("button", { name: "Afficher l’image 1 : Énergie durable" }),
    ).toHaveAttribute("aria-current", "true");

    fireEvent.click(screen.getByRole("button", { name: "Reprendre le carrousel" }));
    await act(async () => {
      await vi.advanceTimersByTimeAsync(7000);
    });

    expect(
      screen.getByRole("button", { name: "Afficher l’image 2 : Innovation technologique" }),
    ).toHaveAttribute("aria-current", "true");
  });
});

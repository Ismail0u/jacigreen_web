import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { Service } from "~/types/api";

import { ServiceEntry } from "./ServiceEntry";

describe("ServiceEntry", () => {
  it("affiche la description complète fournie par l'API", () => {
    const service: Service = {
      slug: "etudes",
      title: "Études",
      summary: "Résumé du service.",
      description: "Description détaillée du service validé.",
      is_demo: false,
    };

    render(<ServiceEntry service={service} headingLevel="h2" />);

    expect(screen.getByRole("heading", { name: "Études" })).toBeInTheDocument();
    expect(screen.getByText("Description détaillée du service validé.")).toBeInTheDocument();
  });
});

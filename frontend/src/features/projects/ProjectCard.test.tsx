import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ProjectCard } from "./ProjectCard";

describe("ProjectCard", () => {
  it("permet de consulter la description détaillée d'une réalisation", () => {
    render(
      <ProjectCard
        project={{
          slug: "projet-exemple",
          title: "Projet exemple",
          summary: "Résumé public du projet.",
          description: "Détail éditorial complet du projet.",
          country: "NE",
          country_label: "Niger",
          year_start: null,
          year_end: null,
          cover_image: null,
          cover_alt: "",
          is_demo: false,
        }}
      />,
    );

    fireEvent.click(screen.getByText("Lire la description détaillée"));

    expect(screen.getByText("Détail éditorial complet du projet.")).toBeVisible();
  });
});

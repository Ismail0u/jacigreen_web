import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ContentPending } from "./ContentPending";

describe("ContentPending", () => {
  it("identifie explicitement les blocs réservés au contenu à valider", () => {
    render(<ContentPending />);

    expect(screen.getByRole("note")).toHaveTextContent(
      "Contenu en attente de validation éditoriale par JACIGREEN.",
    );
  });
});

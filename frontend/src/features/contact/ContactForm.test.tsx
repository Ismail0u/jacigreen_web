import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { ApiError } from "~/services/api/client";
import * as contactApi from "~/services/api/contact";

import { ContactForm } from "./ContactForm";

const submit = vi.spyOn(contactApi, "submitContactRequest");

async function fillValidForm(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/Nom et prénom/), "Awa Test");
  await user.type(screen.getByLabelText(/Adresse email/), "awa@example.test");
  await user.type(
    screen.getByLabelText(/^Message/),
    "Bonjour, je souhaite recevoir un devis détaillé.",
  );
  await user.click(screen.getByLabelText(/J'accepte/));
}

describe("ContactForm", () => {
  beforeEach(() => {
    submit.mockReset();
  });

  it("affiche des erreurs accessibles et n'appelle pas l'API si le formulaire est vide", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await user.click(screen.getByRole("button", { name: "Envoyer le message" }));
    expect(await screen.findByText("Indiquez votre nom.")).toBeInTheDocument();
    expect(screen.getByLabelText(/Nom et prénom/)).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByLabelText(/Nom et prénom/)).toHaveAccessibleDescription(
      "Indiquez votre nom.",
    );
    expect(submit).not.toHaveBeenCalled();
  });

  it("exige le consentement", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await user.type(screen.getByLabelText(/Nom et prénom/), "Awa Test");
    await user.type(screen.getByLabelText(/Adresse email/), "awa@example.test");
    await user.type(
      screen.getByLabelText(/^Message/),
      "Bonjour, je souhaite recevoir un devis détaillé.",
    );
    await user.click(screen.getByRole("button", { name: "Envoyer le message" }));
    expect(await screen.findByText(/consentement est nécessaire/)).toBeInTheDocument();
    expect(submit).not.toHaveBeenCalled();
  });

  it("envoie les données, confirme le succès et vide le formulaire", async () => {
    submit.mockResolvedValue({ detail: "ok" });
    const user = userEvent.setup();
    render(<ContactForm initialSubject="quote" />);
    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: "Envoyer le message" }));
    expect(await screen.findByText(/votre message a bien été transmis/)).toBeInTheDocument();
    expect(submit).toHaveBeenCalledWith(
      expect.objectContaining({
        subject: "quote",
        email: "awa@example.test",
        consent: true,
        website: "",
      }),
    );
    expect(screen.getByLabelText(/Nom et prénom/)).toHaveValue("");
  });

  it("reporte les erreurs de validation renvoyées par le serveur sur les champs", async () => {
    submit.mockRejectedValue(
      new ApiError(400, "validation_error", "Invalide", { email: ["Cette adresse est refusée."] }),
    );
    const user = userEvent.setup();
    render(<ContactForm />);
    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: "Envoyer le message" }));
    expect(await screen.findByText("Cette adresse est refusée.")).toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveTextContent(/champs sont invalides/);
  });

  it("explique la limitation de débit", async () => {
    submit.mockRejectedValue(new ApiError(429, "throttled", "Throttled"));
    const user = userEvent.setup();
    render(<ContactForm />);
    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: "Envoyer le message" }));
    expect(await screen.findByRole("alert")).toHaveTextContent(/Trop de demandes/);
  });

  it("affiche l'erreur réseau et conserve la saisie pour un nouvel essai", async () => {
    submit.mockRejectedValue(new ApiError(0, "network_error", "Le serveur est injoignable."));
    const user = userEvent.setup();
    render(<ContactForm />);
    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: "Envoyer le message" }));
    expect(await screen.findByRole("alert")).toHaveTextContent("Le serveur est injoignable.");
    await waitFor(() => {
      expect(screen.getByLabelText(/Nom et prénom/)).toHaveValue("Awa Test");
    });
  });
});

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { ApiError } from "~/services/api/client";
import { submitContactRequest } from "~/services/api/contact";
import type { ContactSubject } from "~/types/api";

import { type ContactFormValues, contactSchema } from "./contact-schema";

export type SubmitStatus =
  { state: "idle" } | { state: "success" } | { state: "error"; message: string };

const FIELD_NAMES = ["subject", "name", "email", "organization", "message", "consent"] as const;

export function useContactForm(initialSubject: ContactSubject = "general") {
  const [status, setStatus] = useState<SubmitStatus>({ state: "idle" });
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      subject: initialSubject,
      name: "",
      email: "",
      organization: "",
      message: "",
      consent: false,
      website: "",
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setStatus({ state: "idle" });
    try {
      await submitContactRequest(values);
      form.reset();
      setStatus({ state: "success" });
    } catch (error) {
      if (error instanceof ApiError && error.code === "validation_error" && error.details) {
        for (const field of FIELD_NAMES) {
          const messages = error.details[field];
          if (messages?.[0]) form.setError(field, { message: messages[0] });
        }
        setStatus({
          state: "error",
          message: "Certains champs sont invalides. Vérifiez le formulaire.",
        });
      } else if (error instanceof ApiError && error.status === 429) {
        setStatus({
          state: "error",
          message: "Trop de demandes envoyées. Patientez avant de réessayer.",
        });
      } else {
        setStatus({
          state: "error",
          message:
            error instanceof ApiError
              ? error.message
              : "L'envoi a échoué. Réessayez dans un instant.",
        });
      }
    }
  });

  return { form, onSubmit, status };
}

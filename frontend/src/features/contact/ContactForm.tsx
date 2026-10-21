import { Button } from "~/components/ui/Button";
import { FormField, INPUT_CLASSES } from "~/components/ui/FormField";
import type { ContactSubject } from "~/types/api";

import { SUBJECT_OPTIONS } from "./contact-schema";
import { useContactForm } from "./useContactForm";

export function ContactForm({ initialSubject }: { initialSubject?: ContactSubject }) {
  const { form, onSubmit, status } = useContactForm(initialSubject);
  const {
    register,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <form onSubmit={(event) => void onSubmit(event)} noValidate className="space-y-6">
      <div role="status" aria-live="polite">
        {status.state === "success" ? (
          <p className="border-l-4 border-success bg-surface-raised p-4 font-semibold text-success">
            Merci, votre message a bien été transmis. Nous vous répondrons dès que possible.
          </p>
        ) : null}
      </div>
      {status.state === "error" ? (
        <p
          role="alert"
          className="border-l-4 border-danger bg-surface-raised p-4 font-semibold text-danger"
        >
          {status.message}
        </p>
      ) : null}

      <FormField
        id="subject"
        label="Objet de votre demande"
        required
        error={errors.subject?.message}
      >
        {(aria) => (
          <select className={INPUT_CLASSES} {...aria} {...register("subject")}>
            {SUBJECT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
      </FormField>

      <div className="grid gap-6 md:grid-cols-2">
        <FormField id="name" label="Nom et prénom" required error={errors.name?.message}>
          {(aria) => (
            <input
              type="text"
              autoComplete="name"
              className={INPUT_CLASSES}
              {...aria}
              {...register("name")}
            />
          )}
        </FormField>
        <FormField id="email" label="Adresse email" required error={errors.email?.message}>
          {(aria) => (
            <input
              type="email"
              autoComplete="email"
              className={INPUT_CLASSES}
              {...aria}
              {...register("email")}
            />
          )}
        </FormField>
      </div>

      <FormField
        id="organization"
        label="Organisation"
        hint="Facultatif."
        error={errors.organization?.message}
      >
        {(aria) => (
          <input
            type="text"
            autoComplete="organization"
            className={INPUT_CLASSES}
            {...aria}
            {...register("organization")}
          />
        )}
      </FormField>

      <FormField id="message" label="Message" required error={errors.message?.message}>
        {(aria) => (
          <textarea rows={6} className={INPUT_CLASSES} {...aria} {...register("message")} />
        )}
      </FormField>

      {/* Champ piège anti-robot : masqué aux humains et aux lecteurs d'écran. */}
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label>
          Ne pas remplir
          <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
        </label>
      </div>

      <FormField id="consent" label="" error={errors.consent?.message}>
        {(aria) => (
          <label className="flex items-start gap-3 text-small">
            <input
              type="checkbox"
              className="mt-1 size-5 shrink-0 accent-brand"
              {...aria}
              {...register("consent")}
            />
            <span>
              J'accepte que mes données soient utilisées pour traiter ma demande.{" "}
              <span aria-hidden="true">*</span>
            </span>
          </label>
        )}
      </FormField>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Envoi en cours…" : "Envoyer le message"}
      </Button>
    </form>
  );
}

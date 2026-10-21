import { z } from "zod";

export const SUBJECT_OPTIONS = [
  { value: "general", label: "Demande d'information" },
  { value: "quote", label: "Demande de devis" },
  { value: "training", label: "Formation" },
  { value: "partnership", label: "Partenariat" },
  { value: "buyback_info", label: "Rachat de biodigesteur (information)" },
  { value: "other", label: "Autre" },
] as const;

/** Les mêmes règles sont ré-appliquées par l'API : la validation serveur reste la référence. */
export const contactSchema = z.object({
  subject: z.enum(["general", "quote", "training", "partnership", "buyback_info", "other"]),
  name: z.string().trim().min(2, "Indiquez votre nom.").max(120, "Le nom est trop long."),
  email: z.email("Saisissez une adresse email valide."),
  organization: z.string().trim().max(160, "Le nom de l'organisation est trop long."),
  message: z
    .string()
    .trim()
    .min(20, "Votre message doit contenir au moins 20 caractères.")
    .max(5000, "Votre message est trop long (5 000 caractères maximum)."),
  consent: z
    .boolean()
    .refine((value) => value, "Votre consentement est nécessaire pour envoyer le formulaire."),
  website: z.string().max(200),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

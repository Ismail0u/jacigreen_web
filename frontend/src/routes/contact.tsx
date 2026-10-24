import { useSearchParams } from "react-router";

import { Container } from "~/components/ui/Container";
import { ContentPending } from "~/components/ui/ContentPending";
import { PageHeader } from "~/components/ui/PageHeader";
import { ContactForm } from "~/features/contact/ContactForm";
import { SUBJECT_OPTIONS } from "~/features/contact/contact-schema";
import { buildMeta } from "~/lib/seo";
import type { ContactSubject } from "~/types/api";

export function meta() {
  return buildMeta({
    title: "Contact",
    description: "Contactez JACIGREEN pour une demande d'information, de devis ou de partenariat.",
    path: "/contact",
  });
}

function parseSubject(value: string | null): ContactSubject | undefined {
  return SUBJECT_OPTIONS.find((option) => option.value === value)?.value;
}

export default function Contact() {
  const [params] = useSearchParams();
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Parlons de votre projet"
        intro="Décrivez votre besoin : demande d'information, devis, formation ou partenariat."
      />
      <section className="py-space-xl md:py-20">
        <Container className="grid grid-cols-1 gap-gutter lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 className="mb-space-lg font-headline-lg text-headline-lg">Votre demande</h2>
            <ContactForm initialSubject={parseSubject(params.get("objet"))} />
          </div>
          <aside className="min-w-0 bg-surface-container-low p-space-lg lg:p-space-xl">
            <p className="font-label-md text-label-md font-semibold text-ochre-text uppercase">
              Coordonnées
            </p>
            <h2 className="mt-2 font-headline-lg text-headline-lg">Restons en contact</h2>
            <p className="mt-space-md font-body-md text-body-md text-on-surface-variant">
              Les coordonnées institutionnelles seront communiquées après validation par JACIGREEN.
            </p>
            <div className="mt-space-lg">
              <ContentPending className="bg-surface-container-lowest">
                Adresse, téléphone et horaires à confirmer avant publication.
              </ContentPending>
            </div>
            <div className="mt-space-xl border-t border-outline-variant pt-space-lg">
              <p className="font-label-md text-label-md font-semibold text-ochre-text uppercase">
                Demande structurée
              </p>
              <p className="mt-2 font-body-sm text-body-sm text-on-surface-variant">
                Choisissez l'objet de votre message dans le formulaire pour aider l'équipe à
                orienter votre demande.
              </p>
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}

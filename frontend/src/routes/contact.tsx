import { useSearchParams } from "react-router";

import { Container } from "~/components/ui/Container";
import { PageHeader } from "~/components/ui/PageHeader";
import { audiences, positioning } from "~/content/institutional";
import { ContactForm } from "~/features/contact/ContactForm";
import { SUBJECT_OPTIONS } from "~/features/contact/contact-schema";
import { buildMeta } from "~/lib/seo";
import type { ContactSubject } from "~/types/api";

export function meta() {
  return buildMeta({
    title: "Contact",
    description:
      "Contactez JACIGREEN au sujet de la valorisation des ressources naturelles, des déchets, de l’énergie ou de l’agriculture.",
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
        intro="JACIGREEN accompagne des besoins liés à l’environnement, à la valorisation des déchets, aux énergies renouvelables et à l’agriculture. Décrivez votre projet dans le formulaire."
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
              {positioning.localValue}
            </p>
            <p className="mt-space-md font-body-sm text-on-surface-variant">
              Aucune coordonnée publique n’est renseignée ici. Utilisez le formulaire pour
              transmettre votre demande.
            </p>
            <div className="mt-space-xl border-t border-outline-variant pt-space-lg">
              <h3 className="font-label-md text-label-md font-semibold text-ochre-text uppercase">
                Publics concernés
              </h3>
              <ul className="mt-space-md space-y-space-sm">
                {audiences.map((audience) => (
                  <li key={audience} className="border-l-2 border-logo-green pl-3 font-body-sm">
                    {audience}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}

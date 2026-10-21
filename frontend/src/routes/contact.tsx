import { useSearchParams } from "react-router";

import { Container } from "~/components/ui/Container";
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
      <section className="py-16">
        <Container>
          <div className="max-w-2xl">
            <ContactForm initialSubject={parseSubject(params.get("objet"))} />
          </div>
        </Container>
      </section>
    </>
  );
}

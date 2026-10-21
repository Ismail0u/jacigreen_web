import { Container } from "~/components/ui/Container";
import { PageHeader } from "~/components/ui/PageHeader";
import { buildMeta } from "~/lib/seo";

export function meta() {
  return buildMeta({
    title: "Mentions légales",
    description: "Mentions légales et politique de confidentialité de JACIGREEN.",
    path: "/mentions-legales",
    noindex: true,
  });
}

/** Aucun texte juridique n'est inventé : à rédiger avec JaciGreen (raison sociale, hébergeur, responsable de publication). */
export default function Legal() {
  return (
    <>
      <PageHeader title="Mentions légales" />
      <section className="py-16">
        <Container>
          <p className="max-w-reading text-ink-muted">
            Les mentions légales, la politique de confidentialité et les conditions d'utilisation
            seront publiées après validation par JACIGREEN.
          </p>
        </Container>
      </section>
    </>
  );
}

import { Container } from "~/components/ui/Container";
import { ContentPending } from "~/components/ui/ContentPending";
import { PageHeader } from "~/components/ui/PageHeader";
import { identity } from "~/content/institutional";
import { buildMeta } from "~/lib/seo";

export function meta() {
  return buildMeta({
    title: "Mentions légales",
    description: `${identity.name} : informations juridiques de l’éditeur à compléter.`,
    path: "/mentions-legales",
    noindex: true,
  });
}

/** Aucun texte juridique n'est inventé : à rédiger avec JaciGreen (raison sociale, hébergeur, responsable de publication). */
export default function Legal() {
  return (
    <>
      <PageHeader
        title="Mentions légales"
        intro="Informations institutionnelles disponibles et éléments juridiques restant à renseigner."
      />
      <section className="py-space-xl md:py-20">
        <Container>
          <div className="max-w-3xl">
            <p className="font-label-md text-label-md font-semibold text-ochre-text uppercase">
              Identité de l’organisation
            </p>
            <dl className="mt-space-lg grid grid-cols-1 gap-space-md sm:grid-cols-2">
              {[
                ["Nom", identity.name],
                ["Positionnement", identity.position],
                ["Ressource historique", identity.historicalResource],
                ["Territoires documentés", identity.territories],
                ["Fondatrice et directrice", identity.founder],
              ].map(([term, detail]) => (
                <div key={term} className="border-t border-outline-variant pt-space-md">
                  <dt className="font-label-md text-label-md font-semibold text-ochre-text uppercase">
                    {term}
                  </dt>
                  <dd className="mt-2 font-body-sm text-on-surface-variant">{detail}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-space-xl">
              <ContentPending>
                Informations à fournir et à vérifier avant l’ouverture publique : raison sociale
                enregistrée, adresse du siège, numéro d’immatriculation, responsable de publication,
                hébergeur, politique de confidentialité et conditions d’utilisation.
              </ContentPending>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

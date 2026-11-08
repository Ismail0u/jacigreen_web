import { Container } from "~/components/ui/Container";
import { ContentPending } from "~/components/ui/ContentPending";
import { PageHeader } from "~/components/ui/PageHeader";
import { buildMeta } from "~/lib/seo";

const identityFields = [
  ["Dénomination sociale", "À confirmer par JACIGREEN."],
  ["Nom utilisé sur le site", "JACIGREEN (la forme juridique n’est pas établie)."],
  ["Forme juridique", "À confirmer par JACIGREEN."],
  ["Pays d’établissement et droit applicable", "À confirmer par JACIGREEN."],
  ["Siège social et adresse", "À confirmer par JACIGREEN."],
  ["Numéro d’immatriculation ou d’identification", "À confirmer, selon le droit applicable."],
  ["Responsable de publication", "À désigner par JACIGREEN."],
  ["Téléphone et adresse électronique publics", "À confirmer par JACIGREEN."],
] as const;

const draftSections = [
  {
    title: "Hébergement",
    paragraphs: [
      "Les URL communiquées pour le site et l’API utilisent respectivement les domaines Vercel et Render. Le prestataire contractuel, sa dénomination légale, son adresse et les informations d’hébergement à publier restent à confirmer à partir des contrats et de la configuration effectivement déployée.",
    ],
  },
  {
    title: "Propriété intellectuelle",
    paragraphs: [
      "Les textes, marques, logos, photographies et autres éléments présents sur ce site demeurent soumis aux droits de leurs titulaires respectifs. Avant publication, JACIGREEN doit confirmer les droits d’utilisation des contenus et médias qu’elle fournit. Toute réutilisation doit respecter les droits applicables et obtenir les autorisations nécessaires.",
    ],
  },
  {
    title: "Responsabilité éditoriale",
    paragraphs: [
      "Le site présente des informations institutionnelles et des contenus sur les activités de JACIGREEN. Les études, projets, dates et résultats doivent être interprétés selon les réserves indiquées dans leur source. Le responsable de publication doit vérifier les informations avant leur mise en ligne et signaler les corrections à apporter.",
      "Cette rédaction constitue un projet de mentions légales. Elle ne vaut ni validation juridique, ni garantie d’exhaustivité ou de conformité.",
    ],
  },
  {
    title: "Données personnelles et formulaire de contact",
    paragraphs: [
      "Le formulaire demande un objet, le nom, l’adresse électronique et un message ; l’organisation est facultative et le consentement est demandé avant l’envoi. Ces données sont utilisées pour recevoir et traiter la demande. Le formulaire ne prévoit pas de pièce jointe.",
      "Les demandes sont enregistrées par l’API du site et leur consultation est réservée à l’administration. Elles ne sont pas exposées par une API de lecture publique et aucun envoi automatique de courriel n’est configuré dans le projet.",
      "L’identité du responsable de traitement, la base juridique à retenir, les destinataires et sous-traitants, la durée de conservation, les modalités d’exercice des droits et l’autorité compétente doivent être complétés après confirmation du pays d’établissement et examen du fonctionnement hébergé. La case de consentement du formulaire ne remplace pas ces vérifications.",
    ],
  },
  {
    title: "Cookies et traceurs",
    paragraphs: [
      "Le code frontend vérifié ne met en œuvre ni outil d’analytique ni écriture de cookie ou de stockage navigateur. Les éventuels cookies techniques, journaux ou traceurs ajoutés par l’hébergement, un proxy ou un service tiers n’ont pas été vérifiés dans la configuration hébergée ; leur inventaire doit être confirmé avant publication.",
    ],
  },
  {
    title: "Conditions d’utilisation",
    paragraphs: [
      "Les règles d’utilisation du site, les limites de responsabilité et les modalités de règlement des différends doivent être arrêtées par JACIGREEN au regard du droit applicable. Aucun droit national n’est présumé dans ce document tant que le pays d’établissement n’a pas été confirmé.",
    ],
  },
  {
    title: "Mise à jour",
    paragraphs: [
      "Projet préparé le 7 novembre 2026. La date de publication et la personne chargée de maintenir ces informations sont à confirmer. Toute mise en ligne doit être précédée de la complétion des informations manquantes et d’une validation par JACIGREEN et un conseil juridique compétent dans le pays concerné.",
    ],
  },
] as const;

export function meta() {
  return buildMeta({
    title: "Mentions légales",
    description: "Projet de mentions légales JACIGREEN, à compléter et valider avant publication.",
    path: "/mentions-legales",
    noindex: true,
  });
}

export default function Legal() {
  return (
    <>
      <PageHeader
        title="Mentions légales"
        intro="Projet de rédaction destiné à la revue de JACIGREEN. Les informations administratives manquantes sont explicitement signalées et doivent être validées avant toute publication."
      />
      <section className="py-space-xl md:py-20">
        <Container>
          <div className="max-w-reading space-y-space-xl">
            <ContentPending>
              Version de travail non validée juridiquement et non destinée à être publiée en l’état.
              La liste des informations à fournir est suivie dans le registre éditorial du projet.
            </ContentPending>

            <section aria-labelledby="publisher-heading">
              <h2 id="publisher-heading" className="font-headline-lg text-headline-lg">
                Éditeur du site et identification
              </h2>
              <p className="mt-space-sm font-body-md text-on-surface-variant">
                Le nom JACIGREEN est celui utilisé par le site. Les sources disponibles ne
                permettent pas d’établir l’identité juridique enregistrée de l’éditeur.
              </p>
              <dl className="mt-space-md grid grid-cols-1 gap-space-md sm:grid-cols-2">
                {identityFields.map(([term, detail]) => (
                  <div key={term} className="border-t border-outline-variant pt-space-sm">
                    <dt className="font-label-md text-label-md font-semibold text-ochre-text">
                      {term}
                    </dt>
                    <dd className="mt-1 font-body-sm text-on-surface-variant">{detail}</dd>
                  </div>
                ))}
              </dl>
            </section>

            {draftSections.map(({ title, paragraphs }, index) => (
              <section key={title} aria-labelledby={`legal-section-${index}`}>
                <h2 id={`legal-section-${index}`} className="font-headline-lg text-headline-lg">
                  {title}
                </h2>
                <div className="mt-space-sm space-y-space-sm font-body-md text-on-surface-variant">
                  {paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

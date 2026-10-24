import { Container } from "~/components/ui/Container";
import { ContentPending } from "~/components/ui/ContentPending";
import { MediaFrame } from "~/components/ui/MediaFrame";
import { PageHeader } from "~/components/ui/PageHeader";
import { MEDIA } from "~/content/media";
import { buildMeta } from "~/lib/seo";

export function meta() {
  return buildMeta({
    title: "À propos",
    description: "Présentation de JACIGREEN en attente de validation institutionnelle.",
    path: "/a-propos",
  });
}

export default function About() {
  return (
    <>
      <PageHeader eyebrow="À propos" title="Qui est JACIGREEN ?" />
      <section className="py-space-xl md:py-20" aria-labelledby="chaine">
        <Container>
          <div className="grid grid-cols-1 items-start gap-gutter lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <MediaFrame
                src={MEDIA.aboutStory.src}
                alt={MEDIA.aboutStory.alt}
                aspect={MEDIA.aboutStory.aspect}
                icon={MEDIA.aboutStory.icon}
              />
              <p className="mt-3 font-body-sm text-body-sm text-on-surface-variant">
                Visuel institutionnel à fournir pour illustrer JACIGREEN.
              </p>
            </div>
            <div>
              <p className="font-label-md text-label-md font-semibold text-ochre-text uppercase">
                Présentation
              </p>
              <h2 id="chaine" className="mt-2 font-headline-xl text-headline-xl">
                Positionnement et activités
              </h2>
              <div className="mt-space-lg">
                <ContentPending>
                  La présentation générale, les activités et la chaîne de valeur seront détaillées
                  ici après validation institutionnelle.
                </ContentPending>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <section className="py-space-xl md:py-20" aria-labelledby="histoire">
        <Container className="grid grid-cols-1 items-start gap-gutter lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="font-label-md text-label-md font-semibold text-ochre-text uppercase">
              Repères
            </p>
            <h2 id="histoire" className="mt-2 font-headline-xl text-headline-xl">
              Histoire et parcours
            </h2>
          </div>
          <ContentPending>
            Les dates, le récit de la fondation et les éléments biographiques attendent une
            confirmation institutionnelle.
          </ContentPending>
        </Container>
      </section>
      <section className="bg-surface-container-low py-space-xl md:py-20" aria-labelledby="valeurs">
        <Container className="grid grid-cols-1 items-start gap-gutter lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="font-label-md text-label-md font-semibold text-ochre-text uppercase">
              Engagements
            </p>
            <h2 id="valeurs" className="mt-2 font-headline-xl text-headline-xl">
              Mission, vision et valeurs
            </h2>
          </div>
          <ContentPending>
            Ces formulations institutionnelles restent à valider par la direction et ne sont pas
            reprises des affirmations non vérifiées de la maquette.
          </ContentPending>
        </Container>
      </section>
    </>
  );
}

import { Container } from "~/components/ui/Container";
import { MediaFrame } from "~/components/ui/MediaFrame";
import { PageHeader } from "~/components/ui/PageHeader";
import {
  founderBiography,
  futureContext,
  futurePriorities,
  historicalImpact,
  impactCaveat,
  mission,
  positioning,
  recognitions,
  values,
  vision,
  workCulture,
} from "~/content/institutional";
import { MEDIA } from "~/content/media";
import { buildMeta } from "~/lib/seo";

export function meta() {
  return buildMeta({
    title: "À propos",
    description: positioning.short,
    path: "/a-propos",
  });
}

export default function About() {
  return (
    <>
      <PageHeader eyebrow="À propos" title="Qui est JACIGREEN ?" intro={positioning.short} />

      <section className="py-space-xl md:py-20" aria-labelledby="presentation">
        <Container className="grid grid-cols-1 items-start gap-gutter lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <MediaFrame
              src={MEDIA.aboutStory.src}
              alt={MEDIA.aboutStory.alt}
              aspect={MEDIA.aboutStory.aspect}
              icon={MEDIA.aboutStory.icon}
            />
            <p className="mt-3 font-body-sm text-body-sm text-on-surface-variant">
              Photographie institutionnelle à fournir.
            </p>
          </div>
          <div>
            <p className="font-label-md text-label-md font-semibold text-ochre-text uppercase">
              Présentation
            </p>
            <h2 id="presentation" className="mt-2 font-headline-xl text-headline-xl break-words">
              Valoriser les ressources naturelles et les déchets
            </h2>
            <p className="mt-space-lg font-body-lg text-body-lg text-on-surface-variant">
              {positioning.long}
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-surface-container-low py-space-xl md:py-20" aria-labelledby="mission">
        <Container>
          <div className="grid grid-cols-1 gap-gutter lg:grid-cols-2">
            <div>
              <p className="font-label-md text-label-md font-semibold text-ochre-text uppercase">
                Mission proposée
              </p>
              <h2 id="mission" className="mt-2 font-headline-xl text-headline-xl break-words">
                Transformer les défis environnementaux
              </h2>
              <p className="mt-space-md font-body-lg text-body-lg text-on-surface-variant">
                {mission}
              </p>
            </div>
            <div>
              <p className="font-label-md text-label-md font-semibold text-ochre-text uppercase">
                Vision proposée
              </p>
              <h2 className="mt-2 font-headline-xl text-headline-xl break-words">
                Des solutions locales et durables
              </h2>
              <p className="mt-space-md font-body-lg text-body-lg text-on-surface-variant">
                {vision}
              </p>
            </div>
          </div>
          <div className="mt-space-xl border-t border-outline-variant pt-space-xl">
            <h3 className="font-headline-lg text-headline-lg">Valeurs</h3>
            <ul className="mt-space-lg grid grid-cols-1 gap-gutter sm:grid-cols-2 lg:grid-cols-3">
              {values.map((value) => (
                <li
                  key={value.name}
                  className="border-t border-outline-variant bg-surface-container-lowest p-space-lg"
                >
                  <h4 className="font-headline-md text-headline-md">{value.name}</h4>
                  <p className="mt-space-sm font-body-sm text-body-sm text-on-surface-variant">
                    {value.description}
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-space-md font-body-sm text-on-surface-variant">
              Mission, vision et valeurs sont des formulations proposées dans le référentiel de
              JACIGREEN.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-space-xl md:py-20" aria-labelledby="fondatrice">
        <Container className="grid grid-cols-1 items-start gap-gutter lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="font-label-md text-label-md font-semibold text-ochre-text uppercase">
              Parcours
            </p>
            <h2 id="fondatrice" className="mt-2 font-headline-xl text-headline-xl break-words">
              Mariama Mamane, fondatrice
            </h2>
          </div>
          <div className="space-y-space-md">
            {founderBiography.map((paragraph) => (
              <p key={paragraph} className="font-body-md text-body-md text-on-surface-variant">
                {paragraph}
              </p>
            ))}
          </div>
        </Container>
      </section>

      <section
        className="bg-surface-container-low py-space-xl md:py-20"
        aria-labelledby="reconnaissances"
      >
        <Container className="grid grid-cols-1 items-start gap-gutter lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="font-label-md text-label-md font-semibold text-ochre-text uppercase">
              Repères
            </p>
            <h2 id="reconnaissances" className="mt-2 font-headline-xl text-headline-xl break-words">
              Distinctions mentionnées
            </h2>
          </div>
          <ul className="divide-y divide-outline-variant border-y border-outline-variant">
            {recognitions.map((recognition) => (
              <li
                key={`${recognition.year}-${recognition.name}`}
                className="grid grid-cols-[4rem_1fr] gap-space-md py-space-md"
              >
                <span className="font-label-md text-label-md font-semibold text-magenta-text">
                  {recognition.year}
                </span>
                <span className="font-body-sm text-body-sm">{recognition.name}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-space-xl md:py-20" aria-labelledby="culture">
        <Container className="grid grid-cols-1 gap-gutter lg:grid-cols-2">
          <div>
            <p className="font-label-md text-label-md font-semibold text-ochre-text uppercase">
              Culture de travail
            </p>
            <h2 id="culture" className="mt-2 font-headline-xl text-headline-xl break-words">
              Comprendre le terrain et apprendre
            </h2>
            <ul className="mt-space-lg space-y-space-sm">
              {workCulture.map((item) => (
                <li key={item} className="border-l-2 border-logo-green pl-4 font-body-sm">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-label-md text-label-md font-semibold text-ochre-text uppercase">
              Perspectives
            </p>
            <h2 className="mt-2 font-headline-xl text-headline-xl break-words">
              Structurer et déployer les solutions
            </h2>
            {futureContext.slice(1).map((paragraph) => (
              <p key={paragraph} className="mt-space-md font-body-sm text-on-surface-variant">
                {paragraph}
              </p>
            ))}
            <ul className="mt-space-lg grid grid-cols-1 gap-space-sm sm:grid-cols-2">
              {futurePriorities.map((priority) => (
                <li
                  key={priority}
                  className="border-l-2 border-logo-magenta bg-surface-container-low p-space-md font-body-sm"
                >
                  {priority}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="bg-primary-container py-space-xl text-on-primary md:py-20">
        <Container className="grid grid-cols-1 items-start gap-gutter lg:grid-cols-[0.7fr_1.3fr]">
          <h2 className="font-headline-lg text-headline-lg">Repères historiques d’impact</h2>
          <div>
            <p className="mb-space-md font-body-sm text-on-primary/80">{impactCaveat}</p>
            <dl className="grid grid-cols-1 gap-space-md sm:grid-cols-2">
              {historicalImpact.map((item) => (
                <div key={item.label} className="border-l-2 border-logo-green pl-4">
                  <dt className="font-headline-lg text-headline-lg">{item.value}</dt>
                  <dd className="mt-1 font-body-sm text-on-primary/80">{item.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>
    </>
  );
}

import { Container } from "~/components/ui/Container";
import { MediaFrame } from "~/components/ui/MediaFrame";
import { PageHeader } from "~/components/ui/PageHeader";
import { MEDIA } from "~/content/media";
import { COMPANY_INTRO, VALUE_CHAIN } from "~/content/site-copy";
import { buildMeta } from "~/lib/seo";

export function meta() {
  return buildMeta({
    title: "À propos",
    description: COMPANY_INTRO,
    path: "/a-propos",
  });
}

export default function About() {
  return (
    <>
      <PageHeader eyebrow="À propos" title="Qui est JACIGREEN ?" intro={COMPANY_INTRO} />
      <section className="py-16" aria-labelledby="chaine">
        <Container className="grid items-start gap-10 md:grid-cols-2 md:gap-12">
          <MediaFrame
            src={MEDIA.aboutStory.src}
            alt={MEDIA.aboutStory.alt}
            aspect={MEDIA.aboutStory.aspect}
            icon={MEDIA.aboutStory.icon}
          />
          <div>
            <h2 id="chaine" className="text-h2">
              De la ressource à l'impact
            </h2>
            <dl className="mt-8 divide-y divide-hairline">
              {VALUE_CHAIN.map((step) => (
                <div key={step.label} className="py-4 md:grid md:grid-cols-[10rem_1fr] md:gap-6">
                  <dt className="font-display font-semibold text-brand">{step.label}</dt>
                  <dd className="text-ink-muted">{step.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>
    </>
  );
}

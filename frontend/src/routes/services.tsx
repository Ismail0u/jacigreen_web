import { Container } from "~/components/ui/Container";
import { ContentPending } from "~/components/ui/ContentPending";
import { DemoBanner } from "~/components/ui/DemoNotice";
import { PageHeader } from "~/components/ui/PageHeader";
import { ServiceEntry } from "~/features/services/ServiceEntry";
import { buildMeta } from "~/lib/seo";
import { listServices } from "~/services/api/content";

import type { Route } from "./+types/services";

export async function loader() {
  return { services: await listServices() };
}

export function meta() {
  return buildMeta({
    title: "Services",
    description: "Consultez les services publiés par JACIGREEN.",
    path: "/services",
  });
}

export default function Services({ loaderData }: Route.ComponentProps) {
  const { services } = loaderData;
  const formations = services.filter((service) => /formation/i.test(service.title));
  const otherServices = services.filter((service) => !formations.includes(service));

  return (
    <>
      <DemoBanner show={services.some((service) => service.is_demo)} />
      <PageHeader
        eyebrow="Services"
        title="Nos services"
        intro="Des services présentés à partir des contenus publiés par JACIGREEN."
      />
      {otherServices.length > 0 ? (
        <section className="py-space-xl md:py-20">
          <Container>
            <ul className="max-w-5xl divide-y divide-outline-variant border-y border-outline-variant">
              {otherServices.map((service) => (
                <ServiceEntry key={service.slug} service={service} headingLevel="h2" />
              ))}
            </ul>
          </Container>
        </section>
      ) : null}
      <section
        className="bg-surface-container-low py-space-xl md:py-20"
        aria-labelledby="formations"
      >
        <Container>
          <div className="grid grid-cols-1 items-start gap-gutter lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="font-label-md text-label-md font-semibold text-ochre-text uppercase">
                Transmission de savoir-faire
              </p>
              <h2 id="formations" className="font-headline-xl text-headline-xl">
                Formations et transfert d'expertise
              </h2>
            </div>
            {formations.length > 0 ? (
              <ul className="mt-space-lg max-w-5xl divide-y divide-outline-variant border-y border-outline-variant">
                {formations.map((service) => (
                  <ServiceEntry key={service.slug} service={service} headingLevel="h3" />
                ))}
              </ul>
            ) : (
              <ContentPending>
                Le catalogue, les formats et les publics concernés restent à confirmer avant
                publication.
              </ContentPending>
            )}
          </div>
        </Container>
      </section>
      {services.length === 0 ? (
        <section className="py-space-xl md:py-20">
          <Container>
            <ContentPending>
              Les services et formations seront détaillés après validation des contenus à publier.
            </ContentPending>
          </Container>
        </section>
      ) : null}
    </>
  );
}

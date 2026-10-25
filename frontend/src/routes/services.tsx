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
    description: "Découvrez les services publiés par JACIGREEN.",
    path: "/services",
  });
}

export default function Services({ loaderData }: Route.ComponentProps) {
  const { services } = loaderData;

  return (
    <>
      <DemoBanner show={services.some((service) => service.is_demo)} />
      <PageHeader
        eyebrow="Services"
        title="Nos services"
        intro="Les services disponibles sont présentés dans le catalogue éditorial."
      />
      <section className="py-space-xl md:py-20">
        <Container>
          {services.length > 0 ? (
            <ul className="max-w-5xl divide-y divide-outline-variant border-y border-outline-variant">
              {services.map((service) => (
                <ServiceEntry key={service.slug} service={service} headingLevel="h2" />
              ))}
            </ul>
          ) : (
            <ContentPending>Aucun service n’est actuellement publié.</ContentPending>
          )}
        </Container>
      </section>
    </>
  );
}

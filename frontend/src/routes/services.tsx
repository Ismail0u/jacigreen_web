import { Container } from "~/components/ui/Container";
import { DemoBadge, DemoBanner } from "~/components/ui/DemoNotice";
import { EmptyState } from "~/components/ui/EmptyState";
import { PageHeader } from "~/components/ui/PageHeader";
import { buildMeta } from "~/lib/seo";
import { listServices } from "~/services/api/content";

import type { Route } from "./+types/services";

export async function loader() {
  return { services: await listServices() };
}

export function meta() {
  return buildMeta({
    title: "Services",
    description:
      "Les services JACIGREEN : études, conception, formation et accompagnement technique.",
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
        <section className="py-16">
          <Container>
            <ul className="max-w-4xl divide-y divide-hairline border-y border-hairline">
              {otherServices.map((service) => (
                <li key={service.slug} className="py-6">
                  <h2 className="text-h3">
                    {service.title} <DemoBadge show={service.is_demo} />
                  </h2>
                  <p className="mt-2 text-ink-muted">{service.summary}</p>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}
      {formations.length > 0 ? (
        <section className="bg-surface-alt py-16" aria-labelledby="formations">
          <Container>
            <h2 id="formations" className="text-h2">
              Formations et transfert d'expertise
            </h2>
            <ul className="mt-8 max-w-4xl divide-y divide-hairline border-y border-hairline">
              {formations.map((service) => (
                <li key={service.slug} className="py-6">
                  <h3 className="text-h3">
                    {service.title} <DemoBadge show={service.is_demo} />
                  </h3>
                  <p className="mt-2 text-ink-muted">{service.summary}</p>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}
      {services.length === 0 ? (
        <section className="py-16">
          <Container>
            <EmptyState>Aucun service n'est publié pour le moment.</EmptyState>
          </Container>
        </section>
      ) : null}
    </>
  );
}

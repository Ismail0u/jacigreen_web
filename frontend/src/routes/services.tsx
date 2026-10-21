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
  return (
    <>
      <DemoBanner show={services.some((service) => service.is_demo)} />
      <PageHeader eyebrow="Services" title="Nos services" />
      <section className="py-16">
        <Container>
          {services.length > 0 ? (
            <ul className="max-w-4xl divide-y divide-hairline border-y border-hairline">
              {services.map((service) => (
                <li key={service.slug} className="py-6">
                  <h2 className="text-h3">
                    {service.title} <DemoBadge show={service.is_demo} />
                  </h2>
                  <p className="mt-2 text-ink-muted">{service.summary}</p>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState>Aucun service n'est publié pour le moment.</EmptyState>
          )}
        </Container>
      </section>
    </>
  );
}

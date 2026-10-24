import { DemoBadge } from "~/components/ui/DemoNotice";
import { Prose } from "~/components/ui/Prose";
import type { Service } from "~/types/api";

interface ServiceEntryProps {
  service: Service;
  headingLevel: "h2" | "h3";
}

export function ServiceEntry({ service, headingLevel }: ServiceEntryProps) {
  const Heading = headingLevel;

  return (
    <li className="grid grid-cols-1 gap-3 py-space-lg sm:grid-cols-[0.7fr_1.3fr]">
      <Heading className="font-headline-md text-headline-md">
        {service.title} <DemoBadge show={service.is_demo} />
      </Heading>
      <Prose text={service.description || service.summary} />
    </li>
  );
}

import { Badge } from "~/components/ui/Badge";
import { ButtonLink } from "~/components/ui/Button";
import { Container } from "~/components/ui/Container";
import { ContentPending } from "~/components/ui/ContentPending";
import { DemoBanner } from "~/components/ui/DemoNotice";
import { MediaFrame } from "~/components/ui/MediaFrame";
import { Prose } from "~/components/ui/Prose";
import { useOutletContext } from "react-router";

import type { SolutionsRouteData } from "./solutions-layout";

export default function SolutionDetail() {
  const { solution } = useOutletContext<SolutionsRouteData>();
  if (!solution) {
    throw new Error("Les données de la solution ne sont pas disponibles.");
  }
  const categoryLabels = {
    energy: "Énergie",
    fertilizer: "Fertilisation",
    water: "Eau",
    other: "Autre",
  } as const;
  return (
    <>
      <DemoBanner show={solution.is_demo} />
      <article className="py-space-xl md:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-gutter lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <div className="flex flex-wrap gap-2">
                <Badge>{categoryLabels[solution.category]}</Badge>
                {solution.maturity === "prototype" ? (
                  <Badge tone="prototype">En prototypage</Badge>
                ) : null}
              </div>
              <h1 className="mt-space-md font-headline-2xl-mobile text-headline-2xl-mobile md:font-headline-2xl md:text-headline-2xl">
                {solution.name}
              </h1>
              {solution.tagline ? (
                <p className="mt-space-md font-body-lg text-body-lg text-on-surface-variant">
                  {solution.tagline}
                </p>
              ) : null}
              <div className="mt-space-xl flex flex-wrap gap-space-md">
                <ButtonLink to="/contact?objet=quote">Demander un devis</ButtonLink>
                <ButtonLink to="/solutions" variant="secondary">
                  Toutes les solutions
                </ButtonLink>
              </div>
            </div>
            <MediaFrame
              src={solution.cover_image}
              alt={solution.cover_alt}
              aspect="16/9"
              icon={solution.category === "energy" ? "solar_power" : "eco"}
              className="max-w-4xl"
            />
          </div>
          <div className="mt-space-xl border-t border-outline-variant pt-space-xl">
            <h2 className="mb-space-lg font-headline-xl text-headline-xl">
              À propos de la solution
            </h2>
            <Prose text={solution.description} />
          </div>
          <section
            className="mt-space-xl grid grid-cols-1 items-start gap-gutter border-t border-outline-variant pt-space-xl lg:grid-cols-[0.7fr_1.3fr]"
            aria-labelledby="documentation-technique"
          >
            <h2 id="documentation-technique" className="font-headline-lg text-headline-lg">
              Documentation technique
            </h2>
            <ContentPending>
              Les procédés, caractéristiques et performances détaillés seront publiés uniquement
              après vérification technique et validation éditoriale.
            </ContentPending>
          </section>
        </Container>
      </article>
    </>
  );
}

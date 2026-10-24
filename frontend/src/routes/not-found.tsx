import { ButtonLink } from "~/components/ui/Button";
import { Container } from "~/components/ui/Container";

export function meta() {
  return [{ title: "Page introuvable | JACIGREEN" }, { name: "robots", content: "noindex" }];
}

export default function NotFound() {
  return (
    <Container className="grid min-h-[60vh] content-center py-space-xl">
      <p className="font-label-md text-label-md font-semibold text-ochre-text uppercase">
        Erreur 404
      </p>
      <h1 className="mt-3 font-headline-2xl-mobile text-headline-2xl-mobile md:font-headline-2xl md:text-headline-2xl">
        Page introuvable
      </h1>
      <p className="mt-space-md max-w-reading font-body-lg text-body-lg text-on-surface-variant">
        Cette page n'existe pas ou a été déplacée.
      </p>
      <div className="mt-space-lg">
        <ButtonLink to="/">Retour à l'accueil</ButtonLink>
      </div>
    </Container>
  );
}

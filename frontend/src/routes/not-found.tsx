import { ButtonLink } from "~/components/ui/Button";
import { Container } from "~/components/ui/Container";

export function meta() {
  return [{ title: "Page introuvable | JACIGREEN" }, { name: "robots", content: "noindex" }];
}

export default function NotFound() {
  return (
    <Container className="py-24">
      <h1 className="text-h1">Page introuvable</h1>
      <p className="mt-4 text-lead text-ink-muted">Cette page n'existe pas ou a été déplacée.</p>
      <div className="mt-8">
        <ButtonLink to="/">Retour à l'accueil</ButtonLink>
      </div>
    </Container>
  );
}

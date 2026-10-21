import { Badge } from "./Badge";
import { Container } from "./Container";

/** Badge à placer sur chaque élément marqué is_demo par l'API. */
export function DemoBadge({ show }: { show: boolean }) {
  return show ? <Badge tone="demo">Démonstration</Badge> : null;
}

/** Bandeau d'avertissement : contenu fictif, jamais destiné à la production. */
export function DemoBanner({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <div role="note" className="bg-danger py-2 text-small text-surface-raised">
      <Container>
        Contenu de démonstration : ces éléments sont fictifs et ne constituent pas une information
        institutionnelle de JACIGREEN.
      </Container>
    </div>
  );
}

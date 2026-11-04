import { isRouteErrorResponse, useRevalidator } from "react-router";

import { Button, ButtonLink } from "~/components/ui/Button";
import { Container } from "~/components/ui/Container";
import { ApiError } from "~/services/api/client";

export function RoutePendingIndicator({ active }: { active: boolean }) {
  if (!active) return null;

  return (
    <div className="relative z-30 h-1 overflow-hidden bg-surface-container-low" aria-live="polite">
      <div
        aria-hidden="true"
        className="route-progress absolute inset-y-0 left-0 w-full bg-accent"
      />
      <span className="sr-only" role="status">
        Chargement de la page en cours.
      </span>
    </div>
  );
}

export function RouteErrorState({ error }: { error: unknown }) {
  const revalidator = useRevalidator();
  const apiNotFound = error instanceof ApiError && error.status === 404;
  const notFound = apiNotFound || (isRouteErrorResponse(error) && error.status === 404);
  const timedOut = error instanceof ApiError && error.code === "timeout_error";
  const unreachable =
    error instanceof ApiError && ["network_error", "timeout_error"].includes(error.code);
  const title = notFound
    ? "Contenu introuvable"
    : timedOut
      ? "Le service met du temps à répondre"
      : unreachable
        ? "Connexion au service impossible"
        : "Impossible d’afficher cette page";
  const message = notFound
    ? "Cette page n’existe pas ou n’est plus disponible."
    : timedOut
      ? "Le service peut être en cours de démarrage. Vous pouvez réessayer dans quelques instants."
      : unreachable
        ? "La connexion au service est momentanément interrompue. Vérifiez votre connexion, puis réessayez."
        : "Une erreur temporaire nous empêche d’afficher le contenu demandé.";
  const canRetry =
    !notFound &&
    (!(error instanceof ApiError) ||
      error.status === 0 ||
      error.status >= 500 ||
      error.code === "invalid_response");
  const retrying = revalidator.state !== "idle";
  const retryLabel = retrying ? "Nouvelle tentative…" : "Réessayer";

  if (retrying) {
    return (
      <section className="py-20" aria-label="Nouvelle tentative de chargement" aria-busy="true">
        <Container>
          <p className="sr-only" role="status">
            Nouvelle tentative de chargement en cours.
          </p>
          <div className="max-w-reading" aria-hidden="true">
            <div className="h-4 w-40 animate-pulse bg-surface-container-high" />
            <div className="mt-5 h-10 w-3/4 animate-pulse bg-surface-container-high" />
            <div className="mt-6 h-5 w-full animate-pulse bg-surface-container-high" />
            <div className="mt-2 h-5 w-5/6 animate-pulse bg-surface-container-high" />
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-20" aria-labelledby="route-error-title">
      <Container>
        <div className="max-w-reading" role="alert">
          <p className="font-label-md text-label-md font-semibold text-ochre-text uppercase">
            {notFound ? "Page indisponible" : "Service momentanément indisponible"}
          </p>
          <h1 id="route-error-title" className="mt-3 font-headline-xl text-fluid-section-heading">
            {title}
          </h1>
          <p className="mt-4 text-lead text-ink-muted">{message}</p>
          <div className="mt-8 flex flex-wrap gap-space-md">
            {canRetry ? (
              <Button
                onClick={() => {
                  void revalidator.revalidate();
                }}
                disabled={retrying}
                aria-live="polite"
              >
                {retryLabel}
              </Button>
            ) : null}
            <ButtonLink to="/" variant="secondary">
              Retour à l’accueil
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}

import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import { ButtonLink } from "~/components/ui/Button";
import { Container } from "~/components/ui/Container";
import { THEME_COLOR } from "~/lib/site";
import { ApiError } from "~/services/api/client";

import "~/styles/app.css";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content={THEME_COLOR} />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

/** Erreur non gérée par une route : page lisible, sans détail technique. */
export function ErrorBoundary({ error }: { error: unknown }) {
  const notFound = isRouteErrorResponse(error) && error.status === 404;
  const unreachable = error instanceof ApiError && error.status === 0;
  const title = notFound ? "Page introuvable" : "Une erreur est survenue";
  const message = notFound
    ? "Cette page n'existe pas ou a été déplacée."
    : unreachable
      ? "Le serveur est momentanément injoignable. Réessayez dans un instant."
      : "Nous n'avons pas pu afficher cette page. Réessayez dans un instant.";
  return (
    <main id="main" className="py-24">
      <meta name="robots" content="noindex" />
      <Container>
        <h1 className="text-h1">{title}</h1>
        <p className="mt-4 max-w-reading text-lead text-ink-muted">{message}</p>
        <div className="mt-8">
          <ButtonLink to="/">Retour à l'accueil</ButtonLink>
        </div>
      </Container>
    </main>
  );
}

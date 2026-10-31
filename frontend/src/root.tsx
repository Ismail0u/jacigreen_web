import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import { RouteErrorState } from "~/components/ui/RouteStatus";
import { THEME_COLOR } from "~/lib/site";

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
  return (
    <main id="main" tabIndex={-1}>
      <meta name="robots" content="noindex" />
      <RouteErrorState error={error} />
    </main>
  );
}

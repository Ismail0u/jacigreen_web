import { Link } from "react-router";

import { Container } from "~/components/ui/Container";
import { MAIN_NAV, SITE_NAME } from "~/lib/site";

import { BrandLogo } from "./BrandLogo";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-outline-variant bg-surface-container-low py-space-xl text-on-surface">
      <Container>
        <div className="grid grid-cols-1 gap-space-xl border-b border-outline-variant pb-space-xl md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <Link to="/" aria-label={`${SITE_NAME}, accueil`} className="inline-flex">
              <BrandLogo />
            </Link>
            <p className="mt-3 max-w-reading text-body-sm text-on-surface-variant">
              Présentation institutionnelle en cours de validation.
            </p>
          </div>
          <nav aria-label="Navigation du pied de page" className="lg:col-span-2">
            <h2 className="font-display text-label font-semibold tracking-wider text-on-surface-variant uppercase">
              Découvrir
            </h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-small sm:grid-cols-3 lg:grid-cols-2">
              {MAIN_NAV.map((item) => (
                <li key={item.to}>
                  <Link
                    className="underline-offset-4 hover:text-secondary hover:underline"
                    to={item.to}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <h2 className="font-display text-label font-semibold tracking-wider text-on-surface-variant uppercase">
              Institution
            </h2>
            <ul className="mt-4 space-y-2 text-small">
              <li>
                <Link
                  className="underline-offset-4 hover:text-secondary hover:underline"
                  to="/mentions-legales"
                >
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link
                  className="underline-offset-4 hover:text-secondary hover:underline"
                  to="/contact"
                >
                  Nous contacter
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <p className="pt-space-lg text-code-technical text-on-surface-variant">
          © {new Date().getFullYear()} {SITE_NAME}
        </p>
      </Container>
    </footer>
  );
}

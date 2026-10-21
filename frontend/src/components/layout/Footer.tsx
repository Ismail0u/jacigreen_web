import { Link } from "react-router";

import { MAIN_NAV, SITE_NAME } from "~/lib/site";

import { Container } from "../ui/Container";

export function Footer() {
  return (
    <footer className="on-dark mt-24 bg-brand py-12 text-on-brand">
      <Container className="grid gap-10 md:grid-cols-[2fr_1fr]">
        <div>
          <p className="font-display text-h3 font-extrabold">{SITE_NAME}</p>
          <p className="mt-3 max-w-reading text-small opacity-90">
            Valorisation des ressources naturelles et des déchets : solutions environnementales,
            énergétiques et agricoles.
          </p>
        </div>
        <nav aria-label="Pied de page">
          <ul className="space-y-2 text-small">
            {MAIN_NAV.map((item) => (
              <li key={item.to}>
                <Link className="underline-offset-4 hover:underline" to={item.to}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link className="underline-offset-4 hover:underline" to="/mentions-legales">
                Mentions légales
              </Link>
            </li>
          </ul>
        </nav>
      </Container>
      <Container className="mt-10">
        <p className="border-t border-on-brand/30 pt-6 text-small opacity-90">
          © {new Date().getFullYear()} {SITE_NAME}
        </p>
      </Container>
    </footer>
  );
}

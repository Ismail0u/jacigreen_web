import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";

import { ButtonLink } from "~/components/ui/Button";
import { MAIN_NAV, SITE_NAME } from "~/lib/site";

import { Container } from "../ui/Container";
import { BrandLogo } from "./BrandLogo";

const LINK_CLASSES =
  "block py-3 font-display text-label font-semibold text-on-surface hover:text-secondary aria-[current=page]:text-primary-container aria-[current=page]:underline aria-[current=page]:decoration-on-tertiary-container aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-4 md:py-2 xl:text-small";

export function Header() {
  // Le menu mobile est « ouvert pour un chemin donné » : il se referme tout seul à
  // chaque navigation, sans effet de bord.
  const { pathname } = useLocation();
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenPath(null);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-outline-variant bg-surface/95 backdrop-blur">
      <Container className="flex min-h-16 items-center justify-between gap-3 py-1 md:min-h-18 md:gap-5">
        <Link to="/" className="shrink-0" aria-label={`${SITE_NAME}, accueil`}>
          <BrandLogo />
        </Link>

        <nav aria-label="Navigation principale" className="hidden md:block">
          <ul className="flex items-center gap-2 lg:gap-4 xl:gap-6">
            {MAIN_NAV.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} className={LINK_CLASSES}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <div className="hidden shrink-0 lg:block">
            <ButtonLink to="/contact" className="min-h-10 px-4 text-label uppercase">
              Nous contacter
            </ButtonLink>
          </div>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center border border-primary-container text-primary-container md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Fermer" : "Menu"}
            onClick={() => {
              setOpenPath(open ? null : pathname);
            }}
          >
            {open ? (
              /* Icône Croix (Close) */
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              /* Icône Hamburger */
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </button>
        </div>
      </Container>

      <nav
        id="mobile-nav"
        aria-label="Navigation principale"
        hidden={!open}
        className="border-t border-outline-variant bg-surface md:hidden"
      >
        <Container>
          <ul className="divide-y divide-outline-variant">
            {MAIN_NAV.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} className={LINK_CLASSES}>
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li>
              <NavLink to="/contact" className={`${LINK_CLASSES} font-bold`}>
                Nous contacter
              </NavLink>
            </li>
          </ul>
        </Container>
      </nav>
    </header>
  );
}

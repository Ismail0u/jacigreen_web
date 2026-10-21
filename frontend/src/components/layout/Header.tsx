import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";

import { MAIN_NAV, SITE_NAME } from "~/lib/site";

import { Container } from "../ui/Container";

const LINK_CLASSES =
  "block py-3 font-display text-small font-semibold text-ink hover:text-accent aria-[current=page]:text-brand aria-[current=page]:underline aria-[current=page]:decoration-ochre aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-8 md:py-2";

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
    <header className="sticky top-0 z-40 border-b border-hairline bg-surface/95 backdrop-blur">
      <Container className="flex items-center justify-between py-3">
        <Link
          to="/"
          className="font-display text-h3 font-extrabold tracking-tight text-brand"
          aria-label={`${SITE_NAME}, accueil`}
        >
          {SITE_NAME}
        </Link>

        <nav aria-label="Navigation principale" className="hidden md:block">
          <ul className="flex items-center gap-7">
            {MAIN_NAV.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} className={LINK_CLASSES}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="inline-flex min-h-11 items-center rounded-sm border border-brand px-4 font-display text-small font-semibold text-brand md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => {
            setOpenPath(open ? null : pathname);
          }}
        >
          {open ? "Fermer" : "Menu"}
        </button>
      </Container>

      <nav
        id="mobile-nav"
        aria-label="Navigation principale"
        hidden={!open}
        className="border-t border-hairline bg-surface md:hidden"
      >
        <Container>
          <ul className="divide-y divide-hairline">
            {MAIN_NAV.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} className={LINK_CLASSES}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </Container>
      </nav>
    </header>
  );
}

import { Outlet } from "react-router";

import { Footer } from "~/components/layout/Footer";
import { Header } from "~/components/layout/Header";

export default function SiteLayout() {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 bg-brand px-4 py-3 text-on-brand focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
      >
        Aller au contenu
      </a>
      <Header />
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

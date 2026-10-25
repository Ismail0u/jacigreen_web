/** Données de navigation et identité de marque du site. */

export const SITE_NAME = "JACIGREEN";

export interface NavItem {
  label: string;
  to: string;
}

/**
 * Formations : intégrées à la page Services (décision à confirmer, voir ADR-0003).
 * La page Rachat de biodigesteur relève de la Phase 2 et n'apparaît pas ici.
 */
export const MAIN_NAV: readonly NavItem[] = [
  { label: "À propos", to: "/a-propos" },
  { label: "Solutions", to: "/solutions" },
  { label: "Services", to: "/services" },
  { label: "Réalisations", to: "/realisations" },
  { label: "Actualités", to: "/actualites" },
  { label: "Contact", to: "/contact" },
];

/**
 * Couleur de la barre du navigateur mobile. Une balise <meta> ne peut pas lire une
 * variable CSS : la valeur est dupliquée ici et son égalité avec le token
 * --color-brand est vérifiée par src/styles/tokens.test.ts.
 */
export const THEME_COLOR = "#173a2c";

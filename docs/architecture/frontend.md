# Frontend

React 19, TypeScript strict (`noUncheckedIndexedAccess`, `verbatimModuleSyntax`), Vite 8, React Router 8 en mode framework (`appDirectory: "src"`, `ssr: false`, `prerender`), Tailwind CSS 4.

## Arborescence (`frontend/src/`)
| Dossier | Contenu |
|---|---|
| `routes.ts`, `root.tsx` | Déclaration des routes, coque HTML, `ErrorBoundary` |
| `routes/` | Une page par fichier : `loader` (données au build), `meta` (SEO), composant |
| `layouts/` | `site-layout.tsx` : lien d'évitement, en-tête, `<main>`, pied de page |
| `components/ui/` | Composants génériques : `Button`, `Badge`, `Container`, `PageHeader`, `FormField`, `Prose`, `EmptyState`, `DemoNotice` |
| `components/layout/` | `Header` (menu mobile accessible), `Footer` |
| `features/<domaine>/` | Composants métier : solutions, news, projects, contact (schéma Zod, hook, formulaire) |
| `services/api/` | `client.ts` (point d'entrée HTTP unique, `ApiError`), `content.ts`, `contact.ts` |
| `lib/` | `env.ts`, `seo.ts`, `format.ts`, `site.ts` |
| `content/` | Textes éditoriaux issus du document institutionnel (voir registre) |
| `styles/` | `tokens.css` (design system), `app.css` |
| `types/` | Types du contrat d'API |
| `test/` | Configuration des tests |

Organisation légèrement différente de la suggestion initiale : `routes/` contient les pages (convention React Router), `features/` les composants métier ; pas de dossier `app/` (inutile).

## Routes
`/`, `/a-propos`, `/solutions`, `/solutions/:slug`, `/services`, `/realisations` (filtre `?pays=`), `/actualites`, `/actualites/:slug`, `/contact` (`?objet=quote`), `/mentions-legales` (`noindex`), `*` (page introuvable).

## Données
Les `loader` s'exécutent **au build** (et à chaque requête en développement). En production, la navigation client lit les fichiers `.data` pré-générés. Le seul appel runtime vers l'API est l'envoi du formulaire de contact.

## État et erreurs
Pas d'état global : données de `loader` + état local + React Hook Form. Les erreurs de page passent par `ErrorBoundary` ; le formulaire gère chargement, succès, erreurs de validation serveur, limitation de débit (429) et erreur réseau.
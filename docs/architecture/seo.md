# SEO et rendu initial

## Stratégie (ADR-0002)

React Router v8, mode framework, `ssr: false` + `prerender` : chaque page publique est générée en **HTML complet** au build. Les routes dynamiques sont découvertes via l'API (`react-router.config.ts`). Le build échoue si l'API est injoignable.

Les pages `/solutions/:slug` et `/actualites/:slug` sont imbriquées sous leurs
routes de catalogue. Les loaders sont portés par ces routes parentes, toujours
pré-rendues ; les détails utilisent leur contexte de sortie. Un `clientLoader`
sur chaque parent prend le relais pour les chemins dynamiques non pré-rendus
(par exemple quand un catalogue est vide au build). Cela évite les exports
`loader` invalides en mode SPA tout en conservant le HTML et les métadonnées
pré-rendus pour les fiches présentes dans l'API.

## Ce qui est produit

Pour chaque page : `<title>`, `meta description`, lien canonique, Open Graph (`og:title`, `og:description`, `og:url`, `og:type`, `og:site_name`, `og:locale`), carte Twitter/X, `<h1>` unique ; JSON-LD `Organization` (nom et URL seulement) sur l'accueil ; `noindex` sur les mentions légales et la page introuvable. `sitemap.xml` et `robots.txt` sont générés après le build (`DISALLOW_INDEXING=true` pour interdire l'indexation en préproduction).

## Actualisation après publication

Django appelle le Deploy Hook Vercel à chaque publication, dépublication ou suppression d'un contenu publié : le site est reconstruit en quelques minutes.

## Variables

`VITE_SITE_URL` (URL canonique, **obligatoire** ; URL HTTPS publique définitive
en production), `API_INTERNAL_URL` / `VITE_API_URL` (API lue au build). Les
valeurs localhost du fichier d’exemple et de Compose ne conviennent qu’au
développement. Aucun domaine de production n’est présumé.

## Vérification

`npm run build && npm run check:prerender [-- --production --forbid-demo]`
contrôle : présence du HTML de chaque route (y compris tous les slugs de l'API),
balises, canoniques, `noindex`, sitemap, `robots.txt` et absence de contenu de
démonstration. Le mode `--production` exige une URL HTTPS non locale ; le mode
`--forbid-demo` rejette chaque enregistrement dont `is_demo` n’est pas
explicitement `false` et tout marqueur de démonstration rendu. Voir
`docs/quality/testing.md` pour les résultats.

## Limites connues

- Soft 404 : une URL inconnue reçoit la page « introuvable » avec le statut 200 (`noindex`).
- Aucune image de partage par défaut (`og:image`) tant qu'un visuel officiel n'est pas fourni ; la carte Twitter reste « summary ».

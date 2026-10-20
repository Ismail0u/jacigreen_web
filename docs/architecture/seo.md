# SEO et rendu initial

## Stratégie (ADR-0002)
React Router v8, mode framework, `ssr: false` + `prerender` : chaque page publique est générée en **HTML complet** au build. Les routes dynamiques sont découvertes via l'API (`react-router.config.ts`). Le build échoue si l'API est injoignable.

## Ce qui est produit
Pour chaque page : `<title>`, `meta description`, lien canonique, Open Graph (`og:title`, `og:description`, `og:url`, `og:type`, `og:site_name`, `og:locale`), carte Twitter/X, `<h1>` unique ; JSON-LD `Organization` (nom et URL seulement) sur l'accueil ; `noindex` sur les mentions légales et la page introuvable. `sitemap.xml` et `robots.txt` sont générés après le build (`DISALLOW_INDEXING=true` pour interdire l'indexation en préproduction).

## Actualisation après publication
Django appelle le Deploy Hook Vercel à chaque publication, dépublication ou suppression d'un contenu publié : le site est reconstruit en quelques minutes.

## Variables
`VITE_SITE_URL` (URL canonique, **obligatoire et non locale en production**), `API_INTERNAL_URL` / `VITE_API_URL` (API lue au build).

## Vérification
`npm run build && npm run check:prerender [-- --production --forbid-demo]` contrôle : présence du HTML de chaque route (y compris tous les slugs de l'API), balises, canoniques, `noindex`, sitemap, robots.txt, absence de contenu de démonstration. Voir `docs/quality/testing.md` pour les résultats.

## Limites connues
- Soft 404 : une URL inconnue reçoit la page « introuvable » avec le statut 200 (`noindex`).
- Aucune image de partage par défaut (`og:image`) tant qu'un visuel officiel n'est pas fourni ; la carte Twitter reste « summary ».

---
applyTo: "frontend/**"
---
# Frontend (React, TypeScript, React Router, Tailwind)

- Pages dans `src/routes/`, déclarées dans `src/routes.ts`. Chaque page publique exporte `loader` (données au build), `meta` (via `buildMeta` de `~/lib/seo`) et un composant par défaut. Une route avec `loader` DOIT être prérendue (contrainte de `ssr: false`) : ajoute-la à `react-router.config.ts` si elle est dynamique.
- Aucun `fetch` dans un composant : passe par `src/services/api/` (`apiFetch`). Les types de l'API sont dans `src/types/api.ts` et suivent `docs/architecture/api.md`.
- Composants génériques dans `src/components/ui/`, composants métier dans `src/features/<domaine>/`, layout dans `src/components/layout/`.
- Formulaires : React Hook Form + Zod (`contact-schema.ts` comme modèle). La validation serveur reste la référence ; affiche les erreurs de l'API sur les champs.
- Chaque vue gère les états : chargement, erreur, vide, succès. Texte alternatif obligatoire pour toute image de contenu.
- Rendu du contenu éditorial : texte brut via `<Prose>` (échappé par React). N'utilise jamais `dangerouslySetInnerHTML`.
- Styles : classes Tailwind issues des tokens (`bg-brand`, `text-ink-muted`, `text-small`…). Pas de couleur hexadécimale en dur (un test l'interdit).
- Les variables `VITE_*` sont publiques. `API_INTERNAL_URL` n'existe que côté Node.
- Pas d'état global tant qu'un simple état local ou les données du `loader` suffisent.
- Lance `npm run lint`, `npm run typecheck`, `npm test`, puis `npm run build && npm run check:prerender` si tu touches aux routes, au SEO ou aux loaders.

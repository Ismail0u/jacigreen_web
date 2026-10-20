# Architecture générale

```
Navigateur ──► Vercel (frontend statique pré-rendu : HTML + JS + fichiers .data)
     │                         ▲ build + pré-rendu lit l'API
     │ POST /api/v1/contact-requests/        │ Deploy Hook (publication)
     └──────────────► Render : API Django REST ──► PostgreSQL
                              ▲
                  Équipe JaciGreen : Django Admin (/admin/)
```

| Élément | Rôle |
|---|---|
| `frontend/` | Site public React/TypeScript, pré-rendu au build (ADR-0002) |
| `backend/` | API REST versionnée, Django Admin, règles de validation, PostgreSQL |
| `compose.yaml` | Environnement de développement (db, backend, frontend) |
| `docs/` | Architecture, ADR, qualité, opérations, registre des contenus |

## Séparation des responsabilités
Présentation (composants) → logique d'interface (hooks, loaders) → communication API (`services/api`) → API (vues, serializers) → logique métier et validation (modèles, serializers) → persistance (PostgreSQL) → configuration (variables d'environnement) → tests.

## Flux de contenu
1. Un éditeur publie un contenu dans Django Admin.
2. Le signal `post_save` appelle le Deploy Hook (si `FRONTEND_DEPLOY_HOOK_URL` est défini).
3. Vercel relance le build ; `prerender` relit l'API ; le site statique est remplacé.

## Patterns utilisés (et pourquoi)
| Pattern | Problème | Bénéfice | Coût |
|---|---|---|---|
| Modèle abstrait `PublishableModel` | Cycle brouillon/publication répété sur quatre modèles | Un seul endroit pour la règle de publication | Couplage des apps à `apps.common` |
| Adapter (`deploy_hook.py`) | Isoler un service externe (Vercel) dont l'échec ne doit pas bloquer l'édition | Remplaçable, testable sans réseau | Un module de plus |
| Custom hook `useContactForm` | Séparer logique de formulaire et JSX | Composant lisible, logique testable | Une indirection |
| Composition de composants UI | Éviter la duplication (boutons, cartes, champs) | Cohérence visuelle | Discipline de réutilisation |
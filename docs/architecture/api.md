# API REST `/api/v1/`

Documentation interactive : `/api/docs/` (Swagger UI), `/api/redoc/`, schéma `/api/schema/` (OpenAPI 3).

| Méthode | Chemin | Description |
|---|---|---|
| GET | `/api/v1/health/` | Sonde (200 ou 503 si la base est indisponible) |
| GET | `/api/v1/solutions/` | Solutions publiées. Filtres `category`, `maturity`, recherche `search`, tri `ordering` |
| GET | `/api/v1/solutions/{slug}/` | Fiche (ajoute `description`, `published_at`, `updated_at`) |
| GET | `/api/v1/services/`, `/services/{slug}/` | Services publiés |
| GET | `/api/v1/projects/`, `/projects/{slug}/` | Réalisations ; filtre `country` (NE, BF, NG, BI, TD) |
| GET | `/api/v1/articles/`, `/articles/{slug}/` | Actualités ; filtre `category` ; plus récentes d'abord |
| POST | `/api/v1/contact-requests/` | Dépôt d'une demande (JSON) |

Seuls les contenus `published` dont `published_at` est atteint sont visibles ; un brouillon répond 404.

## Pagination
`?page=2&page_size=20` (maximum 50). Réponse : `{count, next, previous, results}`.

## Comportement du client frontend
Le client central valide la forme des pages et limite les liens de pagination à
`/api/v1/`, en détectant les cycles. Les requêtes GET expirent après 20 secondes
et peuvent être rejouées une seule fois après une erreur réseau ou HTTP 502,
503 ou 504 ; les délais dépassés ne sont pas rejoués. Les POST expirent après
10 secondes et ne sont jamais rejoués. `timeoutMs` permet de remplacer le délai
par défaut pour un appel.

## Dépôt d'une demande (au niveau du formulaire)
Champs : `subject` (`general`, `quote`, `training`, `partnership`, `buyback_info`, `other`), `name`, `email`, `organization` (facultatif), `message` (20 à 5 000 caractères), `consent` (doit être `true`), `website` (piège anti-robot : doit rester vide). Réponse 201 `{"detail": "..."}`. Un robot qui remplit `website` reçoit aussi 201 mais rien n'est enregistré. Limite : 5 demandes par heure et par IP (`THROTTLE_CONTACT_RATE`).

## Erreurs
```json
{"error": {"code": "validation_error", "message": "Les données envoyées sont invalides.", "details": {"email": ["Saisissez une adresse de courriel valide."]}}}
```
Statuts : 400 validation, 404 introuvable, 405 méthode interdite, 429 limite atteinte, 503 base indisponible.

## Compatibilité
Ne jamais retirer ni renommer un champ de `/api/v1/`. Toute rupture passe par `/api/v2/` et un ADR. Les types TypeScript (`frontend/src/types/api.ts`) sont écrits à la main : les maintenir synchronisés (génération depuis OpenAPI : à faire).

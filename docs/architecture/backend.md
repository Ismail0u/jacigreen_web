# Backend

Django 5.2 LTS, Django REST Framework, PostgreSQL 16, drf-spectacular, django-filter, django-cors-headers, WhiteNoise, Gunicorn.

## Organisation (`backend/`)
| Chemin | Rôle |
|---|---|
| `config/settings/` | `base` (commun), `development`, `production`, `test` |
| `config/api_v1_urls.py` | Routes de l'API versionnée |
| `apps/common/` | `PublishableModel`, pagination, format d'erreur, santé, admin commun, Deploy Hook, `seed_demo` |
| `apps/catalog/` | `Solution`, `Service` |
| `apps/projects/` | `Project` (réalisations) |
| `apps/news/` | `Article` |
| `apps/contact/` | `ContactRequest` (écriture seule côté API) |

Quatre apps : un domaine fonctionnel chacune, sans app superflue (Formations, légal : voir ADR-0003).

## Modèles
- `PublishableModel` : `slug` unique, `status` (brouillon/publié), `published_at` (renseigné à la première publication, date future = publication planifiée), `is_demo`, horodatages. Index `(status, published_at)`.
- `Solution` : catégorie, maturité (disponible / en prototypage), résumé, description (texte brut), image + texte alternatif obligatoire (contrainte), ordre d'affichage.
- `Project` : pays (NE, BF, NG, BI, TD), années (contrainte de cohérence), image.
- `Article`, `Service` : voir `apps/*/models.py`.
- `ContactRequest` : objet, nom, email, organisation, message, consentement (contrainte `consent=True`), `handled`.

## Django Admin
Listes lisibles, filtres, recherche, slug pré-rempli, actions « Publier » / « Repasser en brouillon », métadonnées en lecture seule. Les demandes de contact ne sont pas créables ; seul `handled` est modifiable.

## Validation et erreurs
Validation dans les serializers et contraintes de base. Format d'erreur unique (`apps/common/exceptions.py`) : `{"error": {"code", "message", "details"}}`.

## Performances
Listes paginées (12 par défaut, 50 maximum), aucune relation (donc pas de N+1) ; un test garantit que le nombre de requêtes ne croît pas avec les données.

---
applyTo: "backend/**"
---
# Backend (Django 5.2, DRF, PostgreSQL)

- Un domaine fonctionnel = une app dans `backend/apps/`. Les contenus éditoriaux héritent de `apps.common.models.PublishableModel` (statut brouillon/publié, `published_at`, `is_demo`). Les vues publiques n'exposent que `Model.objects.published()`.
- API : routes dans `config/api_v1_urls.py`, versionnée `/api/v1/`. Ne casse jamais la compatibilité d'un endpoint existant ; ajoute plutôt un champ optionnel ou une nouvelle version.
- Chaque vue déclare `permission_classes` explicitement (le défaut global est `IsAuthenticated`). Ajoute `extend_schema(tags=[...])` : `manage.py spectacular --validate --fail-on-warn` doit rester propre.
- Erreurs : format uniforme `{"error": {"code", "message", "details"}}` (voir `apps/common/exceptions.py`). Ne lève pas d'exception Python brute pour une erreur métier.
- Modèles : contraintes (`CheckConstraint`), index justifiés, `verbose_name` en français. Toute modification de modèle s'accompagne d'une migration (`makemigrations`) relue ; `makemigrations --check` doit passer. Jamais de migration destructrice automatique.
- Évite les requêtes N+1 (`select_related`, `prefetch_related`) et garde un test du nombre de requêtes quand une relation est ajoutée.
- Données personnelles (`ContactRequest`) : jamais exposées en lecture par l'API, jamais journalisées.
- Pas de logique métier complexe dans les modèles ni les vues : crée un module de service seulement quand une opération le justifie.
- Les contenus de démonstration passent par `seed_demo` (refuse hors `DEBUG`).
- Lance `ruff check .`, `ruff format --check .`, puis `DJANGO_SETTINGS_MODULE=config.settings.test python manage.py test`.

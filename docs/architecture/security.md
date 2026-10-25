# Sécurité

## Implémenté
| Mesure | Où |
|---|---|
| `SECRET_KEY` sans valeur par défaut (échec immédiat si absente) | `config/settings/base.py` |
| `DEBUG=False`, `ALLOWED_HOSTS` obligatoire en production | `settings/production.py` |
| HTTPS forcé, HSTS (1 an), cookies sécurisés, `X_FRAME_OPTIONS=DENY`, `nosniff` | `settings/production.py` |
| CORS limité aux origines du frontend, méthodes GET/POST/OPTIONS, sans identifiants | `settings/base.py` |
| CSRF : l'API n'utilise ni cookie ni session (aucune authentification) ; seul `/admin/` s'appuie sur CSRF | `settings/base.py` |
| Permissions DRF : défaut `IsAuthenticated`, `AllowAny` déclaré vue par vue | `REST_FRAMEWORK`, vues |
| Validation serveur systématique et contraintes en base | serializers, modèles |
| Limitation de débit (120/min anonyme, 5/h pour le contact) | `ScopedRateThrottle`, `AnonRateThrottle` |
| Honeypot du formulaire de contact | `apps/contact/views.py` |
| Données personnelles : jamais lisibles via l'API, jamais journalisées | `apps/contact` |
| Texte brut rendu par React (pas de HTML injecté) | `Prose`, ESLint |
| Aucun secret dans `VITE_*`, `.env.example` sans valeur réelle, utilisateur non privilégié dans les images | frontend, Docker |
| En-têtes HTTP du frontend (Vercel) | `frontend/vercel.json` |

## Limites et points d'attention
- **Limitation de débit par IP** : derrière Render, définir `DRF_NUM_PROXIES=1`, sinon toutes les requêtes semblent venir du proxy. Avec plusieurs workers, le compteur est par processus : définir `CACHE_URL` vers un cache partagé (Redis, par exemple).
- **Content-Security-Policy** : non définie (à faire) ; `vercel.json` ne contient pas de CSP.
- **Django Admin** : changer l'URL `/admin/` et activer une double authentification avant la production (à faire).
- **Notification par email** des demandes de contact : non implémentée ; les demandes sont lues dans l'admin.
- **Dépendances** : Dependabot configuré, `pip-audit` / `npm audit` non intégrés à la CI (à faire).
- `check --deploy` (réglages de production) n'émet qu'un avertissement : `SECURE_HSTS_PRELOAD`, volontairement désactivé.

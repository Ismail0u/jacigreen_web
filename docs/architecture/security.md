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
| Validation frontend et serveur des champs du contact, consentement obligatoire et contraintes en base | `contact-schema.ts`, `apps/contact/serializers.py`, modèle |
| Limitation de débit globale anonyme (120/min) et limitée au contact (5/h) | `AnonRateThrottle`, `ScopedRateThrottle` |
| Honeypot : réponse de succès neutre, demande non enregistrée | `apps/contact/views.py` |
| Demandes en écriture seule via l'API, consultation dans l'admin uniquement | `apps/contact/views.py`, `apps/contact/admin.py` |
| Données personnelles : aucune lecture via l'API ; aucun log dédié au contenu des demandes identifié dans le parcours applicatif | `apps/contact` |
| Texte brut rendu par React (pas de HTML injecté) | `Prose`, ESLint |
| Aucun secret dans `VITE_*`, `.env.example` sans valeur réelle, utilisateur non privilégié dans les images | frontend, Docker |
| En-têtes HTTP du frontend (Vercel) | `frontend/vercel.json` |

## Formulaire de contact — vérification

Le formulaire vérifie côté client l’objet autorisé, les longueurs du nom,
organisation et message, l’adresse email et le consentement. L’API revalide les
champs avant l’enregistrement ; la validation serveur demeure l’autorité. Le
champ honeypot n’est pas montré aux utilisateurs et, s’il est renseigné, la
réponse reste identique à un envoi accepté sans créer de demande. Les tests
couvrent le dépôt valide, le consentement, les sujets et valeurs invalides,
l’absence d’exposition en lecture, le honeypot et la limite de débit.

Le code vérifié ne configure pas de notification email automatique. La durée
de conservation, le responsable de traitement, la base juridique, les
destinataires et les modalités d’exercice des droits restent à définir avant
publication de la politique de confidentialité ; voir le
[`registre éditorial`](../content/content-register.md).

## Limites et points d'attention
- **Limitation de débit par IP** : derrière Render, définir `DRF_NUM_PROXIES=1`, sinon toutes les requêtes semblent venir du proxy. Avec plusieurs workers, le compteur est par processus : définir `CACHE_URL` vers un cache partagé (Redis, par exemple).
- **Content-Security-Policy** : non définie (à faire) ; `vercel.json` ne contient pas de CSP.
- **Django Admin** : changer l'URL `/admin/` et activer une double authentification avant la production (à faire).
- **Notification par email** des demandes de contact : non implémentée ; les demandes sont lues dans l'admin.
- **Dépendances** : Dependabot configuré, `pip-audit` / `npm audit` non intégrés à la CI (à faire).
- `check --deploy` (réglages de production) n'émet qu'un avertissement : `SECURE_HSTS_PRELOAD`, volontairement désactivé.

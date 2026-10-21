"""Paramètres communs à tous les environnements.

Toute valeur sensible ou dépendante de l'environnement provient de variables
d'environnement (voir ``.env.example``). Aucun secret n'est présent dans le code.
"""

from pathlib import Path

import environ

BASE_DIR = Path(__file__).resolve().parent.parent.parent

env = environ.Env()
# Lecture optionnelle d'un fichier .env local (hors Docker). Absent en production.
_env_file = BASE_DIR / ".env"
if _env_file.exists():
    environ.Env.read_env(_env_file)

# SECRET_KEY n'a volontairement pas de valeur par défaut : échec immédiat si absente.
SECRET_KEY = env("DJANGO_SECRET_KEY")
DEBUG = env.bool("DJANGO_DEBUG", default=False)
ALLOWED_HOSTS = env.list("DJANGO_ALLOWED_HOSTS", default=[])

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    # Tiers
    "rest_framework",
    "django_filters",
    "corsheaders",
    "drf_spectacular",
    "drf_spectacular_sidecar",
    # Applications du projet
    "apps.common",
    "apps.catalog",
    "apps.projects",
    "apps.news",
    "apps.contact",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "config.urls"
WSGI_APPLICATION = "config.wsgi.application"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

DATABASES = {"default": env.db("DATABASE_URL")}
DATABASES["default"]["CONN_MAX_AGE"] = env.int("DB_CONN_MAX_AGE", default=60)
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# Cache utilisé notamment par la limitation de débit. Par défaut : mémoire locale
# (un compteur par processus). En production multi-workers, définir CACHE_URL
# vers un cache partagé (voir docs/architecture/security.md).
CACHES = {"default": env.cache("CACHE_URL", default="locmemcache://")}

AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

LANGUAGE_CODE = "fr-fr"
TIME_ZONE = "Africa/Niamey"
USE_I18N = True
USE_TZ = True

STATIC_URL = "static/"
STATIC_ROOT = BASE_DIR / "staticfiles"
MEDIA_URL = "media/"
MEDIA_ROOT = BASE_DIR / "media"
STORAGES = {
    "default": {"BACKEND": "django.core.files.storage.FileSystemStorage"},
    "staticfiles": {"BACKEND": "django.contrib.staticfiles.storage.StaticFilesStorage"},
}

# --- Django REST Framework -------------------------------------------------
REST_FRAMEWORK = {
    # Refus par défaut : chaque vue publique déclare explicitement AllowAny.
    "DEFAULT_PERMISSION_CLASSES": ["rest_framework.permissions.IsAuthenticated"],
    # Pas d'authentification en Phase 1 (aucun compte public).
    "DEFAULT_AUTHENTICATION_CLASSES": [],
    "DEFAULT_RENDERER_CLASSES": ["rest_framework.renderers.JSONRenderer"],
    "DEFAULT_PARSER_CLASSES": ["rest_framework.parsers.JSONParser"],
    "DEFAULT_PAGINATION_CLASS": "apps.common.pagination.StandardPagination",
    "PAGE_SIZE": 12,
    "DEFAULT_FILTER_BACKENDS": [
        "django_filters.rest_framework.DjangoFilterBackend",
        "rest_framework.filters.SearchFilter",
        "rest_framework.filters.OrderingFilter",
    ],
    "DEFAULT_THROTTLE_CLASSES": ["rest_framework.throttling.AnonRateThrottle"],
    "DEFAULT_THROTTLE_RATES": {
        "anon": env("THROTTLE_ANON_RATE", default="120/min"),
        "contact": env("THROTTLE_CONTACT_RATE", default="5/hour"),
    },
    # Nombre de proxys de confiance devant l'API (0 = adresse directe ; 1 sur Render).
    # Une valeur incorrecte fausse la limitation de débit par adresse IP.
    "NUM_PROXIES": env.int("DRF_NUM_PROXIES", default=0),
    "EXCEPTION_HANDLER": "apps.common.exceptions.api_exception_handler",
    "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
}

SPECTACULAR_SETTINGS = {
    "TITLE": "API JACIGREEN",
    "DESCRIPTION": (
        "API publique en lecture seule du site JACIGREEN, avec dépôt de demandes de contact."
    ),
    "VERSION": "1.0.0",
    "SERVE_INCLUDE_SCHEMA": False,
    "SWAGGER_UI_DIST": "SIDECAR",
    "SWAGGER_UI_FAVICON_HREF": "SIDECAR",
    "REDOC_DIST": "SIDECAR",
    "COMPONENT_SPLIT_REQUEST": True,
    # Noms explicites pour les listes de choix homonymes (champ « category »).
    "ENUM_NAME_OVERRIDES": {
        "SolutionCategoryEnum": "apps.catalog.models.Solution.Category",
        "ArticleCategoryEnum": "apps.news.models.Article.Category",
    },
}

# --- CORS : uniquement les origines du frontend, méthodes minimales --------
CORS_ALLOWED_ORIGINS = env.list("CORS_ALLOWED_ORIGINS", default=[])
CORS_ALLOW_METHODS = ["GET", "POST", "OPTIONS"]
CORS_ALLOW_CREDENTIALS = False
# CSRF : l'API n'utilise ni cookie ni session (aucune authentification) ; seule
# l'administration Django (/admin/) s'appuie sur CSRF. Origines de confiance
# nécessaires derrière un proxy HTTPS (ex. Render).
CSRF_TRUSTED_ORIGINS = env.list("CSRF_TRUSTED_ORIGINS", default=[])

# --- Intégrations ----------------------------------------------------------
# Deploy Hook du frontend (Vercel) appelé à chaque publication de contenu.
# Vide = désactivé. Délai minimal entre deux appels (0 = aucun anti-rebond).
FRONTEND_DEPLOY_HOOK_URL = env("FRONTEND_DEPLOY_HOOK_URL", default="")
FRONTEND_DEPLOY_HOOK_COOLDOWN_SECONDS = env.int("FRONTEND_DEPLOY_HOOK_COOLDOWN_SECONDS", default=0)

LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {"simple": {"format": "%(asctime)s %(levelname)s %(name)s: %(message)s"}},
    "handlers": {"console": {"class": "logging.StreamHandler", "formatter": "simple"}},
    "root": {"handlers": ["console"], "level": env("LOG_LEVEL", default="INFO")},
}

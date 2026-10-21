"""Tests automatisés : rapide et isolé. La base est fournie par DATABASE_URL."""

import os

# Clé factice réservée aux tests, définie avant l'import des réglages de base
# (qui exigent DJANGO_SECRET_KEY). Elle ne sert jamais en production.
os.environ.setdefault("DJANGO_SECRET_KEY", "test-only-secret-key-not-for-production")

from .base import *  # noqa: E402, F403

DEBUG = False
ALLOWED_HOSTS = ["testserver", "localhost"]
PASSWORD_HASHERS = ["django.contrib.auth.hashers.MD5PasswordHasher"]
EMAIL_BACKEND = "django.core.mail.backends.locmem.EmailBackend"
CORS_ALLOWED_ORIGINS = ["http://localhost:5173"]
FRONTEND_DEPLOY_HOOK_URL = ""
# Inutile en test (pas de fichiers statiques collectés) et source d'avertissements.
MIDDLEWARE = [m for m in MIDDLEWARE if "whitenoise" not in m]  # noqa: F405

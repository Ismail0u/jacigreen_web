# syntax=docker/dockerfile:1
# Cibles : « dev » (Docker Compose local) et « production » (Render ou équivalent).

FROM python:3.12-slim-bookworm AS base
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1
RUN groupadd --system --gid 1000 app && useradd --system --uid 1000 --gid app --create-home app
WORKDIR /app

# --- Développement : outils de qualité inclus, code monté en volume -----------
FROM base AS dev
COPY requirements/ requirements/
RUN pip install -r requirements/dev.txt
COPY --chown=app:app . .
RUN mkdir -p media && chown app:app media
USER app
EXPOSE 8000
ENTRYPOINT ["/app/docker/entrypoint.sh"]
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

# --- Production : dépendances d'exécution seulement, serveur gunicorn ---------
FROM base AS production
COPY requirements/base.txt requirements/base.txt
RUN pip install -r requirements/base.txt
COPY --chown=app:app . .
# Collecte des fichiers statiques avec des valeurs factices (aucun secret dans l'image).
RUN DJANGO_SETTINGS_MODULE=config.settings.production DJANGO_SECRET_KEY=build-only \
    DJANGO_ALLOWED_HOSTS=localhost DATABASE_URL=sqlite:////tmp/build.db \
    python manage.py collectstatic --noinput && chown -R app:app staticfiles
USER app
ENV DJANGO_SETTINGS_MODULE=config.settings.production
EXPOSE 8000
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD python -c "import os,urllib.request;urllib.request.urlopen(f\"http://localhost:{os.environ.get('PORT','8000')}/api/v1/health/\",timeout=3)" || exit 1
ENTRYPOINT ["/app/docker/entrypoint.sh"]
CMD ["sh", "-c", "exec gunicorn config.wsgi:application --bind 0.0.0.0:${PORT:-8000} --workers ${WEB_CONCURRENCY:-2} --access-logfile -"]

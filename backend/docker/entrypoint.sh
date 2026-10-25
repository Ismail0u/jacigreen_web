#!/bin/sh
# Attend que PostgreSQL accepte réellement les connexions,
# puis exécute les migrations et crée l'admin si configuré.
set -eu
python - <<'PY'
import os, sys, time
import psycopg

url = os.environ.get("DATABASE_URL")
if not url:
    sys.exit("DATABASE_URL est requis.")
for attempt in range(1, 31):
    try:
        psycopg.connect(url, connect_timeout=3).close()
        print(f"Base de données disponible (tentative {attempt}).")
        break
    except psycopg.OperationalError as error:
        print(f"En attente de la base de données ({attempt}/30) : {str(error).splitlines()[0]}")
        time.sleep(2)
else:
    sys.exit("Base de données injoignable après 30 tentatives.")
PY

# 1. Exécute les migrations automatiquement
echo "Exécution des migrations..."
python manage.py migrate --noinput

# 2. Crée le superutilisateur de manière sécurisée via les variables d'environnement Render
echo "Vérification / Création du superutilisateur..."
python manage.py shell <<EOF
import os
from django.contrib.auth import get_user_model

User = get_user_model()
username = os.environ.get("DJANGO_SUPERUSER_USERNAME", "admin")
email = os.environ.get("DJANGO_SUPERUSER_EMAIL", "admin@jacigreen.com")
password = os.environ.get("DJANGO_SUPERUSER_PASSWORD", "")

if password:
    if not User.objects.filter(username=username).exists():
        User.objects.create_superuser(username, email, password)
        print(f"Superutilisateur '{username}' créé avec succès.")
    else:
        print(f"Le superutilisateur '{username}' existe déjà.")
else:
    print("Aucun DJANGO_SUPERUSER_PASSWORD défini, création d'admin ignorée.")
EOF

# Lance l'application (Gunicorn)
exec "$@"

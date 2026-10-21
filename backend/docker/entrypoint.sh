#!/bin/sh
# Attend que PostgreSQL accepte réellement les connexions, puis exécute la commande.
# (depends_on seul ne garantit pas que la base est prête.) Aucune migration automatique.
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
exec "$@"

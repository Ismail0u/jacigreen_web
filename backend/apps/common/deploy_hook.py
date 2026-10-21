"""Adaptateur vers le Deploy Hook du frontend.

Le frontend est pré-rendu au build : publier un contenu doit déclencher un
nouveau build pour que le HTML statique soit mis à jour. Un échec de l'appel ne
doit jamais empêcher l'enregistrement du contenu dans l'administration.
"""

import logging
import urllib.error
import urllib.request

from django.conf import settings
from django.core.cache import cache

logger = logging.getLogger(__name__)
_COOLDOWN_KEY = "frontend-deploy-hook-cooldown"


def trigger_frontend_rebuild(reason: str) -> bool:
    url = settings.FRONTEND_DEPLOY_HOOK_URL
    if not url:
        return False
    if not url.startswith("https://"):
        logger.error("FRONTEND_DEPLOY_HOOK_URL ignorée : le schéma https est obligatoire.")
        return False
    cooldown = settings.FRONTEND_DEPLOY_HOOK_COOLDOWN_SECONDS
    if cooldown and not cache.add(_COOLDOWN_KEY, 1, timeout=cooldown):
        logger.info("Reconstruction du frontend ignorée (délai minimal en cours) : %s", reason)
        return False
    request = urllib.request.Request(url, method="POST")  # noqa: S310 - https vérifié ci-dessus
    try:
        with urllib.request.urlopen(request, timeout=5) as response:  # noqa: S310
            logger.info(
                "Reconstruction du frontend demandée (%s) : HTTP %s", reason, response.status
            )
        return True
    except (urllib.error.URLError, TimeoutError) as exc:
        logger.warning("Échec du Deploy Hook (%s) : %s", reason, exc)
        return False

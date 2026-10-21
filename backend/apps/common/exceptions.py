"""Format d'erreur unique pour toute l'API : {"error": {"code", "message", "details"}}."""

from rest_framework import exceptions
from rest_framework.response import Response
from rest_framework.views import exception_handler


def api_exception_handler(exc, context):
    response = exception_handler(exc, context)
    if response is None:
        return None  # Erreur non gérée : Django répond 500 sans détail technique en production.

    if isinstance(exc, exceptions.ValidationError):
        code, message = "validation_error", "Les données envoyées sont invalides."
        details = response.data
    elif isinstance(exc, exceptions.APIException):
        code, message = exc.get_codes(), str(exc.detail)
        details = None
        if not isinstance(code, str):
            code = "error"
    else:
        code, message, details = "error", "Requête refusée.", None

    return Response(
        {"error": {"code": code, "message": message, "details": details}},
        status=response.status_code,
        headers=dict(response.items()),
    )

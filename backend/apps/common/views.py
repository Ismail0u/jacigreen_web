from django.db import connection
from drf_spectacular.utils import OpenApiResponse, extend_schema, inline_serializer
from rest_framework import serializers, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView


class HealthView(APIView):
    """Sonde de disponibilité (utilisée par les healthchecks Docker)."""

    permission_classes = [AllowAny]
    throttle_classes: list = []

    @extend_schema(
        tags=["système"],
        responses={
            200: inline_serializer("Health", {"status": serializers.CharField()}),
            503: OpenApiResponse(description="Base de données indisponible."),
        },
    )
    def get(self, request):
        try:
            with connection.cursor() as cursor:
                cursor.execute("SELECT 1")
        except Exception:
            return Response(
                {"status": "database_unavailable"}, status=status.HTTP_503_SERVICE_UNAVAILABLE
            )
        return Response({"status": "ok"})

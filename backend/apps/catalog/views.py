from drf_spectacular.utils import extend_schema
from rest_framework import viewsets
from rest_framework.permissions import AllowAny

from .models import Service, Solution
from .serializers import ServiceSerializer, SolutionDetailSerializer, SolutionListSerializer


@extend_schema(tags=["solutions"])
class SolutionViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [AllowAny]
    lookup_field = "slug"
    filterset_fields = ("category", "maturity")
    search_fields = ("name", "summary")
    ordering_fields = ("display_order", "name")

    def get_queryset(self):
        return Solution.objects.published()

    def get_serializer_class(self):
        return SolutionDetailSerializer if self.action == "retrieve" else SolutionListSerializer


@extend_schema(tags=["services"])
class ServiceViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [AllowAny]
    serializer_class = ServiceSerializer
    lookup_field = "slug"
    search_fields = ("title", "summary")
    ordering_fields = ("display_order", "title")

    def get_queryset(self):
        return Service.objects.published()

from drf_spectacular.utils import extend_schema
from rest_framework import viewsets
from rest_framework.permissions import AllowAny

from .models import Project
from .serializers import ProjectSerializer


@extend_schema(tags=["réalisations"])
class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [AllowAny]
    serializer_class = ProjectSerializer
    lookup_field = "slug"
    filterset_fields = ("country",)
    search_fields = ("title", "summary")
    ordering_fields = ("year_start", "title")

    def get_queryset(self):
        return Project.objects.published()

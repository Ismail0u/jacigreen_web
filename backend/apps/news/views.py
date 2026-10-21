from drf_spectacular.utils import extend_schema
from rest_framework import viewsets
from rest_framework.permissions import AllowAny

from .models import Article
from .serializers import ArticleDetailSerializer, ArticleListSerializer


@extend_schema(tags=["actualités"])
class ArticleViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [AllowAny]
    lookup_field = "slug"
    filterset_fields = ("category",)
    search_fields = ("title", "excerpt")
    ordering_fields = ("published_at", "title")

    def get_queryset(self):
        return Article.objects.published()

    def get_serializer_class(self):
        return ArticleDetailSerializer if self.action == "retrieve" else ArticleListSerializer

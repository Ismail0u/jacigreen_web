from rest_framework import serializers

from .models import Article


class ArticleListSerializer(serializers.ModelSerializer):
    cover_image = serializers.ImageField(read_only=True)

    class Meta:
        model = Article
        fields = (
            "slug", "title", "excerpt", "category", "published_at",
            "cover_image", "cover_alt", "is_demo",
        )  # fmt: skip


class ArticleDetailSerializer(ArticleListSerializer):
    class Meta(ArticleListSerializer.Meta):
        fields = (*ArticleListSerializer.Meta.fields, "body", "author_name", "updated_at")

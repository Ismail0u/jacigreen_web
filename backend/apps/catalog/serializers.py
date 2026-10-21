from rest_framework import serializers

from .models import Service, Solution


class SolutionListSerializer(serializers.ModelSerializer):
    cover_image = serializers.ImageField(read_only=True)

    class Meta:
        model = Solution
        fields = (
            "slug", "name", "tagline", "category", "maturity", "summary",
            "cover_image", "cover_alt", "is_demo",
        )  # fmt: skip


class SolutionDetailSerializer(SolutionListSerializer):
    class Meta(SolutionListSerializer.Meta):
        fields = (*SolutionListSerializer.Meta.fields, "description", "published_at", "updated_at")


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ("slug", "title", "summary", "description", "is_demo")

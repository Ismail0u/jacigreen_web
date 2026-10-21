from rest_framework import serializers

from .models import Project


class ProjectSerializer(serializers.ModelSerializer):
    cover_image = serializers.ImageField(read_only=True)
    country_label = serializers.CharField(source="get_country_display", read_only=True)

    class Meta:
        model = Project
        fields = (
            "slug", "title", "summary", "description", "country", "country_label",
            "year_start", "year_end", "cover_image", "cover_alt", "is_demo",
        )  # fmt: skip

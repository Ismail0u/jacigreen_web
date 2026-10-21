from django.contrib import admin, messages
from django.utils import timezone

from .models import PublishableModel


@admin.action(description="Publier les éléments sélectionnés")
def publish_selected(modeladmin, request, queryset):
    updated = queryset.filter(status=PublishableModel.Status.DRAFT).update(
        status=PublishableModel.Status.PUBLISHED, published_at=timezone.now()
    )
    messages.success(request, f"{updated} élément(s) publié(s).")


@admin.action(description="Repasser les éléments sélectionnés en brouillon")
def unpublish_selected(modeladmin, request, queryset):
    updated = queryset.update(status=PublishableModel.Status.DRAFT)
    messages.success(request, f"{updated} élément(s) repassé(s) en brouillon.")


class PublishableAdmin(admin.ModelAdmin):
    """Configuration commune des contenus éditoriaux."""

    list_filter = ("status", "is_demo")
    readonly_fields = ("created_at", "updated_at")
    actions = (publish_selected, unpublish_selected)
    prepopulated_fields: dict = {}
    save_on_top = True

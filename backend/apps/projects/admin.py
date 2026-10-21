from django.contrib import admin

from apps.common.admin import PublishableAdmin

from .models import Project


@admin.register(Project)
class ProjectAdmin(PublishableAdmin):
    list_display = ("title", "country", "year_start", "status", "published_at", "is_demo")
    list_filter = (*PublishableAdmin.list_filter, "country")
    search_fields = ("title", "summary")
    prepopulated_fields = {"slug": ("title",)}

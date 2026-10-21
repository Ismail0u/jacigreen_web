from django.contrib import admin

from apps.common.admin import PublishableAdmin

from .models import Service, Solution


@admin.register(Solution)
class SolutionAdmin(PublishableAdmin):
    list_display = ("name", "category", "maturity", "status", "published_at", "is_demo")
    list_filter = (*PublishableAdmin.list_filter, "category", "maturity")
    search_fields = ("name", "summary")
    prepopulated_fields = {"slug": ("name",)}


@admin.register(Service)
class ServiceAdmin(PublishableAdmin):
    list_display = ("title", "status", "published_at", "is_demo")
    search_fields = ("title", "summary")
    prepopulated_fields = {"slug": ("title",)}

from django.contrib import admin

from apps.common.admin import PublishableAdmin

from .models import Article


@admin.register(Article)
class ArticleAdmin(PublishableAdmin):
    list_display = ("title", "category", "status", "published_at", "is_demo")
    list_filter = (*PublishableAdmin.list_filter, "category")
    search_fields = ("title", "excerpt")
    prepopulated_fields = {"slug": ("title",)}
    date_hierarchy = "published_at"

from django.contrib import admin

from .models import ContactRequest


@admin.register(ContactRequest)
class ContactRequestAdmin(admin.ModelAdmin):
    list_display = ("created_at", "subject", "name", "email", "handled")
    list_filter = ("handled", "subject")
    search_fields = ("name", "email", "organization")
    date_hierarchy = "created_at"

    def has_add_permission(self, request):
        return False

    def get_readonly_fields(self, request, obj=None):
        # Seul le suivi de traitement est modifiable ; le contenu reçu reste intact.
        return [f.name for f in self.model._meta.fields if f.name != "handled"]

"""Modèles abstraits partagés : horodatage et cycle brouillon/publication."""

from django.db import models
from django.utils import timezone


class TimeStampedModel(models.Model):
    created_at = models.DateTimeField("créé le", auto_now_add=True)
    updated_at = models.DateTimeField("modifié le", auto_now=True)

    class Meta:
        abstract = True


class PublishableQuerySet(models.QuerySet):
    def published(self) -> "PublishableQuerySet":
        """Contenus publiés dont la date de publication est atteinte."""
        return self.filter(
            status=PublishableModel.Status.PUBLISHED, published_at__lte=timezone.now()
        )


class PublishableModel(TimeStampedModel):
    """Contenu éditorial avec brouillon, publication planifiable et marquage « démo »."""

    class Status(models.TextChoices):
        DRAFT = "draft", "Brouillon"
        PUBLISHED = "published", "Publié"

    slug = models.SlugField("identifiant d'URL", max_length=120, unique=True)
    status = models.CharField(
        "statut", max_length=10, choices=Status.choices, default=Status.DRAFT, db_index=True
    )
    published_at = models.DateTimeField(
        "publié le",
        null=True,
        blank=True,
        help_text="Renseignée automatiquement à la première publication. "
        "Une date future planifie la publication.",
    )
    is_demo = models.BooleanField(
        "donnée de démonstration",
        default=False,
        help_text="Contenu fictif. Ne doit jamais être publié en production.",
    )

    objects = PublishableQuerySet.as_manager()

    class Meta:
        abstract = True

    def save(self, *args, **kwargs):
        if self.status == self.Status.PUBLISHED and self.published_at is None:
            self.published_at = timezone.now()
        super().save(*args, **kwargs)

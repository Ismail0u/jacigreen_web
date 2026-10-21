from django.db import models

from apps.common.models import PublishableModel


class Solution(PublishableModel):
    """Solution technique présentée sur le site (fiche consultable, sans vente en ligne)."""

    class Category(models.TextChoices):
        ENERGY = "energy", "Énergie"
        FERTILIZER = "fertilizer", "Fertilisation"
        WATER = "water", "Eau"
        OTHER = "other", "Autre"

    class Maturity(models.TextChoices):
        AVAILABLE = "available", "Disponible"
        PROTOTYPE = "prototype", "En prototypage"

    name = models.CharField("nom", max_length=120)
    tagline = models.CharField("accroche", max_length=160, blank=True)
    category = models.CharField("catégorie", max_length=12, choices=Category.choices, db_index=True)
    maturity = models.CharField(
        "maturité", max_length=10, choices=Maturity.choices, default=Maturity.AVAILABLE
    )
    summary = models.TextField("résumé", max_length=400)
    description = models.TextField(
        "description", help_text="Texte brut. Un paragraphe par ligne vide."
    )
    cover_image = models.ImageField("image", upload_to="solutions/", blank=True)
    cover_alt = models.CharField("texte alternatif de l'image", max_length=200, blank=True)
    display_order = models.PositiveSmallIntegerField("ordre d'affichage", default=100)

    class Meta:
        ordering = ["display_order", "name"]
        verbose_name = "solution"
        indexes = [models.Index(fields=["status", "published_at"], name="solution_pub_idx")]
        constraints = [
            models.CheckConstraint(
                condition=models.Q(cover_image="") | ~models.Q(cover_alt=""),
                name="solution_image_requires_alt",
                violation_error_message="Une image doit avoir un texte alternatif.",
            )
        ]

    def __str__(self) -> str:
        return self.name


class Service(PublishableModel):
    title = models.CharField("titre", max_length=140)
    summary = models.TextField("résumé", max_length=400)
    description = models.TextField("description", blank=True)
    display_order = models.PositiveSmallIntegerField("ordre d'affichage", default=100)

    class Meta:
        ordering = ["display_order", "title"]
        verbose_name = "service"
        indexes = [models.Index(fields=["status", "published_at"], name="service_pub_idx")]

    def __str__(self) -> str:
        return self.title

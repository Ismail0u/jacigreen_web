from django.db import models

from apps.common.models import PublishableModel


class Project(PublishableModel):
    """Réalisation ou projet de terrain (chiffres à faire valider avant saisie)."""

    class Country(models.TextChoices):
        NIGER = "NE", "Niger"
        BURKINA_FASO = "BF", "Burkina Faso"
        NIGERIA = "NG", "Nigeria"
        BURUNDI = "BI", "Burundi"
        CHAD = "TD", "Tchad"

    title = models.CharField("titre", max_length=160)
    summary = models.TextField("résumé", max_length=400)
    description = models.TextField("description", blank=True)
    country = models.CharField("pays", max_length=2, choices=Country.choices, db_index=True)
    year_start = models.PositiveSmallIntegerField("année de début", null=True, blank=True)
    year_end = models.PositiveSmallIntegerField("année de fin", null=True, blank=True)
    cover_image = models.ImageField("image", upload_to="projects/", blank=True)
    cover_alt = models.CharField("texte alternatif de l'image", max_length=200, blank=True)

    class Meta:
        ordering = ["-year_start", "title"]
        verbose_name = "réalisation"
        indexes = [models.Index(fields=["status", "published_at"], name="project_pub_idx")]
        constraints = [
            models.CheckConstraint(
                condition=models.Q(year_end__isnull=True)
                | models.Q(year_start__isnull=True)
                | models.Q(year_end__gte=models.F("year_start")),
                name="project_years_consistent",
                violation_error_message="L'année de fin doit suivre l'année de début.",
            ),
            models.CheckConstraint(
                condition=models.Q(cover_image="") | ~models.Q(cover_alt=""),
                name="project_image_requires_alt",
                violation_error_message="Une image doit avoir un texte alternatif.",
            ),
        ]

    def __str__(self) -> str:
        return self.title

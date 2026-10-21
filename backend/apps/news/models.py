from django.db import models

from apps.common.models import PublishableModel


class Article(PublishableModel):
    class Category(models.TextChoices):
        NEWS = "news", "Actualité"
        PROJECT = "project", "Projet"
        RESOURCE = "resource", "Ressource"

    title = models.CharField("titre", max_length=200)
    excerpt = models.TextField("extrait", max_length=300)
    body = models.TextField("contenu", help_text="Texte brut. Un paragraphe par ligne vide.")
    category = models.CharField(
        "catégorie", max_length=10, choices=Category.choices, default=Category.NEWS
    )
    author_name = models.CharField("auteur", max_length=120, blank=True)
    cover_image = models.ImageField("image", upload_to="articles/", blank=True)
    cover_alt = models.CharField("texte alternatif de l'image", max_length=200, blank=True)

    class Meta:
        ordering = ["-published_at", "-created_at"]
        verbose_name = "article"
        indexes = [models.Index(fields=["status", "-published_at"], name="article_pub_idx")]
        constraints = [
            models.CheckConstraint(
                condition=models.Q(cover_image="") | ~models.Q(cover_alt=""),
                name="article_image_requires_alt",
                violation_error_message="Une image doit avoir un texte alternatif.",
            )
        ]

    def __str__(self) -> str:
        return self.title

from django.db import models

from apps.common.models import TimeStampedModel


class ContactRequest(TimeStampedModel):
    """Message déposé via le formulaire public. Données personnelles : accès restreint à l'admin."""

    class Subject(models.TextChoices):
        GENERAL = "general", "Demande d'information"
        QUOTE = "quote", "Demande de devis"
        TRAINING = "training", "Formation"
        PARTNERSHIP = "partnership", "Partenariat"
        BUYBACK_INFO = "buyback_info", "Rachat de biodigesteur (information)"
        OTHER = "other", "Autre"

    subject = models.CharField("objet", max_length=14, choices=Subject.choices)
    name = models.CharField("nom", max_length=120)
    email = models.EmailField("email")
    organization = models.CharField("organisation", max_length=160, blank=True)
    message = models.TextField("message", max_length=5000)
    consent = models.BooleanField("consentement au traitement des données")
    handled = models.BooleanField("traité", default=False)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "demande de contact"
        verbose_name_plural = "demandes de contact"
        indexes = [models.Index(fields=["handled", "-created_at"], name="contact_handled_idx")]
        constraints = [
            models.CheckConstraint(
                condition=models.Q(consent=True), name="contact_requires_consent"
            )
        ]

    def __str__(self) -> str:
        return f"{self.get_subject_display()} — {self.name}"

from django.core.management import call_command
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Alias de compatibilité pour seed_institutional_draft"

    def add_arguments(self, parser):
        parser.add_argument(
            "--clear",
            action="store_true",
            help="Supprime les contenus institutionnels existants avant de peupler.",
        )

    def handle(self, *args, **options):
        # Redirige directement vers la commande officielle
        call_command("seed_institutional_draft", **options)

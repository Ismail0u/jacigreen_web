from django.apps import AppConfig


class CommonConfig(AppConfig):
    name = "apps.common"
    verbose_name = "Socle commun"

    def ready(self) -> None:
        from . import signals  # noqa: F401

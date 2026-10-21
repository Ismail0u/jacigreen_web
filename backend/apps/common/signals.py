"""Déclenche la reconstruction du frontend quand un contenu publié change."""

from django.db import transaction
from django.db.models.signals import post_delete, post_save, pre_save
from django.dispatch import receiver

from .deploy_hook import trigger_frontend_rebuild
from .models import PublishableModel


def _was_published(instance: PublishableModel) -> bool:
    if instance.pk is None:
        return False
    return (
        type(instance)
        .objects.filter(pk=instance.pk, status=PublishableModel.Status.PUBLISHED)
        .exists()
    )


@receiver(pre_save)
def remember_previous_state(sender, instance, raw=False, **kwargs):
    if raw or not isinstance(instance, PublishableModel):
        return
    instance._was_published = _was_published(instance)


@receiver(post_save)
def rebuild_on_save(sender, instance, raw=False, **kwargs):
    if raw or not isinstance(instance, PublishableModel):
        return
    is_published = instance.status == PublishableModel.Status.PUBLISHED
    if is_published or getattr(instance, "_was_published", False):
        label = f"{sender.__name__}:{instance.slug}"
        transaction.on_commit(lambda: trigger_frontend_rebuild(label))


@receiver(post_delete)
def rebuild_on_delete(sender, instance, **kwargs):
    if (
        isinstance(instance, PublishableModel)
        and instance.status == PublishableModel.Status.PUBLISHED
    ):
        label = f"{sender.__name__}:{instance.slug}:deleted"
        transaction.on_commit(lambda: trigger_frontend_rebuild(label))

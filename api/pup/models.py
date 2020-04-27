from django.conf import settings
from django.core.validators import URLValidator
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

from pup.utils.screenshot.twitter import Twitter
from pupcket.celery import app


class SavedMoment(models.Model):
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="moments", on_delete=models.CASCADE
    )
    url = models.CharField(max_length=500, validators=[URLValidator])
    screenshot_url = models.CharField(max_length=500, blank=True, null=True)
    created_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_date"]


@receiver(post_save, sender=SavedMoment)
def save_screenshot_of_moment(sender, instance=None, created=False, **kwargs):
    if created:
        take_screenshot.delay(instance.url)


@app.task
def take_screenshot(url):
    twitter = Twitter(url)
    twitter.generate_screenshot()

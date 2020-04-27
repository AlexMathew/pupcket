import os
from hashlib import md5

from django.conf import settings
from django.core.validators import URLValidator
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils.functional import cached_property

from pup.helpers.instances import s3
from pup.utils.screenshot.twitter import Twitter
from pupcket.celery import app


class SavedMoment(models.Model):
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="moments", on_delete=models.CASCADE
    )
    url = models.CharField(max_length=500, validators=[URLValidator])
    screenshot_generated = models.BooleanField(default=False)
    created_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_date"]
        unique_together = ("owner", "url")

    def __str__(self):
        return f"{self.owner.username}: {self.url}"

    @cached_property
    def screenshot_name(self):
        return md5(
            (
                f"pup_{'dev' if os.getenv('DEBUG') == 'true' else 'prod'}_"
                f"{self.owner.username}:{self.url}"
            ).encode("utf-8")
        ).hexdigest()


@receiver(post_save, sender=SavedMoment)
def save_screenshot_of_moment(sender, instance=None, created=False, **kwargs):
    if created:
        take_screenshot.delay(instance.url, instance.screenshot_name)


@app.task
def take_screenshot(url, filename):
    twitter = Twitter(url, filename)
    twitter.generate_screenshot()
    upload_to_s3.delay(filename)


@app.task
def upload_to_s3(filename):
    image_location = f"/tmp/{filename}.png"
    s3.upload_file(
        bucket_name=os.getenv("S3_BUCKET_NAME"),
        destination=f"{filename}.png",
        source_file=image_location,
        content_type=f"image/png",
    )
    # instance.screenshot_generated = True
    # instance.save()

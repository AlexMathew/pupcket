import base64
import os
from hashlib import md5
from random import randint

from django.conf import settings
from django.core.validators import URLValidator
from django.db import models
from django.db.models.aggregates import Count
from django.utils.functional import cached_property

from helpers.instances import s3
from pupcket.celery import app
from utils.screenshot.twitter import Twitter


class RandomQuerySet(models.QuerySet):
    def screenshot_generated(self):
        return self.filter(screenshot_generated=True)

    def owned_by(self, user):
        return self.filter(owner=user)

    def pick(self, count):
        total_count = self.aggregate(count=Count("id"))["count"]
        if total_count == 0:
            return self

        all_ids = self.values_list("id", flat=True)
        random_ids = [all_ids[randint(0, total_count - 1)] for _ in range(count)]
        return self.filter(id__in=random_ids)


class SavedMoment(models.Model):
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="moments", on_delete=models.CASCADE
    )
    url = models.CharField(max_length=500, validators=[URLValidator])
    screenshot_generated = models.BooleanField(default=False)
    created_date = models.DateTimeField(auto_now_add=True)

    objects = models.Manager()
    random = RandomQuerySet.as_manager()

    class Meta:
        ordering = ["-created_date"]
        unique_together = ("owner", "url")

    def __str__(self):
        return self.url

    def save(self, *args, **kwargs):
        is_new = self._state.adding
        super().save(*args, **kwargs)
        if is_new:
            take_screenshot.delay(
                instance_id=self.id, url=self.url, filename=self.screenshot_name,
            )

    @cached_property
    def screenshot_name(self):
        return md5(
            (
                f"pup_{'dev' if os.getenv('DEBUG') == 'true' else 'prod'}_"
                f"{self.owner.username}:{self.url}"
            ).encode("utf-8")
        ).hexdigest()


@app.task
def take_screenshot(instance_id, url, filename):
    twitter = Twitter(url, filename)
    twitter.generate_screenshot()
    store_image.delay(instance_id, filename)


@app.task
def store_image(instance_id, filename):
    instance = SavedMoment.objects.only("screenshot_generated").get(id=instance_id)
    image_location = f"/tmp/{filename}.png"
    s3.upload_file(
        bucket_name=os.getenv("S3_BUCKET_NAME"),
        destination=f"{filename}.png",
        source_file=image_location,
        content_type=f"image/png",
    )
    instance.screenshot_generated = True
    instance.save()

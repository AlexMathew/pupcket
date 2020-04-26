from django.conf import settings
from django.core.validators import URLValidator
from django.db import models


class SavedMoment(models.Model):
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="moments", on_delete=models.CASCADE
    )
    url = models.CharField(max_length=500, validators=[URLValidator])
    screenshot_url = models.CharField(max_length=500, blank=True, null=True)
    created_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_date"]

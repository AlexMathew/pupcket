from __future__ import absolute_import
import os
from celery import Celery
from django.conf import settings

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "pupcket.settings")

REDIS_URL = f"redis://{os.getenv('REDIS_HOST')}:{os.getenv('REDIS_PORT')}/0"

app = Celery("pupcket")

app.conf.broker_url = REDIS_URL
app.conf.result_expires = 3600
app.conf.timezone = settings.TIME_ZONE
app.conf.imports = ()

app.autodiscover_tasks()

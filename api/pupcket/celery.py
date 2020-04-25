from __future__ import absolute_import
import os
from celery import Celery
from pupcket import settings

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "pupcket.settings")

REDIS_URL = f"redis://{os.getenv('REDIS_HOST')}:{os.getenv('REDIS_PORT')}/0"

app = Celery("pupcket")

app.conf.update(
    BROKER_URL=REDIS_URL,
    CELERY_TASK_RESULT_EXPIRES=3600,
    CELERY_TIMEZONE=settings.TIME_ZONE,
    CELERY_IMPORTS=(),
)

app.autodiscover_tasks()

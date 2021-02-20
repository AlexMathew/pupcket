import logging

from .models import SavedMoment
from pupcket.celery import app

logger = logging.getLogger(__name__)


@app.task(name="pupcket.retry_screenshot_generate")
def retry_screenshot_generate():
    logger.info("retry_screenshot_generate")
    for moment in SavedMoment.objects.filter(screenshot_generated=False):
        logger.info(f"Retrying screenshot generation for {moment}")
        moment.generate_screenshot()

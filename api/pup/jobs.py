import json

from helpers.instances import s3, sqs
from utils.screenshot.twitter import Twitter

from .models import SavedMoment


def take_screenshot(url, filename):
    twitter = Twitter(url, filename)
    twitter.generate_screenshot()


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


def process_moments(event, context):
    for record in event["Records"]:
        payload = record["body"]
        print(json.loads(payload))


def load_to_sqs():
    print("\n\nLOAD TO SQS")
    sqs.get_queue("process_moment")
    print(sqs.q)
    for moment in SavedMoment.objects.filter(screenshot_generated=False):
        print(moment)
        sqs.send(
            {
                "instance_id": moment.id,
                "url": moment.url,
                "filename": moment.screenshot_name,
            }
        )

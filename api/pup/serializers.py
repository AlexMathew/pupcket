import os

from django.db import IntegrityError
from rest_framework import serializers

from utils.url import get_url_type

from .exceptions import DuplicateSavedMomentError
from .models import SavedMoment


class SavedMomentSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source="owner.username")
    screenshot_url = serializers.SerializerMethodField()

    class Meta:
        model = SavedMoment
        fields = [
            "id",
            "owner",
            "url",
            "url_type",
            "screenshot_generated",
            "screenshot_url",
        ]
        read_only_fields = ["id", "url_type", "screenshot_generated"]

    def create(self, validated_data):
        owner = validated_data.get("owner")
        url = validated_data.get("url")
        url_type = get_url_type(url)

        try:
            instance = SavedMoment.objects.create(
                owner=owner, url=url, url_type=url_type
            )
        except IntegrityError:
            raise DuplicateSavedMomentError

        return instance

    def get_screenshot_url(self, obj):
        return f"https://{os.getenv('CLOUDFRONT_URL')}/{obj.screenshot_name}.png"

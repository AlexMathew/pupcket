import os

from rest_framework import serializers

from pup.models import SavedMoment


class SavedMomentSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source="owner.username")
    screenshot_url = serializers.SerializerMethodField()

    class Meta:
        model = SavedMoment
        exclude = ["image_encoded"]

    def create(self, validated_data):
        owner = validated_data.get("owner")
        url = validated_data.get("url")

        instance = SavedMoment.objects.create(owner=owner, url=url)

        return instance

    def get_screenshot_url(self, obj):
        return f"https://{os.getenv('CLOUDFRONT_URL')}/{obj.screenshot_name}.png"


class SavedMomentRetrieveSerializer(SavedMomentSerializer):
    class Meta:
        model = SavedMoment
        fields = "__all__"

from rest_framework import serializers

from pup.models import SavedMoment


class SavedMomentSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source="owner.username")

    class Meta:
        model = SavedMoment
        fields = "__all__"

    def create(self, validated_data):
        owner = validated_data.get("owner")
        url = validated_data.get("url")

        instance = SavedMoment.objects.create(owner=owner, url=url)

        return instance

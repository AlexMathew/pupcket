from rest_framework import mixins, status, viewsets

from pup.models import SavedMoment
from pup.serializers import SavedMomentSerializer


class SavedMomentView(
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    viewsets.GenericViewSet,
):
    def get_queryset(self):
        if self.action in ["list", "retrieve"]:
            return SavedMoment.objects.filter(
                screenshot_generated=True, owner=self.request.user
            )

        return SavedMoment.objects.all()

    def get_serializer_class(self):
        return SavedMomentSerializer

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

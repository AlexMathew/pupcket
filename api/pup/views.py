from django.conf import settings
from rest_framework import mixins, status, viewsets

from .models import SavedMoment
from .serializers import SavedMomentSerializer


class SavedMomentView(
    mixins.ListModelMixin, mixins.CreateModelMixin, viewsets.GenericViewSet,
):
    serializer_class = SavedMomentSerializer

    def get_queryset(self):
        if self.action in ["list"]:
            return (
                SavedMoment.random.screenshot_generated()
                .owned_by(self.request.user)
                .pick(settings.PAGE_SIZE)
            )

        return SavedMoment.objects.all()

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

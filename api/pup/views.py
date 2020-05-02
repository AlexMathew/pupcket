from rest_framework import mixins, status, viewsets

from pup.models import SavedMoment
from pup.serializers import SavedMomentSerializer


class SavedMomentView(
    mixins.ListModelMixin, mixins.CreateModelMixin, viewsets.GenericViewSet,
):
    serializer_class = SavedMomentSerializer

    def get_queryset(self):
        if self.action == "list":
            return SavedMoment.objects.filter(
                screenshot_generated=True, owner=self.request.user
            )
        else:
            return SavedMoment.objects.all()

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

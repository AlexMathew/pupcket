from rest_framework import mixins, status, viewsets

from pup.models import SavedMoment
from pup.serializers import SavedMomentSerializer


class SavedMomentView(
    mixins.ListModelMixin, mixins.CreateModelMixin, viewsets.GenericViewSet,
):
    queryset = SavedMoment.objects.all()
    serializer_class = SavedMomentSerializer

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

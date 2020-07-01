from django.conf import settings
from rest_framework import mixins, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import SavedMoment
from .serializers import SavedMomentSerializer


class SavedMomentView(
    mixins.ListModelMixin, mixins.CreateModelMixin, viewsets.GenericViewSet,
):
    serializer_class = SavedMomentSerializer

    def get_queryset(self):
        if self.action in ["list"]:
            return SavedMoment.objects.filter(screenshot_generated=True).filter(
                owner=self.request.user
            )

        return SavedMoment.objects.all()

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    @action(detail=False)
    def random(self, request):
        moments = (
            SavedMoment.random.screenshot_generated()
            .owned_by(self.request.user)
            .pick(settings.PAGE_SIZE)
        )

        page = self.paginate_queryset(moments)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(moments, many=True)
        return Response(serializer.data)

from django.contrib.auth import get_user_model
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

User = get_user_model()


class SocialAuthView(viewsets.GenericViewSet):
    queryset = User.objects.all().prefetch_related("auth_token")
    permission_classes = []

    @action(methods=["POST"], detail=False)
    def google(self, request):
        if "email" not in request.data or "id" not in request.data:
            return Response(
                "`email` and `id` should be provided in the request body",
                status=status.HTTP_400_BAD_REQUEST,
            )

        email = request.data["email"]
        user_id = request.data["id"]

        user = User.objects.filter(email=email).first()
        if not user:
            user = User.objects.create(username=f"google:{user_id}", email=email)

        return Response({"auth_token": user.auth_token.key, "username": user.username})

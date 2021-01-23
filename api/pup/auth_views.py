from operator import itemgetter

from django.contrib.auth import get_user_model
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Profile

User = get_user_model()


class SocialAuthView(viewsets.GenericViewSet):
    queryset = User.objects.all().prefetch_related("auth_token")
    permission_classes = []
    AUTH_PAYLOAD_FIELDS = [
        "displayName",
        "email",
        "photoURL",
        "providerId",
        "uid",
        "firebaseUid",
    ]

    @action(methods=["POST"], detail=False)
    def auth(self, request):
        name, email, photo, provider, uid, firebase_uid = itemgetter(
            *self.AUTH_PAYLOAD_FIELDS
        )(request.data)
        username = f"{provider}:{uid}"

        user = (
            User.objects.filter(username=username)
            .prefetch_related("profile", "auth_token")
            .first()
        )
        if not user:
            user_fields = {
                "username": username,
                "first_name": name,
                "email": email or "",
            }
            user = User.objects.create(**user_fields)
            profile_fields = {
                "user": user,
                "firebase_uid": firebase_uid,
                "photo_url": photo,
            }
            Profile.objects.create(**profile_fields)

        return Response(
            {
                "auth_token": user.auth_token.key,
                "username": user.username,
                "name": user.first_name,
                "photo": user.profile.photo_url,
            }
        )


from django.conf import settings
from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .auth_views import SocialAuthView
from .views import SavedMomentView

urlpatterns = []

if settings.DEBUG:
    urlpatterns += [
        path("auth/", include("djoser.urls")),
        path("auth/", include("djoser.urls.authtoken")),
    ]

router = DefaultRouter()
router.register(r"moment", SavedMomentView, basename="moment")
router.register(r"social", SocialAuthView, basename="social")

urlpatterns += [
    path("", include(router.urls)),
]

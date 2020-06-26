from django.urls import include, path
from rest_framework.authtoken import views
from rest_framework.routers import DefaultRouter

from .views import SavedMomentView

urlpatterns = [
    path("auth/", include("djoser.urls")),
    path("auth/", include("djoser.urls.authtoken")),
]

router = DefaultRouter()
router.register(r"moment", SavedMomentView, basename="moment")

urlpatterns += [
    path("", include(router.urls)),
]

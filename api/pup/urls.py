from django.urls import include, path
from rest_framework.authtoken import views
from rest_framework.routers import DefaultRouter

from pup.views import SavedMomentView

urlpatterns = [
    path("auth/", views.obtain_auth_token),
]

router = DefaultRouter()
router.register(r"moment", SavedMomentView, basename="moment")

urlpatterns += [
    path("", include(router.urls)),
]

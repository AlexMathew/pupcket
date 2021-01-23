from django.contrib import admin

from .models import Profile, SavedMoment


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    pass


@admin.register(SavedMoment)
class SavedMomentAdmin(admin.ModelAdmin):
    list_display = ("id", "owner", "url", "url_type", "screenshot_generated")

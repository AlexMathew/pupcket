from django.contrib import admin

from .models import SavedMoment


@admin.register(SavedMoment)
class SavedMomentAdmin(admin.ModelAdmin):
    list_display = ("id", "owner", "url", "url_type", "screenshot_generated")

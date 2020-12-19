from django.contrib import admin

from .models import SavedMoment


@admin.register(SavedMoment)
class SavedMomentAdmin(admin.ModelAdmin):
    list_display = ("id", "owner", "url", "screenshot_generated")

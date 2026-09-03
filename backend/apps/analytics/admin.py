from datetime import timedelta

from django.contrib import admin
from django.template.response import TemplateResponse
from django.urls import path
from django.utils import timezone

from .models import Event
from .stats import summary


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ("created_at", "kind", "label", "lang", "country", "referrer_host")
    list_filter = ("kind", "lang", "country", "created_at")
    search_fields = ("label", "path", "referrer_host")
    date_hierarchy = "created_at"
    # Events are a record of what happened; nobody should be able to edit one.
    readonly_fields = [f.name for f in Event._meta.fields]

    def has_add_permission(self, request):
        return False

    def get_urls(self):
        return [
            path(
                "dashboard/",
                self.admin_site.admin_view(self.dashboard_view),
                name="analytics_dashboard",
            ),
            *super().get_urls(),
        ]

    def dashboard_view(self, request):
        today = timezone.localdate()
        context = {
            **self.admin_site.each_context(request),
            "title": "Traffic",
            "day_cards": [summary(today), summary(today - timedelta(days=1))],
        }
        return TemplateResponse(request, "admin/analytics/dashboard.html", context)

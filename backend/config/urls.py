from django.contrib import admin
from django.urls import include, path

from apps.inquiries.views import health

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/health/", health, name="health"),
    path("api/inquiries/", include("apps.inquiries.urls")),
]

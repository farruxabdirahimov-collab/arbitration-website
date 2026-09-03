from django.urls import path

from .views import download, manifest

urlpatterns = [
    path("", manifest, name="document-manifest"),
    path("<slug:key>/<slug:lang>/pdf/", download, name="document-pdf"),
]

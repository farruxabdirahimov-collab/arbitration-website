from django.http import FileResponse, Http404, JsonResponse
from django.views.decorators.http import require_GET

from apps.analytics.models import Event
from apps.analytics.recording import record

from .catalog import available, download_name, pdf_path


@require_GET
def manifest(_request):
    """GET /api/documents/ — which document/language pairs have a signed PDF.

    The frontend cannot guess: translations are approved one at a time, and a
    download button that 404s on an official document is worse than one that
    is visibly not yet available.
    """
    return JsonResponse({"available": available()})


@require_GET
def download(request, key: str, lang: str):
    """GET /api/documents/<key>/<lang>/pdf/ — the signed scan.

    Inline rather than attachment: a party checking the seal should see the
    page in the browser, and the browser's own viewer still offers Save.
    """
    path = pdf_path(key, lang)
    if path is None:
        raise Http404("No PDF published for this document and language.")

    record(request, Event.Kind.DOC_DOWNLOAD, label=f"{key}:{lang}", lang=lang, path=request.path)

    return FileResponse(
        path.open("rb"),
        content_type="application/pdf",
        filename=download_name(key, lang),
        as_attachment=False,
    )

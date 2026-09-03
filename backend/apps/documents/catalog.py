"""The signed PDFs of the governing documents.

These are scans of the originals — the approval stamp, the Board resolution
number and the date are on the page. That is the point: a foreign party
verifying that this is a properly constituted permanent arbitral institution
wants the executed document, not a web transcription of it. The full text
lives in the frontend's data/documents.js for reading; this serves the
evidence.

Files are shipped inside the repository rather than uploaded through the
admin, because a governing document changes about once a decade and a
missing file must fail at deploy time, not silently at a visitor's click.
"""

from pathlib import Path

FILES_DIR = Path(__file__).resolve().parent / "files"

# Document keys match frontend/src/data/i18n.js docCards[].key
DOC_KEYS = ("nizom", "reglament", "ustav")
LANGS = ("uz", "ru", "en")

# Shown in the Content-Disposition filename, so a downloaded file is
# self-describing in the recipient's folder.
DOWNLOAD_NAMES = {
    ("nizom", "uz"): "OzXASB-Nizom-uz.pdf",
    ("nizom", "ru"): "OMASUz-Polozhenie-ru.pdf",
    ("nizom", "en"): "AIACU-Statute-en.pdf",
    ("reglament", "uz"): "OzXASB-Reglament-uz.pdf",
    ("reglament", "ru"): "OMASUz-Reglament-ru.pdf",
    ("reglament", "en"): "AIACU-Arbitration-Rules-en.pdf",
    ("ustav", "uz"): "OzXASB-Ustav-uz.pdf",
    ("ustav", "ru"): "OMASUz-Ustav-ru.pdf",
    ("ustav", "en"): "AIACU-Charter-en.pdf",
}


def pdf_path(key: str, lang: str) -> Path | None:
    """Path to the PDF for this document/language, or None if not published."""
    if key not in DOC_KEYS or lang not in LANGS:
        return None
    path = FILES_DIR / f"{key}_{lang}.pdf"
    return path if path.is_file() else None


def available() -> dict[str, list[str]]:
    """{doc key: [languages published]} — the frontend uses this to decide
    which download buttons are live, so an unpublished translation shows a
    disabled button instead of a 404."""
    return {key: [lang for lang in LANGS if pdf_path(key, lang)] for key in DOC_KEYS}


def download_name(key: str, lang: str) -> str:
    return DOWNLOAD_NAMES.get((key, lang), f"{key}_{lang}.pdf")

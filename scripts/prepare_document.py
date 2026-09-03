#!/usr/bin/env python3
"""Put a signed governing document on the site.

The scans arrive from the Secretariat as single-page PDFs and are routinely
fed into the scanner the wrong way up, so rotation is a normal step, not an
exception. This does the whole job in one command: rotate, file under the
name the backend expects, and render the first-page preview the document
cards show.

    python scripts/prepare_document.py ~/Downloads/REGLAMENT.pdf reglament uz --rotate 180

Rotation is lossless — only the page's /Rotate flag changes, the scan itself
is never re-encoded.

Afterwards, add the generated .jpg to DOC_PREVIEWS in
frontend/src/data/docFiles.js (the command prints the exact lines) and commit
both files. That map is also what decides which download buttons appear, so
a PDF without its preview entry stays invisible.

Requires: pip install pymupdf
"""

import argparse
import sys
from pathlib import Path

import pymupdf

ROOT = Path(__file__).resolve().parent.parent
# The PDF ships with the site rather than through the API: a governing
# document is a static file, and routing it through the backend would make
# the most important thing on the documents page depend on the backend
# being up.
PDF_DIR = ROOT / "frontend" / "public" / "documents"
PREVIEW_DIR = ROOT / "frontend" / "src" / "assets" / "docs"

KEYS = ("nizom", "reglament", "ustav")
LANGS = ("uz", "ru", "en")

# High enough that the seal and the resolution number stay readable on a
# retina screen at the card's rendered width, low enough to stay ~100 KB.
PREVIEW_DPI = 110
PREVIEW_QUALITY = 78


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("source", type=Path, help="The scanned PDF as received.")
    parser.add_argument("key", choices=KEYS, help="Which governing document this is.")
    parser.add_argument("lang", choices=LANGS, help="Language of this version.")
    parser.add_argument(
        "--rotate",
        type=int,
        default=0,
        choices=[0, 90, 180, 270],
        help="Degrees to turn every page clockwise (180 for an upside-down scan).",
    )
    parser.add_argument(
        "--first-page-only",
        action="store_true",
        help="Publish only page 1 — the signed cover sheet.",
    )
    args = parser.parse_args()

    if not args.source.is_file():
        print(f"No such file: {args.source}", file=sys.stderr)
        return 1

    doc = pymupdf.open(args.source)
    if args.first_page_only and doc.page_count > 1:
        doc.select([0])
    if args.rotate:
        for page in doc:
            page.set_rotation((page.rotation + args.rotate) % 360)

    PDF_DIR.mkdir(parents=True, exist_ok=True)
    PREVIEW_DIR.mkdir(parents=True, exist_ok=True)
    stem = f"{args.key}_{args.lang}"

    pdf_out = PDF_DIR / f"{stem}.pdf"
    doc.save(pdf_out, garbage=4, deflate=True)

    preview_out = PREVIEW_DIR / f"{stem}.jpg"
    doc[0].get_pixmap(dpi=PREVIEW_DPI).save(preview_out, jpg_quality=PREVIEW_QUALITY)
    doc.close()

    print(f"PDF     → {pdf_out.relative_to(ROOT)}  ({pdf_out.stat().st_size // 1024} KB)")
    print(f"Preview → {preview_out.relative_to(ROOT)}  ({preview_out.stat().st_size // 1024} KB)")
    camel = args.key + args.lang.capitalize()
    print("\nAdd to frontend/src/data/docFiles.js:")
    print(f'  import {camel} from "../assets/docs/{stem}.jpg";')
    print(f'  "{args.key}:{args.lang}": {camel},')
    print("\nThen check the result is the right way up before committing.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

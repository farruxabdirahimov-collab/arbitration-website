# Publishing a signed governing document

The document cards on the site show the first page of the executed original —
the Board resolution number, the date and the seal. That page is what a
foreign counterparty's lawyer looks for when checking that the institution is
properly constituted, so it is worth more than any wording we could write.

## Adding or replacing a PDF

Scans arrive from the Secretariat as single-page PDFs, often upside down.

```bash
pip install pymupdf
python scripts/prepare_document.py ~/Downloads/SCAN.pdf reglament uz --rotate 180
```

The script rotates losslessly (only the page's `/Rotate` flag changes — the
scan is never re-encoded), writes the PDF to
`backend/apps/documents/files/<key>_<lang>.pdf`, and renders the card preview
to `frontend/src/assets/docs/<key>_<lang>.jpg`. It then prints the two lines
to add to `DOC_PREVIEWS` in `frontend/src/data/docFiles.js`.

**Open the generated preview and confirm it is the right way up before
committing.** Nothing downstream can detect a wrong rotation.

Keys are `nizom` (Statute), `reglament` (Rules), `ustav` (Charter);
languages are `uz`, `ru`, `en`.

## What happens automatically

- `GET /api/documents/` reports which key/language pairs exist. The frontend
  uses it so a download button never points at a missing file.
- A document published in some languages but not the one being read falls
  back — labelled with the language actually served, e.g. "PDF — Russian" —
  so nobody opens a Russian file expecting English.
- A document with no PDF at all shows no download button. A disabled button
  would be a promise about something the Board has not signed off.
- Every download is counted server-side as a `doc_download` event.

## Currently published

| Document | uz | ru | en |
|---|---|---|---|
| Nizom (Statute) | ✅ | ✅ | ✅ |
| Reglament (Rules) | — | ✅ | ✅ |
| Ustav (Charter) | — | — | — |

All published files are the signed cover page (page 1), approved by Board
resolution No. 30 of 8 July 2026.

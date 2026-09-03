import { useEffect, useMemo, useState } from "react";

import { API } from "./api";

import nizomUz from "../assets/docs/nizom_uz.jpg";
import nizomRu from "../assets/docs/nizom_ru.jpg";
import nizomEn from "../assets/docs/nizom_en.jpg";
import reglamentRu from "../assets/docs/reglament_ru.jpg";
import reglamentEn from "../assets/docs/reglament_en.jpg";

/**
 * First page of each signed governing document.
 *
 * That page carries the Board resolution number, the date and the seal — it
 * is the proof that the document was actually executed, which is what a
 * foreign counterparty's lawyer looks for. Showing it beats any amount of
 * copy claiming the same thing.
 *
 * Regenerate after adding a PDF to backend/apps/documents/files/ — see
 * docs/documents.md.
 */
export const DOC_PREVIEWS = {
  "nizom:uz": nizomUz,
  "nizom:ru": nizomRu,
  "nizom:en": nizomEn,
  "reglament:ru": reglamentRu,
  "reglament:en": reglamentEn,
};

// Mirrors docCards[].key in i18n.js and DOC_KEYS in the backend's
// apps/documents/catalog.py. Three copies is the price of two deployables;
// the manifest endpoint is what catches them drifting apart.
export const DOC_KEYS = ["nizom", "reglament", "ustav"];

// Tried in order when the document is not published in the reading language.
// English first: it is the working language of the foreign parties this site
// is built for, and the fallback is only ever reached for a translation that
// has not been approved yet.
const FALLBACK_ORDER = ["en", "ru", "uz"];

/** Languages this document is published in, derived from the shipped previews. */
export function bundledLangs(key) {
  return FALLBACK_ORDER.filter((lang) => DOC_PREVIEWS[`${key}:${lang}`]);
}

/** The language to actually serve: the reading language, or the best stand-in. */
export function resolveLang(key, lang, availableLangs) {
  const langs = availableLangs || bundledLangs(key);
  if (langs.includes(lang)) return lang;
  return FALLBACK_ORDER.find((l) => langs.includes(l)) || null;
}

export function previewFor(key, lang) {
  const resolved = resolveLang(key, lang);
  return resolved ? DOC_PREVIEWS[`${key}:${resolved}`] : null;
}

export function pdfUrl(key, lang) {
  return `${API}/documents/${key}/${lang}/pdf/`;
}

/**
 * Which document/language pairs the deployed backend actually serves.
 *
 * The bundled previews are the immediate answer, so buttons render in their
 * final state on first paint; the manifest then corrects them if the backend
 * has been given a translation the current build does not know about. A hook
 * lives here rather than in a components/ file because this module is the one
 * place that owns "which documents exist".
 */
export function useDocumentManifest() {
  const bundled = useMemo(
    () => Object.fromEntries(DOC_KEYS.map((key) => [key, bundledLangs(key)])),
    [],
  );
  const [available, setAvailable] = useState(bundled);

  useEffect(() => {
    let cancelled = false;
    fetch(`${API}/documents/`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data?.available) setAvailable(data.available);
      })
      .catch(() => {
        /* keep the bundled answer — the backend being down must not hide
           documents that are in this build anyway */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return available;
}

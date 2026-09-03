import nizomUz from "../assets/docs/nizom_uz.jpg";
import nizomRu from "../assets/docs/nizom_ru.jpg";
import nizomEn from "../assets/docs/nizom_en.jpg";
import reglamentUz from "../assets/docs/reglament_uz.jpg";
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
 * The PDFs themselves live in public/documents/ and are served by whatever
 * hosts the site. Governing documents are static files that change about
 * once a decade; routing them through the API would make the single most
 * important thing on this page depend on the backend being up, and on the
 * backend existing at all.
 *
 * Both are generated — see docs/documents.md.
 */
export const DOC_PREVIEWS = {
  "nizom:uz": nizomUz,
  "nizom:ru": nizomRu,
  "nizom:en": nizomEn,
  "reglament:uz": reglamentUz,
  "reglament:ru": reglamentRu,
  "reglament:en": reglamentEn,
};

// Mirrors docCards[].key in i18n.js.
export const DOC_KEYS = ["nizom", "reglament", "ustav"];

// Tried in order when the document is not published in the reading language.
// English first: it is the working language of the foreign parties this site
// is built for, and the fallback is only ever reached for a translation that
// has not been approved yet.
const FALLBACK_ORDER = ["en", "ru", "uz"];

/** Languages this document is published in. A preview exists exactly when
 *  the PDF does — both are written by the same command. */
export function publishedLangs(key) {
  return FALLBACK_ORDER.filter((lang) => DOC_PREVIEWS[`${key}:${lang}`]);
}

/** The language to actually serve: the reading language, or the best stand-in. */
export function resolveLang(key, lang) {
  const langs = publishedLangs(key);
  if (langs.includes(lang)) return lang;
  return FALLBACK_ORDER.find((l) => langs.includes(l)) || null;
}

export function previewFor(key, lang) {
  const resolved = resolveLang(key, lang);
  return resolved ? DOC_PREVIEWS[`${key}:${resolved}`] : null;
}

export function pdfUrl(key, lang) {
  return `/documents/${key}_${lang}.pdf`;
}

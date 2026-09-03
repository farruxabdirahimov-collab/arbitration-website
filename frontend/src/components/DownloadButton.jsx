import { pdfUrl, resolveLang } from "../data/docFiles";
import { ORANGE, NAVY, SANS } from "../theme";

/**
 * Download link for a signed governing document.
 *
 * A translation is approved by the Board one at a time, so the button must
 * never lie about what exists:
 *   · published in the reading language  → plain download
 *   · published only in another language → download, labelled with that
 *     language, so nobody opens a Russian PDF expecting English
 *   · not published at all               → nothing. A disabled button is a
 *     promise about a document the Board has not signed off; the full text
 *     is readable either way, which is what the visitor actually came for.
 *
 * The download itself is counted server-side in apps/documents/views.py, so
 * there is no beacon here to double-count it.
 */
export default function DownloadButton({ t, docKey, lang, availableLangs, style }) {
  const served = resolveLang(docKey, lang, availableLangs);

  if (!served) return null;

  const label =
    served === lang ? t.download : t.downloadOther.replace("{lang}", t.langNames[served]);

  return (
    <a
      href={pdfUrl(docKey, served)}
      target="_blank"
      rel="noopener noreferrer"
      style={{ ...s.base, ...s.on, ...style }}
    >
      {label}
    </a>
  );
}

const s = {
  base: {
    display: "block",
    textAlign: "center",
    padding: "11px 14px",
    fontFamily: SANS,
    fontWeight: 600,
    fontSize: 13.5,
    borderRadius: 2,
    border: `1px solid ${ORANGE}`,
    background: "transparent",
    textDecoration: "none",
  },
  on: { color: NAVY, cursor: "pointer" },
};

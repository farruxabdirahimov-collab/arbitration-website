import { useEffect } from "react";
import Emblem from "./Emblem";
import { DOC_TEXT } from "../data/documents";
import { NAVY, IVORY, ORANGE, SERIF, SANS } from "../theme";

/**
 * Full-text reader. Each chapter is laid out on its own A4 portrait sheet
 * (210×297mm → 794×1123px at 96dpi) inside a navy engraved frame, so the
 * statute reads like the bound original rather than a web page.
 *
 * Pages grow past the A4 minimum height when a chapter is long — clipping
 * legal text to preserve an exact ratio would be worse than a tall page.
 */
function Block({ b }) {
  if (b.y === "heading") return <p style={s.heading}>{b.x}</p>;
  if (b.y === "chapter") return <h2 style={s.chapter}>{b.x}</h2>;
  if (b.y === "article") return <h3 style={s.article}>{b.x}</h3>;
  return <p style={s.para}>{b.x}</p>;
}

function paginate(blocks) {
  const hasChapters = blocks.some((b) => b.y === "chapter");
  const pages = [];
  let page = [];

  if (hasChapters) {
    for (const b of blocks) {
      if (b.y === "chapter" && page.length) {
        pages.push(page);
        page = [];
      }
      page.push(b);
    }
  } else {
    // The Charter has no chapter markers — break it into even sheets.
    for (const b of blocks) {
      page.push(b);
      if (page.length >= 22) {
        pages.push(page);
        page = [];
      }
    }
  }
  if (page.length) pages.push(page);
  return pages;
}

export default function DocumentReader({ t, docKey, onClose }) {
  const blocks = DOC_TEXT[docKey] || [];
  const meta = t.docCards.find((d) => d.key === docKey);
  const pages = paginate(blocks);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div style={s.overlay} onClick={onClose} role="dialog" aria-modal="true">
      <div style={s.shell} onClick={(e) => e.stopPropagation()}>
        <div style={s.bar}>
          <div style={s.barLeft}>
            <Emblem size={32} onDark />
            <div>
              <div style={s.barTitle}>{meta?.t}</div>
              <div style={s.barMeta}>{meta?.meta}</div>
            </div>
          </div>
          <div style={s.barRight}>
            {/* TODO: swap for a real PDF link from the backend */}
            <button style={s.dl} disabled>{t.download}</button>
            <button style={s.close} onClick={onClose} aria-label={t.close}>×</button>
          </div>
        </div>

        <div style={s.scroll}>
          {pages.map((page, i) => (
            <div key={i} style={s.sheet}>
              <div style={s.frame}>
                {i === 0 && (
                  <div style={s.sealRow}>
                    <Emblem size={54} />
                  </div>
                )}
                <div style={{ flex: 1 }}>
                  {page.map((b, j) => (
                    <Block key={j} b={b} />
                  ))}
                </div>
                <div style={s.footer}>
                  <span>{meta?.t}</span>
                  <span>
                    {i + 1} / {pages.length}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const s = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(8,14,26,0.78)",
    backdropFilter: "blur(4px)",
    zIndex: 100,
    display: "flex",
    flexDirection: "column",
    animation: "fade .2s ease both",
  },
  shell: { display: "flex", flexDirection: "column", height: "100%", width: "100%" },

  bar: {
    background: NAVY,
    color: IVORY,
    padding: "14px 22px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexShrink: 0,
    borderBottom: `1px solid ${ORANGE}`,
  },
  barLeft: { display: "flex", gap: 12, alignItems: "center" },
  barTitle: { fontFamily: SERIF, fontSize: 18, fontWeight: 600, color: "#FBF9F3", lineHeight: 1.1 },
  barMeta: { fontSize: 11.5, color: ORANGE, marginTop: 2 },
  barRight: { display: "flex", gap: 12, alignItems: "center" },
  dl: {
    background: ORANGE,
    color: "#fff",
    border: "none",
    fontFamily: SANS,
    fontWeight: 700,
    fontSize: 13,
    padding: "9px 16px",
    borderRadius: 2,
    cursor: "not-allowed",
    opacity: 0.6,
  },
  close: { background: "transparent", border: "none", color: IVORY, fontSize: 30, cursor: "pointer", lineHeight: 1, padding: "0 4px" },

  scroll: {
    flex: 1,
    overflowY: "auto",
    padding: "32px 16px 60px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 28,
    background: "#2A3550",
  },

  /* A4 portrait sheet */
  sheet: {
    width: "min(794px, 94vw)",
    minHeight: "min(1123px, 133vw)",
    background: "#FCFAF4",
    boxShadow: "0 12px 40px rgba(0,0,0,0.45)",
    flexShrink: 0,
    display: "flex",
    padding: "clamp(14px, 3.2vw, 30px)",
  },
  frame: {
    flex: 1,
    border: `1.5px solid ${NAVY}`,
    boxShadow: `inset 0 0 0 3px rgba(14,42,74,0.22)`,
    padding: "clamp(22px, 4vw, 46px) clamp(20px, 4.2vw, 48px)",
    display: "flex",
    flexDirection: "column",
  },
  sealRow: { display: "flex", justifyContent: "center", marginBottom: 16, flexShrink: 0 },

  heading: {
    fontFamily: SERIF,
    fontSize: "clamp(14px, 1.9vw, 19px)",
    fontWeight: 700,
    color: NAVY,
    textAlign: "center",
    textTransform: "uppercase",
    lineHeight: 1.3,
    margin: "0 0 4px",
  },
  chapter: {
    fontFamily: SERIF,
    fontSize: "clamp(14px, 1.9vw, 18px)",
    fontWeight: 700,
    color: NAVY,
    textAlign: "center",
    textTransform: "uppercase",
    margin: "10px 0 12px",
    paddingBottom: 8,
    borderBottom: `1px solid ${ORANGE}`,
  },
  article: { fontFamily: SERIF, fontSize: "clamp(12.5px, 1.6vw, 15px)", fontWeight: 700, color: NAVY, margin: "12px 0 5px" },
  para: {
    fontFamily: SERIF,
    fontSize: "clamp(11px, 1.4vw, 13.5px)",
    lineHeight: 1.6,
    color: "#26303F",
    margin: "0 0 5px",
    textAlign: "justify",
  },
  footer: {
    flexShrink: 0,
    marginTop: 12,
    paddingTop: 8,
    borderTop: "1px solid rgba(14,42,74,0.15)",
    display: "flex",
    justifyContent: "space-between",
    fontSize: "clamp(8px, 1.1vw, 10px)",
    color: "#8A93A3",
    fontFamily: SANS,
    letterSpacing: 0.5,
  },
};

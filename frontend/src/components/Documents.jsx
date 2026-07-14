import SectionLabel from "./SectionLabel";
import Emblem from "./Emblem";
import { NAVY, ORANGE, MUTED, SERIF, SANS, MAXW } from "../theme";

export default function Documents({ t, onOpen }) {
  return (
    <section id="docs" style={s.section}>
      <SectionLabel>{t.docsTitle}</SectionLabel>
      <p style={s.sub}>{t.docsSub}</p>

      <div style={s.grid}>
        {t.docCards.map((d) => (
          <article key={d.key} style={s.card}>
            <div style={s.frame}>
              <div style={s.frameInner} aria-hidden />
              <Emblem size={48} onDark />
              <div style={s.meta}>{d.meta}</div>
            </div>
            <h3 style={s.title}>{d.t}</h3>
            <p style={s.desc}>{d.d}</p>
            <div style={s.actions}>
              <button style={s.read} onClick={() => onOpen(d.key)}>{t.openDoc}</button>
              {/* TODO: wire to /api/documents/<key>/pdf/ once the backend serves the files */}
              <button style={s.dl} disabled title="PDF: backend">{t.download}</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

const s = {
  section: { maxWidth: MAXW, margin: "0 auto", padding: "74px 24px" },
  sub: { textAlign: "center", fontSize: 15, color: MUTED, maxWidth: 620, margin: "0 auto 40px", lineHeight: 1.55 },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 22 },
  card: {
    background: "#fff",
    border: "1px solid rgba(14,42,74,0.12)",
    borderRadius: 3,
    padding: 22,
    display: "flex",
    flexDirection: "column",
  },
  frame: {
    position: "relative",
    background: NAVY,
    borderRadius: 2,
    padding: "26px 22px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
    marginBottom: 18,
    border: `1px solid ${ORANGE}`,
  },
  frameInner: { position: "absolute", inset: 6, border: "1px solid rgba(224,123,26,0.35)", pointerEvents: "none" },
  meta: { fontSize: 11, letterSpacing: 1, color: ORANGE, textTransform: "uppercase", fontWeight: 700, textAlign: "center" },
  title: { fontFamily: SERIF, fontSize: 22, color: NAVY, fontWeight: 600, lineHeight: 1.2, margin: "0 0 8px" },
  desc: { fontSize: 14, lineHeight: 1.6, color: "#41495C", flex: 1, margin: "0 0 18px" },
  actions: { display: "flex", gap: 10 },
  read: {
    flex: 1,
    background: NAVY,
    color: "#F5F2EA",
    border: "none",
    padding: "11px 14px",
    fontFamily: SANS,
    fontWeight: 600,
    fontSize: 13.5,
    borderRadius: 2,
    cursor: "pointer",
  },
  dl: {
    flex: 1,
    background: "transparent",
    color: NAVY,
    border: `1px solid ${ORANGE}`,
    padding: "11px 14px",
    fontFamily: SANS,
    fontWeight: 600,
    fontSize: 13.5,
    borderRadius: 2,
    cursor: "not-allowed",
    opacity: 0.55,
  },
};

import SectionLabel from "./SectionLabel";
import { NAVY, ORANGE, MUTED, SERIF, MAXW } from "../theme";

export default function CourtStructure({ t }) {
  return (
    <section id="court" style={s.section}>
      <SectionLabel>{t.courtTitle}</SectionLabel>
      <p style={s.sub}>{t.courtSub}</p>

      <div style={s.grid}>
        {t.court.map((c, i) => (
          <article key={c.t} style={s.card}>
            <div style={s.badge}>{String(i + 1).padStart(2, "0")}</div>
            <h3 style={s.title}>{c.t}</h3>
            <div style={s.alt}>{c.en}</div>
            <p style={s.desc}>{c.d}</p>
          </article>
        ))}
      </div>

      <div style={s.basis}>
        <div style={s.basisLabel}>{t.basisTitle}</div>
        <div style={s.basisList}>
          {t.basis.map((b) => (
            <span key={b} style={s.basisItem}>{b}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

const s = {
  section: { maxWidth: MAXW, margin: "0 auto", padding: "74px 24px" },
  sub: { textAlign: "center", fontSize: 15, color: MUTED, maxWidth: 620, margin: "0 auto 40px", lineHeight: 1.55 },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 18 },
  card: { padding: "28px 26px", background: "#fff", border: "1px solid rgba(14,42,74,0.1)", borderRadius: 3 },
  badge: { fontFamily: SERIF, fontSize: 26, fontWeight: 700, color: ORANGE, marginBottom: 12 },
  title: { fontFamily: SERIF, fontSize: 21, color: NAVY, fontWeight: 600, margin: "0 0 3px" },
  alt: { fontSize: 11.5, color: "#818A9C", letterSpacing: 0.5, textTransform: "uppercase", fontWeight: 600, marginBottom: 12 },
  desc: { fontSize: 14, lineHeight: 1.6, color: "#41495C", margin: 0 },
  basis: {
    marginTop: 36,
    padding: "26px 30px",
    background: "#fff",
    border: "1px solid rgba(14,42,74,0.12)",
    borderLeft: `3px solid ${ORANGE}`,
    borderRadius: 2,
  },
  basisLabel: { fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: ORANGE, fontWeight: 700, marginBottom: 14 },
  basisList: { display: "flex", flexWrap: "wrap", gap: 10 },
  basisItem: {
    fontSize: 13.5,
    color: NAVY,
    background: "#F1EEE4",
    padding: "8px 14px",
    borderRadius: 2,
    border: "1px solid rgba(14,42,74,0.1)",
  },
};

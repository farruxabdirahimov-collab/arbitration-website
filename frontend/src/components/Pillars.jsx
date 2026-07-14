import SectionLabel from "./SectionLabel";
import { NAVY, IVORY, ORANGE, SERIF, MAXW } from "../theme";

const NUM = ["I", "II", "III"];

export default function Pillars({ t }) {
  return (
    <section id="about" style={s.section}>
      <SectionLabel>{t.pillarsTitle}</SectionLabel>
      <div style={s.grid}>
        {t.pillars.map((p, i) => (
          <article key={p.t} style={s.card}>
            <div style={s.num}>{NUM[i]}</div>
            <h3 style={s.title}>{p.t}</h3>
            <p style={s.desc}>{p.d}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

const s = {
  section: { maxWidth: MAXW, margin: "0 auto", padding: "74px 24px" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    border: "1px solid rgba(14,42,74,0.14)",
    marginTop: 26,
  },
  card: { padding: "40px 34px", background: IVORY, borderRight: "1px solid rgba(14,42,74,0.08)" },
  num: { fontFamily: SERIF, fontSize: 34, color: ORANGE, fontWeight: 700, marginBottom: 14 },
  title: { fontFamily: SERIF, fontSize: 24, color: NAVY, fontWeight: 600, margin: "0 0 12px" },
  desc: { fontSize: 14.5, lineHeight: 1.6, color: "#41495C", margin: 0 },
};

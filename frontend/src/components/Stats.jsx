import SectionLabel from "./SectionLabel";
import { NAVY, IVORY, ORANGE, SERIF, MAXW } from "../theme";

export default function Stats({ t }) {
  return (
    <section style={s.section}>
      <div style={s.inner}>
        <SectionLabel>{t.statsTitle}</SectionLabel>
        <div style={s.grid}>
          {t.stats.map((x) => (
            <div key={x.l} style={s.stat}>
              <div style={s.num}>{x.n}</div>
              <div style={s.label}>{x.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const s = {
  section: { background: NAVY, color: IVORY },
  inner: { maxWidth: MAXW, margin: "0 auto", padding: "60px 24px" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 30, marginTop: 26 },
  stat: { textAlign: "center" },
  num: { fontFamily: SERIF, fontSize: 46, fontWeight: 700, color: ORANGE, lineHeight: 1 },
  label: { fontSize: 13, color: "#B9C2D6", marginTop: 10 },
};

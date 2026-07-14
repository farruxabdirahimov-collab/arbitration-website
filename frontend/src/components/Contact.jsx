import SectionLabel from "./SectionLabel";
import { PHONE, PHONE_HREF, EMAIL } from "../data/i18n";
import { NAVY, ORANGE, INK, MAXW } from "../theme";

export default function Contact({ t }) {
  return (
    <section id="contact" style={s.section}>
      <SectionLabel>{t.contactTitle}</SectionLabel>
      <div style={s.grid}>
        <a href={PHONE_HREF} style={{ ...s.card, textDecoration: "none" }}>
          <div style={s.key}>{t.contactPhone}</div>
          <div style={s.val}>{PHONE}</div>
        </a>
        <a href={`mailto:${EMAIL}`} style={{ ...s.card, textDecoration: "none" }}>
          <div style={s.key}>Email</div>
          <div style={s.val}>{EMAIL}</div>
        </a>
        <div style={s.card}>
          <div style={s.key}>{t.contactAddr}</div>
          <div style={s.val}>{t.addr}</div>
        </div>
      </div>
    </section>
  );
}

const s = {
  section: { maxWidth: MAXW, margin: "0 auto", padding: "74px 24px" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 18 },
  card: {
    padding: "28px 26px",
    background: "#fff",
    border: "1px solid rgba(14,42,74,0.12)",
    borderRadius: 2,
    textAlign: "center",
    color: NAVY,
  },
  key: { fontSize: 12, letterSpacing: 1.5, textTransform: "uppercase", color: ORANGE, fontWeight: 700, marginBottom: 10 },
  val: { fontSize: 14.5, color: INK, fontWeight: 500, lineHeight: 1.5 },
};

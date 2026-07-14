import Emblem from "./Emblem";
import { NAVY, IVORY, BLUE, SERIF } from "../theme";

export default function Footer({ t }) {
  return (
    <footer style={s.footer}>
      <div style={s.inner}>
        <Emblem size={54} onDark />
        <div style={s.org}>{t.org}</div>
        <div style={s.alt}>{t.orgAlt}</div>
        <p style={s.note}>{t.footerNote}</p>
      </div>
    </footer>
  );
}

const s = {
  footer: { background: NAVY, color: IVORY, padding: "56px 24px" },
  inner: { maxWidth: 720, margin: "0 auto", textAlign: "center" },
  org: { fontFamily: SERIF, fontSize: 21, fontWeight: 600, color: "#FBF9F3", margin: "18px 0 4px" },
  alt: { fontSize: 12.5, color: BLUE, fontStyle: "italic", marginBottom: 14 },
  note: { fontSize: 12.5, lineHeight: 1.7, color: "#8E99B0", maxWidth: 560, margin: "0 auto" },
};

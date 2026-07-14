import Emblem from "./Emblem";
import { NAVY, IVORY, INK, MUTED, SERIF, MAXW } from "../theme";

const LANGS = ["uz", "ru", "en"];

export default function Header({ t, lang, setLang }) {
  return (
    <header style={s.header}>
      <div style={s.inner}>
        <a href="#top" style={s.brand}>
          <Emblem size={42} alt={t.orgShort} />
          <span>
            <span style={s.short}>{t.orgShort}</span>
            <span style={s.full}>{t.org}</span>
          </span>
        </a>

        <nav style={s.nav} className="mainnav">
          <a href="#about" style={s.link}>{t.nav.about}</a>
          <a href="#court" style={s.link}>{t.nav.court}</a>
          <a href="#docs" style={s.link}>{t.nav.docs}</a>
          <a href="#roster" style={s.link}>{t.nav.roster}</a>
          <a href="#clause" style={s.link}>{t.nav.clause}</a>
          <a href="#inquiry" style={s.link}>{t.nav.inquiry}</a>
          <a href="#contact" style={s.link}>{t.nav.contact}</a>
        </nav>

        <div style={s.switch}>
          {LANGS.map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              aria-pressed={lang === l}
              style={{ ...s.langBtn, ...(lang === l ? s.langActive : {}) }}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}

const s = {
  header: {
    position: "sticky",
    top: 0,
    zIndex: 50,
    background: "rgba(245,242,234,0.92)",
    backdropFilter: "blur(8px)",
    borderBottom: "1px solid rgba(14,42,74,0.12)",
  },
  inner: {
    maxWidth: MAXW,
    margin: "0 auto",
    padding: "12px 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
  },
  brand: { display: "flex", alignItems: "center", gap: 12, textDecoration: "none" },
  short: { display: "block", fontFamily: SERIF, fontSize: 20, fontWeight: 700, letterSpacing: 1, color: NAVY, lineHeight: 1 },
  full: { display: "block", fontSize: 10.5, color: MUTED, maxWidth: 300, lineHeight: 1.3, marginTop: 3 },
  nav: { display: "flex", gap: 22 },
  link: { fontSize: 13.5, color: INK, fontWeight: 500, textDecoration: "none" },
  switch: { display: "flex", border: "1px solid rgba(14,42,74,0.2)", borderRadius: 2, overflow: "hidden" },
  langBtn: { padding: "6px 10px", fontSize: 12, fontWeight: 600, background: "transparent", border: "none", cursor: "pointer", color: MUTED },
  langActive: { background: NAVY, color: IVORY },
};

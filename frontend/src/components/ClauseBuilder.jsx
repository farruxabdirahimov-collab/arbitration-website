import { useState } from "react";
import SectionLabel from "./SectionLabel";
import { track } from "../data/analytics";
import { CLAUSE, CITY, LAW, COUNT, LANG_NAME } from "../data/clause";
import { NAVY, IVORY, ORANGE, SERIF, SANS, MAXW } from "../theme";

export default function ClauseBuilder({ t, lang }) {
  const [count, setCount] = useState("one"); // "one" | "three"
  const [procLang, setProcLang] = useState("en"); // uz | ru | en
  const [copied, setCopied] = useState(false);

  const text = CLAUSE[lang](
    COUNT[lang][count],
    CITY[lang],
    LANG_NAME[lang][procLang],
    LAW[lang]
  );

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Clipboard API needs a secure context; fall back for plain http.
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    // A copied clause is a contract being drafted with this institution
    // named in it — the closest thing the site has to a conversion.
    track("clause_copy", { label: `${count}/${procLang}`, lang });
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <section id="clause" style={s.section}>
      <SectionLabel>{t.clauseTitle}</SectionLabel>
      <p style={s.sub}>{t.clauseSub}</p>

      <div style={s.wrap}>
        <div style={s.controls}>
          <label style={s.label}>
            {t.optArb}
            <select style={s.select} value={count} onChange={(e) => setCount(e.target.value)}>
              <option value="one">{COUNT[lang].one}</option>
              <option value="three">{COUNT[lang].three}</option>
            </select>
          </label>

          <label style={s.label}>
            {t.optCity}
            <input style={s.select} value={CITY[lang]} readOnly />
          </label>

          <label style={s.label}>
            {t.optLang}
            <select style={s.select} value={procLang} onChange={(e) => setProcLang(e.target.value)}>
              <option value="uz">{LANG_NAME[lang].uz}</option>
              <option value="ru">{LANG_NAME[lang].ru}</option>
              <option value="en">{LANG_NAME[lang].en}</option>
            </select>
          </label>
        </div>

        <div style={s.box}>
          <pre style={s.text}>{text}</pre>
          <button style={s.copy} onClick={copy}>
            {copied ? t.copied : t.copy}
          </button>
        </div>
      </div>
    </section>
  );
}

const s = {
  section: { background: NAVY, padding: "74px 24px" },
  sub: { textAlign: "center", fontSize: 15, color: "#B9C2D6", maxWidth: 620, margin: "0 auto 34px", lineHeight: 1.55 },
  wrap: { maxWidth: 900, margin: "0 auto" },
  controls: { display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center", marginBottom: 24 },
  label: {
    display: "flex",
    flexDirection: "column",
    gap: 7,
    fontSize: 12,
    color: "#B9C2D6",
    fontWeight: 600,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  select: {
    padding: "10px 14px",
    fontSize: 14,
    fontFamily: SANS,
    background: "#13294A",
    color: IVORY,
    border: "1px solid rgba(30,155,215,0.45)",
    borderRadius: 2,
    minWidth: 160,
  },
  box: {
    position: "relative",
    background: "#0A1730",
    border: "1px solid rgba(224,123,26,0.4)",
    borderRadius: 3,
    padding: "28px 28px 66px",
  },
  text: {
    fontFamily: SERIF,
    fontSize: 16.5,
    lineHeight: 1.7,
    color: "#EDE7D6",
    whiteSpace: "pre-wrap",
    fontStyle: "italic",
    margin: 0,
  },
  copy: {
    position: "absolute",
    bottom: 18,
    right: 18,
    background: ORANGE,
    color: "#fff",
    border: "none",
    fontFamily: SANS,
    fontWeight: 700,
    fontSize: 13.5,
    padding: "10px 20px",
    borderRadius: 2,
    cursor: "pointer",
  },
};

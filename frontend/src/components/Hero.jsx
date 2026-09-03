import Emblem from "./Emblem";
import { track } from "../data/analytics";
import { NAVY, IVORY, ORANGE, SERIF } from "../theme";

export default function Hero({ t, lang }) {
  return (
    <section id="top" style={s.hero}>
      <div style={s.glow} aria-hidden />
      <div style={s.inner}>
        <div style={s.emblem}>
          <Emblem size={132} onDark alt={t.orgShort} />
        </div>
        <p style={s.kicker}>{t.heroKicker}</p>
        <h1 style={s.title}>{t.heroTitle}</h1>
        <p style={s.alt}>{t.orgAlt}</p>
        <p style={s.sub}>{t.heroSub}</p>
        <div style={s.ctas}>
          <a
            href="#inquiry"
            style={s.primary}
            onClick={() => track("cta", { label: "file_claim", lang })}
          >
            {t.ctaFile}
          </a>
          <a
            href="#docs"
            style={s.ghost}
            onClick={() => track("cta", { label: "rules", lang })}
          >
            {t.ctaRules}
          </a>
        </div>
      </div>
    </section>
  );
}

const s = {
  hero: { position: "relative", background: NAVY, color: IVORY, overflow: "hidden" },
  glow: {
    position: "absolute",
    inset: 0,
    background: "radial-gradient(ellipse at 50% -10%, rgba(30,155,215,0.25), transparent 62%)",
  },
  inner: {
    position: "relative",
    maxWidth: 940,
    margin: "0 auto",
    padding: "84px 24px 92px",
    textAlign: "center",
    animation: "rise .8s ease both",
  },
  emblem: { display: "flex", justifyContent: "center", marginBottom: 26 },
  kicker: { fontSize: 12.5, letterSpacing: 2.5, textTransform: "uppercase", color: ORANGE, fontWeight: 600, marginBottom: 20 },
  title: {
    fontFamily: SERIF,
    fontSize: "clamp(30px, 5vw, 52px)",
    fontWeight: 600,
    lineHeight: 1.14,
    letterSpacing: "-0.3px",
    color: "#FBF9F3",
    margin: "0 0 14px",
  },
  alt: { fontFamily: SERIF, fontStyle: "italic", fontWeight: 600, fontSize: 13.5, letterSpacing: 1, color: "#7FC4E8", marginBottom: 22 },
  sub: { fontSize: 17, lineHeight: 1.6, color: "#C6CEDD", maxWidth: 660, margin: "0 auto 34px" },
  ctas: { display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" },
  primary: { background: ORANGE, color: "#fff", fontWeight: 700, fontSize: 15, padding: "14px 28px", borderRadius: 2, textDecoration: "none" },
  ghost: { border: "1px solid rgba(245,242,234,0.4)", color: IVORY, fontWeight: 500, fontSize: 15, padding: "14px 28px", borderRadius: 2, textDecoration: "none" },
};

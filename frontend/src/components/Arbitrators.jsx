import SectionLabel from "./SectionLabel";
import { ARBITRATORS } from "../data/arbitrators";
import { NAVY, BLUE, ORANGE, SAND, MUTED, SERIF, MAXW } from "../theme";

export default function Arbitrators({ t, lang }) {
  return (
    <section id="roster" style={s.section}>
      <SectionLabel>{t.rosterTitle}</SectionLabel>
      <p style={s.sub}>{t.rosterSub}</p>

      <div style={s.grid}>
        {ARBITRATORS.map((a) => (
          <article key={a.id} style={s.card}>
            <div style={s.photoWrap}>
              {a.photo ? (
                <img src={a.photo} alt={a.name[lang]} style={s.photo} loading="lazy" />
              ) : (
                <div style={s.monogram} aria-hidden="true">
                  {initials(a.name[lang])}
                </div>
              )}
              <span style={s.role}>{a.role[lang]}</span>
            </div>
            <div style={s.body}>
              <h3 style={s.name}>{a.name[lang]}</h3>
              <div style={s.meta}>
                {[a.citizenship?.[lang], a.region[lang], a.born].filter(Boolean).join(" · ")}
              </div>
              <p style={s.bio}>{a.bio[lang]}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

// A roster entry stays publishable before its portrait arrives: an empty frame
// looks like a broken page, which is the opposite of the impression the roster
// has to make.
function initials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

const s = {
  section: { background: SAND, padding: "74px 24px" },
  sub: { textAlign: "center", fontSize: 15, color: MUTED, maxWidth: 620, margin: "0 auto 40px", lineHeight: 1.55 },
  grid: {
    maxWidth: MAXW,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: 22,
  },
  card: {
    background: "#fff",
    border: "1px solid rgba(14,42,74,0.12)",
    borderRadius: 4,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  photoWrap: { position: "relative", width: "100%", aspectRatio: "4 / 5", background: "#E7E2D6", overflow: "hidden" },
  photo: { width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" },
  role: {
    position: "absolute",
    left: 0,
    bottom: 12,
    background: ORANGE,
    color: "#fff",
    fontSize: 11.5,
    fontWeight: 700,
    letterSpacing: 0.5,
    padding: "5px 12px",
    textTransform: "uppercase",
  },
  monogram: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: SERIF,
    fontSize: 54,
    fontWeight: 700,
    color: "rgba(14,42,74,0.35)",
    letterSpacing: 2,
  },
  body: { padding: "18px 20px 22px" },
  name: { fontFamily: SERIF, fontSize: 20, fontWeight: 700, color: NAVY, lineHeight: 1.2, margin: "0 0 6px" },
  meta: { fontSize: 12.5, color: BLUE, fontWeight: 600, marginBottom: 10 },
  bio: { fontSize: 13.5, lineHeight: 1.55, color: "#41495C", margin: 0 },
};

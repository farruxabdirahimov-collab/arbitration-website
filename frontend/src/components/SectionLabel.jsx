import { ORANGE } from "../theme";

/** Small centred rule-flanked label above each section. */
export default function SectionLabel({ children }) {
  return (
    <div style={s.wrap}>
      <span style={s.rule} />
      {children}
      <span style={s.rule} />
    </div>
  );
}

const s = {
  wrap: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    fontSize: 12.5,
    letterSpacing: 3,
    textTransform: "uppercase",
    fontWeight: 600,
    color: ORANGE,
    marginBottom: 18,
    textAlign: "center",
  },
  rule: { height: 1, width: 44, background: ORANGE, opacity: 0.6, display: "inline-block" },
};

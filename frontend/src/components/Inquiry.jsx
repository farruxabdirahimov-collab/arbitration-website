import { useState } from "react";
import SectionLabel from "./SectionLabel";
import { PHONE, PHONE_HREF } from "../data/i18n";
import { NAVY, BLUE, IVORY, ORANGE, SANS, SERIF } from "../theme";

const API = import.meta.env.VITE_API_URL || "/api";

const EMPTY = { name: "", contact: "", subject: "", message: "" };

export default function Inquiry({ t }) {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const valid = form.name.trim() && form.contact.trim() && form.message.trim();

  async function submit() {
    if (!valid || status === "sending") return;
    setStatus("sending");
    try {
      const res = await fetch(`${API}/inquiries/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setForm(EMPTY);
      setStatus("sent");
    } catch (err) {
      console.error("inquiry failed:", err);
      setStatus("error");
    }
  }

  return (
    <section id="inquiry" style={s.section}>
      <SectionLabel>{t.inqTitle}</SectionLabel>
      <p style={s.sub}>{t.inqSub}</p>

      <div style={s.wrap}>
        {status === "sent" ? (
          <div style={s.success}>
            <div style={s.check}>✓</div>
            <p style={s.successText}>{t.inqSuccess}</p>
          </div>
        ) : (
          <div style={s.form}>
            <div style={s.row} className="inq-row">
              <label style={s.label}>
                {t.inqName}
                <input style={s.input} value={form.name} onChange={set("name")} placeholder={t.inqNamePh} />
              </label>
              <label style={s.label}>
                {t.inqContact}
                <input style={s.input} value={form.contact} onChange={set("contact")} placeholder={t.inqContactPh} />
              </label>
            </div>

            <label style={s.label}>
              {t.inqSubject}
              <input style={s.input} value={form.subject} onChange={set("subject")} placeholder={t.inqSubjectPh} />
            </label>

            <label style={s.label}>
              {t.inqMessage}
              <textarea
                style={{ ...s.input, minHeight: 120, resize: "vertical", fontFamily: SANS }}
                value={form.message}
                onChange={set("message")}
                placeholder={t.inqMessagePh}
              />
            </label>

            {status === "error" && <p style={s.error}>{t.inqError}</p>}

            <button
              style={{ ...s.submit, opacity: valid && status !== "sending" ? 1 : 0.5, cursor: valid ? "pointer" : "not-allowed" }}
              onClick={submit}
              disabled={!valid || status === "sending"}
            >
              {status === "sending" ? t.inqSending : t.inqSend}
            </button>

            <p style={s.note}>
              {t.inqOr}{" "}
              <a href={PHONE_HREF} style={s.phone}>{PHONE}</a>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

const s = {
  section: { background: NAVY, padding: "74px 24px" },
  sub: { textAlign: "center", fontSize: 15, color: "#B9C2D6", maxWidth: 620, margin: "0 auto 34px", lineHeight: 1.55 },
  wrap: { maxWidth: 720, margin: "0 auto" },
  form: { display: "flex", flexDirection: "column", gap: 16 },
  row: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
  label: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    fontSize: 12.5,
    color: "#B9C2D6",
    fontWeight: 600,
    letterSpacing: 0.4,
    textTransform: "uppercase",
  },
  input: {
    padding: "12px 14px",
    fontSize: 15,
    fontFamily: SANS,
    background: "#13294A",
    color: IVORY,
    border: "1px solid rgba(30,155,215,0.4)",
    borderRadius: 3,
    outline: "none",
    width: "100%",
  },
  submit: {
    marginTop: 6,
    background: ORANGE,
    color: "#fff",
    border: "none",
    fontFamily: SANS,
    fontWeight: 700,
    fontSize: 15,
    padding: "14px 24px",
    borderRadius: 3,
  },
  error: { color: "#FFB4A2", fontSize: 14, margin: 0 },
  note: { textAlign: "center", fontSize: 14, color: "#B9C2D6", marginTop: 8 },
  phone: { color: BLUE, fontWeight: 700, textDecoration: "none" },
  success: {
    textAlign: "center",
    padding: "48px 24px",
    background: "#13294A",
    borderRadius: 4,
    border: `1px solid ${BLUE}`,
  },
  check: {
    width: 64,
    height: 64,
    borderRadius: "50%",
    background: ORANGE,
    color: "#fff",
    fontSize: 34,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 20px",
  },
  successText: { fontFamily: SERIF, fontSize: 21, color: "#FBF9F3", lineHeight: 1.4, maxWidth: 440, margin: "0 auto" },
};

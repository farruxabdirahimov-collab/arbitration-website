# AIACU — Union of International Arbitration Courts of Uzbekistan

Public website + intake backend for a permanent arbitral institution.

**The single job of this site:** make a foreign investor trust that a dispute
heard here will be decided impartially and that the award will actually be
enforced in their own country. Every design and copy decision serves that.

---

## The organisation (get these facts right — they are legally load-bearing)

Registered with the **Ministry of Justice of Uzbekistan** as a non-governmental
non-commercial organisation (public association), **certificate No. 992,
22 June 2021**.

Official names — use these exactly, never invent variants:

| Lang | Full name | Short |
|------|-----------|-------|
| UZ | Oʻzbekiston Xalqaro Arbitraj Sudlari Birlashmasi | OʻzXASB |
| RU | Объединение Международных Арбитражных Судов Узбекистана | ОМАСУз |
| EN | The Union of International Arbitration Courts of Uzbekistan | AIACU |

Address: Toshkent sh., Yashnobod tumani, Parkent koʻchasi 30«v», 100007
Phone: +998 55 506 14 18

### Structure
The **Union** (the NGO) hosts the **International Arbitration Court** (the
dispute-resolving body). Court organs, per the Statute: Court of Arbitration
(5–11 members, ≥⅓ foreign, 7-year term) → President (7 years) → Vice-Presidents
→ Secretariat → Roster of Arbitrators.

### Legal basis
Constitution of Uzbekistan; Law on International Commercial Arbitration
(LRU-674, in force 18 Aug 2021); New York Convention 1958; IBA Guidelines on
Conflicts of Interest.

### Terminology — important
The people listed in `data/arbitrators.js` are **arbitrators**, NOT state
judges. Their authority comes from the parties' written arbitration agreement,
not from state power. In RU/EN always render them as "арбитр"/"arbitrator".
Calling them "judges" to a foreign audience implies a state court and destroys
the neutrality that international parties are shopping for.

Consequence worth remembering: an arbitral tribunal has **zero jurisdiction**
unless the parties agreed to it in writing beforehand. That is why the model
arbitration clause (`components/ClauseBuilder.jsx`) is the commercially most
important widget on the site — not decoration. The institution's name inside
that clause must match the Charter exactly, or the clause can be challenged.

---

## Stack

- **frontend/** — Vite + React 18, plain JS (no TS), inline style objects, no
  CSS framework. Deployed as a static build.
- **backend/** — Django 5 + DRF. SQLite locally, Postgres on Railway via
  `DATABASE_URL`. Currently serves one public endpoint (inquiries) plus admin.
- Deploy target: **Railway** (both services).

### Run it

```bash
# backend
cd backend
pip install -r requirements.txt
cp .env.example .env          # then edit
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver     # :8000

# frontend (separate terminal)
cd frontend
npm install
npm run dev                    # :5173, proxies /api → :8000
```

---

## Layout

```
frontend/src/
  theme.js                 design tokens — colours come from the emblem
  App.jsx                  section order lives here
  data/
    i18n.js                all UI strings (uz/ru/en) + phone/email constants
    arbitrators.js         the five arbitrators + photo imports
    clause.js              model arbitration clause templates
    documents.js           GENERATED full text of Statute/Rules/Charter
  components/              one component per section, styles co-located
  assets/                  emblem + arbitrator portraits

backend/
  config/                  settings, urls, wsgi
  apps/inquiries/          Inquiry model, public create API, admin triage
```

### Design system
Palette is lifted from the official emblem — **do not add new accent colours**:
navy `#0E2A4A` (shield), blue `#1E9BD7` (ring), orange `#E07B1A` (scales),
ivory `#F5F2EA`. Serif = Cormorant Garamond (headings, legal text),
sans = Inter (UI). The look should read institutional and restrained; loud or
trendy styling reads as untrustworthy for a court.

### `data/documents.js` is generated
It holds the full extracted text of the Statute (9 chapters / 34 articles),
Rules (14 chapters / 59 articles) and Charter, as `{y: type, x: text}` blocks
where type ∈ `heading | chapter | article | para`. `DocumentReader.jsx`
paginates it onto A4 portrait sheets (chapter = page break; the Charter has no
chapter markers so it breaks every ~22 blocks). Don't hand-edit — re-extract
from the source `.docx` if the legal text changes.

---

## Current state

Working: trilingual UI, emblem, hero, three pillars, stats, court structure,
document reader (A4 sheets), arbitrator cards with photos, interactive clause
builder with copy-to-clipboard, inquiry form → Django API, admin triage.

## Next up (rough priority)

1. **PDF downloads.** Both "Download PDF" buttons are disabled placeholders.
   Serve the real Statute/Rules/Charter PDFs from the backend and wire them up.
2. **Fee calculator.** Compute the registration + administrative fee from the
   amount in dispute, per the Rules (Ch. XII, arts. 48–51). Needs the actual
   fee schedule — ask the client for it.
3. **Case filing.** Turn the inquiry form into a real intake: file uploads,
   auto-assigned case number (`№01/2026`), status tracking for the parties.
4. **Arbitrator specialisations.** Add field/language tags (FIDIC construction,
   banking, energy…) and filtering. Parties choose arbitrators by expertise, so
   this is the roster's actual value.
5. Mobile nav (the desktop nav is hidden under 900px with nothing replacing it).

## Conventions

- Comments explain *why*, not *what*. The legal reasoning behind a decision is
  worth a comment; `// set state` is not.
- Keep all user-facing strings in `data/i18n.js` — never inline them in JSX.
- The inquiry endpoint is public and unauthenticated: it is rate-limited
  (20/hour) and the serializer is write-only. Keep it that way.
- Never commit `.env`.

## Open legal question (flagged for the client, affects site copy)

The site claims awards are enforceable in 160+ states under the New York
Convention. That is true of arbitral awards generally, but it depends on the
Union being properly constituted as a *permanent arbitral institution* under
LRU-674 — an economic court verifying enforcement will check the institution's
standing and its roster of arbitrators. The client has been advised to confirm
this with an arbitration lawyer. Do not soften or embellish enforcement claims
without that confirmation.

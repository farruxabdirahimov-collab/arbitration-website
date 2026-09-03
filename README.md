# AIACU — Union of International Arbitration Courts of Uzbekistan

Public website and inquiry intake for the International Arbitration Court at
the Union of International Arbitration Courts of Uzbekistan (OʻzXASB / ОМАСУз
/ AIACU), registered with the Ministry of Justice, certificate No. 992 of
22 June 2021.

Trilingual (Uzbek / Russian / English). Built to give foreign investors
confidence that disputes heard here are decided impartially and that awards are
enforceable abroad under the New York Convention.

## Stack

- **Frontend** — Vite + React 18
- **Backend** — Django 5 + Django REST Framework
- **Database** — SQLite (local) / PostgreSQL (Railway)
- **Hosting** — Railway

## Quick start

```bash
# Backend
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver          # http://127.0.0.1:8000

# Frontend (new terminal)
cd frontend
npm install
npm run dev                         # http://localhost:5173
```

The Vite dev server proxies `/api` to the Django server, so no CORS setup is
needed locally.

## API

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/api/health/` | Health check |
| POST | `/api/inquiries/` | Submit a public inquiry (rate-limited, 20/hour) |
| POST | `/api/events/` | Record a traffic event (cookie-free, 240/hour) |

The signed PDFs are static files shipped with the frontend
(`/documents/<key>_<lang>.pdf`), not API routes — they stay downloadable
whether or not the backend is running.

Inquiries are triaged in the Django admin at `/admin/`; traffic is at
`/admin/analytics/event/dashboard/`.

See [`docs/analytics.md`](./docs/analytics.md) for the Telegram bot and the
traffic table, and [`docs/documents.md`](./docs/documents.md) for publishing a
signed PDF.

## Deployment (Railway)

Two services from this one repo.

**Backend** — root directory `backend/`. Add a PostgreSQL plugin; Railway
injects `DATABASE_URL` automatically. Set:

```
DJANGO_SECRET_KEY=<long random string>
DJANGO_DEBUG=False
DJANGO_ALLOWED_HOSTS=<your-api-domain>
CORS_ALLOWED_ORIGINS=https://<your-frontend-domain>
INQUIRY_NOTIFY_EMAIL=registry@<your-domain>
TELEGRAM_BOT_TOKEN=<from @BotFather>
TELEGRAM_CHAT_ID=<group id, starts with -100>
```

`CORS_ALLOWED_ORIGINS` must list the frontend's real domain — without it the
browser blocks the inquiry form and the traffic beacon, silently.

Then create the first admin account — deploying does not, and should not,
create one, since the password would have to live in an environment variable
to do it. In the backend service's console:

```bash
PY=$(command -v python || command -v python3 || echo /opt/venv/bin/python)
"$PY" manage.py createsuperuser
"$PY" manage.py check_telegram      # verifies the bot end to end
```

The `PY=` line exists because a console shell does not always inherit the
build's virtualenv on `PATH`, so a bare `python` can be missing in a service
whose deploys are perfectly healthy.

Until that account exists, inquiries and traffic are being recorded but
nothing can be read: `/admin/` and the traffic dashboard both sit behind the
login.

**Frontend** — root directory `frontend/`. Build `npm run build`, serve `dist/`.
Set `VITE_API_URL=https://<your-api-domain>/api`. The service root works too —
`/api` is appended when it is missing.

Vite bakes that value into the bundle at **build** time, so changing it needs
a redeploy, not a restart. Unset, the build posts to `/api` on its own domain
— where the static file server answers with the page — and the inquiry form
fails with the generic "something went wrong". The browser console says so
explicitly in a production build.

### The form says "something went wrong"

Almost always one of three, in this order:

1. `VITE_API_URL` unset or wrong on the frontend service → the request never
   reaches Django. Check the failing request's host in the browser's Network
   tab; open `https://<your-api-domain>/api/health/`, which must return
   `{"status": "ok"}`. A 404 in the backend's access log for a path without
   `/api` means the request arrived and CORS passed — only the base URL is
   short.
2. The frontend's domain missing from `CORS_ALLOWED_ORIGINS` on the backend →
   the browser blocks the response. The console names CORS explicitly, and
   the backend logs its effective allowlist at every boot (`Accepting browser
   requests from: [...]`). The `www.` and bare forms of a domain are
   interchangeable — listing either allows both.
3. The backend's domain missing from `DJANGO_ALLOWED_HOSTS` → Django answers
   400 to everything.

## Project context

See [`CLAUDE.md`](./CLAUDE.md) — organisation facts, legal terminology, design
system, and the roadmap. Read it before changing copy or legal text.

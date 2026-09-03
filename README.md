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
| GET | `/api/documents/` | Which governing documents exist, per language |
| GET | `/api/documents/<key>/<lang>/pdf/` | The signed PDF |

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
browser blocks the inquiry form and the traffic beacon, silently. Verify the
bot with `python manage.py check_telegram` in this service's console.

**Frontend** — root directory `frontend/`. Build `npm run build`, serve `dist/`.
Set `VITE_API_URL=https://<your-api-domain>/api`.

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
   `{"status": "ok"}`.
2. The frontend's domain missing from `CORS_ALLOWED_ORIGINS` on the backend →
   the browser blocks the response. The console names CORS explicitly.
3. The backend's domain missing from `DJANGO_ALLOWED_HOSTS` → Django answers
   400 to everything.

## Project context

See [`CLAUDE.md`](./CLAUDE.md) — organisation facts, legal terminology, design
system, and the roadmap. Read it before changing copy or legal text.

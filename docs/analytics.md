# Traffic and notifications

Two separate things, deliberately kept apart:

- **Telegram** answers "did something just happen that needs a person?"
- **The events table** answers "is the site working?"

Running both through one bot was the obvious first idea and it fails on both
counts — a message per visit is unreadable within a week, and the inquiry
notification drowns in it.

## Telegram is a signal channel, not a content channel

The bot is told that inquiry #47 arrived. It is never told who sent it, what
it is about, or how much is in dispute.

An inquiry can name the parties, the contract and the amount. A Telegram
group is a place where members are added and removed, phones are lost, and
history stays searchable forever. Confidentiality is the product this
institution sells; the substance stays behind the admin login, where access
is authenticated.

Setup:

1. Create a bot with [@BotFather](https://t.me/BotFather) → it gives a token.
2. Add the bot to the registry's group and make it an administrator (a bot
   cannot post into a group it was not added to).
3. Get the chat id: send any message in the group, then open
   `https://api.telegram.org/bot<TOKEN>/getUpdates` and read
   `result[].message.chat.id` — a group id starts with `-100`.
4. Set on the backend (Railway → Variables), never in the repository:

   ```
   TELEGRAM_BOT_TOKEN=...
   TELEGRAM_CHAT_ID=-100...
   SITE_ADMIN_URL=https://<backend>.up.railway.app
   ```

Leave the token empty to switch notifications off. Telegram failures are
logged and swallowed: the inquiry is committed to the database before the
message is attempted, so a messenger outage can never lose a claim.

## The daily digest stays quiet on a quiet day

```bash
python manage.py send_digest              # yesterday, silent if nothing happened
python manage.py send_digest --dry-run    # print instead of send
python manage.py send_digest --force      # send even an empty day
```

Schedule it on Railway as a cron service at `0 4 * * *` (04:00 UTC ≈ 09:00
Tashkent). A digest that arrives every morning regardless of news trains its
readers to stop opening it.

## Events: first-party and cookie-free

`POST /api/events/` records one row per action. No third-party service, no
cookie, no IP stored, so no consent banner — which matters when the visitors
being reassured are European.

Visitors are counted with a salted SHA-256 of IP + user agent that includes
the current date, so the pseudonym changes at midnight and nobody, us
included, can follow a visitor across days. Country comes from Cloudflare's
`CF-IPCountry` header when the site is behind it; country only, never a city.

Tracked (`apps/analytics/models.py`):

| Event | Why it is worth counting |
|---|---|
| `clause_copy` | The strongest signal on the site — a contract is being drafted naming this institution |
| `doc_download` | A counterparty doing due diligence on the governing documents |
| `doc_open` | Interest in the rules short of downloading them |
| `inquiry_start` / `inquiry_submit` | The gap between the two is where the form loses people |
| `lang_switch` | Which language the real audience reads in |
| `cta` | Which hero button pulls |
| `pageview` | Volume, sent once per page load |

Read them at `/admin/analytics/event/dashboard/` (today and yesterday) or in
the ordinary changelist, filterable by kind, language and country.

Rate limits: 240 events/hour per client, separate from the 20/hour bucket the
inquiry form uses — sharing it would silently drop a normal visitor's clicks.

## If richer marketing analytics are wanted later

Google Analytics 4 is free and gives acquisition channels and funnels this
table does not, at the cost of a consent banner and of handing a third party
the traffic of an arbitral institution. Umami or Plausible, self-hosted,
avoid the banner but cost a container to run. Neither is needed for the
questions above; add one only if someone actually asks the questions it
answers.

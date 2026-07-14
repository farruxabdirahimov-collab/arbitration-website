# Domain candidates

Constraint from the client: **no "uz", "uzb" or "uzbekistan" in the name
itself** (the `.uz` TLD already carries the country signal).

The name must (a) be instantly legible to a foreign counsel drafting a
contract, (b) survive being typed into an arbitration clause, and (c) read as
an institution, not a startup.

| Domain | Notes |
|--------|-------|
| `arbitraj.uz` | Cleanest. Direct, memorable, unambiguous. First choice. |
| `arbitration.uz` | English spelling — best for the foreign-investor audience. Currently used as the placeholder email domain in the code. |
| `arbcourt.uz` / `arbcourts.uz` | Short, reads as "arbitration court". |
| `tasharb.uz` | Tashkent Arbitration — geographic brand, TIAC-adjacent. |
| `arbiter.uz` | Short, internationally recognisable root. |

**Not yet checked for availability** — verify at https://cctld.uz or through a
registrar before committing. Once chosen, update `EMAIL` in
`frontend/src/data/i18n.js` and `INQUIRY_NOTIFY_EMAIL` in the backend env.

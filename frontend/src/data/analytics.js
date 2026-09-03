import { API } from "./api";

/**
 * First-party, cookie-free event beacon.
 *
 * Traffic on an arbitration site says who is shopping for a forum, in which
 * language, and how close they are to drafting a clause — commercially
 * sensitive to the parties. So it goes to our own backend rather than to an
 * advertising network, and no cookie or client-side id is set: the server
 * counts visitors with a salted hash that changes at midnight.
 *
 * Never let measurement break the page: every failure is swallowed.
 */
export function track(kind, { label = "", lang = "" } = {}) {
  try {
    // keepalive (not sendBeacon) because the endpoint is cross-origin in
    // production and beacons cannot negotiate the CORS preflight.
    fetch(`${API}/events/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind, label, lang, path: window.location.pathname }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    /* analytics must never surface to a visitor */
  }
}

let pageviewSent = false;

/**
 * Idempotent per page load. React's StrictMode runs mount effects twice in
 * development, and a visit counter that is silently 2× in dev and 1× in
 * production is worse than no counter at all.
 */
export function trackPageview(lang) {
  if (pageviewSent) return;
  pageviewSent = true;
  track("pageview", { lang });
}

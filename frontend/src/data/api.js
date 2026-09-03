/**
 * Local dev: unset, and Vite proxies /api to the Django server on :8000.
 * Production: VITE_API_URL points at the deployed backend.
 */
const configured = import.meta.env.VITE_API_URL;

export const API = configured || "/api";

// Vite inlines env vars at build time, so an unset VITE_API_URL produces a
// bundle that posts to /api on the frontend's own domain — where a static
// file server answers with the page itself, and every call fails in a way
// that looks like a backend outage. Say so in the console instead.
if (import.meta.env.PROD && !configured) {
  console.error(
    "VITE_API_URL is not set. This build calls /api on its own domain, which " +
      "serves static files — the inquiry form and analytics cannot work. Set " +
      "VITE_API_URL=https://<backend-domain>/api on the frontend service and " +
      "redeploy (a restart is not enough: the value is baked in at build time).",
  );
}

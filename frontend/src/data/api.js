/**
 * Base URL of the Django API.
 *
 * Local dev: unset, and Vite proxies /api to the Django server on :8000.
 * Production: VITE_API_URL points at the deployed backend.
 */
const configured = import.meta.env.VITE_API_URL;

/**
 * Accept either the service root or the API root.
 *
 * "The backend's URL" is naturally read as the service's domain, and pasting
 * exactly that costs a 404 on every call — arriving at Django, passing CORS,
 * and still failing, which is about the most misleading way this can break.
 * The path is ours to know, not the operator's to remember.
 */
function apiRoot(raw) {
  const base = String(raw).trim().replace(/\/+$/, "");
  if (!base) return "/api";
  return base.endsWith("/api") ? base : `${base}/api`;
}

export const API = configured ? apiRoot(configured) : "/api";

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

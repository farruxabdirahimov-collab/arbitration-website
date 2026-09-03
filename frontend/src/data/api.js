/**
 * Local dev: unset, and Vite proxies /api to the Django server on :8000.
 * Production: VITE_API_URL points at the deployed backend.
 */
export const API = import.meta.env.VITE_API_URL || "/api";

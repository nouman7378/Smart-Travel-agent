/**
 * Environment configuration for Vite/React app.
 * Centralizes all environment variables - use this file instead of import.meta.env directly.
 */

const raw = {
  /** Base URL of the API (e.g. http://127.0.0.1:8000). API prefix is /api */
  VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
} as const;

/** API base URL with trailing slash stripped. Defaults to http://127.0.0.1:8000 if not set. */
export const API_BASE_URL =
  (typeof raw.VITE_API_BASE_URL === 'string' && raw.VITE_API_BASE_URL.trim() !== ''
    ? raw.VITE_API_BASE_URL.replace(/\/$/, '')
    : 'http://127.0.0.1:8000') as string;

/** Full API prefix URL (e.g. http://127.0.0.1:8000/api) */
export const API_PREFIX = `${API_BASE_URL}/api`;

export const env = {
  API_BASE_URL,
  API_PREFIX,
} as const;

export default env;

/**
 * Environment configuration for Vite/React app.
 * Centralizes all environment variables - use this file instead of import.meta.env directly.
 */

const raw = {
  /** Base URL of the API (e.g. http://127.0.0.1:8001). API prefix is /api */
  VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
  VITE_API_URL: import.meta.env.VITE_API_URL,
} as const;

/** API base URL with trailing slash stripped. Defaults to http://127.0.0.1:8001 if not set. */
export const API_BASE_URL = (() => {
  if (typeof raw.VITE_API_BASE_URL === 'string' && raw.VITE_API_BASE_URL.trim() !== '') {
    return raw.VITE_API_BASE_URL.replace(/\/$/, '');
  }
  if (typeof raw.VITE_API_URL === 'string' && raw.VITE_API_URL.trim() !== '') {
    return raw.VITE_API_URL.replace(/\/api\/?$/, '').replace(/\/$/, '');
  }
  return 'http://127.0.0.1:8001';
})();

/** Full API prefix URL (e.g. http://127.0.0.1:8001/api) */
export const API_PREFIX = `${API_BASE_URL}/api`;

export const env = {
  API_BASE_URL,
  API_PREFIX,
} as const;

export default env;

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
  return 'https://smart-travel.fly.dev';
})();

/** Full API prefix URL (e.g. http://127.0.0.1:8001/api) */
export const API_PREFIX = `${API_BASE_URL}/api`;

export const env = {
  API_BASE_URL,
  API_PREFIX,
} as const;

/**
 * Resolves a media URL for use in <img src>.
 * Handles S3 HTTPS URLs, relative /media paths, and legacy Cloudinary URLs.
 */
export function getMediaUrl(url: string | undefined | null): string {
  if (!url || !url.trim()) return '';

  const trimmed = url.trim();

  if (trimmed.startsWith('data:')) return trimmed;
  if (trimmed.startsWith('//')) return `https:${trimmed}`;
  if (trimmed.startsWith('https://')) return trimmed;
  if (trimmed.startsWith('http://')) {
    return trimmed.replace('http://', 'https://');
  }

  if (trimmed.includes('amazonaws.com') || trimmed.includes('res.cloudinary.com')) {
    return `https://${trimmed.replace(/^\/+/, '')}`;
  }

  const baseUrl = API_BASE_URL.replace(/\/$/, '');
  const relativePath = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  return `${baseUrl}${relativePath}`;
}

export default env;

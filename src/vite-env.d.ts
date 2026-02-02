/// <reference types="vite/client" />

/**
 * TypeScript declarations for Vite env variables.
 * Variables must be prefixed with VITE_ to be exposed to the client.
 */
interface ImportMetaEnv {
  /** Base URL of the backend API (e.g. http://127.0.0.1:8000) */
  readonly VITE_API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

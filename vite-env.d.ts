/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** API base URL (e.g. http://127.0.0.1:8000). Used by src/config/env.config.ts */
  readonly VITE_API_BASE_URL: string;
  /** @deprecated Use VITE_API_BASE_URL */
  readonly VITE_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}


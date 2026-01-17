// Application configuration constants

export const APP_CONFIG = {
  APP_NAME: 'TravelHub',
  APP_DESCRIPTION: 'Modern, professional travel booking platform',
  VERSION: '1.0.0',
  
  // API Configuration (if needed in future)
  API_BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  
  // Local Storage Keys
  STORAGE_KEYS: {
    AUTH_TOKEN: 'travelhub_token',
    USER_DATA: 'travelhub_user',
    THEME: 'travelhub_theme',
  },
  
  // Pagination
  DEFAULT_PAGE_SIZE: 12,
  MAX_PAGE_SIZE: 100,
  
  // Debounce delays (ms)
  SEARCH_DEBOUNCE: 300,
  INPUT_DEBOUNCE: 500,
} as const;

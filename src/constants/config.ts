// Application configuration constants

import { API_BASE_URL } from '../config/env.config';

export const APP_CONFIG = {
  APP_NAME: 'TravelHub',
  APP_DESCRIPTION: 'Modern, professional travel booking platform',
  VERSION: '1.0.0',

  // API Configuration (from env.config)
  API_BASE_URL,
  
  // Auth – superadmin email treated as staff when backend does not return is_staff
  SUPERADMIN_EMAIL: 'admin@admin.com',

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

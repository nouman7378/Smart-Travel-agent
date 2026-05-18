/**
 * Admin Authentication Utility
 * 
 * Centralized logic for generating authentication headers for admin API calls.
 */

const STORAGE_KEYS = {
  USER_DATA: 'travelhub_user',
  ADMIN_CREDS: 'admin_credentials',
};

/**
 * Generates an object containing all necessary headers for authenticated admin API requests.
 * Includes Basic Auth (if available) and X-User-ID fallback for local development.
 */
export const getAdminAuthHeaders = (isMultipart = false): Record<string, string> => {
  const headers: Record<string, string> = {};
  if (!isMultipart) {
    headers['Content-Type'] = 'application/json';
  }

  // 1. Try Basic Auth credentials (Username:Password)
  const adminCreds = localStorage.getItem(STORAGE_KEYS.ADMIN_CREDS);
  if (adminCreds) {
    try {
      headers['Authorization'] = `Basic ${btoa(adminCreds)}`;
    } catch (e) {
      console.error('Error encoding admin credentials', e);
    }
  }

  // 2. Add X-User-ID as a fallback for local development
  // This bypasses session/cookie issues on localhost:5173 -> localhost:8001
  const userData = localStorage.getItem(STORAGE_KEYS.USER_DATA);
  if (userData) {
    try {
      const user = JSON.parse(userData);
      if (user.id) {
        headers['X-User-ID'] = String(user.id);
      }
    } catch (e) {
      // Ignore parse errors
    }
  }

  return headers;
};

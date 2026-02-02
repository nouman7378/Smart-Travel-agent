/**
 * Authentication API service.
 * Communicates with the Laravel backend login and signup endpoints.
 */

import { API_PREFIX } from '../config/env.config';

export interface LoginUser {
  id: number;
  username: string;
  email: string;
  full_name?: string;
  /** True for superadmin/staff; used to show Admin link and protect admin routes. From Django User.is_staff. */
  is_staff?: boolean;
}

export interface LoginSuccessResponse {
  success: true;
  message: string;
  user: LoginUser;
}

export interface LoginErrorResponse {
  success: false;
  message: string;
}

export type LoginResponse = LoginSuccessResponse | LoginErrorResponse;

export interface LoginCredentials {
  username: string;
  password: string;
}

/** User-friendly message when the backend is unreachable (not running, CORS, or network error). */
const CONNECTION_ERROR_MESSAGE =
  'Cannot reach the server. Make sure the backend is running at ' +
  (typeof API_PREFIX === 'string' ? API_PREFIX.replace(/\/api$/, '') : 'the configured URL') +
  ' and try again.';

/**
 * Calls POST /api/login/ with username and password.
 * @throws Error with message from API on 4xx or on network/parse errors.
 */
export async function login(credentials: LoginCredentials): Promise<LoginSuccessResponse> {
  const url = `${API_PREFIX}/login/`;
  let res: Response;
  try {
    res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: credentials.username.trim(),
        password: credentials.password,
      }),
    });
  } catch (err) {
    if (err instanceof TypeError && (err.message === 'Failed to fetch' || err.message.includes('fetch'))) {
      throw new Error(CONNECTION_ERROR_MESSAGE);
    }
    throw err instanceof Error ? err : new Error('Network error. Please try again.');
  }

  let data: LoginResponse;
  try {
    data = (await res.json()) as LoginResponse;
  } catch {
    throw new Error('Invalid response from server. Please try again.');
  }

  if (res.ok && data.success === true) {
    return data;
  }

  const message =
    typeof (data as LoginErrorResponse).message === 'string'
      ? (data as LoginErrorResponse).message
      : 'Login failed. Please try again.';
  throw new Error(message);
}

// --- Signup ---

export interface SignupUser {
  id: number;
  username: string;
  email: string;
  full_name: string;
}

export interface SignupSuccessResponse {
  success: true;
  message: string;
  user: SignupUser;
}

export interface SignupErrorResponse {
  success: false;
  message: string;
}

export type SignupResponse = SignupSuccessResponse | SignupErrorResponse;

export interface SignupPayload {
  full_name: string;
  email: string;
  password: string;
  confirm_password: string;
  terms_accepted: boolean;
}

/**
 * Calls POST /api/signup/ with full_name, email, password, confirm_password, terms_accepted.
 * @throws Error with message from API on 4xx or on network/parse errors.
 */
export async function signup(payload: SignupPayload): Promise<SignupSuccessResponse> {
  const url = `${API_PREFIX}/signup/`;
  let res: Response;
  try {
    res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        full_name: payload.full_name.trim(),
        email: payload.email.trim(),
        password: payload.password,
        confirm_password: payload.confirm_password,
        terms_accepted: payload.terms_accepted === true,
      }),
    });
  } catch (err) {
    if (err instanceof TypeError && (err.message === 'Failed to fetch' || err.message.includes('fetch'))) {
      throw new Error(CONNECTION_ERROR_MESSAGE);
    }
    throw err instanceof Error ? err : new Error('Network error. Please try again.');
  }

  let data: SignupResponse;
  try {
    data = (await res.json()) as SignupResponse;
  } catch {
    throw new Error('Invalid response from server. Please try again.');
  }

  if (res.ok && data.success === true) {
    return data;
  }

  const message =
    typeof (data as SignupErrorResponse).message === 'string'
      ? (data as SignupErrorResponse).message
      : 'Sign up failed. Please try again.';
  throw new Error(message);
}

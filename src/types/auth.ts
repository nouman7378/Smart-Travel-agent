// Authentication-related types

export interface LoginData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

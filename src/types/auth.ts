// Authentication-related types
// Note: LoginData and SignUpData for forms are defined in LoginForm.tsx and SignUpForm.tsx.
// User type is in contexts/AuthContext.tsx; API types (LoginUser, SignupPayload) are in services/authService.ts.

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

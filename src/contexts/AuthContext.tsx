/**
 * AuthContext
 *
 * Provides authentication state and methods throughout the application.
 * Login uses the backend API (POST /api/login/); user is persisted in localStorage.
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { login as apiLogin, signup as apiSignup } from '../services/authService';
import type { SignupPayload } from '../services/authService';
import { APP_CONFIG } from '../constants/config';

export interface User {
  id: number;
  username: string;
  email: string;
  full_name?: string;
  /** True for superadmin/staff; only these users see Admin link and can access /admin. */
  is_staff?: boolean;
}

function isStaffUser(user: { email?: string; username?: string; is_staff?: boolean }): boolean {
  if (user.is_staff === true) return true;
  const email = (user.email || user.username || '').toLowerCase();
  return email === APP_CONFIG.SUPERADMIN_EMAIL.toLowerCase();
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<User>;
  signup: (payload: SignupPayload) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing authentication on mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        const userData = localStorage.getItem(APP_CONFIG.STORAGE_KEYS.USER_DATA);
        if (userData) {
          const parsed = JSON.parse(userData) as User;
          if (parsed?.id != null && parsed?.username && parsed?.email) {
            setUser({ ...parsed, is_staff: isStaffUser(parsed) });
          } else {
            localStorage.removeItem(APP_CONFIG.STORAGE_KEYS.USER_DATA);
            localStorage.removeItem(APP_CONFIG.STORAGE_KEYS.AUTH_TOKEN);
          }
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        localStorage.removeItem(APP_CONFIG.STORAGE_KEYS.AUTH_TOKEN);
        localStorage.removeItem(APP_CONFIG.STORAGE_KEYS.USER_DATA);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (username: string, password: string): Promise<User> => {
    const result = await apiLogin({ username, password });
    const userData: User = {
      id: result.user.id,
      username: result.user.username,
      email: result.user.email,
      full_name: result.user.full_name,
      is_staff: isStaffUser({ ...result.user, email: result.user.email || result.user.username }),
    };
    localStorage.setItem(APP_CONFIG.STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
    localStorage.setItem(APP_CONFIG.STORAGE_KEYS.AUTH_TOKEN, 'authenticated');
    setUser(userData);
    return userData;
  };

  const signup = async (payload: SignupPayload): Promise<void> => {
    const result = await apiSignup(payload);
    const userData: User = {
      id: result.user.id,
      username: result.user.username,
      email: result.user.email,
      full_name: result.user.full_name,
      is_staff: false,
    };
    localStorage.setItem(APP_CONFIG.STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
    localStorage.setItem(APP_CONFIG.STORAGE_KEYS.AUTH_TOKEN, 'authenticated');
    setUser(userData);
    // Backend uses email as username; user is now logged in after signup
  };

  const logout = () => {
    localStorage.removeItem(APP_CONFIG.STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(APP_CONFIG.STORAGE_KEYS.USER_DATA);
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


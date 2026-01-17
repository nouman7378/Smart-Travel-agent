/**
 * AuthContext
 * 
 * Provides authentication state and methods throughout the application
 * Uses localStorage to persist authentication state
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name?: string) => Promise<void>;
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
        const token = localStorage.getItem('travelhub_token');
        const userData = localStorage.getItem('travelhub_user');
        
        if (token && userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        localStorage.removeItem('travelhub_token');
        localStorage.removeItem('travelhub_user');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, _password: string): Promise<void> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    // In a real app, this would be an API call
    // For now, we'll accept any email/password combination
    const userData: User = {
      id: Date.now().toString(),
      email,
      name: email.split('@')[0],
    };

    // Store in localStorage
    localStorage.setItem('travelhub_token', 'mock_token_' + Date.now());
    localStorage.setItem('travelhub_user', JSON.stringify(userData));
    
    setUser(userData);
  };

  const signup = async (email: string, _password: string, name?: string): Promise<void> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    // In a real app, this would be an API call
    const userData: User = {
      id: Date.now().toString(),
      email,
      name: name || email.split('@')[0],
    };

    // Store in localStorage
    localStorage.setItem('travelhub_token', 'mock_token_' + Date.now());
    localStorage.setItem('travelhub_user', JSON.stringify(userData));
    
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('travelhub_token');
    localStorage.removeItem('travelhub_user');
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


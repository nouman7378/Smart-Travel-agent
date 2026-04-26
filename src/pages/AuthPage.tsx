/**
 * AuthPage Component
 * 
 * This component is part of the Expedia.fr Login / Sign-Up Page replication for our FYP.
 * Each component is modular and reusable.
 * 
 * This is the main authentication page that combines all components:
 * - Header (simplified)
 * - Login Form
 * - Sign-Up Form
 * - Social Login Buttons
 * - Footer (simple)
 */

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoginForm, { LoginData } from '../components/LoginForm';
import SignUpForm, { SignUpData } from '../components/SignUpForm';
import SocialLoginButtons from '../components/SocialLoginButtons';

type AuthMode = 'login' | 'signup';

interface AuthPageProps {
  initialMode?: AuthMode;
}

const AuthPage: React.FC<AuthPageProps> = ({ initialMode = 'login' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, signup } = useAuth();
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [error, setError] = useState<string>('');
  const redirectPath = (location.state as { from?: string } | null)?.from || '/';

  const handleLogin = async (data: LoginData) => {
    try {
      setError('');
      const user = await login(data.username, data.password);
      navigate(user?.is_staff ? '/admin' : redirectPath);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed. Please try again.');
      console.error('Login error:', err);
    }
  };

  const handleSignUp = async (data: SignUpData) => {
    try {
      setError('');
      await signup({
        full_name: data.full_name,
        email: data.email,
        password: data.password,
        confirm_password: data.confirm_password,
        terms_accepted: data.terms_accepted,
      });
      navigate(redirectPath);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign up failed. Please try again.');
      console.error('Sign up error:', err);
    }
  };

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
    // Handle Google OAuth
    alert('Google login functionality would be implemented here');
  };

  const handleFacebookLogin = () => {
    console.log('Facebook login clicked');
    // Handle Facebook OAuth
    alert('Facebook login functionality would be implemented here');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-md">
          {/* Auth Card */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                {error}
              </div>
            )}
            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-8">
              <button
                onClick={() => setMode('login')}
                className={`flex-1 px-4 py-3 text-center font-semibold transition-colors ${
                  mode === 'login'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setMode('signup')}
                className={`flex-1 px-4 py-3 text-center font-semibold transition-colors ${
                  mode === 'signup'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Title */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {mode === 'login' ? 'Welcome back' : 'Create your account'}
              </h1>
              <p className="text-gray-600">
                {mode === 'login'
                  ? 'Sign in to continue to TravelHub'
                  : 'Join TravelHub and start exploring the world'}
              </p>
            </div>

            {/* Social Login Buttons */}
            <SocialLoginButtons
              onGoogleLogin={handleGoogleLogin}
              onFacebookLogin={handleFacebookLogin}
              className="mb-6"
            />

            {/* Form */}
            {mode === 'login' ? (
              <LoginForm onSubmit={handleLogin} />
            ) : (
              <SignUpForm onSubmit={handleSignUp} />
            )}

            {/* Additional Links */}
            <div className="mt-6 text-center">
              {mode === 'login' ? (
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <button
                    onClick={() => setMode('signup')}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Sign up
                  </button>
                </p>
              ) : (
                <p className="text-sm text-gray-600">
                  Already have an account?{' '}
                  <button
                    onClick={() => setMode('login')}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Sign in
                  </button>
                </p>
              )}
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              By continuing, you agree to TravelHub's{' '}
              <a href="#terms" className="text-blue-600 hover:text-blue-700">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#privacy" className="text-blue-600 hover:text-blue-700">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuthPage;


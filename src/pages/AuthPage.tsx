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
    <div className="min-h-screen bg-transparent relative flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Background with strong Blur - Modal Style */}
      <div className="fixed inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&q=80)' }}
        ></div>
        <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-md"></div>
      </div>

      {/* Auth Container (Dialogue) */}
      <div className="relative z-10 w-full max-w-5xl bg-white rounded-[8px] shadow-2xl overflow-hidden flex flex-col md:flex-row h-[720px] max-h-[90vh] animate-in fade-in zoom-in duration-300">
        {/* Left Side: Image & Branding */}
        <div className="hidden md:flex md:w-1/2 relative">
          <img
            src="https://images.pexels.com/photos/4907193/pexels-photo-4907193.jpeg"
            alt="Travel Destination"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/40 to-transparent flex flex-col justify-end p-12 text-white">
            <h2 className="text-4xl font-bold mb-4 leading-tight">Your Next Adventure Starts Here.</h2>
            <p className="text-blue-100 text-lg opacity-90">
              Join thousands of travelers who plan their perfect trips with TravelHub's AI-powered intelligence.
            </p>
            <div className="mt-8 flex items-center space-x-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-blue-400 flex items-center justify-center text-[10px] font-bold">
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <span className="text-sm font-medium">Joined by 50k+ travelers</span>
            </div>
          </div>
        </div>

        {/* Right Side: Form Content */}
        <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col overflow-y-auto">
          {/* Back button or Logo for mobile */}
          <div className="flex justify-between items-center mb-8">
            <button
              onClick={() => navigate('/')}
              className="text-gray-400 hover:text-blue-600 transition-colors flex items-center gap-2 text-sm font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </button>
          </div>

          <div className="flex-1">
            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm animate-shake">
                {error}
              </div>
            )}

            {/* Tabs */}
            <div className="flex bg-gray-100 p-1 rounded-xl mb-8">
              <button
                onClick={() => setMode('login')}
                className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all duration-200 ${mode === 'login'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setMode('signup')}
                className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all duration-200 ${mode === 'signup'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                Sign Up
              </button>
            </div>

            {/* Title */}
            <div className="mb-8 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {mode === 'login' ? 'Welcome Back' : 'Get Started'}
              </h1>
              <p className="text-gray-500">
                {mode === 'login'
                  ? 'Sign in to access your saved trips and deals.'
                  : 'Create an account to start your journey.'}
              </p>
            </div>

            {/* Form */}
            <div className="space-y-6">
              {mode === 'login' ? (
                <LoginForm onSubmit={handleLogin} />
              ) : (
                <SignUpForm onSubmit={handleSignUp} />
              )}
            </div>
          </div>

          {/* Footer Info */}
          <div className="mt-12 text-center text-xs text-gray-400">
            By continuing, you agree to TravelHub's{' '}
            <a href="#terms" className="text-blue-600 font-semibold hover:underline">Terms of Service</a> and{' '}
            <a href="#privacy" className="text-blue-600 font-semibold hover:underline">Privacy Policy</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;


/**
 * LoginForm Component
 *
 * Login form wired to backend API (POST /api/login/).
 * Features: email + password, Remember Me, Forgot password link, validation.
 */

import React, { useState } from 'react';

interface LoginFormProps {
  onSubmit: (data: LoginData) => void;
  className?: string;
}

export interface LoginData {
  username: string;
  password: string;
  rememberMe: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, className = '' }) => {
  const [formData, setFormData] = useState<LoginData>({
    username: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof LoginData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof LoginData, string>> = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Email is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof LoginData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="space-y-5">
        {/* Email or Username Field (sent as username to API) */}
        <div>
          <label htmlFor="login-username" className="block text-sm font-medium text-gray-700 mb-2">
            Email or Username
          </label>
          <input
            id="login-username"
            type="text"
            autoComplete="username"
            value={formData.username}
            onChange={(e) => handleChange('username', e.target.value)}
            className={`w-full px-4 py-3.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 ${
              errors.username ? 'border-red-500 bg-red-50/30' : 'border-gray-200 bg-gray-50/50 hover:bg-white'
            }`}
            placeholder="Enter your email or username"
          />
          {errors.username && (
            <p className="mt-1 text-xs text-red-600 font-medium">{errors.username}</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="login-password" className="block text-sm font-semibold text-gray-700 mb-2">
            Password
          </label>
          <input
            id="login-password"
            type="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={(e) => handleChange('password', e.target.value)}
            className={`w-full px-4 py-3.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 ${
              errors.password ? 'border-red-500 bg-red-50/30' : 'border-gray-200 bg-gray-50/50 hover:bg-white'
            }`}
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="mt-1 text-xs text-red-600 font-medium">{errors.password}</p>
          )}
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between py-1">
          <label className="flex items-center cursor-pointer group">
            <input
              type="checkbox"
              checked={formData.rememberMe}
              onChange={(e) => handleChange('rememberMe', e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500/20 transition-all"
            />
            <span className="ml-2 text-sm text-gray-600 group-hover:text-gray-900 transition-colors">Remember me</span>
          </label>
          <a
            href="#forgot-password"
            className="text-sm text-blue-600 hover:text-blue-700 font-bold transition-colors"
          >
            Forgot password?
          </a>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-4 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all duration-200 shadow-blue-200 shadow-lg hover:shadow-blue-300 transform hover:-translate-y-1 active:translate-y-0"
        >
          {isSubmitting ? 'Signing in...' : 'Sign In'}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;


/**
 * SignUpForm Component
 *
 * Sign-up form wired to backend API (POST /api/signup/).
 * Full name, email (used as login username), password, confirm password, terms accepted.
 */

import React, { useState } from 'react';

interface SignUpFormProps {
  onSubmit: (data: SignUpData) => void;
  className?: string;
}

export interface SignUpData {
  full_name: string;
  email: string;
  password: string;
  confirm_password: string;
  terms_accepted: boolean;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSubmit, className = '' }) => {
  const [formData, setFormData] = useState<SignUpData>({
    full_name: '',
    email: '',
    password: '',
    confirm_password: '',
    terms_accepted: false,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof SignUpData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof SignUpData, string>> = {};

    if (!formData.full_name.trim()) {
      newErrors.full_name = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }

    if (!formData.confirm_password) {
      newErrors.confirm_password = 'Confirm password is required';
    } else if (formData.password !== formData.confirm_password) {
      newErrors.confirm_password = 'Password and confirm password do not match';
    }

    if (!formData.terms_accepted) {
      newErrors.terms_accepted = 'You must agree to the Terms and Conditions and Privacy Policy';
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
      console.error('Sign up error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof SignUpData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="space-y-5">
        {/* Full Name Field */}
        <div>
          <label htmlFor="signup-full-name" className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <input
            id="signup-full-name"
            type="text"
            autoComplete="name"
            value={formData.full_name}
            onChange={(e) => handleChange('full_name', e.target.value)}
            className={`w-full px-4 py-3.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 ${
              errors.full_name ? 'border-red-500 bg-red-50/30' : 'border-gray-200 bg-gray-50/50 hover:bg-white'
            }`}
            placeholder="Enter your full name"
          />
          {errors.full_name && (
            <p className="mt-1 text-xs text-red-600 font-medium">{errors.full_name}</p>
          )}
        </div>

        {/* Email Field (used as login username) */}
        <div>
          <label htmlFor="signup-email" className="block text-sm font-semibold text-gray-700 mb-2">
            Email Address
          </label>
          <input
            id="signup-email"
            type="email"
            autoComplete="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className={`w-full px-4 py-3.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 ${
              errors.email ? 'border-red-500 bg-red-50/30' : 'border-gray-200 bg-gray-50/50 hover:bg-white'
            }`}
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-600 font-medium">{errors.email}</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="signup-password" className="block text-sm font-semibold text-gray-700 mb-2">
            Password
          </label>
          <input
            id="signup-password"
            type="password"
            autoComplete="new-password"
            value={formData.password}
            onChange={(e) => handleChange('password', e.target.value)}
            className={`w-full px-4 py-3.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 ${
              errors.password ? 'border-red-500 bg-red-50/30' : 'border-gray-200 bg-gray-50/50 hover:bg-white'
            }`}
            placeholder="Create a password"
          />
          {errors.password && (
            <p className="mt-1 text-xs text-red-600 font-medium">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div>
          <label
            htmlFor="signup-confirm-password"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Confirm Password
          </label>
          <input
            id="signup-confirm-password"
            type="password"
            autoComplete="new-password"
            value={formData.confirm_password}
            onChange={(e) => handleChange('confirm_password', e.target.value)}
            className={`w-full px-4 py-3.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 ${
              errors.confirm_password ? 'border-red-500 bg-red-50/30' : 'border-gray-200 bg-gray-50/50 hover:bg-white'
            }`}
            placeholder="Confirm your password"
          />
          {errors.confirm_password && (
            <p className="mt-1 text-xs text-red-600 font-medium">{errors.confirm_password}</p>
          )}
        </div>

        {/* Terms and Conditions */}
        <div className="flex items-start py-1">
          <input
            type="checkbox"
            id="terms"
            checked={formData.terms_accepted}
            onChange={(e) => handleChange('terms_accepted', e.target.checked)}
            className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500/20"
          />
          <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
            I agree to the{' '}
            <a href="#terms" className="text-blue-600 hover:text-blue-700 font-bold">
              Terms
            </a>{' '}
            and{' '}
            <a href="#privacy" className="text-blue-600 hover:text-blue-700 font-bold">
              Privacy
            </a>
          </label>
        </div>
        {errors.terms_accepted && (
          <p className="mt-1 text-xs text-red-600 font-medium">{errors.terms_accepted}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-4 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all duration-200 shadow-blue-200 shadow-lg hover:shadow-blue-300 transform hover:-translate-y-1 active:translate-y-0"
        >
          {isSubmitting ? 'Creating account...' : 'Create Account'}
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;


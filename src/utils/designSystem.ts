/**
 * Design System - Unified Design Tokens
 * 
 * Centralized design system matching Expedia-style with project theme
 */

export const colors = {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6', // blue-500
    600: '#2563eb', // blue-600
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  secondary: {
    50: '#faf5ff',
    100: '#f3e8ff',
    200: '#e9d5ff',
    300: '#d8b4fe',
    400: '#c084fc',
    500: '#a855f7',
    600: '#9333ea', // purple-600
    700: '#7e22ce',
    800: '#6b21a8',
    900: '#581c87',
  },
  accent: {
    50: '#eef2ff',
    100: '#e0e7ff',
    200: '#c7d2fe',
    300: '#a5b4fc',
    400: '#818cf8',
    500: '#6366f1',
    600: '#4f46e5', // indigo-600
    700: '#4338ca',
    800: '#3730a3', // indigo-800
    900: '#312e81',
  },
  neutral: {
    50: '#f9fafb', // gray-50
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563', // gray-600
    700: '#374151', // gray-700
    800: '#1f2937',
    900: '#111827', // gray-900
  },
  success: '#10b981',
  error: '#ef4444',
  warning: '#f59e0b',
  info: '#3b82f6',
};

export const gradients = {
  primary: 'from-blue-600 via-purple-600 to-indigo-800',
  primaryHover: 'from-blue-700 via-purple-700 to-indigo-900',
  button: 'from-blue-500 to-purple-600',
  buttonHover: 'from-blue-600 to-purple-700',
  text: 'from-blue-600 to-purple-600',
};

export const typography = {
  fontFamily: {
    sans: ['system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
  },
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
    '6xl': '3.75rem', // 60px
    '7xl': '4.5rem',  // 72px
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
};

export const spacing = {
  section: {
    py: 'py-16 md:py-20',
    px: 'px-4 sm:px-6 lg:px-8',
  },
  container: {
    base: 'container mx-auto',
    narrow: 'max-w-4xl mx-auto',
    medium: 'max-w-6xl mx-auto',
    wide: 'max-w-7xl mx-auto',
  },
  gap: {
    sm: 'gap-4',
    md: 'gap-6 md:gap-8',
    lg: 'gap-8 md:gap-12',
  },
};

export const borderRadius = {
  sm: 'rounded-lg',
  md: 'rounded-xl',
  lg: 'rounded-2xl',
  xl: 'rounded-3xl',
  full: 'rounded-full',
};

export const shadows = {
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
  '2xl': 'shadow-2xl',
  hover: 'hover:shadow-xl',
};

export const transitions = {
  default: 'transition-all duration-300',
  fast: 'transition-all duration-200',
  slow: 'transition-all duration-500',
};

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// Component-specific styles
export const components = {
  button: {
    primary: `px-8 py-4 bg-gradient-to-r ${gradients.button} hover:${gradients.buttonHover} text-white font-bold ${borderRadius.lg} ${shadows.lg} ${transitions.default} hover:scale-105`,
    secondary: `px-8 py-4 bg-transparent border-2 border-white text-white font-bold ${borderRadius.lg} hover:bg-white hover:text-blue-600 ${transitions.default}`,
    outline: `px-8 py-4 bg-white text-blue-600 font-bold ${borderRadius.lg} ${shadows.lg} ${transitions.default} hover:shadow-xl`,
  },
  card: {
    base: `bg-white ${borderRadius.lg} ${shadows.md} ${transitions.default} ${shadows.hover}`,
    elevated: `bg-white ${borderRadius.lg} ${shadows.lg} ${transitions.default} ${shadows.hover}`,
  },
  input: {
    base: `w-full px-4 py-3 border border-gray-300 ${borderRadius.md} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`,
  },
};

export default {
  colors,
  gradients,
  typography,
  spacing,
  borderRadius,
  shadows,
  transitions,
  breakpoints,
  components,
};


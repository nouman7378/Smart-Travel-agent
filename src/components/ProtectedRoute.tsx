/**
 * ProtectedRoute Component
 * 
 * Public route wrapper - all pages are now publicly accessible
 * Authentication is optional and does not block access
 */

import React from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // All routes are now publicly accessible
  // This component is kept for compatibility but no longer blocks access
  return <>{children}</>;
};

export default ProtectedRoute;


/**
 * AdminRoute – Protects admin dashboard routes.
 * Only authenticated users with is_staff (superadmin/staff) can access.
 * Others are redirected to login or home.
 */

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AdminRoute: React.FC = () => {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace state={{ from: 'admin' }} />;
  }

  if (!user.is_staff) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;

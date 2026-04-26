import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
          <div className="px-6 py-8 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
                {user.username?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div>
                <h1 className="text-2xl font-bold">My Profile</h1>
                <p className="text-blue-100">Manage your account details and session</p>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Username</p>
                <p className="text-gray-900 font-semibold">{user.username || '-'}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Email</p>
                <p className="text-gray-900 font-semibold">{user.email || '-'}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">User ID</p>
                <p className="text-gray-900 font-semibold">{user.id}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Role</p>
                <p className="text-gray-900 font-semibold">{user.is_staff ? 'Admin' : 'Traveler'}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row gap-3 sm:justify-end">
              <button
                onClick={() => navigate('/')}
                className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium"
              >
                Back to Home
              </button>
              <button
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
                className="px-5 py-2.5 rounded-lg bg-red-600 text-white hover:bg-red-700 font-semibold"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

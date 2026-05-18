/**
 * UserManagement Component
 * 
 * Admin page for managing users (Travelers, Agents, Admins)
 */

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';
import { AdminUser, UserRole, UserStatus } from '@/types/admin';
import { getAdminAuthHeaders } from '@/utils/adminAuth';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://smart-travel.fly.dev/api';

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<UserRole | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<UserStatus | 'all'>('all');
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`${API_BASE_URL}/admin/users/`, {
          credentials: 'include',
          headers: getAdminAuthHeaders(),
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch users: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.success && data.users) {
          // Map backend response to AdminUser format
          const mappedUsers: AdminUser[] = data.users.map((u: any) => ({
            id: String(u.id),
            email: u.email || '',
            name: u.name || u.email || 'Unknown',
            role: u.role as UserRole,
            status: u.status as UserStatus,
            registrationDate: u.registrationDate || '',
            lastLogin: u.lastLogin || undefined,
            totalBookings: u.totalBookings || 0,
            totalSpent: u.totalSpent || 0,
            phone: u.phone || undefined,
          }));

          setUsers(mappedUsers);
          setFilteredUsers(mappedUsers);
        } else {
          throw new Error(data.message || 'Failed to fetch users');
        }
      } catch (err) {
        console.error('Error fetching users:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch users');
        setUsers([]);
        setFilteredUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    let filtered = users;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Role filter
    if (roleFilter !== 'all') {
      filtered = filtered.filter((user) => user.role === roleFilter);
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter((user) => user.status === statusFilter);
    }

    setFilteredUsers(filtered);
  }, [searchQuery, roleFilter, statusFilter, users]);

  const handleUserAction = async (userId: string, action: 'activate' | 'deactivate' | 'suspend') => {
    setUsers((prev) =>
      prev.map((user) => {
        if (user.id === userId) {
          let newStatus: UserStatus = user.status;
          if (action === 'activate') newStatus = 'active';
          else if (action === 'deactivate') newStatus = 'inactive';
          else if (action === 'suspend') newStatus = 'suspended';
          return { ...user, status: newStatus };
        }
        return user;
      })
    );
  };

  const columns = [
    {
      key: 'name',
      header: 'User',
      render: (user: AdminUser) => (
        <div className="flex items-center">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-3">
            <span className="text-white font-semibold text-sm">
              {user.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <p className="font-medium text-gray-800">{user.name}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'role',
      header: 'Role',
      render: (user: AdminUser) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            user.role === 'admin'
              ? 'bg-purple-100 text-purple-800'
              : user.role === 'agent'
              ? 'bg-blue-100 text-blue-800'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (user: AdminUser) => (
        <StatusBadge
          status={user.status}
          variant={
            user.status === 'active'
              ? 'success'
              : user.status === 'suspended'
              ? 'danger'
              : 'default'
          }
        />
      ),
    },
    {
      key: 'totalBookings',
      header: 'Bookings',
      render: (user: AdminUser) => <span className="text-gray-800">{user.totalBookings}</span>,
    },
    {
      key: 'totalSpent',
      header: 'Total Spent',
      render: (user: AdminUser) => (
        <span className="text-gray-800">PKR {user.totalSpent.toLocaleString()}</span>
      ),
    },
    {
      key: 'lastLogin',
      header: 'Last Login',
      render: (user: AdminUser) => (
        <span className="text-gray-600">
          {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (user: AdminUser) => (
        <div className="flex items-center space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedUser(user);
              setShowUserModal(true);
            }}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            View
          </button>
          {user.status === 'active' ? (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleUserAction(user.id, 'suspend');
                }}
                className="text-yellow-600 hover:text-yellow-700 text-sm font-medium"
              >
                Suspend
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleUserAction(user.id, 'deactivate');
                }}
                className="text-gray-600 hover:text-gray-700 text-sm font-medium"
              >
                Deactivate
              </button>
            </>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleUserAction(user.id, 'activate');
              }}
              className="text-green-600 hover:text-green-700 text-sm font-medium"
            >
              Activate
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">User Management</h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">Manage users, agents, and administrators</p>
          </div>
          <button className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm sm:text-base">
            Add User
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg
                className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {/* Role Filter */}
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value as UserRole | 'all')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="agent">Agent</option>
              <option value="traveler">Traveler</option>
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as UserStatus | 'all')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <p className="text-sm text-gray-600">Total Users</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">{users.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <p className="text-sm text-gray-600">Active Users</p>
            <p className="text-2xl font-bold text-green-600 mt-1">
              {users.filter((u) => u.status === 'active').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <p className="text-sm text-gray-600">Agents</p>
            <p className="text-2xl font-bold text-blue-600 mt-1">
              {users.filter((u) => u.role === 'agent').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <p className="text-sm text-gray-600">Travelers</p>
            <p className="text-2xl font-bold text-purple-600 mt-1">
              {users.filter((u) => u.role === 'traveler').length}
            </p>
          </div>
        </div>

        {/* Users Table */}
        <DataTable
          data={filteredUsers}
          columns={columns}
          loading={loading}
          emptyMessage="No users found"
          onRowClick={(user) => {
            setSelectedUser(user);
            setShowUserModal(true);
          }}
        />

        {/* User Detail Modal */}
        {showUserModal && selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">User Details</h2>
                <button
                  onClick={() => setShowUserModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xl">
                      {selectedUser.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{selectedUser.name}</h3>
                    <p className="text-gray-600">{selectedUser.email}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                  <div>
                    <p className="text-sm text-gray-600">Role</p>
                    <p className="font-medium text-gray-800 capitalize">{selectedUser.role}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <StatusBadge
                      status={selectedUser.status}
                      variant={
                        selectedUser.status === 'active'
                          ? 'success'
                          : selectedUser.status === 'suspended'
                          ? 'danger'
                          : 'default'
                      }
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Registration Date</p>
                    <p className="font-medium text-gray-800">
                      {new Date(selectedUser.registrationDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Last Login</p>
                    <p className="font-medium text-gray-800">
                      {selectedUser.lastLogin
                        ? new Date(selectedUser.lastLogin).toLocaleDateString()
                        : 'Never'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Bookings</p>
                    <p className="font-medium text-gray-800">{selectedUser.totalBookings}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Spent</p>
                    <p className="font-medium text-gray-800">
                        PKR {selectedUser.totalSpent.toLocaleString()}
                    </p>
                  </div>
                  {selectedUser.phone && (
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-medium text-gray-800">{selectedUser.phone}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default UserManagement;

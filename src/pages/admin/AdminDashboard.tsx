/**
 * Admin overview dashboard
 */

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Users,
  DollarSign,
  ClipboardList,
  Clock,
  Package,
  Building2,
  Car,
  Plus,
  ArrowRight,
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import StatCard from '@/components/admin/StatCard';
import { DashboardStats } from '@/types/admin';
import { getAdminAuthHeaders } from '@/utils/adminAuth';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://smart-travel.fly.dev/api';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/admin/dashboard/stats/`, {
          credentials: 'include',
          headers: getAdminAuthHeaders(),
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch dashboard stats: ${response.status}`);
        }

        const data = await response.json();
        if (data.success && data.stats) {
          setStats(data.stats);
        } else {
          throw new Error(data.message || 'Failed to fetch dashboard stats');
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading || !stats) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-2 border-slate-200 border-t-blue-600 mx-auto" />
            <p className="mt-4 text-slate-500">Loading dashboard...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  const revenueData = stats.revenueData ?? [];
  const maxRevenue = Math.max(...revenueData.map((d) => d.revenue), 1);
  const recentBookings = stats.recentBookings ?? [];

  const inventory = [
    {
      label: 'Packages',
      value: stats.totalPackages ?? 0,
      path: '/admin/packages',
      icon: Package,
      color: 'text-violet-600',
      bg: 'bg-violet-50',
    },
    {
      label: 'Hotels',
      value: stats.totalHotels ?? 0,
      path: '/admin/hotels',
      icon: Building2,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      label: 'Cars',
      value: stats.totalCars ?? 0,
      path: '/admin/cars',
      icon: Car,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
    },
  ];

  const quickLinks = [
    { label: 'Add package', path: '/admin/packages', icon: Plus },
    { label: 'Manage users', path: '/admin/users', icon: Users },
    { label: 'View bookings', path: '/admin/bookings', icon: ClipboardList },
    { label: 'Payments', path: '/admin/payments', icon: DollarSign },
  ];

  return (
    <AdminLayout>
      <AdminPageHeader
        title="Dashboard"
        description="Platform activity, revenue, and recent bookings at a glance."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        <StatCard
          title="Total users"
          value={stats.totalUsers}
          change={{ value: stats.growth.users, isPositive: true, label: 'vs last month' }}
          icon={<Users className="w-6 h-6" />}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
        />
        <StatCard
          title="Monthly revenue"
          value={`PKR ${stats.monthlyRevenue.toLocaleString()}`}
          change={{ value: stats.growth.revenue, isPositive: true, label: 'vs last month' }}
          icon={<DollarSign className="w-6 h-6" />}
          iconColor="text-emerald-600"
          iconBg="bg-emerald-50"
        />
        <StatCard
          title="Confirmed bookings"
          value={stats.ongoingBookings}
          change={{ value: stats.growth.bookings, isPositive: true, label: 'vs last month' }}
          icon={<ClipboardList className="w-6 h-6" />}
          iconColor="text-violet-600"
          iconBg="bg-violet-50"
        />
        <StatCard
          title="Pending bookings"
          value={stats.pendingRequests}
          icon={<Clock className="w-6 h-6" />}
          iconColor="text-amber-600"
          iconBg="bg-amber-50"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {inventory.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              to={item.path}
              className="bg-white rounded-xl border border-slate-200 p-5 flex items-center justify-between hover:border-blue-300 hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className={`w-11 h-11 rounded-lg ${item.bg} flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <div>
                  <p className="text-sm text-slate-500">{item.label}</p>
                  <p className="text-2xl font-bold text-slate-900">{item.value}</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600" />
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
        <div className="lg:col-span-3 bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-slate-900">Revenue trend</h2>
            <button
              type="button"
              onClick={() => navigate('/admin/reports')}
              className="text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              Full report
            </button>
          </div>
          {revenueData.length > 0 ? (
            <div className="flex items-end justify-between gap-3 h-56">
              {revenueData.map((item) => (
                <div key={item.month} className="flex-1 flex flex-col items-center min-w-0">
                  <div className="w-full flex flex-col justify-end h-44">
                    <div
                      className="w-full bg-blue-600 rounded-t-md min-h-[4px] transition-all"
                      style={{ height: `${Math.max((item.revenue / maxRevenue) * 100, 4)}%` }}
                      title={`PKR ${item.revenue.toLocaleString()}`}
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-2">{item.month}</p>
                  <p className="text-xs font-medium text-slate-700 mt-0.5">
                    {(item.revenue / 1000).toFixed(0)}k
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-500 text-center py-16">No revenue data yet</p>
          )}
        </div>

        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-900">Recent bookings</h2>
            <button
              type="button"
              onClick={() => navigate('/admin/bookings')}
              className="text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              View all
            </button>
          </div>
          {recentBookings.length > 0 ? (
            <ul className="space-y-3">
              {recentBookings.map((booking) => (
                <li
                  key={booking.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
                >
                  <div className="min-w-0">
                    <p className="font-medium text-slate-900 truncate">{booking.customer}</p>
                    <p className="text-sm text-slate-500 truncate">{booking.package}</p>
                  </div>
                  <div className="text-right shrink-0 ml-3">
                    <p className="font-semibold text-slate-900 text-sm">
                      PKR {booking.amount.toLocaleString()}
                    </p>
                    <span
                      className={`inline-block mt-1 text-xs font-medium px-2 py-0.5 rounded-full ${
                        booking.status === 'confirmed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-slate-500 text-center py-12">No bookings yet</p>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Quick actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <button
                key={link.path}
                type="button"
                onClick={() => navigate(link.path)}
                className="flex flex-col items-center gap-2 p-5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-300 transition-colors"
              >
                <Icon className="w-6 h-6 text-blue-600" />
                <span className="text-sm font-medium text-slate-700">{link.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;

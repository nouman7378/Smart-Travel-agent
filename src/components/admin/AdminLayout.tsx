/**
 * Admin layout — sidebar navigation + top bar with dynamic page title.
 */

import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Package,
  Building2,
  Car,
  ClipboardList,
  CreditCard,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  PanelLeftClose,
  PanelLeft,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const PAGE_TITLES: Record<string, string> = {
  '/admin': 'Overview',
  '/admin/users': 'Users',
  '/admin/packages': 'Packages',
  '/admin/hotels': 'Hotels',
  '/admin/cars': 'Cars',
  '/admin/bookings': 'Bookings',
  '/admin/payments': 'Payments',
  '/admin/analytics': 'Chat Analytics',
  '/admin/query-trends': 'Query Trends',
  '/admin/model-performance': 'Model Performance',
  '/admin/training-data': 'Training Data',
};

const navItems = [
  { name: 'Overview', path: '/admin', icon: LayoutDashboard },
  { name: 'Users', path: '/admin/users', icon: Users },
  { name: 'Packages', path: '/admin/packages', icon: Package },
  { name: 'Hotels', path: '/admin/hotels', icon: Building2 },
  { name: 'Cars', path: '/admin/cars', icon: Car },
  { name: 'Bookings', path: '/admin/bookings', icon: ClipboardList },
  { name: 'Payments', path: '/admin/payments', icon: CreditCard },
  // Reports removed from admin sidebar
  // Settings removed from admin sidebar
];

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const pageTitle =
    PAGE_TITLES[location.pathname] ??
    Object.entries(PAGE_TITLES).find(([path]) =>
      path !== '/admin' && location.pathname.startsWith(path)
    )?.[1] ??
    'Admin';

  const isActive = (path: string) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const userInitial =
    user?.full_name?.charAt(0)?.toUpperCase() ||
    user?.username?.charAt(0)?.toUpperCase() ||
    'A';

  const displayName = user?.full_name || user?.username || 'Admin';

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-slate-950 border-r border-slate-800 transition-all duration-300 ${
          sidebarOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full lg:w-[72px] lg:translate-x-0'
        }`}
      >
        <div className={`flex flex-col h-full overflow-hidden ${sidebarOpen ? 'w-64' : 'w-[72px]'}`}>
          <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800 shrink-0">
            <Link to="/admin" className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              {sidebarOpen && (
                <span className="text-white font-semibold truncate">
                  Travel<span className="text-blue-400">Hub</span>
                </span>
              )}
            </Link>
            <button
              type="button"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            >
              {sidebarOpen ? <PanelLeftClose className="w-5 h-5" /> : <PanelLeft className="w-5 h-5" />}
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto py-4 px-2">
            {navItems.map((item) => {
              const active = isActive(item.path);
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  title={!sidebarOpen ? item.name : undefined}
                  onClick={() => {
                    if (window.innerWidth < 1024) setSidebarOpen(false);
                  }}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-0.5 transition-colors ${
                    active
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  } ${!sidebarOpen ? 'justify-center px-2' : ''}`}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  {sidebarOpen && <span className="font-medium text-sm">{item.name}</span>}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-slate-800 p-3 shrink-0 space-y-2">
            <Link
              to="/"
              className={`flex items-center gap-2 text-slate-400 hover:text-white text-sm px-3 py-2 rounded-lg hover:bg-slate-800 ${
                !sidebarOpen ? 'justify-center px-2' : ''
              }`}
              title="View site"
            >
              <ExternalLink className="w-4 h-4 shrink-0" />
              {sidebarOpen && <span>View site</span>}
            </Link>
            <div
              className={`flex items-center gap-3 px-2 py-2 ${!sidebarOpen ? 'justify-center' : ''}`}
            >
              <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                <span className="text-white text-sm font-semibold">{userInitial}</span>
              </div>
              {sidebarOpen && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{displayName}</p>
                  <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                </div>
              )}
              {sidebarOpen && (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </aside>

      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${
          sidebarOpen ? 'lg:ml-64' : 'lg:ml-[72px]'
        }`}
      >
        <header className="sticky top-0 z-30 h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg lg:hidden"
              aria-label="Toggle menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-semibold text-slate-900">{pageTitle}</h1>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;

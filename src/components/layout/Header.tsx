/**
 * Header Component - Modern Travel Agency Style
 * Clean design with glass effects and modern aesthetics
 */

import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import logo from '../../assets/logo.png';
import { useBooking } from '../../contexts/BookingContext';
import { Plane, Building, Car, Palmtree, Bot, Ticket, Star } from 'lucide-react';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const { itemCount } = useBooking();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement | null>(null);
  const navItems = [
    { name: 'Flights', href: '/flights' },
    { name: 'Hotels', href: '/hotels' },
    { name: 'Cars', href: '/cars' },
    { name: 'Packages', href: '/packages' },
    { name: 'AI Chat', href: '/chat' },
    { name: 'Booking', href: '/booking/demo' },
    { name: 'Reviews', href: '/community' },
  ];

  // Scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isProfileMenuOpen &&
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProfileMenuOpen]);

  return (
    <header 
      className={`
        sticky top-0 z-50 
        transition-all duration-300 ease-in-out
        ${isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100' 
          : 'bg-white border-b border-gray-100'
        }
        ${className}
      `}
    >
      <div className="w-full px-3 sm:px-3 lg:px-4">
        {/* Main Header */}
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link 
              to="/" 
              className="flex items-center group"
            >
              <div className="flex items-center">
                <img src={logo} alt="TravelHub Logo" className="h-16 w-auto" />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href || location.pathname.startsWith(item.href + '/');
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    relative px-5 py-3 rounded-full text-base font-bold
                    transition-all duration-300 ease-in-out flex items-center group
                    ${isActive
                      ? 'text-blue-600 bg-white border-2 border-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                    }
                  `}
                >
                  <span>{item.name}</span>
                  {item.name === 'Booking' && isAuthenticated && itemCount > 0 && (
                    <span className="ml-2 inline-flex items-center justify-center min-w-[22px] h-5.5 px-2 rounded-full bg-blue-600 text-white text-[11px] font-bold">
                      {itemCount}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {/* Admin link – only for superadmin/staff */}
                {user?.is_staff && (
                  <Link
                    to="/admin"
                    className="hidden sm:flex items-center space-x-2 px-4 py-2.5 bg-amber-50 border border-amber-200 text-amber-800 rounded-lg font-medium shadow-sm hover:bg-amber-100 transition-all duration-200"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Admin</span>
                  </Link>
                )}
                {/* User Info */}
                <div className="relative hidden sm:block" ref={profileMenuRef}>
                  <button
                    type="button"
                    aria-label="Open profile menu"
                    onClick={() => setIsProfileMenuOpen((prev) => !prev)}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-md transition-all duration-200 bg-gradient-to-br from-blue-500 to-purple-600 hover:scale-105"
                  >
                    {user?.username?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U'}
                  </button>

                  {isProfileMenuOpen && (
                    <div className="absolute right-0 mt-3 w-80 bg-white border border-gray-200 rounded-lg shadow-xl p-4 z-50">
                      <div className="flex items-center space-x-3 pb-3 border-b border-gray-100">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center font-semibold">
                          {user?.username?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">
                            {user?.username || 'User'}
                          </p>
                          <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                        </div>
                      </div>

                      <div className="pt-3 space-y-3">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-gray-50 rounded-lg px-3 py-2">
                            <p className="text-[10px] uppercase tracking-wide text-gray-500">Username</p>
                            <p className="text-sm font-semibold text-gray-900 truncate">{user?.username || '-'}</p>
                          </div>
                          <div className="bg-gray-50 rounded-lg px-3 py-2">
                            <p className="text-[10px] uppercase tracking-wide text-gray-500">Role</p>
                            <p className="text-sm font-semibold text-gray-900">
                              {user?.is_staff ? 'Admin' : 'Traveler'}
                            </p>
                          </div>
                          <div className="bg-gray-50 rounded-lg px-3 py-2">
                            <p className="text-[10px] uppercase tracking-wide text-gray-500">User ID</p>
                            <p className="text-sm font-semibold text-gray-900">{user?.id ?? '-'}</p>
                          </div>
                          <div className="bg-gray-50 rounded-lg px-3 py-2">
                            <p className="text-[10px] uppercase tracking-wide text-gray-500">Name</p>
                            <p className="text-sm font-semibold text-gray-900 truncate">
                              {user?.full_name || user?.username || '-'}
                            </p>
                          </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg px-3 py-2">
                          <p className="text-[10px] uppercase tracking-wide text-gray-500">Email</p>
                          <p className="text-sm font-semibold text-gray-900 break-all">{user?.email || '-'}</p>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            logout();
                            setIsProfileMenuOpen(false);
                            navigate('/login');
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 text-sm font-semibold"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              /* Sign In Button - Blue Background */
              <Link
                to="/login"
                className="hidden sm:flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span>Sign in</span>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-blue-600 focus:outline-none transition-colors duration-200"
            >
              <div className="relative w-6 h-6">
                <span className={`
                  absolute block w-5 h-0.5 bg-current transform transition-all duration-300 ease-out
                  ${isMenuOpen ? 'rotate-45 top-3' : 'top-1'}
                `}></span>
                <span className={`
                  absolute block w-5 h-0.5 bg-current transform transition-all duration-300 ease-out
                  ${isMenuOpen ? 'opacity-0' : 'opacity-100 top-3'}
                `}></span>
                <span className={`
                  absolute block w-5 h-0.5 bg-current transform transition-all duration-300 ease-out
                  ${isMenuOpen ? '-rotate-45 top-3' : 'top-5'}
                `}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`
          lg:hidden overflow-hidden transition-all duration-300 ease-in-out
          ${isMenuOpen ? 'max-h-96 opacity-100 py-4' : 'max-h-0 opacity-0'}
          border-t border-gray-100
        `}>
          <div className="flex flex-col space-y-3">
            {/* Mobile Navigation */}
            <div className="grid grid-cols-2 gap-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.href || location.pathname.startsWith(item.href + '/');
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`
                      p-3 rounded-full text-sm font-bold flex items-center justify-center space-x-2
                      transition-all duration-200
                      ${isActive
                        ? 'text-blue-600 bg-white border-2 border-blue-600 shadow-sm'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                      }
                    `}
                  >
                    <span>{item.icon}</span>
                    <span>{item.name}</span>
                    {item.name === 'Booking' && isAuthenticated && itemCount > 0 && (
                      <span className="ml-2 inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-blue-600 text-white text-xs font-semibold">
                        {itemCount}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Auth Button */}
            {isAuthenticated ? (
              <div className="flex flex-col space-y-2">
                {user?.is_staff && (
                  <Link
                    to="/admin"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center space-x-2 px-4 py-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-lg font-medium hover:bg-amber-100 transition-all duration-200"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Admin</span>
                  </Link>
                )}
                <Link
                  to="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center space-x-2 px-4 py-3 bg-blue-50 border border-blue-100 text-blue-700 rounded-lg font-medium hover:bg-blue-100 transition-all duration-200"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {user?.username?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <span>Profile</span>
                </Link>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-center space-x-2 px-4 py-3 bg-white/80 backdrop-blur-md border border-white/20 text-gray-700 rounded-lg font-medium shadow-lg shadow-black/5 text-center hover:bg-white transition-all duration-200"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span>Sign in</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;


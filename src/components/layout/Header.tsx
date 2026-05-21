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

/** First letter for avatar circles; username/email may be non-string from API. */
function getUserInitial(user: { username?: string; email?: string } | null): string {
  const source = String(user?.username || user?.email || 'U').trim();
  const letter = source.charAt(0);
  return letter ? letter.toUpperCase() : 'U';
}

const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout, updateUser } = useAuth();
  const { itemCount } = useBooking();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isShopTravelOpen, setIsShopTravelOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [tempUsername, setTempUsername] = useState('');

  useEffect(() => {
    if (user) {
      setTempUsername(user.username || '');
    }
  }, [user, isProfileMenuOpen]);

  const shopTravelRef = useRef<HTMLDivElement | null>(null);

  const navItems = [
    { name: 'Flights', href: '/flights', icon: <Plane className="w-4 h-4" /> },
    { name: 'Hotels', href: '/hotels', icon: <Building className="w-4 h-4" /> },
    { name: 'Cars', href: '/cars', icon: <Car className="w-4 h-4" /> },
    { name: 'Packages', href: '/packages', icon: <Palmtree className="w-4 h-4" /> },
    { name: 'AI Chat', href: '/chat', icon: <Bot className="w-4 h-4" /> },
    { name: 'Booking', href: '/booking/demo', icon: <Ticket className="w-4 h-4" /> },
    { name: 'Reviews', href: '/community', icon: <Star className="w-4 h-4" /> },
  ];

  const shopTravelItems = [
    { name: 'Flights', href: '/flights', icon: <Plane className="w-5 h-5 text-blue-600" />, desc: 'Compare and book flight deals' },
    { name: 'Hotels', href: '/hotels', icon: <Building className="w-5 h-5 text-indigo-600" />, desc: 'Luxury resorts & cozy apartments' },
    { name: 'Cars', href: '/cars', icon: <Car className="w-5 h-5 text-emerald-600" />, desc: 'Premium car rentals & hire' },
    { name: 'Packages', href: '/packages', icon: <Palmtree className="w-5 h-5 text-amber-600" />, desc: 'Save big bundling flight + hotel' },
    { name: 'AI Chat', href: '/chat', icon: <Bot className="w-5 h-5 text-purple-600" />, desc: 'Plan with smart AI chatbot' },
    { name: 'Booking', href: '/booking/demo', icon: <Ticket className="w-5 h-5 text-cyan-600" />, desc: 'Manage your cart items and book' },
    { name: 'Reviews', href: '/community', icon: <Star className="w-5 h-5 text-rose-600" />, desc: 'Real stories & traveler reviews' },
  ];

  // Scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setIsProfileMenuOpen(false);
    setIsEditingUsername(false);
    navigate('/login', { replace: true });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        isProfileMenuOpen &&
        !target.closest('[data-profile-menu]') &&
        !target.closest('[data-profile-trigger]')
      ) {
        setIsProfileMenuOpen(false);
        setIsEditingUsername(false);
      }
      if (
        isShopTravelOpen &&
        shopTravelRef.current &&
        !shopTravelRef.current.contains(event.target as Node)
      ) {
        setIsShopTravelOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProfileMenuOpen, isShopTravelOpen]);

  return (
    <header
      className={`
        sticky top-0 z-50 
        transition-all duration-300 ease-in-out
        ${isScrolled
          ? 'bg-blue-600 shadow-md border-b border-blue-700/50'
          : 'bg-blue-600 border-b border-blue-700/30'
        }
        ${className}
      `}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Main Header */}
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Left Side: Logo */}
          <div className="flex items-center">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link
                to="/"
                className="flex items-center group"
              >
                <div className="flex items-center">
                  <img src={logo} alt="TravelHub Logo" className="h-14 w-auto filter brightness-0 invert" />
                </div>
              </Link>
            </div>
          </div>

          {/* Right Side Actions & Core Navigation Menu */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* Travel Menus */}
            {shopTravelItems.map((item) => {
              const isActive = location.pathname === item.href || location.pathname.startsWith(item.href + '/');
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    relative py-1.5 text-lg font-normal transition-colors duration-150
                    ${isActive ? 'text-white font-medium' : 'text-blue-100 hover:text-white'}
                  `}
                >
                  <span className="flex items-center space-x-1.5">
                    <span>{item.name}</span>
                    {item.name === 'Booking' && isAuthenticated && itemCount > 0 && (
                      <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] font-black leading-none shadow-sm shadow-red-500/20">
                        {itemCount}
                      </span>
                    )}
                  </span>
                  {/* Underline indicator */}
                  <span
                    className={`absolute -bottom-1.5 left-0 right-0 h-[2.5px] rounded-full bg-white transition-transform duration-200 origin-left
                      ${isActive ? 'scale-x-100' : 'scale-x-0'}
                    `}
                  />
                </Link>
              );
            })}

            {/* Divider line */}
            <span className="h-5 w-px bg-white/20" />

            {/* Support */}
            <Link
              to="/support"
              className="text-white hover:text-blue-100 font-normal text-lg transition-colors duration-150"
            >
              Support
            </Link>

            {/* Feedback / Chat Icon */}
            <Link
              to="/chat"
              className="text-white hover:text-blue-100 transition-colors duration-150 p-1.5 rounded-lg hover:bg-white/10"
              aria-label="AI Chat"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </Link>

            {/* Auth / Admin actions */}
            {isAuthenticated ? (
              <>
                {/* Admin link – only for superadmin/staff */}
                {user?.is_staff && (
                  <Link
                    to="/admin"
                    className="flex items-center space-x-1.5 px-3 py-2 bg-blue-700/50 border border-blue-500/30 text-white rounded-lg font-medium shadow-sm hover:bg-blue-800/30 transition-all duration-200"
                  >
                    <svg className="h-4.5 w-4.5 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Admin</span>
                  </Link>
                )}
                {/* User Info */}
                <div className="relative hidden lg:block">
                  <button
                    type="button"
                    data-profile-trigger
                    aria-label="Open profile menu"
                    onClick={() => setIsProfileMenuOpen((prev) => !prev)}
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-md transition-all duration-200 bg-gradient-to-br from-blue-500 to-purple-600 hover:scale-105"
                  >
                    {getUserInitial(user)}
                  </button>
                  {isProfileMenuOpen && (
                    <div
                      data-profile-menu
                      className="absolute right-0 mt-3 w-80 bg-white border border-gray-200 rounded-lg shadow-[0_15px_50px_rgba(0,0,0,0.1)] overflow-hidden z-50"
                    >
                      {/* Top Gradient Banner with decorative blur nodes */}
                      <div className="h-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 relative">
                        <div className="absolute -right-3 -top-3 w-12 h-12 rounded-full bg-white/10 blur-sm"></div>
                        <div className="absolute left-1/3 bottom-1 w-8 h-8 rounded-full bg-white/10 blur-xs"></div>
                      </div>

                      {/* Overlapping Profile Avatar */}
                      <div className="relative px-5 pt-12 pb-4">
                        <div className="absolute -top-10 left-5 w-16 h-16 rounded-full bg-white p-1 shadow-md">
                          <div className="w-full h-full rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-black text-xl shadow-inner">
                            {getUserInitial(user)}
                          </div>
                        </div>

                        {/* User Primary Header */}
                        <div className="mb-4">
                          <h4 className="text-base font-black text-gray-950 tracking-tight leading-tight">
                            {user?.full_name || user?.username || 'Traveler'}
                          </h4>
                          <p className="text-[11px] text-gray-500 font-semibold tracking-wide truncate mt-0.5">{user?.email}</p>
                        </div>                        {/* Sleek Theme-Border Fields - No Icons */}
                        <div className="space-y-3 pb-4 border-b border-gray-100">
                          {/* Username */}
                          <div className="bg-blue-50/20 border border-blue-200 rounded-lg px-3.5 py-2 relative group/field">
                            <div className="flex items-center justify-between">
                              <p className="text-[9px]  tracking-wider font-extrabold text-blue-600">Username</p>
                              {!isEditingUsername ? (
                                <button
                                  type="button"
                                  onClick={() => {
                                    setTempUsername(user?.username || '');
                                    setIsEditingUsername(true);
                                  }}
                                  className="text-[9px] font-black text-blue-600 hover:text-blue-800 transition-colors  tracking-wider"
                                >
                                  Edit
                                </button>
                              ) : (
                                <div className="flex space-x-1.5">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      if (tempUsername.trim()) {
                                        updateUser({ username: tempUsername.trim() });
                                      }
                                      setIsEditingUsername(false);
                                    }}
                                    className="text-[9px] font-black text-emerald-600 hover:text-emerald-800 transition-colors  tracking-wider"
                                  >
                                    Save
                                  </button>
                                  <span className="text-gray-300 text-[9px] font-bold">|</span>
                                  <button
                                    type="button"
                                    onClick={() => setIsEditingUsername(false)}
                                    className="text-[9px] font-black text-gray-500 hover:text-gray-700 transition-colors  tracking-wider"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              )}
                            </div>
                            {!isEditingUsername ? (
                              <p className="text-xs font-bold text-gray-955 truncate mt-0.5">{user?.username || '-'}</p>
                            ) : (
                              <input
                                type="text"
                                value={tempUsername}
                                onChange={(e) => setTempUsername(e.target.value)}
                                className="w-full text-xs font-bold text-gray-955 bg-white border border-blue-300 rounded px-2 py-1 mt-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                autoFocus
                              />
                            )}
                          </div>

                          {/* Full Name (read-only) */}
                          <div className="bg-blue-50/20 border border-blue-200 rounded-lg px-3.5 py-2">
                            <p className="text-[9px]  tracking-wider font-extrabold text-blue-600">Full Name</p>
                            <p className="text-xs font-bold text-gray-955 truncate mt-0.5">
                              {user?.full_name || user?.username || '-'}
                            </p>
                          </div>

                          {/* Email Address */}
                          <div className="bg-blue-50/20 border border-blue-200 rounded-lg px-3.5 py-2">
                            <p className="text-[9px]  tracking-wider font-extrabold text-blue-600">Email Address</p>
                            <p className="text-xs font-bold text-gray-955 truncate mt-0.5">{user?.email || '-'}</p>
                          </div>
                        </div>

                        {/* Interactive Travel Shortcuts */}
                        <div className="py-2.5">
                          <Link
                            to="/booking/demo"
                            onClick={() => setIsProfileMenuOpen(false)}
                            className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors text-[10px] font-black text-gray-800  tracking-wider"
                          >
                            <span className="flex items-center space-x-2">
                              <span>🎫</span>
                              <span>My Bookings</span>
                            </span>
                            <span className="text-gray-400 text-xs">➔</span>
                          </Link>
                        </div>

                        {/* Premium Logout Button - exactly 8px radius */}
                        <div className="border-t border-gray-100 pt-3.5">
                          <button
                            type="button"
                            onClick={handleLogout}
                            className="w-full py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200/50 font-black rounded-lg text-xs tracking-wider transition-all flex items-center justify-center space-x-2 shadow-sm active:scale-98"
                          >
                            <span>🚪</span>
                            <span>Logout Account</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              /* Sign In Button - Simple Link just like Expedia */
              <Link
                to="/login"
                className="text-white hover:text-blue-100 font-semibold text-[15px] transition-colors duration-150"
              >
                Sign in
              </Link>
            )}
          </div>

          {/* Mobile Actions and Hamburger Button */}
          <div className="flex lg:hidden items-center space-x-3">
            {isAuthenticated && (
              <div className="relative lg:hidden">
                <button
                  type="button"
                  data-profile-trigger
                  aria-label="Open profile menu"
                  onClick={() => setIsProfileMenuOpen((prev) => !prev)}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-md transition-all duration-200 bg-gradient-to-br from-blue-500 to-purple-600"
                >
                  {getUserInitial(user)}
                </button>
                {isProfileMenuOpen && (
                  <div
                    data-profile-menu
                    className="absolute right-0 mt-3 w-72 max-w-[calc(100vw-2rem)] bg-white border border-gray-200 rounded-lg shadow-[0_15px_50px_rgba(0,0,0,0.1)] overflow-hidden z-50"
                  >
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-bold text-gray-900 truncate">{user?.full_name || user?.username}</p>
                      <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                    </div>
                    <div className="p-3 border-b border-gray-100">
                      <p className="text-[9px]  tracking-wider font-extrabold text-blue-600 mb-1">Username</p>
                      {!isEditingUsername ? (
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-xs font-bold text-gray-900 truncate">{user?.username || '-'}</p>
                          <button
                            type="button"
                            onClick={() => {
                              setTempUsername(user?.username || '');
                              setIsEditingUsername(true);
                            }}
                            className="text-[9px] font-black text-blue-600  shrink-0"
                          >
                            Edit
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={tempUsername}
                            onChange={(e) => setTempUsername(e.target.value)}
                            className="w-full text-xs font-bold border border-blue-300 rounded px-2 py-1"
                            autoFocus
                          />
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                if (tempUsername.trim()) {
                                  updateUser({ username: tempUsername.trim() });
                                }
                                setIsEditingUsername(false);
                              }}
                              className="text-[9px] font-black text-emerald-600 "
                            >
                              Save
                            </button>
                            <button
                              type="button"
                              onClick={() => setIsEditingUsername(false)}
                              className="text-[9px] font-black text-gray-500 "
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200/50 font-black rounded-lg text-xs tracking-wider"
                      >
                        Logout Account
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-white hover:text-blue-100 focus:outline-none transition-colors duration-200"
            >
              <div className="relative w-6 h-6">
                <span className={`
                  absolute block w-5 h-0.5 bg-white transform transition-all duration-300 ease-out
                  ${isMenuOpen ? 'rotate-45 top-3' : 'top-1'}
                `}></span>
                <span className={`
                  absolute block w-5 h-0.5 bg-white transform transition-all duration-300 ease-out
                  ${isMenuOpen ? 'opacity-0' : 'opacity-100 top-3'}
                `}></span>
                <span className={`
                  absolute block w-5 h-0.5 bg-white transform transition-all duration-300 ease-out
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
                    {getUserInitial(user)}
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


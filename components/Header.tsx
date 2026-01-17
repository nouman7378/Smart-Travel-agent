/**
 * Header Component - Modern Travel Agency Style
 * Clean design with glass effects and modern aesthetics
 */

import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation items
  const navItems = [
    { name: 'Flights', href: '/flights' },
    { name: 'Hotels', href: '/hotels' },
    { name: 'Cars', href: '/cars' },
    { name: 'Packages', href: '/packages' },
    { name: 'AI Chat', href: '/chat' },
    { name: 'Itinerary', href: '/itinerary/builder' },
    { name: 'Booking', href: '/booking/demo' },
    { name: 'Community', href: '/community' },
  ];

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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Header */}
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link 
              to="/" 
              className="flex items-center group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">T</span>
                </div>
                <div>
                  <span className="text-2xl font-bold text-gray-800">
                    Travel<span className="text-blue-600">Hub</span>
                  </span>
                  <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-1"></div>
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`
                  relative px-4 py-2 rounded-xl
                  transition-all duration-200 ease-out
                  ${location.pathname === item.href || location.pathname.startsWith(item.href + '/')
                    ? 'text-blue-600 bg-blue-50 border border-blue-100 font-semibold' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50 font-medium'
                  }
                `}
              >
                {item.name}
                
                {/* Active indicator */}
                {(location.pathname === item.href || location.pathname.startsWith(item.href + '/')) && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full"></div>
                )}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {/* User Info */}
                <div className="hidden sm:flex items-center space-x-3 px-4 py-2 bg-blue-50 rounded-xl">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {user?.name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <span className="text-sm font-medium text-gray-700 hidden md:block">
                    {user?.name || user?.email?.split('@')[0]}
                  </span>
                </div>
                
                {/* Logout Button */}
                <motion.button
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="hidden sm:flex items-center space-x-2 px-6 py-2.5 bg-white/80 backdrop-blur-md border border-white/20 text-gray-700 rounded-xl font-medium shadow-lg shadow-black/5 hover:bg-white hover:shadow-xl hover:shadow-black/10 transition-all duration-200"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  <span>Logout</span>
                </motion.button>
              </>
            ) : (
              /* Sign In Button with Glass Effect */
              <Link
                to="/login"
                className="hidden sm:flex items-center space-x-2 px-6 py-2.5 bg-white/80 backdrop-blur-md border border-white/20 text-gray-700 rounded-xl font-medium shadow-lg shadow-black/5 hover:bg-white hover:shadow-xl hover:shadow-black/10 transform hover:scale-105 transition-all duration-200"
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
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`
                    p-3 rounded-xl text-sm font-medium text-center
                    transition-all duration-200
                    ${location.pathname === item.href || location.pathname.startsWith(item.href + '/')
                      ? 'text-blue-600 bg-blue-50 border border-blue-100 font-semibold'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50 font-medium'
                    }
                  `}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Mobile Auth Button */}
            {isAuthenticated ? (
              <div className="flex flex-col space-y-2">
                <div className="flex items-center justify-center space-x-2 px-4 py-3 bg-blue-50 rounded-xl">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {user?.name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {user?.name || user?.email?.split('@')[0]}
                  </span>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                    navigate('/');
                  }}
                  className="flex items-center justify-center space-x-2 px-4 py-3 bg-white/80 backdrop-blur-md border border-white/20 text-gray-700 rounded-xl font-medium shadow-lg shadow-black/5 text-center hover:bg-white transition-all duration-200"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-center space-x-2 px-4 py-3 bg-white/80 backdrop-blur-md border border-white/20 text-gray-700 rounded-xl font-medium shadow-lg shadow-black/5 text-center hover:bg-white transition-all duration-200"
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
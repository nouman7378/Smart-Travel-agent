/**
 * Footer Component - Modern Minimal Design
 * 
 * Features:
 * - Clean white background with subtle accents
 * - Minimal color palette with soft gradients
 * - Modern typography and spacing
 * - Smooth micro-interactions
 * - Responsive layout
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('EN');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const footerLinks = {
    About: [
      { name: 'About Us', href: '/about' },
      { name: 'Jobs', href: '/jobs' },
      { name: 'List Your Property', href: '/list-property' },
      { name: 'Partnerships', href: '/partnerships' },
      { name: 'Advertising', href: '/advertising' },
      { name: 'Affiliate Marketing', href: '/affiliate' },
    ],
    Support: [
      { name: 'Support', href: '/support' },
      { name: 'FAQs', href: '/resources/faqs' },
      { name: 'Blog', href: '/resources/blog' },
      { name: 'Deals', href: '/deals' },
    ],
    Policies: [
      { name: 'General Terms and Conditions', href: '/policies/terms' },
      { name: 'One Key™ Terms and Conditions', href: '/policies/onekey-terms' },
      { name: 'Abritel Terms and Conditions', href: '/policies/abritel-terms' },
      { name: 'Accessibility', href: '/policies/accessibility' },
      { name: 'How Our Site Works', href: '/policies/how-site-works' },
      { name: 'Privacy Policy', href: '/policies/privacy' },
      { name: 'Cookie Policy', href: '/policies/cookies' },
    ],
    Travel: [
      { name: 'Flights', href: '/flights' },
      { name: 'Hotels', href: '/hotels' },
      { name: 'Cars', href: '/cars' },
      { name: 'Packages', href: '/packages' },
      { name: 'Deals', href: '/deals' },
      { name: 'Itinerary Builder', href: '/itinerary/builder' },
    ],
    Explore: [
      { name: 'France Travel Guide', href: '/explore/france-travel-guide' },
      { name: 'Hotels in France', href: '/explore/hotels-france' },
      { name: 'Domestic Flights', href: '/explore/domestic-flights' },
      { name: 'Car Hire in France', href: '/explore/car-hire-france' },
      { name: 'All Accommodation Types', href: '/explore/accommodation-types' },
      { name: 'Rewards with One Key', href: '/explore/rewards' },
    ],
  };

  const socialMedia = [
    {
      name: 'Facebook',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      href: '#',
    },
    {
      name: 'Instagram',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
        </svg>
      ),
      href: '#',
    },
    {
      name: 'Twitter',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      ),
      href: '#',
    },
    {
      name: 'YouTube',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
      href: '#',
    },
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter subscription:', { firstName, lastName, email });
    setFirstName('');
    setLastName('');
    setEmail('');
  };

  return (
    <footer className={`bg-white text-gray-700 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 border-b border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
            {/* About Section */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">About</h3>
              <ul className="space-y-3">
                {footerLinks.About.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="group flex items-start text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm leading-relaxed"
                      onMouseEnter={() => setHoveredItem(link.name)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <span className={`w-1.5 h-1.5 bg-blue-500 rounded-full mr-2.5 mt-1.5 transition-all duration-300 flex-shrink-0 ${
                        hoveredItem === link.name ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                      }`}></span>
                      <span className="group-hover:translate-x-1 transition-transform duration-200">{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Section */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">Support</h3>
              <ul className="space-y-3">
                {footerLinks.Support.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="group flex items-start text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm leading-relaxed"
                      onMouseEnter={() => setHoveredItem(link.name)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <span className={`w-1.5 h-1.5 bg-blue-500 rounded-full mr-2.5 mt-1.5 transition-all duration-300 flex-shrink-0 ${
                        hoveredItem === link.name ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                      }`}></span>
                      <span className="group-hover:translate-x-1 transition-transform duration-200">{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Policies Section */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">Policies</h3>
              <ul className="space-y-3">
                {footerLinks.Policies.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="group flex items-start text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm leading-relaxed"
                      onMouseEnter={() => setHoveredItem(link.name)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <span className={`w-1.5 h-1.5 bg-blue-500 rounded-full mr-2.5 mt-1.5 transition-all duration-300 flex-shrink-0 ${
                        hoveredItem === link.name ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                      }`}></span>
                      <span className="group-hover:translate-x-1 transition-transform duration-200">{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Travel Categories Section */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">Travel</h3>
              <ul className="space-y-3">
                {footerLinks.Travel.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="group flex items-start text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm leading-relaxed"
                      onMouseEnter={() => setHoveredItem(link.name)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <span className={`w-1.5 h-1.5 bg-blue-500 rounded-full mr-2.5 mt-1.5 transition-all duration-300 flex-shrink-0 ${
                        hoveredItem === link.name ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                      }`}></span>
                      <span className="group-hover:translate-x-1 transition-transform duration-200">{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Explore Section */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">Explore</h3>
              <ul className="space-y-3">
                {footerLinks.Explore.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="group flex items-start text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm leading-relaxed"
                      onMouseEnter={() => setHoveredItem(link.name)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <span className={`w-1.5 h-1.5 bg-blue-500 rounded-full mr-2.5 mt-1.5 transition-all duration-300 flex-shrink-0 ${
                        hoveredItem === link.name ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                      }`}></span>
                      <span className="group-hover:translate-x-1 transition-transform duration-200">{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Brand & Social Media */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">Connect</h3>
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2 text-base">TravelHub</h4>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  Your trusted partner for amazing travel experiences.
                </p>
              </div>
              <div className="flex space-x-3">
                {socialMedia.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="group p-2.5 rounded-lg bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:scale-110 hover:shadow-md"
                    aria-label={social.name}
                  >
                    <div className="text-gray-500 group-hover:text-blue-600 transition-colors duration-300">
                      {social.icon}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-gray-200 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="lg:col-span-2">
              <h3 className="font-semibold text-gray-900 mb-2 text-base sm:text-lg">WANT MORE UPDATES?</h3>
              <p className="text-gray-600 text-sm mb-4">
                Subscribe to our newsletter to get updates about new tours, travel tips, top destinations and more!
              </p>
            </div>
            <div>
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    required
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 sm:px-6 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-medium text-sm whitespace-nowrap"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 py-6 sm:py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            {/* Copyright & Links */}
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-xs sm:text-sm text-gray-500 text-center sm:text-left">
              <div>
                © 2024 TravelHub. All Rights Reserved.
              </div>
            </div>

            {/* Language & Currency */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <select 
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="bg-white border border-gray-300 rounded-lg px-2 sm:px-3 py-1.5 sm:py-1 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="EN">English</option>
                <option value="UR">Urdu</option>
                <option value="FR">French</option>
                <option value="DE">German</option>
              </select>
              
              <select 
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)}
                className="bg-white border border-gray-300 rounded-lg px-2 sm:px-3 py-1.5 sm:py-1 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="USD">USD</option>
                <option value="PKR">PKR</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


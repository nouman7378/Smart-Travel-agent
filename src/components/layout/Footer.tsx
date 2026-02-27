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
    Company: [
      { name: 'About', href: '/about' },
      { name: 'Jobs', href: '/jobs' },
      { name: 'List your property', href: '/list-property' },
      { name: 'Partnerships', href: '/partnerships' },
      { name: 'Advertising', href: '/advertising' },
      { name: 'Affiliate Marketing', href: '/affiliate' },
    ],
    Explore: [
      { name: 'France travel guide', href: '/explore/france-travel-guide' },
      { name: 'Hotels in France', href: '/explore/hotels-france' },
      { name: 'Holiday rentals in France', href: '/explore/holiday-rentals-france' },
      { name: 'Holiday packages in France', href: '/explore/holiday-packages-france' },
      { name: 'Domestic flights', href: '/explore/domestic-flights' },
      { name: 'Car hire in France', href: '/explore/car-hire-france' },
      { name: 'All accommodation types', href: '/explore/accommodation-types' },
      { name: 'Rewards with One Key', href: '/explore/rewards' },
    ],
    Policies: [
      { name: 'General terms and conditions (excluding Abritel bookings)', href: '/policies/terms' },
      { name: 'One Key™ terms and conditions', href: '/policies/onekey-terms' },
      { name: 'Abritel terms and conditions', href: '/policies/abritel-terms' },
      { name: 'Accessibility', href: '/policies/accessibility' },
      { name: 'How our site works', href: '/policies/how-site-works' },
      { name: 'Privacy', href: '/policies/privacy' },
      { name: 'Cookies', href: '/policies/cookies' },
      { name: 'Terms of use', href: '/policies/terms-of-use' },
      { name: 'Legal information / Contact us', href: '/policies/legal' },
      { name: 'Content guidelines and reporting content', href: '/policies/content-guidelines' },
    ],
    Help: [
      { name: 'Support', href: '/support' },
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
        {/* Expedia Group Logo */}
        <div className="py-8 border-b border-gray-200">
          <div className="text-2xl font-bold text-indigo-900">
            TravelHub Group™
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            {/* Company Section */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4 text-base">Company</h3>
              <ul className="space-y-3">
                {footerLinks.Company.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-blue-600 hover:text-blue-800 transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Explore Section */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4 text-base">Explore</h3>
              <ul className="space-y-3">
                {footerLinks.Explore.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-blue-600 hover:text-blue-800 transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Policies Section */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4 text-base">Policies</h3>
              <ul className="space-y-3">
                {footerLinks.Policies.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-blue-600 hover:text-blue-800 transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Help Section */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4 text-base">Help</h3>
              <ul className="space-y-3">
                {footerLinks.Help.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-blue-600 hover:text-blue-800 transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section - Copyright */}
        <div className="border-t border-gray-200 py-6">
          <div className="text-sm text-gray-600">
            © 2024 TravelHub. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


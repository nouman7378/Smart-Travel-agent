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
import logo from '../../assets/logo.png';

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
    <footer className={`bg-black text-gray-300 border-t border-gray-800 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo & Slogan */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <img src={logo} alt="TravelHub Logo" className="h-12 w-auto brightness-0 invert" />
            <p className="text-gray-400 text-sm font-medium">Your trusted partner for amazing travel experiences.</p>
            
            {/* Social Icons - Minimal */}
            <div className="flex space-x-4 pt-2">
              {socialMedia.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-gray-500 hover:text-white transition-colors duration-200"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Minimal Newsletter */}
          <div className="w-full max-w-md">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3 text-center md:text-left">Stay Updated</h3>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm text-white"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-bold text-sm"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="mt-12 pt-8 border-t border-gray-900 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs">© 2024 TravelHub. All Rights Reserved.</p>
          
          <div className="flex items-center space-x-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
              <Link 
                key={item} 
                to={`/policies/${item.toLowerCase().replace(/ /g, '-')}`} 
                className="text-gray-500 hover:text-white text-xs font-medium transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


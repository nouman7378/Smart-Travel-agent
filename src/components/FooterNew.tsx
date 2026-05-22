/**
 * FooterNew Component
 * 
 * Responsive footer component with company info, booking links, travel resources,
 * newsletter subscription, and social media icons.
 * This component is part of the Expedia.fr Footer Pages replication for our FYP.
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface FooterNewProps {
  className?: string;
}

const FooterNew: React.FC<FooterNewProps> = ({ className = '' }) => {
  const [newsletterData, setNewsletterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter subscription:', newsletterData);
    alert('Thank you for subscribing!');
    setNewsletterData({ firstName: '', lastName: '', email: '' });
  };

  return (
    <footer className={`bg-gray-900 text-gray-300 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12 mb-12">
          {/* Company Description Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <span className="text-2xl md:text-3xl font-bold text-white">
                Travel<span className="text-purple-500">Hub</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
              Your trusted partner for amazing travel experiences in Pakistan and around the world.
              We specialize in creating unforgettable journeys that connect you with the beauty and
              culture of Pakistan.
            </p>
            <p className="text-xs text-gray-500">
              Government License: PK-TRAVEL-2024-001234
            </p>
          </div>

          {/* Booking Section */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Booking</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/booking/find-tour"
                  className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                >
                  Find a Tour
                </Link>
              </li>
              <li>
                <Link
                  to="/booking/customize-tour"
                  className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                >
                  Customize a Tour
                </Link>
              </li>
              <li>
                <Link
                  to="/booking/destinations"
                  className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                >
                  Destinations
                </Link>
              </li>
              <li>
                <Link
                  to="/booking/cancellation"
                  className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                >
                  Booking & Cancellation
                </Link>
              </li>
              <li>
                <Link
                  to="/booking/submit-payment"
                  className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                >
                  Submit Payment
                </Link>
              </li>
              <li>
                <Link
                  to="/booking/waiver-policy"
                  className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                >
                  Waiver Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/booking/insurance-policy"
                  className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                >
                  Insurance Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Travel Resources Section */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Travel Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/resources/traveling-pakistan"
                  className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                >
                  Traveling in Pakistan
                </Link>
              </li>
              <li>
                <Link
                  to="/resources/pakistan-visa"
                  className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                >
                  Pakistan Tourist Visa
                </Link>
              </li>
              <li>
                <Link
                  to="/resources/tourism-infrastructure"
                  className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                >
                  Tourism Infrastructure
                </Link>
              </li>
              <li>
                <Link
                  to="/resources/responsible-tourism"
                  className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                >
                  Responsible Tourism
                </Link>
              </li>
              <li>
                <Link
                  to="/resources/travel-guide"
                  className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                >
                  Travel Guide Resources
                </Link>
              </li>
              <li>
                <Link
                  to="/resources/what-to-pack"
                  className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                >
                  What to Pack
                </Link>
              </li>
              <li>
                <Link
                  to="/resources/faqs"
                  className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  to="/resources/blog"
                  className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                >
                  Blog
                </Link>
              </li>
            </ul>
            {/* Pakistan-specific quick links */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-white mb-3">Explore Pakistan</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/resources/pakistan-travel-guide"
                    className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                  >
                    Pakistan Travel Guide
                  </Link>
                </li>
                <li>
                  <Link
                    to="/hotels?country=pakistan"
                    className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                  >
                    Hotels in Pakistan
                  </Link>
                </li>
                <li>
                  <Link
                    to="/flights?country=pakistan"
                    className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                  >
                    Domestic Flights
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cars?country=pakistan"
                    className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                  >
                    Car Hire in Pakistan
                  </Link>
                </li>
                <li>
                  <Link
                    to="/accommodation?country=pakistan"
                    className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                  >
                    All Accommodation Types
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Company Section */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/company/about"
                  className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/company/contact"
                  className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/company/reviews"
                  className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                >
                  Customer Reviews
                </Link>
              </li>
              <li>
                <Link
                  to="/company/portfolio"
                  className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                >
                  Business Portfolio
                </Link>
              </li>
              <li>
                <Link
                  to="/company/jobs"
                  className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                >
                  Jobs
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-white font-semibold text-lg mb-4 text-center">
              Subscribe to Our Newsletter
            </h3>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="First Name"
                value={newsletterData.firstName}
                onChange={(e) =>
                  setNewsletterData({ ...newsletterData, firstName: e.target.value })
                }
                required
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={newsletterData.lastName}
                onChange={(e) =>
                  setNewsletterData({ ...newsletterData, lastName: e.target.value })
                }
                required
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <input
                type="email"
                placeholder="Email"
                value={newsletterData.email}
                onChange={(e) =>
                  setNewsletterData({ ...newsletterData, email: e.target.value })
                }
                required
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#6B46C1] hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="flex justify-center space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center bg-gray-800 hover:bg-[#6B46C1] rounded-full transition-colors"
              aria-label="Facebook"
            >
              <svg className="h-5 w-5 text-gray-400 hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center bg-gray-800 hover:bg-[#6B46C1] rounded-full transition-colors"
              aria-label="Instagram"
            >
              <svg className="h-5 w-5 text-gray-400 hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center bg-gray-800 hover:bg-[#6B46C1] rounded-full transition-colors"
              aria-label="Twitter"
            >
              <svg className="h-5 w-5 text-gray-400 hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center bg-gray-800 hover:bg-[#6B46C1] rounded-full transition-colors"
              aria-label="YouTube"
            >
              <svg className="h-5 w-5 text-gray-400 hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
            <a
              href="https://tripadvisor.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center bg-gray-800 hover:bg-[#6B46C1] rounded-full transition-colors"
              aria-label="TripAdvisor"
            >
              <svg className="h-5 w-5 text-gray-400 hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                <path d="M12 6c-3.314 0-6 2.686-6 6s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6zm0 10c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 pt-8">
          <p className="text-center text-sm text-gray-400">
            © {new Date().getFullYear()} TravelHub. All rights reserved. | Government License:
            PK-TRAVEL-2024-001234
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterNew;


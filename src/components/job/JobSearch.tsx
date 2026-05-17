/**
 * JobSearch Component
 * 
 * Job search bar with location dropdown (Expedia-style)
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const JobSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');

  const locations = [
    'All Locations',
    'Paris, France',
    'London, UK',
    'New York, USA',
    'Singapore',
    'Tokyo, Japan',
    'Berlin, Germany',
    'Remote',
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', { searchQuery, location });
    // In a real app, this would trigger a job search
  };

  return (
    <section className="py-12 bg-white -mt-16 relative z-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-white rounded-lg shadow-xl p-6 md:p-8">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
              {/* Search Input */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Jobs
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Job title, keywords, or skills"
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  />
                </div>
              </div>

              {/* Location Dropdown */}
              <div className="md:w-64">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                >
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              {/* Search Button */}
              <div className="flex items-end">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full md:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 whitespace-nowrap"
                >
                  Search Jobs
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default JobSearch;


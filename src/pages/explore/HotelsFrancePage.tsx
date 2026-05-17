/**
 * HotelsFrancePage Component
 * 
 * This page is part of the Expedia.fr Footer Pages replication for our FYP.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageLayout from '../../components/PageLayout';

const HotelsFrancePage: React.FC = () => {
  const cities = [
    { name: 'Paris', count: 2500, image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80' },
    { name: 'Nice', count: 450, image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80' },
    { name: 'Lyon', count: 320, image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80' },
    { name: 'Marseille', count: 380, image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80' },
    { name: 'Bordeaux', count: 280, image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80' },
    { name: 'Strasbourg', count: 190, image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80' },
  ];

  return (
    <PageLayout skipHeaderFooter={true}>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Hotels in France</h1>
            <p className="text-xl md:text-2xl text-blue-100">
              Discover thousands of hotels across France. From luxury Parisian hotels to charming countryside inns.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cities.map((city, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Link
                  to={`/search/hotels?destination=${city.name}`}
                  className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all"
                >
                  <img src={city.image} alt={city.name} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{city.name}</h3>
                    <p className="text-gray-600">{city.count.toLocaleString()} hotels available</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default HotelsFrancePage;


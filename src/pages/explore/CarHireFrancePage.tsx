/**
 * CarHireFrancePage Component
 * 
 * This page is part of the Expedia.fr Footer Pages replication for our FYP.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageLayout from '../../components/PageLayout';

const CarHireFrancePage: React.FC = () => {
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Car Hire in France</h1>
            <p className="text-xl md:text-2xl text-blue-100">
              Explore France at your own pace. Rent a car from major cities and airports.
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

          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Pickup Locations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {['Paris CDG', 'Paris Orly', 'Nice Airport', 'Lyon Airport'].map((location, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 border border-gray-200 rounded-lg hover:border-blue-600 hover:shadow-md transition-all"
                >
                  <div className="font-semibold text-gray-900">{location}</div>
                </motion.div>
              ))}
            </div>
            <Link
              to="/cars"
              className="inline-block mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              Search Car Rentals
            </Link>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default CarHireFrancePage;


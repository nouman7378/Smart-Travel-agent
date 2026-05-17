/**
 * AdvertisingPage Component
 * 
 * This page is part of the Expedia.fr Footer Pages replication for our FYP.
 */

import React from 'react';
import { motion } from 'framer-motion';
import PageLayout from '../components/PageLayout';

const AdvertisingPage: React.FC = () => {
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Advertising</h1>
            <p className="text-xl md:text-2xl text-blue-100">
              Reach millions of travelers and grow your brand with TravelHub advertising solutions.
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

          <div className="bg-white p-8 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Advertise with TravelHub?</h2>
            <p className="text-gray-700 mb-6">
              TravelHub reaches millions of travelers every month, making it the perfect platform to
              showcase your brand, products, or services to a highly engaged travel audience.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">50M+</div>
                <div className="text-gray-600">Monthly Visitors</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">150+</div>
                <div className="text-gray-600">Countries</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">95%</div>
                <div className="text-gray-600">Engagement Rate</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Display Advertising</h3>
              <p className="text-gray-700 mb-4">
                Reach travelers with banner ads, native advertising, and sponsored content across
                our platform.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Sponsored Listings</h3>
              <p className="text-gray-700 mb-4">
                Get premium placement for your properties, services, or destinations in search
                results.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default AdvertisingPage;


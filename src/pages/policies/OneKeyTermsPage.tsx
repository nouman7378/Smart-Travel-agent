/**
 * OneKeyTermsPage Component
 * 
 * This page is part of the Expedia.fr Footer Pages replication for our FYP.
 */

import React from 'react';
import { motion } from 'framer-motion';
import PageLayout from '../../components/PageLayout';

const OneKeyTermsPage: React.FC = () => {
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">One Key™ Terms and Conditions</h1>
            <p className="text-xl md:text-2xl text-blue-100">Last updated: December 2024</p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >

          <div className="bg-white p-8 rounded-lg shadow-md space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Program Overview</h2>
              <p className="text-gray-700 leading-relaxed">
                One Key is a unified rewards program that allows members to earn and redeem points
                across flights, hotels, car rentals, and activities booked through TravelHub.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Earning Points</h2>
              <p className="text-gray-700 leading-relaxed">
                Members earn points on eligible bookings. Points are typically credited to your
                account within 24-48 hours after travel completion. Points earning rates may vary by
                booking type and provider.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Redeeming Points</h2>
              <p className="text-gray-700 leading-relaxed">
                Points can be redeemed for discounts on future bookings. Minimum redemption amounts
                and redemption rates apply. Points have no cash value and cannot be transferred or
                sold.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default OneKeyTermsPage;


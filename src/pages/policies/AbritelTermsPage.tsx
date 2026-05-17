/**
 * AbritelTermsPage Component
 * 
 * This page is part of the Expedia.fr Footer Pages replication for our FYP.
 */

import React from 'react';
import { motion } from 'framer-motion';
import PageLayout from '../../components/PageLayout';

const AbritelTermsPage: React.FC = () => {
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
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Abritel Terms and Conditions</h1>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Abritel Bookings</h2>
              <p className="text-gray-700 leading-relaxed">
                These terms apply specifically to holiday rental bookings made through the Abritel
                platform. Abritel is a vacation rental marketplace connecting travelers with
                property owners.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Property Listings</h2>
              <p className="text-gray-700 leading-relaxed">
                Property listings are provided by individual property owners. TravelHub acts as a
                platform facilitator and is not responsible for the accuracy of property
                descriptions or the condition of properties.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Booking Process</h2>
              <p className="text-gray-700 leading-relaxed">
                Bookings are subject to property owner approval. Payment is processed upon booking
                confirmation. Cancellation policies are set by individual property owners and may
                vary.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default AbritelTermsPage;


/**
 * HolidayRentalsFrancePage Component
 * 
 * This page is part of the Expedia.fr Footer Pages replication for our FYP.
 */

import React from 'react';
import { motion } from 'framer-motion';
import PageLayout from '../../components/PageLayout';
import { Home, Umbrella } from 'lucide-react';


const HolidayRentalsFrancePage: React.FC = () => {
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
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Holiday Rentals in France</h1>
            <p className="text-xl md:text-2xl text-blue-100">
              Find the perfect holiday rental for your French getaway. Apartments, villas, and unique properties across France.
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
            <p className="text-gray-700 mb-6">
              Explore our wide selection of holiday rentals in France, from cozy Parisian
              apartments to luxurious villas on the French Riviera.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="text-3xl mb-2"><Home className="inline w-5 h-5" /></div>
                <h3 className="font-semibold text-gray-900 mb-2">Apartments</h3>
                <p className="text-gray-600 text-sm">City center locations</p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="text-3xl mb-2"><Umbrella className="inline w-5 h-5" /></div>
                <h3 className="font-semibold text-gray-900 mb-2">Villas</h3>
                <p className="text-gray-600 text-sm">Luxury coastal properties</p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="text-3xl mb-2"><Home className="inline w-5 h-5" /></div>
                <h3 className="font-semibold text-gray-900 mb-2">Countryside</h3>
                <p className="text-gray-600 text-sm">Charming rural retreats</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default HolidayRentalsFrancePage;


/**
 * DomesticFlightsPage Component
 * 
 * This page is part of the Expedia.fr Footer Pages replication for our FYP.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageLayout from '../../components/PageLayout';

const DomesticFlightsPage: React.FC = () => {
  const routes = [
    { from: 'Paris', to: 'Nice', duration: '1h 30m', price: 89 },
    { from: 'Paris', to: 'Lyon', duration: '1h 10m', price: 75 },
    { from: 'Paris', to: 'Marseille', duration: '1h 25m', price: 82 },
    { from: 'Paris', to: 'Bordeaux', duration: '1h 15m', price: 78 },
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Domestic Flights in France</h1>
            <p className="text-xl md:text-2xl text-blue-100">
              Fast and convenient domestic flights connecting major French cities.
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {routes.map((route, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-xl font-bold text-gray-900">{route.from}</div>
                    <div className="text-gray-600">→ {route.to}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">€{route.price}</div>
                    <div className="text-sm text-gray-600">{route.duration}</div>
                  </div>
                </div>
                <Link
                  to="/search/flights"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Search flights →
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default DomesticFlightsPage;


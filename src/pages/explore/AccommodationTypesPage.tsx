/**
 * AccommodationTypesPage Component
 * 
 * This page is part of the Expedia.fr Footer Pages replication for our FYP.
 */

import React from 'react';
import { motion } from 'framer-motion';
import PageLayout from '../../components/PageLayout';
import { Bed, Building, Home, Umbrella, Utensils } from 'lucide-react';


const AccommodationTypesPage: React.FC = () => {
  const types = [
    { name: 'Hotels', icon: <Building className="w-5 h-5" />, description: 'Comfortable hotels for every budget' },
    { name: 'Resorts', icon: <Umbrella className="w-5 h-5" />, description: 'All-inclusive luxury resorts' },
    { name: 'Apartments', icon: <Home className="w-5 h-5" />, description: 'Self-catering apartments' },
    { name: 'Villas', icon: <Home className="w-5 h-5" />, description: 'Private villas and holiday homes' },
    { name: 'Hostels', icon: <Bed className="w-5 h-5" />, description: 'Budget-friendly hostels' },
    { name: 'B&Bs', icon: <Utensils className="w-5 h-5" />, description: 'Charming bed and breakfasts' },
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">All Accommodation Types</h1>
            <p className="text-xl md:text-2xl text-blue-100">
              Find the perfect accommodation type for your travel style and budget.
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
            {types.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all text-center"
              >
                <div className="text-5xl mb-4">{type.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{type.name}</h3>
                <p className="text-gray-600">{type.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default AccommodationTypesPage;


/**
 * BrandsSection Component
 * 
 * Our Brands grid section (Expedia-style)
 */

import React from 'react';
import { motion } from 'framer-motion';
import EmojiIcon from '../common/EmojiIcon';

const BrandsSection: React.FC = () => {
  const brands = [
    {
      name: 'TravelHub Flights',
      description: 'Your gateway to the world with flights to over 150 countries',
      icon: '✈️',
      color: 'from-blue-500 to-blue-600',
    },
    {
      name: 'TravelHub Hotels',
      description: 'Discover amazing stays from budget-friendly to luxury resorts',
      icon: '🏨',
      color: 'from-purple-500 to-purple-600',
    },
    {
      name: 'TravelHub Cars',
      description: 'Rent a car and explore destinations at your own pace',
      icon: '🚗',
      color: 'from-indigo-500 to-indigo-600',
    },
    {
      name: 'TravelHub Packages',
      description: 'Complete vacation packages with flights, hotels, and activities',
      icon: '🎒',
      color: 'from-pink-500 to-pink-600',
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Brands</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our family of travel brands designed to meet all your travel needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
          {brands.map((brand, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-white p-6 md:p-8 rounded-2xl shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${brand.color} rounded-xl flex items-center justify-center text-white mb-6`}>
                <EmojiIcon icon={brand.icon} className="h-8 w-8" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">{brand.name}</h3>
              <p className="text-gray-600 leading-relaxed">{brand.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;


/**
 * HotelsPage Component
 * 
 * Dedicated page for hotel searches and results
 * Part of the TravelHub application
 */

import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import EmojiIcon from '../components/common/EmojiIcon';
import Stats from '../components/common/Stats';
import PopularDestinations from '../components/PopularDestinations';
import TravelCategories from '../components/TravelCategories';
import FeaturedHotels from '../components/FeaturedHotels';
import { Banknote, Building, Star } from 'lucide-react';


const HotelsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Hotel Search */}
      <Hero className="!min-h-fit pt-30 pb-20" hideTag smallTitle hideStats />
      
      {/* Standalone Stats Section */}
      <Stats />

      {/* Popular Destinations Section */}
      <PopularDestinations />

      {/* Travel Categories Section */}
      <TravelCategories />

      {/* Featured Hotels Section */}
      <FeaturedHotels />
      
      {/* Additional Hotel Content */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-6xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              Discover Amazing Hotels
            </h2>
            <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12">
              Browse through thousands of hotels worldwide and find the perfect accommodation for your stay.
            </p>
            
            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {[
                {
                  icon: <Building className="w-5 h-5" />,
                  title: 'Wide Selection',
                  description: 'Choose from luxury resorts, budget hotels, and everything in between',
                },
                {
                  icon: <Banknote className="w-5 h-5" />,
                  title: 'Best Rates',
                  description: 'Get exclusive deals and discounts on hotel bookings',
                },
                {
                  icon: <Star className="w-5 h-5" />,
                  title: 'Verified Reviews',
                  description: 'Read authentic reviews from verified guests to make informed decisions',
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="mb-4 text-blue-600">
                    <EmojiIcon icon={feature.icon} className="h-9 w-9" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HotelsPage;


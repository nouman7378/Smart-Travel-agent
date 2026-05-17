/**
 * Locations Component
 * 
 * Global offices/locations grid (Expedia-style)
 */

import React from 'react';
import { motion } from 'framer-motion';

const Locations: React.FC = () => {
  const locations = [
    {
      city: 'Paris',
      country: 'France',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80',
      jobs: 45,
    },
    {
      city: 'London',
      country: 'United Kingdom',
      image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80',
      jobs: 38,
    },
    {
      city: 'New York',
      country: 'United States',
      image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&q=80',
      jobs: 52,
    },
    {
      city: 'Singapore',
      country: 'Singapore',
      image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&q=80',
      jobs: 28,
    },
    {
      city: 'Tokyo',
      country: 'Japan',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80',
      jobs: 32,
    },
    {
      city: 'Berlin',
      country: 'Germany',
      image: 'https://images.unsplash.com/photo-1587330979470-3585ac3d0b5e?w=600&q=80',
      jobs: 25,
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Global Offices</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join us at one of our offices around the world
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
          {locations.map((location, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-white rounded-lg shadow-md hover:shadow-xl overflow-hidden transition-all duration-300 group cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={location.image}
                  alt={`${location.city}, ${location.country}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white text-xl md:text-2xl font-bold mb-1">{location.city}</h3>
                  <p className="text-white/90 text-sm">{location.country}</p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-sm">Open positions</span>
                  <span className="text-blue-600 font-bold text-lg">{location.jobs}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Locations;


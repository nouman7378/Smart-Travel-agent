/**
 * AboutHero Component
 * 
 * Hero section for About page (Expedia-style structure)
 */

import React from 'react';
import { motion } from 'framer-motion';

const AboutHero: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 text-white py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            About TravelHub
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 leading-relaxed max-w-3xl mx-auto">
            We power global travel for everyone, everywhere. Our mission is to make travel accessible, 
            enjoyable, and memorable for millions of travelers around the world.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutHero;


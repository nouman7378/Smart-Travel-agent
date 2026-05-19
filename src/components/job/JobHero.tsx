/**
 * JobHero Component
 * 
 * Hero section for Careers page with background image (Expedia-style)
 */

import React from 'react';
import { motion } from 'framer-motion';

const JobHero: React.FC = () => {
  return (
    <div className="relative min-h-[500px] md:min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1920&q=80)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 via-purple-600/85 to-indigo-800/90"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center text-white"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Build your future with us
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 leading-relaxed max-w-3xl mx-auto mb-8">
            Join a team that's shaping the future of travel. Explore opportunities to grow your career
            and make an impact on millions of travelers worldwide.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default JobHero;


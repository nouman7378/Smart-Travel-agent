/**
 * PageHero Component - Reusable Hero Section for Pages
 * 
 * This component provides a consistent hero section for all footer pages.
 */

import React from 'react';
import { motion } from 'framer-motion';

interface PageHeroProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

const PageHero: React.FC<PageHeroProps> = ({ title, subtitle, icon }) => {
  return (
    <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 text-white py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6">
            {icon}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{title}</h1>
          <p className="text-xl md:text-2xl text-blue-100">{subtitle}</p>
        </motion.div>
      </div>
    </div>
  );
};

export default PageHero;


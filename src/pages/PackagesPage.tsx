import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';

const PackagesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ y: [0, -30, 0], x: [0, 20, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ y: [0, 40, 0], x: [0, -30, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-40 right-20 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ y: [0, -50, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-40 left-1/4 w-80 h-80 bg-pink-400/20 rounded-full blur-3xl"
        />
      </div>

      {/* Hero Section with Packages Search */}
      <Hero className="min-h-[80vh] relative z-10" />
    </div>
  );
};

export default PackagesPage;
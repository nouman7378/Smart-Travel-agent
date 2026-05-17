/**
 * MissionVision Component
 * 
 * Mission and Vision 2-column layout (Expedia-style)
 */

import React from 'react';
import { motion } from 'framer-motion';

const MissionVision: React.FC = () => {
  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 md:p-10 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-center mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Our Mission</h2>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              To make travel accessible, enjoyable, and memorable for everyone. We believe that 
              travel has the power to transform lives and bring people together. Our mission is 
              to empower travelers with the tools, information, and services they need to explore 
              the world with confidence.
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 md:p-10 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-center mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Our Vision</h2>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              To become the world's most trusted travel platform, connecting travelers with 
              exceptional experiences and destinations. We envision a future where travel planning 
              is seamless, personalized, and accessible to everyone, regardless of their background 
              or budget.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;


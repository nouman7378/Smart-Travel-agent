/**
 * CommitmentSection Component
 * 
 * Our Commitment section (Expedia-style)
 */

import React from 'react';
import { motion } from 'framer-motion';

const CommitmentSection: React.FC = () => {
  const commitments = [
    {
      title: 'Sustainable Travel',
      description: 'We are committed to promoting sustainable and responsible travel practices that protect our planet for future generations.',
    },
    {
      title: 'Accessibility',
      description: 'We work to make travel accessible to everyone, regardless of physical abilities, financial constraints, or background.',
    },
    {
      title: 'Local Communities',
      description: 'We support local communities and economies by partnering with local businesses and promoting authentic travel experiences.',
    },
    {
      title: 'Data Privacy',
      description: 'We protect your personal information and are transparent about how we use your data to improve your travel experience.',
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Commitment</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We are dedicated to making a positive impact on travelers, communities, and the world
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {commitments.map((commitment, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 md:p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">{commitment.title}</h3>
                <p className="text-gray-600 leading-relaxed">{commitment.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CommitmentSection;


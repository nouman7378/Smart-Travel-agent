/**
 * LifeAt Component
 * 
 * Life at TravelHub section with image cards (Expedia-style)
 */

import React from 'react';
import { motion } from 'framer-motion';

const LifeAt: React.FC = () => {
  const lifeAtItems = [
    {
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80',
      title: 'Collaborative Culture',
      description: 'Work with talented people from around the world',
    },
    {
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80',
      title: 'Modern Workspaces',
      description: 'Beautiful offices designed for productivity and creativity',
    },
    {
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&q=80',
      title: 'Team Events',
      description: 'Regular team building and social activities',
    },
    {
      image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=600&q=80',
      title: 'Work-Life Balance',
      description: 'Flexible schedules and remote work options',
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Life at TravelHub</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience what it's like to be part of our team
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
          {lifeAtItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-white rounded-lg shadow-md hover:shadow-xl overflow-hidden transition-all duration-300 group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LifeAt;


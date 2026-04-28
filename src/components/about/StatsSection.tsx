/**
 * StatsSection Component
 * 
 * Statistics section (Expedia-style layout)
 */

import React from 'react';
import { motion } from 'framer-motion';
import EmojiIcon from '../common/EmojiIcon';
import { Building, Globe, MessageCircle, Plane, Star, Users } from 'lucide-react';


const StatsSection: React.FC = () => {
  const stats = [
    { number: '10M+', label: 'Happy Travelers', icon: <Users className="w-5 h-5" /> },
    { number: '500K+', label: 'Hotels Worldwide', icon: <Building className="w-5 h-5" /> },
    { number: '150+', label: 'Countries', icon: <Globe className="w-5 h-5" /> },
    { number: '24/7', label: 'Customer Support', icon: <MessageCircle className="w-5 h-5" /> },
    { number: '50K+', label: 'Destinations', icon: <Plane className="w-5 h-5" /> },
    { number: '99%', label: 'Satisfaction Rate', icon: <Star className="w-5 h-5" /> },
  ];

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">TravelHub by the Numbers</h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Our impact in numbers
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8 max-w-7xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
              className="text-center"
            >
              <div className="flex justify-center mb-3 text-blue-100">
                <EmojiIcon icon={stat.icon} className="h-10 w-10 md:h-12 md:w-12" />
              </div>
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">{stat.number}</div>
              <div className="text-sm md:text-base text-blue-100">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;


import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const stats = [
  { number: '50K+', label: 'Happy Travelers' },
  { number: '100+', label: 'Destinations' },
  { number: '24/7', label: 'AI Support' },
  { 
    number: (
      <span className="flex items-center justify-center gap-1">
        5 <Star className="w-5 h-5 md:w-6 md:h-6 fill-current" />
      </span>
    ), 
    label: 'Rated Service' 
  }
];

const Stats: React.FC = () => {
  return (
    <section className="py-12 bg-white border-y border-gray-100 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center group"
            >
              <motion.div 
                className="text-3xl md:text-5xl font-extrabold text-blue-600 mb-3"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {stat.number}
              </motion.div>
              <div className="text-gray-500 font-bold tracking-widest uppercase text-[10px] md:text-xs opacity-80 group-hover:opacity-100 transition-opacity">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;

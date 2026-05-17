/**
 * Partners Component
 * 
 * Partner network logos section (Expedia-style)
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Building, Globe, Home, Plane } from 'lucide-react';


const Partners: React.FC = () => {
  const partners = [
    { name: 'Booking.com', logo: <Building className="w-5 h-5" /> },
    { name: 'Airbnb', logo: <Home className="w-5 h-5" /> },
    { name: 'Hotels.com', logo: <Bell className="w-5 h-5" /> },
    { name: 'Vrbo', logo: <Home className="w-5 h-5" /> },
    { name: 'Agoda', logo: <Globe className="w-5 h-5" /> },
    { name: 'Expedia', logo: <Plane className="w-5 h-5" /> },
  ];

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Trusted by Industry Leaders</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join a network of trusted partners and industry-leading platforms
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                className="bg-gray-50 p-6 md:p-8 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center min-h-[120px]"
              >
                <div className="text-4xl md:text-5xl mb-3">{partner.logo}</div>
                <p className="text-sm md:text-base font-semibold text-gray-700 text-center">{partner.name}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Partners;


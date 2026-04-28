/**
 * PropertyTypes Component
 * 
 * Property type grid (Expedia-style)
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Building, Castle, Home, Umbrella } from 'lucide-react';


const PropertyTypes: React.FC = () => {
  const propertyTypes = [
    {
      icon: <Building className="w-5 h-5" />,
      title: 'Hotels',
      description: 'Full-service hotels and boutique properties',
      count: '50K+',
    },
    {
      icon: <Home className="w-5 h-5" />,
      title: 'Villas',
      description: 'Luxury villas and private vacation homes',
      count: '25K+',
    },
    {
      icon: <Home className="w-5 h-5" />,
      title: 'Apartments',
      description: 'Serviced apartments and condos',
      count: '100K+',
    },
    {
      icon: <Umbrella className="w-5 h-5" />,
      title: 'Resorts',
      description: 'All-inclusive resorts and beach properties',
      count: '15K+',
    },
    {
      icon: <Building className="w-5 h-5" />,
      title: 'Holiday Rentals',
      description: 'Holiday homes and vacation rentals',
      count: '200K+',
    },
    {
      icon: <Castle className="w-5 h-5" />,
      title: 'Boutique Hotels',
      description: 'Unique boutique and design hotels',
      count: '10K+',
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            List Any Type of Property
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From hotels to holiday rentals, we welcome all types of properties
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
          {propertyTypes.map((type, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-white p-6 md:p-8 rounded-2xl shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300 cursor-pointer group"
            >
              <div className="text-5xl mb-4">{type.icon}</div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">{type.title}</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">{type.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-blue-600 font-semibold">{type.count} properties</span>
                <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertyTypes;


/**
 * RevenueGrowth Component
 * 
 * Revenue & business growth section (Expedia-style)
 */

import React from 'react';
import { motion } from 'framer-motion';

const RevenueGrowth: React.FC = () => {
  const stats = [
    {
      number: '30%',
      label: 'Average Revenue Increase',
      description: 'Property owners see an average 30% increase in bookings',
    },
    {
      number: '2M+',
      label: 'Monthly Visitors',
      description: 'Reach millions of travelers actively searching for properties',
    },
    {
      number: '95%',
      label: 'Occupancy Rate',
      description: 'Average occupancy rate for properties listed on our platform',
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Grow Your Business</h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Join successful property owners who are maximizing their revenue with TravelHub
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl md:text-6xl font-bold mb-4">{stat.number}</div>
                <h3 className="text-xl md:text-2xl font-semibold mb-3">{stat.label}</h3>
                <p className="text-blue-100 leading-relaxed">{stat.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Additional Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 bg-white/10 backdrop-blur-sm rounded-lg p-8 md:p-10"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">Increase Your Bookings</h3>
                <p className="text-blue-100 leading-relaxed">
                  Our platform connects you with travelers actively searching for properties like yours. 
                  With advanced search optimization and marketing tools, your property gets the visibility it deserves.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">Maximize Your Revenue</h3>
                <p className="text-blue-100 leading-relaxed">
                  Set competitive rates, use dynamic pricing tools, and take advantage of our promotional 
                  features to maximize your revenue potential throughout the year.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default RevenueGrowth;


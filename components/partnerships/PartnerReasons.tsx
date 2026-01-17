/**
 * PartnerReasons Component
 * 
 * "Why partner with us" section with image + text blocks (Expedia-style)
 */

import React from 'react';
import { motion } from 'framer-motion';

const PartnerReasons: React.FC = () => {
  const reasons = [
    {
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80',
      title: 'Reach Global Travelers',
      description: 'Connect with millions of travelers from around the world. Our platform gives you access to a global audience actively searching for properties like yours.',
      reverse: false,
    },
    {
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
      title: 'Grow Your Business',
      description: 'Increase your bookings and revenue with our proven platform. Our partners see an average 30% increase in bookings within the first year.',
      reverse: true,
    },
    {
      image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80',
      title: 'Easy Management',
      description: 'Manage your property listings, bookings, and availability all in one place. Our intuitive dashboard makes property management simple and efficient.',
      reverse: false,
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
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Partner Benefits
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to succeed as a TravelHub partner
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto space-y-16 md:space-y-24">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center ${
                reason.reverse ? 'lg:grid-flow-dense' : ''
              }`}
            >
              {/* Image */}
              <div className={reason.reverse ? 'lg:col-start-2' : ''}>
                <div className="relative rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src={reason.image}
                    alt={reason.title}
                    className="w-full h-[300px] md:h-[400px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </div>

              {/* Content */}
              <div className={reason.reverse ? 'lg:col-start-1 lg:row-start-1' : ''}>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  {reason.title}
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  {reason.description}
                </p>
                <ul className="space-y-3">
                  {[
                    'Access to millions of travelers',
                    'Real-time booking management',
                    'Competitive commission rates',
                    'Dedicated partner support',
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg
                        className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerReasons;


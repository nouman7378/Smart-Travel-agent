/**
 * AboutIntroduction Component
 * 
 * Introduction section (Expedia-style structure)
 */

import React from 'react';
import { motion } from 'framer-motion';

const AboutIntroduction: React.FC = () => {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
            About Us
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
            <p className="text-lg leading-relaxed">
              TravelHub was founded with a simple goal: to make travel planning easier and more 
              enjoyable for everyone. What started as a small startup has grown into a leading 
              travel platform, serving millions of travelers worldwide.
            </p>
            <p className="text-lg leading-relaxed">
              Our team consists of passionate travelers, experienced developers, and customer 
              service experts who are dedicated to providing you with the best possible travel 
              experience. We believe that travel has the power to transform lives, bring people 
              together, and create lasting memories.
            </p>
            <p className="text-lg leading-relaxed">
              We partner with thousands of hotels, airlines, car rental companies, and tour 
              operators to offer you the best deals and the widest selection of travel options. 
              Our commitment to excellence and innovation drives us to continuously improve our 
              platform and services.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutIntroduction;


/**
 * Diversity Component
 * 
 * Diversity & Inclusion section (Expedia-style)
 */

import React from 'react';
import { motion } from 'framer-motion';

const Diversity: React.FC = () => {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Equal Opportunity & Diversity</h2>
          <p className="text-xl md:text-2xl text-blue-100 leading-relaxed mb-8">
            At TravelHub, we believe that diversity drives innovation. We are committed to creating 
            an inclusive workplace where everyone can thrive, regardless of their background, identity, 
            or perspective.
          </p>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 md:p-8 text-left">
            <p className="text-lg text-blue-100 leading-relaxed mb-4">
              We are an equal opportunity employer. All qualified applicants will receive consideration 
              for employment without regard to race, color, religion, gender, gender identity or expression, 
              sexual orientation, national origin, genetics, disability, age, or veteran status.
            </p>
            <p className="text-lg text-blue-100 leading-relaxed">
              We celebrate diversity and are committed to creating an inclusive environment for all employees. 
              Our commitment to diversity and inclusion is reflected in our hiring practices, workplace culture, 
              and community engagement.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Diversity;


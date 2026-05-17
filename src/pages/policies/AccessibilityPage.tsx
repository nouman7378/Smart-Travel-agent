/**
 * AccessibilityPage Component
 * 
 * This page is part of the Expedia.fr Footer Pages replication for our FYP.
 */

import React from 'react';
import { motion } from 'framer-motion';
import PageLayout from '../../components/PageLayout';

const AccessibilityPage: React.FC = () => {
  return (
    <PageLayout skipHeaderFooter={true}>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Accessibility</h1>
            <p className="text-xl md:text-2xl text-blue-100">
              TravelHub is committed to making our website accessible to all users, including those with disabilities.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >

          <div className="bg-white p-8 rounded-lg shadow-md space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Commitment</h2>
              <p className="text-gray-700 leading-relaxed">
                We strive to ensure that our website is accessible and usable by all people,
                regardless of ability or technology. We are continuously working to improve the
                accessibility of our platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Accessibility Features</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Keyboard navigation support</li>
                <li>Screen reader compatibility</li>
                <li>Alt text for images</li>
                <li>High contrast mode options</li>
                <li>Text size adjustment capabilities</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-700 leading-relaxed">
                If you encounter any accessibility barriers on our website, please contact us at{' '}
                <a href="mailto:accessibility@travelhub.com" className="text-blue-600 hover:underline">
                  accessibility@travelhub.com
                </a>
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default AccessibilityPage;


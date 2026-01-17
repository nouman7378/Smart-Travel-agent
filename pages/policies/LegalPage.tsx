/**
 * LegalPage Component
 * 
 * This page is part of the Expedia.fr Footer Pages replication for our FYP.
 */

import React from 'react';
import { motion } from 'framer-motion';
import PageLayout from '../../components/PageLayout';

const LegalPage: React.FC = () => {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Legal Information / Contact Us
          </h1>

          <div className="bg-white p-8 rounded-xl shadow-md space-y-8 mb-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Company Information</h2>
              <div className="text-gray-700 space-y-2">
                <p>
                  <strong>Company Name:</strong> TravelHub
                </p>
                <p>
                  <strong>Registered Address:</strong> 123 Travel Street, Paris, France 75001
                </p>
                <p>
                  <strong>Registration Number:</strong> FR-123456789
                </p>
                <p>
                  <strong>VAT Number:</strong> FR12345678901
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
              <div className="text-gray-700 space-y-2">
                <p>
                  <strong>Email:</strong>{' '}
                  <a href="mailto:legal@travelhub.com" className="text-blue-600 hover:underline">
                    legal@travelhub.com
                  </a>
                </p>
                <p>
                  <strong>Phone:</strong> +33 1 23 45 67 89
                </p>
                <p>
                  <strong>Customer Support:</strong>{' '}
                  <a href="/support" className="text-blue-600 hover:underline">
                    Visit Support Page
                  </a>
                </p>
              </div>
            </section>
          </div>

          <div className="bg-blue-50 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Need Legal Assistance?</h3>
            <p className="text-gray-700">
              For legal inquiries, please contact our legal department at{' '}
              <a href="mailto:legal@travelhub.com" className="text-blue-600 hover:underline">
                legal@travelhub.com
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default LegalPage;


/**
 * WaiverPolicyPage Component
 * 
 * This page is part of the Expedia.fr Footer Pages replication for our FYP.
 */

import React from 'react';
import { motion } from 'framer-motion';
import PageLayout from '../../components/PageLayout';

const WaiverPolicyPage: React.FC = () => {
  return (
    <PageLayout useNewFooter={true}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Waiver Policy</h1>
          <p className="text-xl text-gray-600">Review our waiver and liability policies.</p>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default WaiverPolicyPage;


/**
 * ContentGuidelinesPage Component
 * 
 * This page is part of the Expedia.fr Footer Pages replication for our FYP.
 */

import React from 'react';
import { motion } from 'framer-motion';
import PageLayout from '../../components/PageLayout';

const ContentGuidelinesPage: React.FC = () => {
  return (
    <PageLayout skipHeaderFooter={true}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Content Guidelines and Reporting Content
          </h1>

          <div className="bg-white p-8 rounded-lg shadow-md space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Content Guidelines</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We encourage users to share honest, helpful, and respectful content. All user-generated
                content, including reviews and comments, must:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Be accurate and truthful</li>
                <li>Respect other users and property owners</li>
                <li>Not contain offensive, discriminatory, or illegal content</li>
                <li>Not include personal information of others</li>
                <li>Be relevant to the travel experience</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Reporting Inappropriate Content</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you encounter content that violates our guidelines, please report it to us. We
                review all reports and take appropriate action.
              </p>
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
                Report Content
              </button>
            </section>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default ContentGuidelinesPage;


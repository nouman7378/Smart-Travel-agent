/**
 * AffiliatePage Component
 * 
 * This page is part of the Expedia.fr Footer Pages replication for our FYP.
 */

import React from 'react';
import { motion } from 'framer-motion';
import PageLayout from '../components/PageLayout';
import { Banknote, BarChart, Gift } from 'lucide-react';


const AffiliatePage: React.FC = () => {
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Affiliate Marketing</h1>
            <p className="text-xl md:text-2xl text-blue-100">
              Earn commissions by promoting TravelHub. Join our affiliate program and start earning today.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >

          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 md:p-12 rounded-lg mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Join Our Affiliate Program?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="text-3xl mb-2"><Banknote className="inline w-5 h-5" /></div>
                <h3 className="text-xl font-semibold mb-2">Competitive Commissions</h3>
                <p>Earn up to 8% commission on every booking</p>
              </div>
              <div>
                <div className="text-3xl mb-2"><BarChart className="inline w-5 h-5" /></div>
                <h3 className="text-xl font-semibold mb-2">Real-Time Tracking</h3>
                <p>Monitor your earnings and performance in real-time</p>
              </div>
              <div>
                <div className="text-3xl mb-2"><Gift className="inline w-5 h-5" /></div>
                <h3 className="text-xl font-semibold mb-2">Marketing Tools</h3>
                <p>Access banners, links, and promotional materials</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How It Works</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Sign Up</h3>
                  <p className="text-gray-700">
                    Create your affiliate account and get approved within 24 hours
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Promote</h3>
                  <p className="text-gray-700">
                    Use our marketing tools to promote TravelHub on your website, blog, or social
                    media
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Earn</h3>
                  <p className="text-gray-700">
                    Get paid monthly for every booking made through your affiliate links
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default AffiliatePage;


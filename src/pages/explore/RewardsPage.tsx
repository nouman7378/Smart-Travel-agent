/**
 * RewardsPage Component
 * 
 * This page is part of the Expedia.fr Footer Pages replication for our FYP.
 */

import React from 'react';
import { motion } from 'framer-motion';
import PageLayout from '../../components/PageLayout';
import { Crown, Gift, Lock, Star } from 'lucide-react';


const RewardsPage: React.FC = () => {
  const benefits = [
    {
      title: 'Earn Points',
      description: 'Earn points on every booking',
      icon: <Star className="w-5 h-5" />,
    },
    {
      title: 'Redeem Rewards',
      description: 'Use points for discounts and free stays',
      icon: <Gift className="w-5 h-5" />,
    },
    {
      title: 'Member-Only Deals',
      description: 'Access exclusive member rates',
      icon: <Lock className="w-5 h-5" />,
    },
    {
      title: 'VIP Benefits',
      description: 'Priority support and upgrades',
      icon: <Crown className="w-5 h-5" />,
    },
  ];

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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Rewards with One Key</h1>
            <p className="text-xl md:text-2xl text-blue-100">
              Join One Key and start earning rewards on every booking. One program, endless possibilities.
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
            <h2 className="text-3xl font-bold mb-4">Why Join One Key?</h2>
            <p className="text-lg mb-6">
              One Key is our unified rewards program that lets you earn and redeem points across
              flights, hotels, cars, and activities.
            </p>
            <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
              Join One Key Now
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all text-center"
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default RewardsPage;


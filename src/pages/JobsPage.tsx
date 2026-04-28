/**
 * JobsPage Component
 * 
 * This page is part of the Expedia.fr Footer Pages replication for our FYP.
 */

import React from 'react';
import { motion } from 'framer-motion';
import PageLayout from '../components/PageLayout';
import { Handshake, Laptop, Megaphone, Palette, Settings } from 'lucide-react';


const JobsPage: React.FC = () => {
  const jobCategories = [
    {
      title: 'Engineering',
      description: 'Build the future of travel technology',
      icon: <Laptop className="w-5 h-5" />,
      count: 25,
    },
    {
      title: 'Product & Design',
      description: 'Create amazing user experiences',
      icon: <Palette className="w-5 h-5" />,
      count: 15,
    },
    {
      title: 'Marketing',
      description: 'Share our story with the world',
      icon: <Megaphone className="w-5 h-5" />,
      count: 20,
    },
    {
      title: 'Customer Support',
      description: 'Help travelers have great experiences',
      icon: <Handshake className="w-5 h-5" />,
      count: 30,
    },
    {
      title: 'Sales & Partnerships',
      description: 'Build relationships with partners',
      icon: <Handshake className="w-5 h-5" />,
      count: 18,
    },
    {
      title: 'Operations',
      description: 'Keep everything running smoothly',
      icon: <Settings className="w-5 h-5" />,
      count: 12,
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Join Our Team</h1>
            <p className="text-xl md:text-2xl text-blue-100">
              Help us shape the future of travel. Explore open positions and find your next career opportunity.
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {jobCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all cursor-pointer"
              >
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{category.title}</h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <div className="text-blue-600 font-semibold">{category.count} open positions</div>
              </motion.div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 md:p-12 rounded-xl">
            <h2 className="text-3xl font-bold mb-4">Why Work at TravelHub?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">Competitive Benefits</h3>
                <p>Health insurance, retirement plans, and generous vacation time</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Growth Opportunities</h3>
                <p>Career development programs and learning resources</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Flexible Work</h3>
                <p>Remote work options and flexible schedules</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Travel Perks</h3>
                <p>Discounted travel and exclusive travel benefits</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default JobsPage;


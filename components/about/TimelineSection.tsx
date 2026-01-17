/**
 * TimelineSection Component
 * 
 * Journey/Timeline section (Expedia-style)
 */

import React from 'react';
import { motion } from 'framer-motion';

const TimelineSection: React.FC = () => {
  const milestones = [
    {
      year: '2015',
      title: 'The Beginning',
      description: 'TravelHub was founded with a vision to make travel accessible to everyone.',
    },
    {
      year: '2017',
      title: 'Global Expansion',
      description: 'Expanded to serve travelers in over 50 countries with partnerships worldwide.',
    },
    {
      year: '2019',
      title: 'Innovation Leader',
      description: 'Launched AI-powered travel planning and personalized recommendations.',
    },
    {
      year: '2021',
      title: '10 Million Users',
      description: 'Reached a milestone of 10 million happy travelers using our platform.',
    },
    {
      year: '2024',
      title: 'Today',
      description: 'Continuing to innovate and expand, serving millions of travelers globally.',
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
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A timeline of our growth and milestones
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-600 transform md:-translate-x-1/2"></div>

            {/* Timeline Items */}
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full border-4 border-white shadow-lg transform md:-translate-x-1/2 z-10"></div>

                  {/* Content */}
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12 md:ml-auto'}`}>
                    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
                      <div className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-3">
                        {milestone.year}
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">{milestone.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{milestone.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TimelineSection;


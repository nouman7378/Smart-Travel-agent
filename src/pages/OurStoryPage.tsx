/**
 * OurStoryPage Component
 * 
 * Dedicated Our Story page with modern design
 * Matching the About page styling
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';

const OurStoryPage: React.FC = () => {
  const chapters = [
    {
      year: '2015',
      title: 'The Beginning',
      description: 'TravelHub was born from a simple idea: make travel accessible to everyone. Our founders, passionate travelers themselves, saw the need for a platform that could simplify the complex world of travel planning.',
      highlight: 'Founded in a small garage with just 3 team members',
      details: 'What started as a weekend project quickly gained traction among friends and family. The core vision was clear: create a travel platform that puts the traveler first, offering transparent pricing, easy booking, and personalized recommendations.',
    },
    {
      year: '2016',
      title: 'First Steps',
      description: 'We launched our beta platform with basic flight booking. The response was overwhelming - thousands of travelers signed up in the first month, validating our mission.',
      highlight: '10,000 users in the first month',
      details: 'The early adopters helped us refine our platform, providing valuable feedback that shaped our product roadmap. We quickly realized that travelers wanted more than just booking - they wanted guidance and support.',
    },
    {
      year: '2017',
      title: 'Growing Fast',
      description: 'With rapid growth came new challenges. We expanded our team, added hotel bookings, and improved our technology to handle the increasing demand.',
      highlight: 'Expanded to 50+ countries',
      details: 'Our engineering team scaled the infrastructure to support millions of daily searches while our customer service department grew to handle increasing inquiries. We opened our first international office in London.',
    },
    {
      year: '2018',
      title: 'Innovation Era',
      description: 'We invested heavily in AI and machine learning to provide personalized travel recommendations. Our smart algorithms began learning from user preferences.',
      highlight: 'Launched AI-powered recommendations',
      details: 'Our data science team developed sophisticated algorithms that could predict travel preferences based on past behavior, seasonal trends, and user demographics. This marked the beginning of truly personalized travel experiences.',
    },
    {
      year: '2019',
      title: 'Going Mobile',
      description: 'Recognizing the shift to mobile, we launched our iOS and Android apps. Travel planning became possible anywhere, anytime.',
      highlight: '1M+ app downloads',
      details: 'The mobile-first approach allowed travelers to plan, book, and manage their trips on the go. Push notifications kept them informed about flight changes, gate updates, and destination weather.',
    },
    {
      year: '2020',
      title: 'Resilience',
      description: 'The travel industry faced unprecedented challenges. We adapted quickly, focusing on domestic travel and safety features to help travelers navigate the new normal.',
      highlight: 'Introduced flexible booking policies',
      details: 'We pivoted our business model, introduced contactless travel options, and created a comprehensive health and safety protocol. Our platform became a trusted source for travel restrictions and requirements.',
    },
    {
      year: '2021',
      title: 'Milestone Moment',
      description: 'We reached 10 million users - a testament to our commitment to excellent service. Our community of travelers became our greatest strength.',
      highlight: '10M+ happy travelers',
      details: 'This milestone represented years of hard work, iteration, and dedication to our users. We celebrated by launching our loyalty program, rewarding our most loyal customers with exclusive perks.',
    },
    {
      year: '2022',
      title: 'Global Expansion',
      description: 'We expanded our services to 150+ countries, partnering with local businesses to offer authentic travel experiences worldwide.',
      highlight: '150+ countries covered',
      details: 'Local partnerships allowed us to offer unique experiences that only locals could provide. We hired native speakers in each region to ensure cultural sensitivity and authentic recommendations.',
    },
    {
      year: '2023',
      title: 'AI Revolution',
      description: 'We launched our AI Travel Assistant, revolutionizing how people plan trips. Natural language processing made travel planning conversational and intuitive.',
      highlight: 'AI Travel Assistant launched',
      details: 'Travelers could now simply tell our AI assistant what kind of trip they wanted, and it would craft a personalized itinerary. This breakthrough made travel planning accessible to everyone, regardless of their planning expertise.',
    },
    {
      year: '2024',
      title: 'Today & Beyond',
      description: 'Today, TravelHub serves millions of travelers globally. But our journey is just beginning. We continue to innovate, dreaming of a world where travel is seamless for everyone.',
      highlight: 'Serving millions, dreaming bigger',
      details: 'We continue investing in sustainability, virtual reality previews, and blockchain-based travel documents. Our vision remains unchanged: making travel accessible, enjoyable, and memorable for everyone.',
    },
  ];

  const values = [
    {
      title: 'Passion for Travel',
      description: 'We are travelers first, builders second. Every feature we create comes from understanding the traveler\'s journey.',
    },
    {
      title: 'Customer Obsession',
      description: 'Our customers are at the heart of everything we do. We listen, learn, and continuously improve.',
    },
    {
      title: 'Innovation First',
      description: 'We embrace new technologies to solve old problems. Innovation drives us forward.',
    },
    {
      title: 'Global Community',
      description: 'We believe travel connects people and cultures. Our platform brings the world closer together.',
    },
  ];

  return (
    <PageLayout skipHeaderFooter={false}>
      {/* Hero Section */}
      <div className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800">
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 left-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl"
          />
          <motion.div 
            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-20 right-10 w-80 h-80 bg-purple-400 rounded-full blur-3xl"
          />
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8"
            >
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-sm text-white/90">Est. 2015</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">
                Our Story
              </span>
            </motion.h1>


          </motion.div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </div>

      {/* Story Chapters */}
      <section className="py-20 md:py-28 bg-white relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-60 translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-50 rounded-full blur-3xl opacity-60 -translate-x-1/2 translate-y-1/2"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            {/* Timeline */}
            <div className="relative">
              {/* Animated Timeline Line */}
              <motion.div 
                initial={{ height: 0 }}
                whileInView={{ height: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="absolute left-4 md:left-1/2 top-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-indigo-600 transform md:-translate-x-1/2 rounded-full"
              ></motion.div>

              {/* Chapters */}
              <div className="space-y-16">
                {chapters.map((chapter, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60, y: 30 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`relative flex items-start ${
                      index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Timeline Node */}
                    <motion.div 
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 + 0.2, type: "spring" }}
                      className="absolute left-4 md:left-1/2 z-10 transform md:-translate-x-1/2 mt-1"
                    >
                      <div className="w-4 h-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full border-4 border-white shadow-lg"></div>
                    </motion.div>

                    {/* Content */}
                    <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12 md:ml-auto'}`}>
                      <motion.div 
                        whileHover={{ y: -5 }}
                        className="group"
                      >
                        {/* Year Badge */}
                        <span className="inline-block px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-sm font-bold mb-3">
                          {chapter.year}
                        </span>
                        
                        {/* Title */}
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                          {chapter.title}
                        </h3>
                        
                        {/* Description */}
                        <p className="text-gray-600 leading-relaxed mb-3">
                          {chapter.description}
                        </p>
                        
                        {/* Details */}
                        {chapter.details && (
                          <p className="text-gray-500 text-sm leading-relaxed mb-3 italic">
                            {chapter.details}
                          </p>
                        )}
                        
                        {/* Highlight */}
                        <div className="inline-flex items-center gap-2 text-sm text-blue-600 font-medium">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          {chapter.highlight}
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 text-white relative overflow-hidden">
        <motion.div 
          animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ x: [0, -100, 0], y: [0, 50, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 right-10 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl"
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Be Part of Our Story
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join millions of travelers who trust TravelHub for their adventures. 
              Your journey is our story.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/flights"
                  className="inline-block px-8 py-4 bg-white text-blue-600 font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all"
                >
                  Start Your Journey
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/about"
                  className="inline-block px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-2xl hover:bg-white hover:text-blue-600 transition-all"
                >
                  About Us
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default OurStoryPage;

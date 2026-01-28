/**
 * SupportPage Component
 * 
 * This page is part of the Expedia.fr Footer Pages replication for our FYP.
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PageLayout from '../components/PageLayout';

const SupportPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const faqs = [
    {
      category: 'Bookings',
      questions: [
        {
          q: 'How do I modify my booking?',
          a: 'You can modify your booking by logging into your account and accessing the "My Bookings" section. Some bookings may have modification fees.',
        },
        {
          q: 'Can I cancel my booking?',
          a: 'Cancellation policies vary by booking type. Check your booking confirmation for specific cancellation terms.',
        },
      ],
    },
    {
      category: 'Payments',
      questions: [
        {
          q: 'What payment methods do you accept?',
          a: 'We accept major credit cards, debit cards, PayPal, and other secure payment methods.',
        },
        {
          q: 'When will I be charged?',
          a: 'Payment is typically processed at the time of booking confirmation, unless otherwise stated.',
        },
      ],
    },
    {
      category: 'Account',
      questions: [
        {
          q: 'How do I create an account?',
          a: 'Click "Sign Up" in the header, fill in your information, and verify your email address.',
        },
        {
          q: 'I forgot my password. How do I reset it?',
          a: 'Click "Forgot Password" on the login page and follow the instructions sent to your email.',
        },
      ],
    },
  ];

  const contactMethods = [
    {
      title: 'Email Support',
      description: 'Get help via email',
      contact: 'support@travelhub.com',
      icon: '✉️',
    },
    {
      title: 'Phone Support',
      description: 'Call us 24/7',
      contact: '+33 1 23 45 67 89',
      icon: '📞',
    },
    {
      title: 'Live Chat',
      description: 'Chat with our team',
      contact: 'Available 24/7',
      icon: '💬',
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Customer Support</h1>
            <p className="text-xl md:text-2xl text-blue-100">
              We're here to help! Find answers to common questions or contact our support team.
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

          {/* Contact Methods */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all text-center"
              >
                <div className="text-4xl mb-4">{method.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{method.title}</h3>
                <p className="text-gray-600 mb-2">{method.description}</p>
                <p className="text-blue-600 font-medium">{method.contact}</p>
              </motion.div>
            ))}
          </div>

          {/* FAQs */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden"
                >
                  <button
                    onClick={() =>
                      setSelectedCategory(selectedCategory === faq.category ? null : faq.category)
                    }
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-lg font-semibold text-gray-900">{faq.category}</span>
                    <svg
                      className={`h-5 w-5 text-gray-500 transition-transform ${
                        selectedCategory === faq.category ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {selectedCategory === faq.category && (
                    <div className="px-6 pb-4 space-y-4">
                      {faq.questions.map((item, idx) => (
                        <div key={idx} className="border-t border-gray-200 pt-4">
                          <h4 className="font-semibold text-gray-900 mb-2">{item.q}</h4>
                          <p className="text-gray-600">{item.a}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Still Need Help?</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>General Inquiry</option>
                  <option>Booking Issue</option>
                  <option>Payment Problem</option>
                  <option>Account Help</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe your issue or question..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default SupportPage;


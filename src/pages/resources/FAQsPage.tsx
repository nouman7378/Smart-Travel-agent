/**
 * FAQsPage Component
 * 
 * Frequently Asked Questions page for TravelHub
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PageLayout from '../../components/PageLayout';

interface FAQ {
  question: string;
  answer: string;
  category: 'booking' | 'payment' | 'travel' | 'account' | 'general';
}

const FAQsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQ[] = [
    {
      category: 'booking',
      question: 'How do I book a flight, hotel, or package?',
      answer: 'Booking is simple! Search for your desired destination, select your travel dates, choose from available options, and complete the booking process. You can book flights, hotels, car rentals, or complete travel packages all in one place.',
    },
    {
      category: 'booking',
      question: 'Can I modify or cancel my booking?',
      answer: 'Yes, you can modify or cancel most bookings through your account dashboard. Cancellation policies vary by booking type and provider. Some bookings may be fully refundable, while others may have cancellation fees. Check your booking confirmation email for specific terms.',
    },
    {
      category: 'booking',
      question: 'What is the booking confirmation process?',
      answer: 'After completing your booking, you will receive a confirmation email with your booking reference number. This typically arrives within minutes. You can also view all your bookings in your account dashboard under "My Bookings".',
    },
    {
      category: 'payment',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, Mastercard, American Express), debit cards, PayPal, and bank transfers. All payments are processed securely through encrypted payment gateways.',
    },
    {
      category: 'payment',
      question: 'Is my payment information secure?',
      answer: 'Absolutely. We use industry-standard SSL encryption and comply with PCI DSS security standards. Your payment information is never stored on our servers. All transactions are processed through secure, certified payment processors.',
    },
    {
      category: 'payment',
      question: 'When will I be charged for my booking?',
      answer: 'For most bookings, you will be charged immediately upon confirmation. Some hotels or packages may require a deposit, with the balance due closer to your travel date. Check your booking confirmation for specific payment terms.',
    },
    {
      category: 'travel',
      question: 'Do I need travel insurance?',
      answer: 'While not mandatory, we strongly recommend travel insurance to protect against unexpected cancellations, medical emergencies, or travel disruptions. We offer comprehensive travel insurance options during the booking process.',
    },
    {
      category: 'travel',
      question: 'What documents do I need for travel?',
      answer: 'Requirements vary by destination. Generally, you need a valid passport (with at least 6 months validity), visa (if required), and any health certificates. We provide destination-specific requirements in your booking confirmation.',
    },
    {
      category: 'travel',
      question: 'Can I book multi-city trips?',
      answer: 'Yes! Our platform supports multi-city bookings for flights and packages. Simply select "Multi-city" when searching for flights, and you can add multiple destinations to your itinerary.',
    },
    {
      category: 'account',
      question: 'How do I create an account?',
      answer: 'Click "Sign In" in the top right corner, then select "Create Account". You can sign up with your email address or use social login options. Creating an account allows you to save bookings, access exclusive deals, and manage your travel preferences.',
    },
    {
      category: 'account',
      question: 'How do I reset my password?',
      answer: 'On the login page, click "Forgot Password" and enter your email address. You will receive a password reset link via email. If you do not receive the email, check your spam folder or contact our support team.',
    },
    {
      category: 'account',
      question: 'Can I have multiple accounts?',
      answer: 'Each email address can only be associated with one account. If you need to manage bookings for multiple people, you can add them as travelers in your booking details without creating separate accounts.',
    },
    {
      category: 'general',
      question: 'What makes TravelHub different from other travel platforms?',
      answer: 'TravelHub offers a comprehensive travel solution with AI-powered recommendations, personalized itineraries, and seamless booking across flights, hotels, cars, and packages. Our platform combines the best deals with exceptional customer service and innovative travel planning tools.',
    },
    {
      category: 'general',
      question: 'Do you offer customer support?',
      answer: 'Yes! Our customer support team is available 24/7 via email, live chat, and phone. You can reach us through the "Support" page or directly from your account dashboard. We are here to help with any questions or issues.',
    },
    {
      category: 'general',
      question: 'Are there any booking fees?',
      answer: 'Our platform is free to use for searching and browsing. Some bookings may include service fees, which are clearly displayed before you complete your purchase. We are transparent about all costs upfront.',
    },
  ];

  const categories = [
    { id: 'all', name: 'All Questions' },
    { id: 'booking', name: 'Booking' },
    { id: 'payment', name: 'Payment' },
    { id: 'travel', name: 'Travel' },
    { id: 'account', name: 'Account' },
    { id: 'general', name: 'General' },
  ];

  const filteredFAQs = selectedCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Frequently Asked Questions</h1>
            <p className="text-xl md:text-2xl text-blue-100">
              Find answers to common questions about booking, payments, and travel
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category.id);
                  setOpenIndex(0);
                }}
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* FAQs List */}
        <div className="max-w-4xl mx-auto space-y-4">
          {filteredFAQs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-800 text-lg pr-4">{faq.question}</span>
                <svg
                  className={`w-6 h-6 text-blue-600 flex-shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-6 pb-5"
                >
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Contact Support Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 text-center border border-blue-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Still have questions?</h2>
            <p className="text-gray-600 mb-6">
              Our support team is here to help you 24/7
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/support"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Contact Support
              </a>
              <a
                href="/chat"
                className="px-6 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Chat with AI Assistant
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default FAQsPage;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../../components/PageLayout';
import MinimalPageHero from '../../components/common/MinimalPageHero';
import InfoPageContent, { infoPage } from '../../components/common/InfoPageContent';

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
      answer:
        'Booking is simple! Search for your desired destination, select your travel dates, choose from available options, and complete the booking process. You can book flights, hotels, car rentals, or complete travel packages all in one place.',
    },
    {
      category: 'booking',
      question: 'Can I modify or cancel my booking?',
      answer:
        'Yes, you can modify or cancel most bookings through your account dashboard. Cancellation policies vary by booking type and provider. Some bookings may be fully refundable, while others may have cancellation fees. Check your booking confirmation email for specific terms.',
    },
    {
      category: 'booking',
      question: 'What is the booking confirmation process?',
      answer:
        'After completing your booking, you will receive a confirmation email with your booking reference number. This typically arrives within minutes. You can also view all your bookings in your account dashboard under "My Bookings".',
    },
    {
      category: 'payment',
      question: 'What payment methods do you accept?',
      answer:
        'We accept all major credit cards (Visa, Mastercard, American Express), debit cards, PayPal, and bank transfers. All payments are processed securely through encrypted payment gateways.',
    },
    {
      category: 'payment',
      question: 'Is my payment information secure?',
      answer:
        'Absolutely. We use industry-standard SSL encryption and comply with PCI DSS security standards. Your payment information is never stored on our servers. All transactions are processed through secure, certified payment processors.',
    },
    {
      category: 'payment',
      question: 'When will I be charged for my booking?',
      answer:
        'For most bookings, you will be charged immediately upon confirmation. Some hotels or packages may require a deposit, with the balance due closer to your travel date. Check your booking confirmation for specific payment terms.',
    },
    {
      category: 'travel',
      question: 'Do I need travel insurance?',
      answer:
        'While not mandatory, we strongly recommend travel insurance to protect against unexpected cancellations, medical emergencies, or travel disruptions. We offer comprehensive travel insurance options during the booking process.',
    },
    {
      category: 'travel',
      question: 'What documents do I need for travel?',
      answer:
        'Requirements vary by destination. Generally, you need a valid passport (with at least 6 months validity), visa (if required), and any health certificates. We provide destination-specific requirements in your booking confirmation.',
    },
    {
      category: 'travel',
      question: 'Can I book multi-city trips?',
      answer:
        'Yes! Our platform supports multi-city bookings for flights and packages. Simply select "Multi-city" when searching for flights, and you can add multiple destinations to your itinerary.',
    },
    {
      category: 'account',
      question: 'How do I create an account?',
      answer:
        'Click "Sign In" in the top right corner, then select "Create Account". You can sign up with your email address or use social login options. Creating an account allows you to save bookings, access exclusive deals, and manage your travel preferences.',
    },
    {
      category: 'account',
      question: 'How do I reset my password?',
      answer:
        'On the login page, click "Forgot Password" and enter your email address. You will receive a password reset link via email. If you do not receive the email, check your spam folder or contact our support team.',
    },
    {
      category: 'account',
      question: 'Can I have multiple accounts?',
      answer:
        'Each email address can only be associated with one account. If you need to manage bookings for multiple people, you can add them as travelers in your booking details without creating separate accounts.',
    },
    {
      category: 'general',
      question: 'What makes TravelHub different from other travel platforms?',
      answer:
        'TravelHub offers a comprehensive travel solution with AI-powered recommendations, personalized itineraries, and seamless booking across flights, hotels, cars, and packages. Our platform combines the best deals with exceptional customer service and innovative travel planning tools.',
    },
    {
      category: 'general',
      question: 'Do you offer customer support?',
      answer:
        'Yes! Our customer support team is available 24/7 via email, live chat, and phone. You can reach us through the Support page or directly from your account dashboard.',
    },
    {
      category: 'general',
      question: 'Are there any booking fees?',
      answer:
        'Our platform is free to use for searching and browsing. Some bookings may include service fees, which are clearly displayed before you complete your purchase. We are transparent about all costs upfront.',
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

  const filteredFAQs =
    selectedCategory === 'all'
      ? faqs
      : faqs.filter((faq) => faq.category === selectedCategory);

  return (
    <PageLayout skipHeaderFooter={true}>
      <MinimalPageHero
        eyebrow="Support"
        title="Frequently Asked Questions"
        subtitle="Find answers to common questions about booking, payments, travel documents, and your account."
      />
      <InfoPageContent narrow>
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => {
                setSelectedCategory(category.id);
                setOpenIndex(0);
              }}
              className={`px-5 py-2.5 rounded-lg font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-blue-950 text-white'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filteredFAQs.map((faq, index) => (
            <div key={`${faq.category}-${index}`} className={infoPage.card}>
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex justify-between items-start gap-4 text-left"
              >
                <span className="text-lg font-semibold text-slate-900 pr-4">{faq.question}</span>
                <span className="text-slate-400 text-xl shrink-0">
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              {openIndex === index && (
                <p className={`${infoPage.body} mt-4 pt-4 border-t border-slate-200`}>
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>

        <section className={`${infoPage.card} mt-12 text-center`}>
          <h2 className={infoPage.h2}>Still have questions?</h2>
          <p className={`${infoPage.body} mt-2`}>Our support team is here to help you 24/7.</p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <Link to="/support" className={infoPage.btn}>
              Contact Support
            </Link>
            <Link to="/chat" className="px-6 py-3 border-2 border-blue-950 text-blue-950 font-medium rounded-lg hover:bg-blue-50">
              Chat with AI Assistant
            </Link>
          </div>
        </section>
      </InfoPageContent>
    </PageLayout>
  );
};

export default FAQsPage;

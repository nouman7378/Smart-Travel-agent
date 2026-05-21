import React, { useState } from 'react';
import PageLayout from '../components/PageLayout';
import MinimalPageHero from '../components/common/MinimalPageHero';
import InfoPageContent, { infoPage } from '../components/common/InfoPageContent';
import { Mail, MessageCircle, Phone } from 'lucide-react';

const SupportPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const faqs = [
    {
      category: 'Bookings',
      questions: [
        { q: 'How do I modify my booking?', a: 'Log in and open My Bookings. Select your reservation and follow the change or cancel options. Policies depend on the airline or hotel provider.' },
        { q: 'Can I cancel my booking?', a: 'Most bookings can be cancelled online. Refund eligibility and fees are shown before you confirm cancellation and in your confirmation email.' },
        { q: 'Where is my confirmation?', a: 'Check your email inbox and spam folder. You can also view all confirmations under My Bookings in your account.' },
      ],
    },
    {
      category: 'Payments',
      questions: [
        { q: 'What payment methods do you accept?', a: 'We accept major credit and debit cards, PayPal, and other secure payment methods depending on your region.' },
        { q: 'When will I be charged?', a: 'Most bookings are charged at confirmation. Some hotels may authorize a hold or charge a deposit first.' },
        { q: 'Is my payment secure?', a: 'Yes. All transactions use encrypted payment gateways. We do not store full card numbers on our servers.' },
      ],
    },
    {
      category: 'Account',
      questions: [
        { q: 'How do I create an account?', a: 'Click Sign Up in the header and register with email or social login. Verify your email to access bookings and saved trips.' },
        { q: 'I forgot my password.', a: 'Use Forgot Password on the login page. You will receive a reset link by email within a few minutes.' },
      ],
    },
  ];

  const contactMethods = [
    { title: 'Email support', description: 'We typically respond within 24 hours.', contact: 'support@travelhub.com', icon: Mail },
    { title: 'Phone', description: 'Available 24/7 for urgent booking issues.', contact: '+33 1 23 45 67 89', icon: Phone },
    { title: 'Live chat', description: 'Chat with our team or AI assistant anytime.', contact: 'Start chat from your account', icon: MessageCircle },
  ];

  return (
    <PageLayout skipHeaderFooter={true}>
      <MinimalPageHero
        eyebrow="Support"
        title="Customer Support"
        subtitle="We're here to help with bookings, payments, account access, and travel questions—before, during, and after your trip."
      />
      <InfoPageContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {contactMethods.map(({ title, description, contact, icon: Icon }) => (
            <div key={title} className={`${infoPage.card} text-center`}>
              <Icon className="w-10 h-10 text-blue-800 mx-auto mb-4" />
              <h3 className={infoPage.h3}>{title}</h3>
              <p className={infoPage.body}>{description}</p>
              <p className="text-blue-800 font-medium mt-3">{contact}</p>
            </div>
          ))}
        </div>

        <section className={infoPage.section}>
          <h2 className={infoPage.h2}>Frequently asked questions</h2>
          <div className="space-y-4 mt-6">
            {faqs.map((faq) => (
              <div key={faq.category} className={infoPage.card}>
                <button
                  type="button"
                  onClick={() =>
                    setSelectedCategory(selectedCategory === faq.category ? null : faq.category)
                  }
                  className="w-full flex justify-between items-center text-left"
                >
                  <span className="text-lg font-semibold text-slate-900">{faq.category}</span>
                  <span className="text-slate-400 text-xl">
                    {selectedCategory === faq.category ? '−' : '+'}
                  </span>
                </button>
                {selectedCategory === faq.category && (
                  <div className="mt-6 pt-6 border-t border-slate-200 space-y-5">
                    {faq.questions.map((item) => (
                      <div key={item.q}>
                        <p className="font-medium text-slate-900">{item.q}</p>
                        <p className={`${infoPage.body} mt-2`}>{item.a}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className={infoPage.card}>
          <h2 className={infoPage.h2}>Still need help?</h2>
          <p className={`${infoPage.body} mt-2`}>
            Send us a message and include your booking reference if you have one.
          </p>
          <form className="space-y-5 mt-6 max-w-xl">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Subject</label>
              <select className="w-full px-4 py-3 text-base border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800">
                <option>General inquiry</option>
                <option>Booking issue</option>
                <option>Payment problem</option>
                <option>Account help</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
              <textarea
                rows={5}
                className="w-full px-4 py-3 text-base border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
                placeholder="Describe your issue or question..."
              />
            </div>
            <button type="submit" className={infoPage.btn}>
              Send message
            </button>
          </form>
        </section>
      </InfoPageContent>
    </PageLayout>
  );
};

export default SupportPage;

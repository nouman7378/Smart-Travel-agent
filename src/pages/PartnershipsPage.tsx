import React from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import MinimalPageHero from '../components/common/MinimalPageHero';
import InfoPageContent, { infoPage } from '../components/common/InfoPageContent';

const benefits = [
  {
    title: 'Global reach',
    description:
      'Put your inventory in front of travelers from over 150 countries. Our platform handles multiple currencies and languages.',
  },
  {
    title: 'Flexible integration',
    description:
      'Connect via API, channel manager, or manual onboarding. Our technical team supports you through launch.',
  },
  {
    title: 'Dedicated support',
    description:
      'Partner managers, reporting dashboards, and 24/7 traveler support so you can focus on your business.',
  },
];

const steps = [
  { step: '1', title: 'Apply', description: 'Share your company profile, inventory type, and target markets.' },
  { step: '2', title: 'Onboard', description: 'Complete contracts, technical setup, and content mapping.' },
  { step: '3', title: 'Go live', description: 'Start receiving bookings and access performance analytics.' },
];

const PartnershipsPage: React.FC = () => {
  return (
    <PageLayout skipHeaderFooter={true}>
      <MinimalPageHero
        eyebrow="Company"
        title="Partnerships"
        subtitle="Partner with TravelHub to grow your travel business—hotels, airlines, car rental, and experience providers welcome."
      />
      <InfoPageContent>
        <p className={infoPage.lead}>
          Join a network of leading travel brands. We provide distribution, technology, and
          support so you can reach more travelers and increase revenue.
        </p>

        <section className={`${infoPage.section} mt-12`}>
          <h2 className={infoPage.h2}>Partner benefits</h2>
          <div className={`${infoPage.grid3} mt-6`}>
            {benefits.map((item) => (
              <div key={item.title} className={infoPage.card}>
                <h3 className={infoPage.h3}>{item.title}</h3>
                <p className={infoPage.body}>{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={infoPage.section}>
          <h2 className={infoPage.h2}>How it works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {steps.map((item) => (
              <div key={item.step} className={infoPage.card}>
                <span className="text-sm font-bold text-blue-800">Step {item.step}</span>
                <h3 className={`${infoPage.h3} mt-2`}>{item.title}</h3>
                <p className={infoPage.body}>{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={`${infoPage.card} text-center`}>
          <h2 className={infoPage.h2}>Ready to partner?</h2>
          <p className={`${infoPage.body} max-w-xl mx-auto mt-2`}>
            List properties, integrate flights, or explore co-marketing opportunities.
          </p>
          <Link to="/list-property" className={`${infoPage.btn} mt-6`}>
            List your property
          </Link>
        </section>
      </InfoPageContent>
    </PageLayout>
  );
};

export default PartnershipsPage;

import React from 'react';
import PageLayout from '../components/PageLayout';
import MinimalPageHero from '../components/common/MinimalPageHero';
import InfoPageContent, { infoPage } from '../components/common/InfoPageContent';

const propertyTypes = [
  { name: 'Hotels', desc: 'Full-service and limited-service hotels' },
  { name: 'Apartments', desc: 'Serviced apartments and vacation rentals' },
  { name: 'Villas', desc: 'Private homes and holiday houses' },
  { name: 'B&Bs', desc: 'Bed and breakfast and guesthouses' },
  { name: 'Resorts', desc: 'Leisure and all-inclusive properties' },
  { name: 'Hostels', desc: 'Budget and shared accommodation' },
];

const steps = [
  {
    title: 'Create your listing',
    description:
      'Add photos, descriptions, amenities, and room types. Set availability and minimum stay rules.',
  },
  {
    title: 'Set your rates',
    description:
      'Control pricing by season, occupancy, and length of stay. Offer member or promotional rates when you choose.',
  },
  {
    title: 'Receive bookings',
    description:
      'Manage reservations, messages, and payouts from a single partner dashboard with real-time notifications.',
  },
];

const ListPropertyPage: React.FC = () => {
  return (
    <PageLayout skipHeaderFooter={true}>
      <MinimalPageHero
        eyebrow="Company"
        title="List Your Property"
        subtitle="Reach millions of travelers worldwide. Join hotels, apartments, and vacation rentals already on TravelHub."
      />
      <InfoPageContent>
        <p className={infoPage.lead}>
          Whether you run a boutique hotel or a portfolio of apartments, listing on TravelHub puts
          your property in front of travelers searching for their next stay—with tools to manage
          bookings and grow revenue.
        </p>

        <section className={`${infoPage.section} mt-12`}>
          <h2 className={infoPage.h2}>Property types we support</h2>
          <div className={`${infoPage.grid3} mt-6`}>
            {propertyTypes.map((type) => (
              <div key={type.name} className={infoPage.card}>
                <h3 className={infoPage.h3}>{type.name}</h3>
                <p className={infoPage.body}>{type.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={infoPage.section}>
          <h2 className={infoPage.h2}>How it works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {steps.map((item, i) => (
              <div key={item.title} className={infoPage.card}>
                <span className="text-sm font-bold text-blue-800">Step {i + 1}</span>
                <h3 className={`${infoPage.h3} mt-2`}>{item.title}</h3>
                <p className={infoPage.body}>{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={infoPage.section}>
          <h2 className={infoPage.h2}>Why list with us</h2>
          <div className={infoPage.grid}>
            <div className={infoPage.card}>
              <h3 className={infoPage.h3}>Reach & revenue</h3>
              <ul className={infoPage.list}>
                <li>Global distribution to millions of travelers</li>
                <li>Competitive commission and transparent reporting</li>
                <li>Insights to optimize pricing and occupancy</li>
              </ul>
            </div>
            <div className={infoPage.card}>
              <h3 className={infoPage.h3}>Trust & tools</h3>
              <ul className={infoPage.list}>
                <li>Secure payments and verified guest profiles</li>
                <li>Calendar sync with major channel managers</li>
                <li>Dedicated partner support team</li>
              </ul>
            </div>
          </div>
        </section>

        <div className="text-center">
          <button type="button" className={infoPage.btn}>
            Get started — list your property
          </button>
        </div>
      </InfoPageContent>
    </PageLayout>
  );
};

export default ListPropertyPage;

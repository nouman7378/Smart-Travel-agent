import React from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../../components/PageLayout';
import MinimalPageHero from '../../components/common/MinimalPageHero';
import InfoPageContent, { infoPage } from '../../components/common/InfoPageContent';

const types = [
  {
    name: 'Hotels',
    description:
      'From budget chains to five-star luxury. Ideal for city breaks, business trips, and travelers who want daily housekeeping and on-site services.',
  },
  {
    name: 'Resorts',
    description:
      'All-inclusive and leisure-focused properties with pools, spas, and activities. Popular on the Riviera and in ski regions.',
  },
  {
    name: 'Apartments',
    description:
      'Self-catering with kitchen and living space. Great for families and longer stays where you want more room and flexibility.',
  },
  {
    name: 'Villas',
    description:
      'Private homes with gardens or pools. Perfect for groups, weddings, and extended holidays in Provence or coastal areas.',
  },
  {
    name: 'Hostels',
    description:
      'Shared and private rooms at lower prices. Best for solo travelers and backpackers exploring multiple cities.',
  },
  {
    name: 'B&Bs',
    description:
      'Small, owner-run properties with personal touch and breakfast included. Common in countryside and wine regions.',
  },
];

const AccommodationTypesPage: React.FC = () => {
  return (
    <PageLayout skipHeaderFooter={true}>
      <MinimalPageHero
        eyebrow="Discover"
        title="All Accommodation Types"
        subtitle="Hotels, apartments, villas, and more—find the stay style that fits your trip, budget, and group size."
      />
      <InfoPageContent>
        <p className={infoPage.lead}>
          Not every trip needs the same type of stay. Compare options side by side and filter by
          amenities, location, and cancellation terms when you search.
        </p>

        <section className={`${infoPage.section} mt-12`}>
          <h2 className={infoPage.h2}>Browse by type</h2>
          <div className={`${infoPage.grid3} mt-6`}>
            {types.map((type) => (
              <div key={type.name} className={infoPage.card}>
                <h3 className={infoPage.h3}>{type.name}</h3>
                <p className={infoPage.body}>{type.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={`${infoPage.card} text-center`}>
          <h2 className={infoPage.h2}>Start your search</h2>
          <p className={`${infoPage.body} max-w-xl mx-auto mt-2`}>
            Use filters on our hotels page to narrow by property type, star rating, and guest score.
          </p>
          <Link to="/hotels" className={`${infoPage.btn} mt-6`}>
            Search accommodation
          </Link>
        </section>
      </InfoPageContent>
    </PageLayout>
  );
};

export default AccommodationTypesPage;

import React from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../../components/PageLayout';
import MinimalPageHero from '../../components/common/MinimalPageHero';
import InfoPageContent, { infoPage } from '../../components/common/InfoPageContent';

const cities = [
  { name: 'Paris', count: 2500, highlight: 'Boutique hotels, luxury stays, and apartments near major sights.' },
  { name: 'Nice', count: 450, highlight: 'Beachfront resorts and Riviera properties with sea views.' },
  { name: 'Lyon', count: 320, highlight: 'City hotels perfect for food lovers and business travel.' },
  { name: 'Marseille', count: 380, highlight: 'Harbor views and access to Calanques day trips.' },
  { name: 'Bordeaux', count: 280, highlight: 'Wine country hotels and historic city-center stays.' },
  { name: 'Strasbourg', count: 190, highlight: 'Alsace charm near the German border and Christmas markets.' },
];

const HotelsFrancePage: React.FC = () => {
  return (
    <PageLayout skipHeaderFooter={true}>
      <MinimalPageHero
        eyebrow="Discover"
        title="Hotels in France"
        subtitle="Thousands of properties across cities, coastlines, and countryside—from budget to luxury."
      />
      <InfoPageContent>
        <p className={infoPage.lead}>
          Whether you are planning a weekend in Paris or a week on the Côte d&apos;Azur, compare
          hotels, apartments, and resorts with real-time availability and transparent pricing.
        </p>

        <section className={`${infoPage.section} mt-12`}>
          <h2 className={infoPage.h2}>Popular cities</h2>
          <div className={`${infoPage.grid3} mt-6`}>
            {cities.map((city) => (
              <Link
                key={city.name}
                to={`/search/hotels?destination=${city.name}`}
                className={`${infoPage.card} hover:border-blue-400 hover:shadow-md transition-all block`}
              >
                <h3 className={infoPage.h3}>{city.name}</h3>
                <p className="text-blue-800 font-medium mt-1">
                  {city.count.toLocaleString()}+ properties
                </p>
                <p className={`${infoPage.body} mt-3`}>{city.highlight}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className={infoPage.section}>
          <h2 className={infoPage.h2}>Why book hotels with us</h2>
          <div className={infoPage.grid}>
            <div className={infoPage.card}>
              <h3 className={infoPage.h3}>Wide selection</h3>
              <p className={infoPage.body}>
                From international chains to independent B&Bs, filter by price, rating, amenities,
                and cancellation policy.
              </p>
            </div>
            <div className={infoPage.card}>
              <h3 className={infoPage.h3}>Best price guarantee</h3>
              <p className={infoPage.body}>
                We compare rates across partners so you can book with confidence. Member deals and
                seasonal promotions apply on select stays.
              </p>
            </div>
          </div>
        </section>

        <div className="text-center">
          <Link to="/hotels" className={infoPage.btn}>
            Search all hotels
          </Link>
        </div>
      </InfoPageContent>
    </PageLayout>
  );
};

export default HotelsFrancePage;

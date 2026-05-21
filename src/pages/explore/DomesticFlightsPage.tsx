import React from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../../components/PageLayout';
import MinimalPageHero from '../../components/common/MinimalPageHero';
import InfoPageContent, { infoPage } from '../../components/common/InfoPageContent';

const routes = [
  { from: 'Paris', to: 'Nice', duration: '1h 30m', price: 89, note: 'Coastal gateway to the Riviera' },
  { from: 'Paris', to: 'Lyon', duration: '1h 10m', price: 75, note: 'Food capital and business hub' },
  { from: 'Paris', to: 'Marseille', duration: '1h 25m', price: 82, note: 'Port city and Provence access' },
  { from: 'Paris', to: 'Bordeaux', duration: '1h 15m', price: 78, note: 'Wine region and Atlantic coast' },
  { from: 'Paris', to: 'Toulouse', duration: '1h 20m', price: 72, note: 'Pink city in the southwest' },
  { from: 'Lyon', to: 'Nice', duration: '1h 05m', price: 65, note: 'Cross-country without Paris' },
];

const DomesticFlightsPage: React.FC = () => {
  return (
    <PageLayout skipHeaderFooter={true}>
      <MinimalPageHero
        eyebrow="Discover"
        title="Domestic Flights"
        subtitle="Quick connections between major French cities—compare airlines, times, and fares in one search."
      />
      <InfoPageContent>
        <p className={infoPage.lead}>
          Flying within France saves time on longer routes. Paris to Nice by air takes under two
          hours versus six or more by train or car. Browse popular routes below or search all
          domestic flights.
        </p>

        <section className={`${infoPage.section} mt-12`}>
          <h2 className={infoPage.h2}>Popular routes</h2>
          <div className={`${infoPage.grid} mt-6`}>
            {routes.map((route) => (
              <div key={`${route.from}-${route.to}`} className={infoPage.card}>
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <p className="text-lg font-semibold text-slate-900">{route.from}</p>
                    <p className="text-slate-500">→ {route.to}</p>
                    <p className={`${infoPage.body} mt-2`}>{route.note}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xl font-bold text-blue-800">from €{route.price}</p>
                    <p className="text-sm text-slate-500">{route.duration}</p>
                  </div>
                </div>
                <Link to="/flights" className={`${infoPage.link} mt-4 inline-block`}>
                  Search this route →
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className={infoPage.section}>
          <h2 className={infoPage.h2}>Booking tips</h2>
          <ul className={infoPage.list}>
            <li>Book 2–3 weeks ahead for better fares on busy routes</li>
            <li>Compare Paris CDG and Orly for capital departures</li>
            <li>Check baggage allowances—low-cost carriers may charge extra</li>
            <li>Allow time for airport security on domestic flights</li>
          </ul>
        </section>

        <div className="text-center">
          <Link to="/flights" className={infoPage.btn}>
            Search all domestic flights
          </Link>
        </div>
      </InfoPageContent>
    </PageLayout>
  );
};

export default DomesticFlightsPage;

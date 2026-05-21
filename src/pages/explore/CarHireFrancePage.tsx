import React from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../../components/PageLayout';
import MinimalPageHero from '../../components/common/MinimalPageHero';
import InfoPageContent, { infoPage } from '../../components/common/InfoPageContent';

const locations = [
  { name: 'Paris CDG', detail: 'Main international hub—ideal for starting a road trip after arrival.' },
  { name: 'Paris Orly', detail: 'Closer to central Paris; good for short city extensions.' },
  { name: 'Nice Airport', detail: 'Pick up and explore the French Riviera and Provence.' },
  { name: 'Lyon Airport', detail: 'Gateway to Beaujolais, Alps, and central France.' },
  { name: 'Marseille Airport', detail: 'Access Calanques, Aix-en-Provence, and the coast.' },
  { name: 'Bordeaux Airport', detail: 'Perfect for wine country and Atlantic drives.' },
];

const CarHireFrancePage: React.FC = () => {
  return (
    <PageLayout skipHeaderFooter={true}>
      <MinimalPageHero
        eyebrow="Discover"
        title="Car Hire in France"
        subtitle="Rent at airports and city centers—explore regions at your own pace with flexible pickup and drop-off."
      />
      <InfoPageContent>
        <p className={infoPage.lead}>
          A rental car opens up villages, vineyards, and coastal roads that trains do not reach.
          Compare economy, SUV, and premium vehicles from trusted suppliers across France.
        </p>

        <section className={`${infoPage.section} mt-12`}>
          <h2 className={infoPage.h2}>Popular pickup locations</h2>
          <div className={`${infoPage.grid3} mt-6`}>
            {locations.map((loc) => (
              <div key={loc.name} className={infoPage.card}>
                <h3 className={infoPage.h3}>{loc.name}</h3>
                <p className={infoPage.body}>{loc.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={infoPage.section}>
          <h2 className={infoPage.h2}>Before you drive</h2>
          <div className={infoPage.grid}>
            <div className={infoPage.card}>
              <h3 className={infoPage.h3}>Documents</h3>
              <p className={infoPage.body}>
                Valid driving licence, passport or ID, and credit card in the main driver&apos;s name.
                Non-EU licences may require an International Driving Permit.
              </p>
            </div>
            <div className={infoPage.card}>
              <h3 className={infoPage.h3}>On the road</h3>
              <p className={infoPage.body}>
                Drive on the right. Many highways use toll péage. Urban low-emission zones (ZFE)
                may restrict older vehicles in cities like Paris and Lyon.
              </p>
            </div>
          </div>
        </section>

        <div className="text-center">
          <Link to="/cars" className={infoPage.btn}>
            Search car rentals
          </Link>
        </div>
      </InfoPageContent>
    </PageLayout>
  );
};

export default CarHireFrancePage;

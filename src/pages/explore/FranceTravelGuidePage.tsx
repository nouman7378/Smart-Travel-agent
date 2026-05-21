import React from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../../components/PageLayout';
import MinimalPageHero from '../../components/common/MinimalPageHero';
import InfoPageContent, { infoPage } from '../../components/common/InfoPageContent';

const destinations = [
  {
    name: 'Paris',
    description:
      'The capital offers world-class museums, iconic landmarks like the Eiffel Tower and Louvre, charming neighborhoods, and exceptional dining. Ideal for first-time visitors to France.',
  },
  {
    name: 'Provence',
    description:
      'Lavender fields, hilltop villages, and regional markets define this sun-drenched region. Perfect for slow travel, wine tasting, and countryside stays.',
  },
  {
    name: 'French Riviera',
    description:
      'From Nice to Cannes, enjoy Mediterranean beaches, luxury resorts, and vibrant coastal towns. Peak season runs June through August.',
  },
  {
    name: 'Loire Valley',
    description:
      'Explore Renaissance châteaux, scenic bike routes, and vineyards along the Loire River. A favorite for history lovers and wine enthusiasts.',
  },
  {
    name: 'Normandy',
    description:
      'Historic D-Day beaches, Mont-Saint-Michel, and fresh seafood. Best visited in late spring or early autumn for mild weather.',
  },
  {
    name: 'Alsace',
    description:
      'Half-timbered villages, Christmas markets, and a unique blend of French and German culture along the wine route.',
  },
];

const FranceTravelGuidePage: React.FC = () => {
  return (
    <PageLayout skipHeaderFooter={true}>
      <MinimalPageHero
        eyebrow="Discover"
        title="France Travel Guide"
        subtitle="Plan your trip with destination highlights, seasonal tips, and practical advice for traveling across France."
      />
      <InfoPageContent>
        <p className={infoPage.lead}>
          France remains one of Europe&apos;s most visited countries—from Paris city breaks to
          countryside escapes. Use this guide to choose where to go, when to visit, and how to get
          around.
        </p>

        <section className={`${infoPage.section} mt-12`}>
          <h2 className={infoPage.h2}>Top destinations</h2>
          <div className={`${infoPage.grid3} mt-6`}>
            {destinations.map((dest) => (
              <div key={dest.name} className={infoPage.card}>
                <h3 className={infoPage.h3}>{dest.name}</h3>
                <p className={infoPage.body}>{dest.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={infoPage.section}>
          <h2 className={infoPage.h2}>Travel essentials</h2>
          <div className={infoPage.grid}>
            <div className={infoPage.card}>
              <h3 className={infoPage.h3}>When to visit</h3>
              <ul className={infoPage.list}>
                <li>Spring (Apr–Jun): mild weather, fewer crowds</li>
                <li>Summer (Jul–Aug): peak season, book early</li>
                <li>Autumn (Sep–Oct): harvest season, comfortable temperatures</li>
                <li>Winter: ski resorts in the Alps; quieter cities</li>
              </ul>
            </div>
            <div className={infoPage.card}>
              <h3 className={infoPage.h3}>Good to know</h3>
              <ul className={infoPage.list}>
                <li>Currency: Euro (EUR)</li>
                <li>Language: French; English common in tourist areas</li>
                <li>Transport: TGV high-speed rail connects major cities</li>
                <li>EU citizens: valid ID; others may need a Schengen visa</li>
              </ul>
            </div>
          </div>
        </section>

        <section className={`${infoPage.card} text-center`}>
          <h2 className={infoPage.h2}>Ready to book?</h2>
          <p className={`${infoPage.body} mt-2 max-w-xl mx-auto`}>
            Search hotels, flights, and car hire for your French adventure.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <Link to="/explore/hotels-france" className={infoPage.btn}>
              Hotels in France
            </Link>
            <Link to="/flights" className={`${infoPage.link} self-center`}>
              Search flights
            </Link>
          </div>
        </section>
      </InfoPageContent>
    </PageLayout>
  );
};

export default FranceTravelGuidePage;

import React from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../../components/PageLayout';
import MinimalPageHero from '../../components/common/MinimalPageHero';
import InfoPageContent, { infoPage } from '../../components/common/InfoPageContent';

const deals = [
  {
    id: 1,
    title: 'Save up to 25% on Hotels',
    description: 'Book participating hotels and save on your next stay. Valid on select properties and dates. Members may receive additional discounts.',
    discount: '25% OFF',
    category: 'hotels',
  },
  {
    id: 2,
    title: 'Flight Deals Under €200',
    description: 'Discover reduced fares on popular European routes. Prices vary by date and availability—book early for the best rates.',
    discount: 'UP TO 30%',
    category: 'flights',
  },
  {
    id: 3,
    title: 'Package Deals',
    description: 'Bundle flights and hotels and save compared to booking separately. Perfect for city breaks and beach holidays.',
    discount: 'SAVE €200',
    category: 'packages',
  },
  {
    id: 4,
    title: 'Car Rental Specials',
    description: 'Great rates on car rentals at airports and city locations. Includes economy through premium vehicle classes.',
    discount: '15% OFF',
    category: 'cars',
  },
];

const DealsPage: React.FC = () => {
  return (
    <PageLayout skipHeaderFooter={true}>
      <MinimalPageHero
        eyebrow="Support"
        title="Exclusive Travel Deals"
        subtitle="Limited-time offers on flights, hotels, packages, and car rentals—updated regularly so you can travel for less."
      />
      <InfoPageContent>
        <p className={infoPage.lead}>
          Browse our current promotions below. Terms and availability apply; prices shown are
          starting rates and may change based on travel dates.
        </p>

        <div className={`${infoPage.grid} mt-12`}>
          {deals.map((deal) => (
            <div key={deal.id} className={infoPage.card}>
              <span className="inline-block px-3 py-1 bg-blue-950 text-white text-sm font-semibold rounded">
                {deal.discount}
              </span>
              <h3 className={`${infoPage.h3} mt-4`}>{deal.title}</h3>
              <p className={infoPage.body}>{deal.description}</p>
              <Link to={`/${deal.category}`} className={`${infoPage.btn} mt-6`}>
                View deals
              </Link>
            </div>
          ))}
        </div>

        <p className={`${infoPage.body} text-center mt-12`}>
          Sign in to your account to unlock member-only deals and price alerts.
        </p>
      </InfoPageContent>
    </PageLayout>
  );
};

export default DealsPage;

import React from 'react';
import PageLayout from '../components/PageLayout';
import MinimalPageHero from '../components/common/MinimalPageHero';
import InfoPageContent, { infoPage } from '../components/common/InfoPageContent';

const AdvertisingPage: React.FC = () => {
  return (
    <PageLayout skipHeaderFooter={true}>
      <MinimalPageHero
        eyebrow="Company"
        title="Advertising"
        subtitle="Reach millions of travelers planning trips—display ads, sponsored listings, and branded content on TravelHub."
      />
      <InfoPageContent>
        <p className={infoPage.lead}>
          TravelHub connects brands with a highly engaged audience actively searching for flights,
          hotels, cars, and packages. Our advertising solutions help you drive awareness, traffic,
          and bookings.
        </p>

        <section className={`${infoPage.section} mt-12`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { value: '50M+', label: 'Monthly visitors' },
              { value: '150+', label: 'Countries' },
              { value: '95%', label: 'Engagement rate' },
            ].map((stat) => (
              <div key={stat.label} className={`${infoPage.card} text-center`}>
                <p className="text-4xl font-bold text-blue-950">{stat.value}</p>
                <p className={`${infoPage.body} mt-2`}>{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={infoPage.section}>
          <h2 className={infoPage.h2}>Advertising solutions</h2>
          <div className={infoPage.grid}>
            <div className={infoPage.card}>
              <h3 className={infoPage.h3}>Display advertising</h3>
              <p className={infoPage.body}>
                Banner ads, native placements, and sponsored content across search results, listing
                pages, and confirmation flows. Target by destination, travel dates, and traveler
                segment.
              </p>
            </div>
            <div className={infoPage.card}>
              <h3 className={infoPage.h3}>Sponsored listings</h3>
              <p className={infoPage.body}>
                Premium placement for hotels, destinations, and services in relevant search results.
                Pay for visibility when travelers are ready to book.
              </p>
            </div>
          </div>
        </section>

        <section className={infoPage.section}>
          <h2 className={infoPage.h2}>Who advertises with us</h2>
          <p className={infoPage.body}>
            Airlines, hotel groups, tourism boards, car rental brands, travel insurance, and
            lifestyle brands use TravelHub to reach travelers at the moment of intent. Contact our
            media team for rate cards and campaign planning.
          </p>
          <p className={`${infoPage.body} mt-4`}>
            Email: <strong className="text-slate-800">advertising@travelhub.com</strong>
          </p>
        </section>
      </InfoPageContent>
    </PageLayout>
  );
};

export default AdvertisingPage;

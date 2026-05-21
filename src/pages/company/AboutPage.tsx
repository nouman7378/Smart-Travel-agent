import React from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../../components/PageLayout';
import MinimalPageHero from '../../components/common/MinimalPageHero';
import InfoPageContent, { infoPage } from '../../components/common/InfoPageContent';

const CompanyAboutPage: React.FC = () => {
  return (
    <PageLayout skipHeaderFooter={true}>
      <MinimalPageHero
        eyebrow="Company"
        title="About"
        subtitle="Learn more about TravelHub, our mission, and how we help travelers worldwide."
      />
      <InfoPageContent>
        <p className={infoPage.lead}>
          TravelHub connects travelers with flights, hotels, car rentals, and packages in one place.
          We focus on clear pricing, reliable bookings, and support when you need it.
        </p>
        <section className={`${infoPage.section} mt-12`}>
          <div className={infoPage.grid}>
            <div className={infoPage.card}>
              <h3 className={infoPage.h3}>Our story</h3>
              <p className={infoPage.body}>
                We started with a simple goal: make travel planning less stressful. Today we partner
                with suppliers around the world to offer real inventory and competitive rates.
              </p>
            </div>
            <div className={infoPage.card}>
              <h3 className={infoPage.h3}>Contact</h3>
              <p className={infoPage.body}>
                For general inquiries, partnerships, or press, visit our main About page or Support
                center.
              </p>
              <Link to="/about" className={`${infoPage.link} mt-4 inline-block`}>
                Full about page →
              </Link>
            </div>
          </div>
        </section>
      </InfoPageContent>
    </PageLayout>
  );
};

export default CompanyAboutPage;

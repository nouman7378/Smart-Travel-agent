import React from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import MinimalPageHero from '../components/common/MinimalPageHero';
import InfoPageContent, { infoPage } from '../components/common/InfoPageContent';

const values = [
  { title: 'Traveler first', text: 'Every product decision starts with what helps you plan and book with confidence.' },
  { title: 'Transparency', text: 'Clear pricing, honest policies, and no hidden fees at checkout.' },
  { title: 'Innovation', text: 'AI-assisted search, personalized recommendations, and tools that save you time.' },
  { title: 'Partnership', text: 'We work with airlines, hotels, and local providers to offer real inventory and support.' },
];

const stats = [
  { value: '10M+', label: 'Travelers served' },
  { value: '150+', label: 'Countries' },
  { value: '50K+', label: 'Partner properties' },
  { value: '24/7', label: 'Customer support' },
];

const AboutPage: React.FC = () => {
  return (
    <PageLayout skipHeaderFooter={true}>
      <MinimalPageHero
        eyebrow="Company"
        title="About TravelHub"
        subtitle="We power global travel for everyone, everywhere—making it easier to discover, plan, and book your next adventure."
      />
      <InfoPageContent>
        <p className={infoPage.lead}>
          TravelHub brings together flights, hotels, car rentals, and packages on one platform.
          Founded with a simple idea—that travel planning should be straightforward—we now help
          millions of travelers each year find the right trip at the right price.
        </p>

        <section className={`${infoPage.section} mt-12`}>
          <h2 className={infoPage.h2}>Our mission & vision</h2>
          <div className={infoPage.grid}>
            <div className={infoPage.card}>
              <h3 className={infoPage.h3}>Mission</h3>
              <p className={infoPage.body}>
                Make travel accessible and enjoyable for everyone through technology, trusted
                partners, and support when plans change.
              </p>
            </div>
            <div className={infoPage.card}>
              <h3 className={infoPage.h3}>Vision</h3>
              <p className={infoPage.body}>
                Become the most trusted travel companion—from the first search to the moment you
                return home.
              </p>
            </div>
          </div>
        </section>

        <section className={infoPage.section}>
          <h2 className={infoPage.h2}>What we stand for</h2>
          <div className={`${infoPage.grid} mt-6`}>
            {values.map((v) => (
              <div key={v.title} className={infoPage.card}>
                <h3 className={infoPage.h3}>{v.title}</h3>
                <p className={infoPage.body}>{v.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={infoPage.section}>
          <h2 className={infoPage.h2}>By the numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
            {stats.map((s) => (
              <div key={s.label} className={`${infoPage.card} text-center`}>
                <p className="text-3xl font-bold text-blue-950">{s.value}</p>
                <p className={`${infoPage.body} mt-2`}>{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={`${infoPage.card} text-center`}>
          <h2 className={infoPage.h2}>Get in touch</h2>
          <p className={`${infoPage.body} max-w-xl mx-auto mt-2`}>
            Partnerships, press, careers, or general inquiries—we are here to help.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mt-6">
            <Link to="/partnerships" className={infoPage.link}>Partnerships</Link>
            <Link to="/jobs" className={infoPage.link}>Careers</Link>
            <Link to="/support" className={infoPage.link}>Support</Link>
          </div>
        </section>
      </InfoPageContent>
    </PageLayout>
  );
};

export default AboutPage;

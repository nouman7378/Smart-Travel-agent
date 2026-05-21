import React from 'react';
import PageLayout from '../components/PageLayout';
import MinimalPageHero from '../components/common/MinimalPageHero';
import InfoPageContent, { infoPage } from '../components/common/InfoPageContent';
import { Handshake, Laptop, Megaphone, Palette, Settings } from 'lucide-react';

const jobCategories = [
  { title: 'Engineering', description: 'Build scalable systems for search, booking, and payments. Full-stack, backend, and mobile roles.', icon: Laptop, count: 25 },
  { title: 'Product & Design', description: 'Shape experiences travelers use every day. UX research, UI design, and product management.', icon: Palette, count: 15 },
  { title: 'Marketing', description: 'Brand, performance, and content marketing across global markets.', icon: Megaphone, count: 20 },
  { title: 'Customer Support', description: 'Help travelers before, during, and after their trips—in multiple languages.', icon: Handshake, count: 30 },
  { title: 'Sales & Partnerships', description: 'Grow relationships with hotels, airlines, and travel suppliers.', icon: Handshake, count: 18 },
  { title: 'Operations', description: 'Finance, legal, HR, and operations that keep the business running.', icon: Settings, count: 12 },
];

const perks = [
  'Competitive salary and equity where applicable',
  'Health, dental, and wellness benefits',
  'Flexible remote and hybrid work',
  'Learning budget and conference attendance',
  'Travel discounts and team trips',
];

const JobsPage: React.FC = () => {
  return (
    <PageLayout skipHeaderFooter={true}>
      <MinimalPageHero
        eyebrow="Company"
        title="Join Our Team"
        subtitle="Help us shape the future of travel. Explore open roles across engineering, design, marketing, and more."
      />
      <InfoPageContent>
        <p className={infoPage.lead}>
          We are a growing team passionate about technology and travel. If you want to work on
          products used by millions of people—and learn from colleagues around the world—we would
          love to hear from you.
        </p>

        <section className={`${infoPage.section} mt-12`}>
          <h2 className={infoPage.h2}>Open departments</h2>
          <div className={`${infoPage.grid3} mt-6`}>
            {jobCategories.map(({ title, description, icon: Icon, count }) => (
              <div key={title} className={infoPage.card}>
                <Icon className="w-8 h-8 text-blue-800 mb-4" />
                <h3 className={infoPage.h3}>{title}</h3>
                <p className={infoPage.body}>{description}</p>
                <p className="text-blue-800 font-semibold mt-4">{count} open positions</p>
              </div>
            ))}
          </div>
        </section>

        <section className={infoPage.section}>
          <h2 className={infoPage.h2}>Why work at TravelHub?</h2>
          <div className={`${infoPage.card} bg-blue-950 text-blue-100 border-blue-900`}>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-base">
              {perks.map((perk) => (
                <li key={perk} className="flex items-start gap-2">
                  <span className="text-blue-300">✓</span>
                  {perk}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <p className={`${infoPage.body} text-center`}>
          Send your CV to <strong className="text-slate-800">careers@travelhub.com</strong> with the role title in the subject line.
        </p>
      </InfoPageContent>
    </PageLayout>
  );
};

export default JobsPage;

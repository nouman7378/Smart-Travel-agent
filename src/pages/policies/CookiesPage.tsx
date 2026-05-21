import React from 'react';
import PageLayout from '../../components/PageLayout';
import MinimalPageHero from '../../components/common/MinimalPageHero';
import InfoPageContent, { infoPage } from '../../components/common/InfoPageContent';

const CookiesPage: React.FC = () => {
  return (
    <PageLayout skipHeaderFooter={true}>
      <MinimalPageHero
        eyebrow="Support"
        title="Cookie Policy"
        subtitle="How we use cookies and similar technologies on TravelHub."
      />
      <InfoPageContent narrow>
        <p className={`${infoPage.body} text-center mb-10`}>Last updated: December 2024</p>
        <div className={`${infoPage.card} space-y-10`}>
          <section>
            <h2 className={infoPage.h2}>What are cookies?</h2>
            <p className={infoPage.body}>
              Cookies are small text files placed on your device when you visit our website. They
              help us remember your preferences, keep you signed in, and understand how you use our
              platform so we can improve it.
            </p>
          </section>
          <section>
            <h2 className={infoPage.h2}>Types of cookies we use</h2>
            <div className="space-y-6 mt-4">
              <div>
                <h3 className={infoPage.h3}>Essential cookies</h3>
                <p className={infoPage.body}>
                  Required for the website to function—for example, login sessions, security, and
                  shopping cart. These cannot be disabled.
                </p>
              </div>
              <div>
                <h3 className={infoPage.h3}>Analytics cookies</h3>
                <p className={infoPage.body}>
                  Help us understand how visitors interact with pages and features so we can improve
                  performance and usability.
                </p>
              </div>
              <div>
                <h3 className={infoPage.h3}>Marketing cookies</h3>
                <p className={infoPage.body}>
                  Used to deliver relevant advertisements and measure campaign effectiveness. You
                  can opt out through your browser or our cookie preferences where available.
                </p>
              </div>
            </div>
          </section>
          <section>
            <h2 className={infoPage.h2}>Managing cookies</h2>
            <p className={infoPage.body}>
              You can control and delete cookies through your browser settings. Disabling essential
              cookies may prevent you from signing in or completing bookings. For questions, contact
              privacy@travelhub.com.
            </p>
          </section>
        </div>
      </InfoPageContent>
    </PageLayout>
  );
};

export default CookiesPage;

import React from 'react';
import PageLayout from '../../components/PageLayout';
import MinimalPageHero from '../../components/common/MinimalPageHero';
import InfoPageContent, { infoPage } from '../../components/common/InfoPageContent';

const PrivacyPage: React.FC = () => {
  return (
    <PageLayout skipHeaderFooter={true}>
      <MinimalPageHero
        eyebrow="Support"
        title="Privacy Policy"
        subtitle="How we collect, use, and protect your personal information when you use TravelHub."
      />
      <InfoPageContent narrow>
        <p className={`${infoPage.body} text-center mb-10`}>Last updated: December 2024</p>
        <div className={`${infoPage.card} space-y-10`}>
          <section>
            <h2 className={infoPage.h2}>1. Information we collect</h2>
            <p className={infoPage.body}>
              We collect information you provide when booking or creating an account, including
              name, email, phone number, payment information, and travel preferences. We also
              collect usage data such as pages visited, searches, and device information to improve
              our services.
            </p>
          </section>
          <section>
            <h2 className={infoPage.h2}>2. How we use your information</h2>
            <p className={infoPage.body}>
              Your data is used to process bookings, send confirmations, provide customer support,
              personalize recommendations, prevent fraud, and comply with legal obligations. We may
              send marketing communications if you have opted in—you can unsubscribe at any time.
            </p>
          </section>
          <section>
            <h2 className={infoPage.h2}>3. Information sharing</h2>
            <p className={infoPage.body}>
              We share information with airlines, hotels, car rental companies, and payment
              processors as needed to fulfill your bookings. We do not sell your personal data to
              third parties for their marketing purposes.
            </p>
          </section>
          <section>
            <h2 className={infoPage.h2}>4. Data security</h2>
            <p className={infoPage.body}>
              We use industry-standard encryption and security measures to protect your data.
              Payment card details are processed by certified payment providers and are not stored on
              our servers in full.
            </p>
          </section>
          <section>
            <h2 className={infoPage.h2}>5. Your rights</h2>
            <p className={infoPage.body}>
              Depending on your location, you may have the right to access, correct, delete, or
              export your personal data, and to object to certain processing. Contact
              privacy@travelhub.com to exercise these rights.
            </p>
          </section>
        </div>
      </InfoPageContent>
    </PageLayout>
  );
};

export default PrivacyPage;

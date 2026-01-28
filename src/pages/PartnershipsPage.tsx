/**
 * PartnershipsPage Component
 * 
 * Complete Partnerships page matching Expedia Partner Central structure
 * Using project's color scheme and styling
 */

import React from 'react';
import PageLayout from '../components/PageLayout';
import PartnershipsHero from '../components/partnerships/PartnershipsHero';
import BenefitsGrid from '../components/partnerships/BenefitsGrid';
import PartnerReasons from '../components/partnerships/PartnerReasons';
import HowItWorks from '../components/partnerships/HowItWorks';
import Testimonials from '../components/partnerships/Testimonials';
import JoinCTA from '../components/partnerships/JoinCTA';

const PartnershipsPage: React.FC = () => {
  return (
    <PageLayout skipHeaderFooter={true}>
      <div className="min-h-screen bg-white">
        {/* 1. Hero Section */}
        <PartnershipsHero />

        {/* 2. Benefits Grid */}
        <BenefitsGrid />

        {/* 3. Partner Reasons (Image + Text Blocks) */}
        <PartnerReasons />

        {/* 4. How It Works */}
        <HowItWorks />

        {/* 5. Testimonials / Trust Section */}
        <Testimonials />

        {/* 6. Join CTA Section */}
        <JoinCTA />
      </div>
    </PageLayout>
  );
};

export default PartnershipsPage;

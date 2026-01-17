/**
 * AboutPage Component
 * 
 * Complete About page with Expedia-style structure
 * Using project's color scheme and styling
 */

import React from 'react';
import PageLayout from '../components/PageLayout';
import AboutHero from '../components/about/AboutHero';
import AboutIntroduction from '../components/about/AboutIntroduction';
import MissionVision from '../components/about/MissionVision';
import ValuesGrid from '../components/about/ValuesGrid';
import CommitmentSection from '../components/about/CommitmentSection';
import StatsSection from '../components/about/StatsSection';
import BrandsSection from '../components/about/BrandsSection';
import TimelineSection from '../components/about/TimelineSection';
import CTASection from '../components/about/CTASection';

const AboutPage: React.FC = () => {
  return (
    <PageLayout>
      <div className="min-h-screen bg-white">
        {/* 1. Hero Section */}
        <AboutHero />

        {/* 2. About Us Introduction */}
        <AboutIntroduction />

        {/* 3. Mission + Vision */}
        <MissionVision />

        {/* 4. Values Grid */}
        <ValuesGrid />

        {/* 5. Our Commitment */}
        <CommitmentSection />

        {/* 6. Statistics Section */}
        <StatsSection />

        {/* 7. Our Brands */}
        <BrandsSection />

        {/* 8. Timeline/Journey */}
        <TimelineSection />

        {/* 9. CTA Section */}
        <CTASection />
      </div>
    </PageLayout>
  );
};

export default AboutPage;

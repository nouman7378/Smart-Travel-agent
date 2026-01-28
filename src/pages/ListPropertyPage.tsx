/**
 * ListPropertyPage Component
 * 
 * Complete List Your Property page with Expedia-style structure
 * Using project's color scheme and styling
 */

import React from 'react';
import PageLayout from '../components/PageLayout';
import Hero from '../components/listYourProperty/Hero';
import PropertyTypes from '../components/listYourProperty/PropertyTypes';
import Steps from '../components/listYourProperty/Steps';
import Benefits from '../components/listYourProperty/Benefits';
import RevenueGrowth from '../components/listYourProperty/RevenueGrowth';
import Security from '../components/listYourProperty/Security';
import Partners from '../components/listYourProperty/Partners';
import CallToAction from '../components/listYourProperty/CallToAction';

const ListPropertyPage: React.FC = () => {
  return (
    <PageLayout skipHeaderFooter={true}>
      <div className="min-h-screen bg-white">
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. Property Types Grid */}
        <PropertyTypes />

        {/* 3. How It Works (3 Steps) */}
        <Steps />

        {/* 4. Why Partner with Us (Benefits) */}
        <Benefits />

        {/* 5. Revenue & Business Growth */}
        <RevenueGrowth />

        {/* 6. Trust & Security */}
        <Security />

        {/* 7. Partner Network Logos */}
        <Partners />

        {/* 8. Sign Up CTA Section */}
        <CallToAction />
      </div>
    </PageLayout>
  );
};

export default ListPropertyPage;

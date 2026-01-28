/**
 * JobPage Component
 * 
 * Careers page with Expedia-style structure
 * Using project's color scheme and styling
 */

import React from 'react';
import PageLayout from '../components/PageLayout';
import JobHero from '../components/job/JobHero';
import JobSearch from '../components/job/JobSearch';
import JobCategories from '../components/job/JobCategories';
import LifeAt from '../components/job/LifeAt';
import Values from '../components/job/Values';
import Locations from '../components/job/Locations';
import Diversity from '../components/job/Diversity';

const JobPage: React.FC = () => {
  return (
    <PageLayout skipHeaderFooter={true}>
      <div className="min-h-screen bg-white">
        {/* 1. Hero Section */}
        <JobHero />

        {/* 2. Job Search Bar */}
        <JobSearch />

        {/* 3. Job Categories Grid */}
        <JobCategories />

        {/* 4. Life at TravelHub */}
        <LifeAt />

        {/* 5. Culture & Values */}
        <Values />

        {/* 6. Global Offices */}
        <Locations />

        {/* 7. Diversity & Inclusion */}
        <Diversity />
      </div>
    </PageLayout>
  );
};

export default JobPage;


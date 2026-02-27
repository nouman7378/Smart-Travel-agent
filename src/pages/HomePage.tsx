/**
 * HomePage Component
 * 
 * This component is part of the Expedia.fr Home Page replication for our FYP.
 * Each component is modular and reusable.
 * 
 * This is the main page that combines all the modular components:
 * - Header (Navigation Bar)
 * - Hero Section (Search for Flights, Hotels, Cars)
 * - Popular Destinations / Deals Section
 * - Travel Categories Section
 * - Featured Hotels / Offers Section
 * - Newsletter / Sign-Up Section
 * - Footer
 */

import React from 'react';
import Hero from '../components/Hero';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Main Search with all content */}
      <Hero />
    </div>
  );
};

export default HomePage;


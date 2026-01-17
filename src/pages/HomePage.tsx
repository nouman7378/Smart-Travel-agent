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
import PopularDestinations from '../components/PopularDestinations';
import TravelCategories from '../components/TravelCategories';
import FeaturedHotels from '../components/FeaturedHotels';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Main Search */}
      <Hero />

      {/* Popular Destinations Section */}
      <PopularDestinations />

      {/* Travel Categories Section */}
      <TravelCategories />

      {/* Featured Hotels Section */}
      <FeaturedHotels />
    </div>
  );
};

export default HomePage;


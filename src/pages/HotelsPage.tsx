/**
 * HotelsPage Component
 * 
 * Dedicated page for hotel searches and results
 * Part of the TravelHub application
 */

import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import EmojiIcon from '../components/common/EmojiIcon';
import Stats from '../components/common/Stats';
import PopularDestinations from '../components/PopularDestinations';
import TravelCategories from '../components/TravelCategories';
import FeaturedHotels from '../components/FeaturedHotels';
import { Banknote, Building, Star } from 'lucide-react';


const HotelsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Hotel Search */}
      <Hero className="!min-h-fit pt-12 pb-12 md:pt-16 md:pb-16" hideTag smallTitle hideStats />
      
      {/* Standalone Stats Section */}
      <Stats />

      {/* Popular Destinations Section */}
      <PopularDestinations />

      {/* Travel Categories Section */}
      {/* <TravelCategories /> */}

      {/* Featured Hotels Section */}
      <FeaturedHotels />
      
    
    </div>
  );
};

export default HotelsPage;


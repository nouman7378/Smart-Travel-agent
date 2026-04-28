/**
 * PackageSuggestionsPage Component
 * 
 * AI-powered travel package recommendations.
 * Part of the AI Travel Chatbot application.
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PageLayout from '../../components/PageLayout';
import { Check, MapPin, Star } from 'lucide-react';


interface TravelPackage {
  id: string;
  title: string;
  destination: string;
  duration: string;
  price: number;
  originalPrice?: number;
  type: 'luxury' | 'budget' | 'romantic' | 'family' | 'adventure';
  description: string;
  imageUrl: string;
  includes: string[];
  rating: number;
  reviews: number;
}

const PackageSuggestionsPage: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [packages] = useState<TravelPackage[]>([
    {
      id: '1',
      title: 'Luxury Paris Getaway',
      destination: 'Paris, France',
      duration: '5 Days / 4 Nights',
      price: 2500,
      originalPrice: 3000,
      type: 'luxury',
      description:
        'Experience the City of Light in ultimate luxury with 5-star accommodations, fine dining, and exclusive experiences.',
      imageUrl: 'https://via.placeholder.com/400x300',
      includes: [
        '5-star hotel accommodation',
        'Daily breakfast',
        'Airport transfers',
        'Eiffel Tower skip-the-line tickets',
        'Fine dining experiences',
      ],
      rating: 4.8,
      reviews: 245,
    },
    {
      id: '2',
      title: 'Budget-Friendly Tokyo Adventure',
      destination: 'Tokyo, Japan',
      duration: '7 Days / 6 Nights',
      price: 1200,
      type: 'budget',
      description:
        'Explore Tokyo on a budget without compromising on experiences. Perfect for solo travelers and backpackers.',
      imageUrl: 'https://via.placeholder.com/400x300',
      includes: [
        'Budget hotel accommodation',
        'JR Pass for 7 days',
        'City tour',
        'Traditional meal experiences',
        'Temple visits',
      ],
      rating: 4.5,
      reviews: 189,
    },
    {
      id: '3',
      title: 'Romantic Santorini Escape',
      destination: 'Santorini, Greece',
      duration: '4 Days / 3 Nights',
      price: 1800,
      originalPrice: 2200,
      type: 'romantic',
      description:
        'Perfect romantic getaway with stunning sunsets, private villas, and intimate dining experiences.',
      imageUrl: 'https://via.placeholder.com/400x300',
      includes: [
        'Luxury villa with private pool',
        'Sunset cruise',
        'Private chef dinner',
        'Wine tasting tour',
        'Couples spa treatment',
      ],
      rating: 4.9,
      reviews: 312,
    },
    {
      id: '4',
      title: 'Family Fun in Orlando',
      destination: 'Orlando, USA',
      duration: '6 Days / 5 Nights',
      price: 2200,
      type: 'family',
      description:
        'Magical family vacation with theme park tickets, family-friendly accommodations, and endless fun.',
      imageUrl: 'https://via.placeholder.com/400x300',
      includes: [
        'Family suite accommodation',
        'Theme park tickets',
        'Character dining',
        'Water park access',
        'Airport transfers',
      ],
      rating: 4.7,
      reviews: 456,
    },
    {
      id: '5',
      title: 'Adventure Safari in Kenya',
      destination: 'Nairobi, Kenya',
      duration: '8 Days / 7 Nights',
      price: 3200,
      type: 'adventure',
      description:
        'Thrilling safari experience with wildlife viewing, camping, and authentic African experiences.',
      imageUrl: 'https://via.placeholder.com/400x300',
      includes: [
        'Safari lodge accommodation',
        'Game drives',
        'Professional guide',
        'All meals included',
        'Airport transfers',
      ],
      rating: 4.9,
      reviews: 278,
    },
  ]);

  const packageTypes = [
    { id: 'all', label: 'All Packages' },
    { id: 'luxury', label: 'Luxury' },
    { id: 'budget', label: 'Budget' },
    { id: 'romantic', label: 'Romantic' },
    { id: 'family', label: 'Family' },
    { id: 'adventure', label: 'Adventure' },
  ];

  const filteredPackages =
    selectedType === 'all'
      ? packages
      : packages.filter((pkg) => pkg.type === selectedType);

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      luxury: 'bg-purple-100 text-purple-700',
      budget: 'bg-green-100 text-green-700',
      romantic: 'bg-pink-100 text-pink-700',
      family: 'bg-blue-100 text-blue-700',
      adventure: 'bg-orange-100 text-orange-700',
    };
    return colors[type] || 'bg-gray-100 text-gray-700';
  };

  return (
    <PageLayout skipHeaderFooter={true}>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              AI-Powered Travel Packages
            </h1>
            <p className="text-lg text-gray-600">
              Discover personalized travel packages tailored to your preferences
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {packageTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  selectedType === type.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>

          {/* Packages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPackages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative">
                  <img
                    src={pkg.imageUrl}
                    alt={pkg.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(
                        pkg.type
                      )}`}
                    >
                      {pkg.type.charAt(0).toUpperCase() + pkg.type.slice(1)}
                    </span>
                  </div>
                  {pkg.originalPrice && (
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-red-500 text-white rounded-full text-xs font-semibold">
                        Save ${pkg.originalPrice - pkg.price}
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {pkg.title}
                    </h3>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500"><Star className="inline w-5 h-5" /></span>
                      <span className="text-sm font-semibold">
                        {pkg.rating}
                      </span>
                      <span className="text-xs text-gray-500">
                        ({pkg.reviews})
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-3">
                    <MapPin className="inline w-5 h-5" /> {pkg.destination} • ⏱️ {pkg.duration}
                  </p>

                  <p className="text-sm text-gray-700 mb-4 line-clamp-2">
                    {pkg.description}
                  </p>

                  <div className="mb-4">
                    <p className="text-xs font-semibold text-gray-700 mb-2">
                      Includes:
                    </p>
                    <ul className="space-y-1">
                      {pkg.includes.slice(0, 3).map((item, idx) => (
                        <li key={idx} className="text-xs text-gray-600 flex items-center gap-2">
                          <span className="text-green-500"><Check className="inline w-5 h-5" /></span>
                          {item}
                        </li>
                      ))}
                      {pkg.includes.length > 3 && (
                        <li className="text-xs text-blue-600">
                          +{pkg.includes.length - 3} more
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div>
                      {pkg.originalPrice && (
                        <p className="text-xs text-gray-500 line-through">
                          ${pkg.originalPrice}
                        </p>
                      )}
                      <p className="text-2xl font-bold text-blue-600">
                        ${pkg.price}
                      </p>
                      <p className="text-xs text-gray-500">per person</p>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredPackages.length === 0 && (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <p className="text-gray-600">No packages found for this category</p>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default PackageSuggestionsPage;


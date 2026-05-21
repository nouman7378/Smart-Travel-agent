import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getPlaceholderImage } from '@/utils/imagePlaceholder';

interface Destination {
  id: number;
  name: string;
  country: string;
  image: string;
  price: number;
  currency: string;
  description: string;
  rating: number;
  type: 'national' | 'international';
}

interface PopularDestinationsProps {
  className?: string;
}

const PopularDestinations: React.FC<PopularDestinationsProps> = ({ className = '' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'all' | 'national' | 'international'>('all');

  const destinations: Destination[] = [
    // National Destinations (Pakistan)
    {
      id: 1,
      name: 'Hunza',
      country: 'Pakistan',
      image: 'https://images.unsplash.com/photo-1588417109557-2dd9eef003b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      price: 120,
      currency: 'USD',
      description: 'Heaven on Earth with stunning mountain views',
      rating: 4.9,
      type: 'national',
    },
    {
      id: 2,
      name: 'Skardu',
      country: 'Pakistan',
      image: 'https://images.unsplash.com/photo-1599733875147-259887f4603e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      price: 150,
      currency: 'USD',
      description: 'Gateway to the world highest peaks',
      rating: 4.8,
      type: 'national',
    },
    {
      id: 3,
      name: 'Swat',
      country: 'Pakistan',
      image: 'https://images.unsplash.com/photo-1629365638310-85c13aa4ffd4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      price: 90,
      currency: 'USD',
      description: 'The Switzerland of Pakistan',
      rating: 4.7,
      type: 'national',
    },
    {
      id: 4,
      name: 'Lahore',
      country: 'Pakistan',
      image: 'https://images.unsplash.com/photo-1598864204883-362aac8c5a49?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      price: 80,
      currency: 'USD',
      description: 'City of gardens and rich Mughal heritage',
      rating: 4.6,
      type: 'national',
    },
    {
      id: 5,
      name: 'Murree',
      country: 'Pakistan',
      image: 'https://images.unsplash.com/photo-1578664785546-73ce78d71b9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      price: 70,
      currency: 'USD',
      description: 'Popular hill station near Islamabad',
      rating: 4.5,
      type: 'national',
    },
    {
      id: 6,
      name: 'Karachi',
      country: 'Pakistan',
      image: 'https://images.unsplash.com/photo-1593081891731-fdaab2e7f6aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      price: 100,
      currency: 'USD',
      description: 'City of lights and economic hub',
      rating: 4.4,
      type: 'national',
    },
    // International Destinations
    {
      id: 7,
      name: 'Paris',
      country: 'France',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      price: 450,
      currency: 'USD',
      description: 'The City of Light',
      rating: 4.8,
      type: 'international',
    },
    {
      id: 8,
      name: 'Tokyo',
      country: 'Japan',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      price: 680,
      currency: 'USD',
      description: 'Modern meets traditional',
      rating: 4.9,
      type: 'international',
    },
    {
      id: 9,
      name: 'Dubai',
      country: 'UAE',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      price: 550,
      currency: 'USD',
      description: 'Luxury and innovation',
      rating: 4.9,
      type: 'international',
    },
    {
      id: 10,
      name: 'Bali',
      country: 'Indonesia',
      image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      price: 380,
      currency: 'USD',
      description: 'Tropical paradise',
      rating: 4.8,
      type: 'international',
    },
    {
      id: 11,
      name: 'London',
      country: 'UK',
      image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      price: 490,
      currency: 'USD',
      description: 'Historic and vibrant',
      rating: 4.6,
      type: 'international',
    },
    {
      id: 12,
      name: 'New York',
      country: 'USA',
      image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      price: 520,
      currency: 'USD',
      description: 'The Big Apple',
      rating: 4.7,
      type: 'international',
    },
  ];

  const filteredDestinations = destinations.filter(destination => {
    if (activeTab === 'all') return true;
    return destination.type === activeTab;
  });

  const destinationsPerView = 3;
  const maxIndex = Math.max(0, filteredDestinations.length - destinationsPerView);
  const visibleDestinations = filteredDestinations.slice(currentIndex, currentIndex + destinationsPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  return (
    <section className={`py-12 md:py-16 bg-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Popular Destinations</h2>
          <div className="flex flex-wrap gap-2">
            {(['all', 'national', 'international'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => {
                  setActiveTab(tab);
                  setCurrentIndex(0);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab === 'all' ? 'All' : tab === 'national' ? 'Pakistan' : 'International'}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 mb-6">
          <button
            type="button"
            onClick={prevSlide}
            className="p-2 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors"
            aria-label="Previous destinations"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={nextSlide}
            className="p-2 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors"
            aria-label="Next destinations"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleDestinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Destination Card Component - Featured Hotels Style
const DestinationCard: React.FC<{ destination: Destination }> = ({ destination }) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const imageSrc = imageError ? getPlaceholderImage('destination') : destination.image;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 group cursor-pointer"
      onClick={() => navigate(`/search/hotels?destination=${destination.name}`)}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gray-200">
        {imageLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
            <div className="w-8 h-8 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
          </div>
        )}
        <motion.img
          src={imageSrc}
          alt={destination.name}
          className={`w-full h-full object-cover ${imageLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          onError={handleImageError}
          onLoad={handleImageLoad}
          loading="lazy"
        />

        {/* Type Badge */}
        <div className={`absolute top-3 left-3 px-2 py-1 rounded text-xs font-medium ${destination.type === 'national'
            ? 'bg-green-100 text-green-800 border border-green-200'
            : 'bg-blue-100 text-blue-800 border border-blue-200'
          }`}>
          {destination.type === 'national' ? 'National' : 'International'}
        </div>

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center space-x-1">
          <svg className="h-3 w-3 text-yellow-500 fill-current" viewBox="0 0 20 20">
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
          <span className="text-xs font-medium text-gray-900">{destination.rating}</span>
        </div>

        {/* Destination Name Overlay */}
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-lg font-semibold text-white mb-1">
            {destination.name}
          </h3>
          <p className="text-white/90 text-xs">{destination.country}</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
          {destination.name}
        </h3>
        <p className="text-gray-600 text-sm mb-3 flex items-center">
          <svg className="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          {destination.country}
        </p>

        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          {destination.description}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <span className="text-xl font-semibold text-gray-900">
              ${destination.price}
            </span>
            <span className="text-gray-500 text-xs ml-1">per person</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-3 py-2 bg-gray-900 hover:bg-gray-800 text-white font-normal rounded-lg transition-colors text-xs"
          >
            View Deal
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default PopularDestinations;
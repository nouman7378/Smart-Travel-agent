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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compact Tourism Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden mb-12"
        >
          <div className="flex flex-col md:flex-row items-center">
            {/* Text Side */}
            <div className="p-8 md:p-10 lg:p-12 md:w-3/5">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl md:text-3xl font-light text-gray-900 mb-2">
                  Pakistan: <span className="font-bold">Tourism's Next Big Thing</span>
                </h2>
                <p className="text-gray-500 text-sm mb-6">— Lonely Planet</p>
                
                <p className="text-gray-600 text-sm md:text-base mb-8 max-w-md">
                  Experience the breathtaking beauty, vibrant culture, and legendary hospitality of Pakistan.
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {['Hunza', 'Skardu', 'Lahore', 'Karachi'].map((city) => (
                    <span 
                      key={city}
                      className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-600"
                    >
                      {city}
                    </span>
                  ))}
                </div>

                <button className="text-blue-600 hover:text-blue-700 font-bold text-sm flex items-center space-x-2 group">
                  <span>Explore Pakistan</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                </button>
              </motion.div>
            </div>

            {/* Image Side - Smaller and cropped better */}
            <div className="hidden md:block md:w-2/5 h-64 md:h-80 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?auto=format&fit=crop&w=800&q=80"
                alt="Pakistan Landscape"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>

        {/* Section Header - Featured Hotels Style */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-3">
            Popular <span className="font-semibold">Destinations</span>
          </h2>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Discover amazing places with our best deals - National & International
          </p>
        </motion.div>

        {/* Category Tabs - Centered */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center space-x-2 mb-8"
        >
          {[
            { id: 'all', label: 'All Destinations' },
            { id: 'national', label: 'National' },
            { id: 'international', label: 'International' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                setCurrentIndex(0);
              }}
              className={`px-6 py-2 rounded-lg font-normal transition-all duration-200 border ${
                activeTab === tab.id
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Destinations Grid/Carousel - Featured Hotels Style */}
        <div className="relative">
          {/* Mobile: Show all in grid */}
          <div className="md:hidden grid grid-cols-1 gap-6">
            {filteredDestinations.map((destination, index) => (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <DestinationCard destination={destination} />
              </motion.div>
            ))}
          </div>

          {/* Desktop: Carousel view */}
          <div className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-8">
            {visibleDestinations.map((destination, index) => (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <DestinationCard destination={destination} />
              </motion.div>
            ))}
          </div>

          {/* Navigation Buttons - Centered below content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="hidden md:flex justify-center space-x-3 mt-8"
          >
            <motion.button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-lg bg-gray-100 hover:bg-gray-200 border border-gray-300 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <svg className="h-5 w-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
            <motion.button
              onClick={nextSlide}
              disabled={currentIndex >= maxIndex}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-lg bg-gray-100 hover:bg-gray-200 border border-gray-300 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <svg className="h-5 w-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </motion.div>
        </div>

        {/* View All Button - Featured Hotels Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="w-24 h-px bg-gray-300 mx-auto mb-6"></div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="text-gray-700 hover:text-gray-900 font-normal text-base transition-colors duration-200 flex items-center space-x-2 mx-auto group"
          >
            <span>View All Destinations</span>
            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
          </motion.button>
        </motion.div>
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
        <div className={`absolute top-3 left-3 px-2 py-1 rounded text-xs font-medium ${
          destination.type === 'national' 
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
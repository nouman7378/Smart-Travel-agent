import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeImage from './SafeImage';

interface Hotel {
  id: number;
  name: string;
  location: string;
  image: string;
  rating: number;
  reviewCount: number;
  price: number;
  currency: string;
  originalPrice?: number;
  discount?: number;
}

interface FeaturedHotelsProps {
  className?: string;
}

const FeaturedHotels: React.FC<FeaturedHotelsProps> = ({ className = '' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const hotels: Hotel[] = [
    {
      id: 1,
      name: 'Grand Plaza Hotel',
      location: 'Paris, France',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
      rating: 4.8,
      reviewCount: 1245,
      price: 25000,
      currency: 'PKR',
      originalPrice: 30000,
      discount: 24,
    },
    {
      id: 2,
      name: 'Oceanview Resort',
      location: 'Bali, Indonesia',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
      rating: 4.9,
      reviewCount: 892,
      price: 22000,
      currency: 'PKR',
      originalPrice: 28000,
      discount: 25,
    },
    {
      id: 3,
      name: 'Metropolitan Suites',
      location: 'New York, USA',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
      rating: 4.7,
      reviewCount: 2103,
      price: 32000,
      currency: 'PKR',
      originalPrice: 38000,
      discount: 25,
    },
    {
      id: 4,
      name: 'Sakura Garden Hotel',
      location: 'Tokyo, Japan',
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80',
      rating: 4.9,
      reviewCount: 1567,
      price: 25000,
      currency: 'PKR',
      originalPrice: 30000,
      discount: 23,
    },
    {
      id: 5,
      name: 'Royal Heritage Inn',
      location: 'London, UK',
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80',
      rating: 4.6,
      reviewCount: 987,
      price: 20000,
      currency: 'PKR',
      originalPrice: 26000,
      discount: 23,
    },
    {
      id: 6,
      name: 'Desert Oasis Resort',
      location: 'Dubai, UAE',
      image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80',
      rating: 4.8,
      reviewCount: 1345,
      price: 35000,
      currency: 'PKR',
      originalPrice: 45000,
      discount: 22,
    },
  ];

  const hotelsPerView = 3;
  const maxIndex = Math.max(0, hotels.length - hotelsPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const visibleHotels = hotels.slice(currentIndex, currentIndex + hotelsPerView);

  return (
    <section className={`py-12 md:py-16 bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Featured Hotels</h2>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={prevSlide}
              className="p-2 rounded-full border border-gray-300 hover:bg-white transition-colors"
              aria-label="Previous hotels"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={nextSlide}
              className="p-2 rounded-full border border-gray-300 hover:bg-white transition-colors"
              aria-label="Next hotels"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleHotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Hotel Card Component
const HotelCard: React.FC<{ hotel: Hotel }> = ({ hotel }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-md rounded-xl border border-white/70 shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden hover:shadow-[0_8px_30px_rgba(59,130,246,0.06)] hover:bg-white/90 hover:border-blue-200/50 transition-all duration-300 group cursor-pointer"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <SafeImage
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Discount Badge */}
        {hotel.discount && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute top-3 left-3 bg-gray-900 text-white px-3 py-1 rounded-lg text-xs font-medium"
          >
            Save {hotel.discount}%
          </motion.div>
        )}

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center space-x-1">
          <svg className="h-3 w-3 text-yellow-500 fill-current" viewBox="0 0 20 20">
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
          <span className="text-xs font-medium text-gray-900">{hotel.rating}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
          {hotel.name}
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
          {hotel.location}
        </p>

        <div className="flex items-center mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`h-3 w-3 ${i < Math.floor(hotel.rating) ? 'text-yellow-500 fill-current' : 'text-gray-300'
                  }`}
                viewBox="0 0 20 20"
              >
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
            ))}
          </div>
          <span className="ml-2 text-xs text-gray-600">({hotel.reviewCount} reviews)</span>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            {hotel.originalPrice && (
              <span className="text-gray-400 line-through text-xs mr-2">
                PKR {hotel.originalPrice.toLocaleString()}
              </span>
            )}
            <span className="text-xl font-semibold text-gray-900">
              PKR {hotel.price.toLocaleString()}
            </span>
            <span className="text-gray-500 text-xs ml-1">/night</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-3 py-2 bg-gray-900 hover:bg-gray-800 text-white font-normal rounded-lg transition-colors text-xs"
          >
            Book Now
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default FeaturedHotels;
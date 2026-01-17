/**
 * HotelResultCard Component
 * 
 * This component is part of the Expedia.fr Search Results Page replication for our FYP.
 * Each component is modular and reusable.
 * 
 * Features:
 * - Hotel image, name, location, rating, price, availability
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export interface HotelResult {
  id: number;
  name: string;
  location: string;
  image: string;
  rating: number;
  reviewCount: number;
  stars: number;
  price: number;
  originalPrice?: number;
  currency: string;
  amenities: string[];
  availability: boolean;
  distance?: string;
}

interface HotelResultCardProps {
  hotel: HotelResult;
  className?: string;
  onClick?: () => void;
}

const HotelResultCard: React.FC<HotelResultCardProps> = ({ hotel, className = '', onClick }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(`/hotel/${hotel.id}`);
    }
  };

  return (
    <motion.div
      className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer ${className}`}
      onClick={handleClick}
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div className="flex flex-col md:flex-row">
        {/* Image */}
        <div className="relative w-full md:w-64 h-48 md:h-auto flex-shrink-0">
          <img
            src={hotel.image}
            alt={hotel.name}
            className="w-full h-full object-cover"
          />
          {hotel.originalPrice && (
            <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
              Save {Math.round(((hotel.originalPrice - hotel.price) / hotel.originalPrice) * 100)}%
            </div>
          )}
          {!hotel.availability && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold">
                Not Available
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-4 md:p-6 flex flex-col">
          <div className="flex-1">
            {/* Header */}
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1 hover:text-blue-600 transition-colors">
                  {hotel.name}
                </h3>
                <div className="flex items-center text-gray-600 text-sm mb-2">
                  <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  <span>{hotel.location}</span>
                  {hotel.distance && (
                    <span className="ml-2 text-gray-500">• {hotel.distance} from center</span>
                  )}
                </div>
              </div>
            </div>

            {/* Stars and Rating */}
            <div className="flex items-center space-x-3 mb-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`h-4 w-4 ${
                      i < hotel.stars ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <div className="flex items-center">
                <span className="font-semibold text-gray-900">{hotel.rating}</span>
                <span className="text-gray-600 text-sm ml-1">({hotel.reviewCount} reviews)</span>
              </div>
            </div>

            {/* Amenities */}
            <div className="flex flex-wrap gap-2 mb-4">
              {hotel.amenities.slice(0, 4).map((amenity, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
                >
                  {amenity}
                </span>
              ))}
              {hotel.amenities.length > 4 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                  +{hotel.amenities.length - 4} more
                </span>
              )}
            </div>
          </div>

          {/* Price and Book Button */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div>
              {hotel.originalPrice && (
                <div className="text-gray-400 line-through text-sm mb-1">
                  ${hotel.originalPrice}
                </div>
              )}
              <div className="flex items-baseline">
                <span className="text-2xl md:text-3xl font-bold text-blue-600">
                  ${hotel.price}
                </span>
                <span className="text-gray-600 text-sm ml-1">/night</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Includes taxes and fees</p>
            </div>
            <button
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors whitespace-nowrap"
              disabled={!hotel.availability}
            >
              {hotel.availability ? 'View Deal' : 'Unavailable'}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HotelResultCard;


/**
 * NearbyHotels Component
 * 
 * This component is part of the Expedia.fr Hotel Detail Page replication for our FYP.
 * Each component is modular and reusable.
 * 
 * Features:
 * - Nearby hotels / Similar options
 */

import React from 'react';
import { getMediaUrl } from '../config/env.config';

export interface NearbyHotel {
  id: number;
  name: string;
  location: string;
  image: string;
  rating: number;
  reviewCount: number;
  stars: number;
  price: number;
  originalPrice?: number;
  distance?: string;
}

interface NearbyHotelsProps {
  hotels: NearbyHotel[];
  title?: string;
  className?: string;
  onHotelClick?: (hotelId: number) => void;
}

const NearbyHotels: React.FC<NearbyHotelsProps> = ({
  hotels,
  title = 'Similar Hotels',
  className = '',
  onHotelClick,
}) => {
  if (hotels.length === 0) {
    return null;
  }

  return (
    <section className={`py-8 md:py-12 ${className}`}>
      <h2 className="text-3xl font-bold text-gray-900 mb-6">{title}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((hotel) => (
          <div
            key={hotel.id}
            onClick={() => onHotelClick?.(hotel.id)}
            className="bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-md rounded-xl border border-white/70 shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden hover:shadow-[0_8px_30px_rgba(59,130,246,0.06)] hover:bg-white/90 hover:border-blue-200/50 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={getMediaUrl(hotel.image)}
                alt={hotel.name}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
              {hotel.originalPrice && (
                <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                  Save {Math.round(((hotel.originalPrice - hotel.price) / hotel.originalPrice) * 100)}%
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                {hotel.name}
              </h3>
              
              <div className="flex items-center text-gray-600 text-sm mb-3">
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
                  <span className="ml-2 text-gray-500">• {hotel.distance}</span>
                )}
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex items-center mr-2">
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
                <span className="text-sm font-semibold text-gray-900 mr-2">{hotel.rating}</span>
                <span className="text-sm text-gray-600">({hotel.reviewCount} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div>
                  {hotel.originalPrice && (
                    <div className="text-gray-400 line-through text-sm mb-1">
                      PKR {hotel.originalPrice.toLocaleString()}
                    </div>
                  )}
                  <div className="text-2xl font-bold text-blue-600">PKR {hotel.price.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">per night</div>
                </div>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors text-sm">
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NearbyHotels;


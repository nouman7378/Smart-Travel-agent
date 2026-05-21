/**
 * PackageCard Component
 * 
 * This component is part of the Expedia.fr Packages Page replication for our FYP.
 * Each component is modular and reusable.
 * 
 * Features:
 * - Hotel image, flight info, price, highlights
 * - Hover effect
 */

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AddToBookingButton from './common/AddToBookingButton';
import { useAuth } from '../contexts/AuthContext';
import { useBooking } from '../contexts/BookingContext';
import SafeImage from './SafeImage';

export interface TravelPackage {
  id: number;
  title?: string;
  destination?: string;
  hotel: {
    name: string;
    location: string;
    image: string;
    stars: number;
    rating: number;
    reviewCount: number;
  };
  flight: {
    airline: string;
    departureTime: string;
    arrivalTime: string;
    duration: string;
    departureAirport: string;
    arrivalAirport: string;
    stops: number;
    departure?: {
      code: string;
      time: string;
    };
    arrival?: {
      code: string;
      time: string;
    };
  };
  price: number;
  originalPrice?: number;
  pricePer: 'person' | 'package';
  nights: number;
  highlights: string[];
  packageType?: string;
  includes: string[];
}

interface PackageCardProps {
  package: TravelPackage;
  className?: string;
  onClick?: () => void;
}

const PackageCard: React.FC<PackageCardProps> = ({ package: pkg, className = '', onClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const { addItemToBooking } = useBooking();

  // Guard clause to prevent crashes when pkg is undefined
  if (!pkg) {
    return (
      <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
        <div className="p-5 text-center text-gray-500">
          Package data not available
        </div>
      </div>
    );
  }

  const handleAddToBooking = async () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `${location.pathname}${location.search}` } });
      return false;
    }

    await addItemToBooking({
      item_type: 'package',
      reference_id: pkg.id,
      title: pkg.hotel.name,
      subtitle: `${pkg.hotel.location} - ${pkg.nights} night${pkg.nights === 1 ? '' : 's'}`,
      unit_price: pkg.price,
      quantity: 1,
      metadata: {
        packageType: pkg.packageType || '',
        airline: pkg.flight?.airline || '',
        destination: pkg.hotel.location,
      },
    });

    return true;
  };

  return (
    <div
      className={`bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-md rounded-xl border border-white/70 shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden hover:shadow-[0_8px_30px_rgba(59,130,246,0.06)] hover:bg-white/90 hover:border-blue-200/50 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer ${className}`}
      onClick={onClick}
    >
      {/* Hotel Image */}
      <div className="relative h-56 overflow-hidden">
        <SafeImage
          src={pkg.hotel.image}
          alt={pkg.hotel.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
        {pkg.originalPrice && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Save {pkg.originalPrice ? Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100) : 0}%
          </div>
        )}
        {pkg.packageType && (
          <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
            {pkg.packageType}
          </div>
        )}
        {/* Star Rating Badge */}
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`h-4 w-4 ${
                i < (pkg.hotel?.stars || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'
              }`}
              viewBox="0 0 20 20"
            >
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Hotel Info */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-1 hover:text-blue-600 transition-colors">
            {pkg.hotel.name}
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
            <span>{pkg.hotel.location}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <span className="font-semibold text-gray-900 mr-2">{pkg.hotel?.rating || 0}</span>
            <span>({pkg.hotel?.reviewCount || 0} reviews)</span>
          </div>
        </div>

        {/* Flight Info */}
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <svg className="h-4 w-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
              <span className="font-medium text-gray-900">{pkg.flight?.airline || 'Flight'}</span>
            </div>
            <span className="text-gray-600">{pkg.flight?.duration || 'Duration N/A'}</span>
          </div>
          <div className="flex items-center justify-between mt-2 text-xs text-gray-600">
            <div>
              <span className="font-semibold">{pkg.flight?.departureAirport || pkg.flight?.departure?.code || 'N/A'}</span>
              <span className="mx-2">→</span>
              <span className="font-semibold">{pkg.flight?.arrivalAirport || pkg.flight?.arrival?.code || 'N/A'}</span>
            </div>
            {pkg.flight?.stops > 0 && (
              <span>{pkg.flight.stops} {pkg.flight.stops === 1 ? 'stop' : 'stops'}</span>
            )}
          </div>
        </div>

        {/* Highlights */}
        {pkg.highlights?.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {pkg.highlights?.map((highlight, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md font-medium"
                >
                  {highlight}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Includes */}
        {pkg.includes?.length > 0 && (
          <div className="mb-4">
            <p className="text-xs text-gray-600 mb-1">Includes:</p>
            <ul className="text-xs text-gray-600 space-y-1">
              {pkg.includes?.slice(0, 3).map((item, index) => (
                <li key={index} className="flex items-center">
                  <svg
                    className="h-3 w-3 text-green-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {item}
                </li>
              ))}
              {pkg.includes.length > 3 && (
                <li className="text-gray-500">+{pkg.includes.length - 3} more</li>
              )}
            </ul>
          </div>
        )}

        {/* Price and Book Button */}
        <div className="flex items-end justify-between gap-3 pt-4 border-t border-gray-200">
          <div className="min-w-0">
            {pkg.originalPrice && (
              <div className="text-gray-400 line-through text-sm mb-1">
                PKR {pkg.originalPrice.toLocaleString()}
              </div>
            )}
            <div className="flex items-baseline">
              <span className="text-xl sm:text-2xl font-bold text-blue-600 leading-none">PKR {pkg.price.toLocaleString()}</span>
              <span className="text-gray-600 text-sm ml-1">
                /{pkg.pricePer === 'person' ? 'person' : 'package'}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {pkg.nights} {pkg.nights === 1 ? 'night' : 'nights'} stay
            </p>
          </div>
          <AddToBookingButton
            onAdd={handleAddToBooking}
            idleLabel="Add to Booking"
            addedLabel="Added to Booking"
            className="px-4 py-2 text-sm shrink-0"
          />
        </div>
      </div>
    </div>
  );
};

export default PackageCard;


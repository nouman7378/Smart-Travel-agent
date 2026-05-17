/**
 * FlightCard Component
 * 
 * Individual flight result card (Expedia.fr style)
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { Flight } from '../../services/flightService';
import { Circle, Plane } from 'lucide-react';


interface FlightCardProps {
  flight: Flight;
  index?: number;
}

const FlightCard: React.FC<FlightCardProps> = ({ flight, index = 0 }) => {
  const getStopsText = (stops: number) => {
    if (stops === 0) return 'Direct';
    if (stops === 1) return '1 stop';
    return `${stops} stops`;
  };

  // Convert price to PKR (approximate conversion rate: 1 EUR = 300 PKR)
  // You can update this rate or make it dynamic
  const EUR_TO_PKR_RATE = 300;
  const priceInPKR = Math.round(parseFloat(flight.price) * EUR_TO_PKR_RATE).toLocaleString();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -4, boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
      className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-4 transition-all duration-300"
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Left Section: Airline & Flight Info */}
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
            {/* Airline Logo */}
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl"><Plane className="inline w-5 h-5" /></span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{flight.airline_name}</h3>
              <p className="text-sm text-gray-500">{flight.flight_number} • {getStopsText(flight.stops)}</p>
            </div>
          </div>

          {/* Flight Times */}
          <div className="grid grid-cols-3 gap-4">
            {/* Departure */}
            <div>
              <div className="text-2xl font-bold text-gray-900">{flight.departure_time}</div>
              <div className="text-sm text-gray-600">Departure</div>
            </div>

            {/* Duration & Stops */}
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-1">{flight.duration}</div>
              <div className="relative">
                <div className="h-px bg-gray-300"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2">
                  <span className="text-xs text-gray-400"><Circle className="inline w-5 h-5" /></span>
                </div>
              </div>
              <div className="text-xs text-gray-500 mt-1">{getStopsText(flight.stops)}</div>
            </div>

            {/* Arrival */}
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">{flight.arrival_time}</div>
              <div className="text-sm text-gray-600">Arrival</div>
            </div>
          </div>
        </div>

        {/* Right Section: Price & CTA */}
        <div className="lg:border-l lg:border-gray-200 lg:pl-6 flex flex-col items-center lg:items-end justify-between min-w-[140px]">
          <div className="text-center lg:text-right mb-4">
            <div className="text-3xl font-bold text-gray-900">PKR {priceInPKR}</div>
            <div className="text-sm text-gray-500">per person</div>
          </div>
          <Link
            to={`/flight/${flight.flight_number}`}
            className="w-full lg:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-center"
          >
            Book Now
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default FlightCard;


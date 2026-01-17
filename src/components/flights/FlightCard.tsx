/**
 * FlightCard Component
 * 
 * Individual flight result card (Expedia.fr style)
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface Flight {
  id: string;
  airline: string;
  airlineLogo?: string;
  departure: {
    airport: string;
    code: string;
    time: string;
    date: string;
  };
  arrival: {
    airport: string;
    code: string;
    time: string;
    date: string;
  };
  duration: string;
  stops: number;
  price: number;
  refundable?: boolean;
  flexible?: boolean;
}

interface FlightCardProps {
  flight: Flight;
  index?: number;
}

const FlightCard: React.FC<FlightCardProps> = ({ flight, index = 0 }) => {
  const getStopsText = (stops: number) => {
    if (stops === 0) return 'Direct';
    if (stops === 1) return '1 escale';
    return `${stops} escales`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -4, boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
      className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mb-4 transition-all duration-300"
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Left Section: Airline & Flight Info */}
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
            {/* Airline Logo */}
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              {flight.airlineLogo ? (
                <img src={flight.airlineLogo} alt={flight.airline} className="w-10 h-10 object-contain" />
              ) : (
                <span className="text-2xl">✈️</span>
              )}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{flight.airline}</h3>
              <p className="text-sm text-gray-500">{getStopsText(flight.stops)}</p>
            </div>
          </div>

          {/* Flight Times */}
          <div className="grid grid-cols-3 gap-4">
            {/* Departure */}
            <div>
              <div className="text-2xl font-bold text-gray-900">{flight.departure.time}</div>
              <div className="text-sm text-gray-600">{flight.departure.code}</div>
              <div className="text-xs text-gray-500">{flight.departure.airport}</div>
            </div>

            {/* Duration & Stops */}
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-1">{flight.duration}</div>
              <div className="relative">
                <div className="h-px bg-gray-300"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2">
                  <span className="text-xs text-gray-400">●</span>
                </div>
              </div>
              <div className="text-xs text-gray-500 mt-1">{getStopsText(flight.stops)}</div>
            </div>

            {/* Arrival */}
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">{flight.arrival.time}</div>
              <div className="text-sm text-gray-600">{flight.arrival.code}</div>
              <div className="text-xs text-gray-500">{flight.arrival.airport}</div>
            </div>
          </div>

          {/* Badges */}
          {(flight.refundable || flight.flexible) && (
            <div className="flex gap-2 mt-4">
              {flight.refundable && (
                <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded">
                  Refundable
                </span>
              )}
              {flight.flexible && (
                <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded">
                  Flexible
                </span>
              )}
            </div>
          )}
        </div>

        {/* Right Section: Price & CTA */}
        <div className="lg:border-l lg:border-gray-200 lg:pl-6 flex flex-col items-center lg:items-end justify-between min-w-[140px]">
          <div className="text-center lg:text-right mb-4">
            <div className="text-3xl font-bold text-gray-900">€{flight.price}</div>
            <div className="text-sm text-gray-500">par personne</div>
          </div>
          <Link
            to={`/flight/${flight.id}`}
            className="w-full lg:w-auto px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-center"
          >
            Sélectionner
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default FlightCard;


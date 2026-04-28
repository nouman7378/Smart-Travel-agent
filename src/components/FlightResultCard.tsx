/**
 * FlightResultCard Component
 * 
 * This component is part of the Expedia.fr Search Results Page replication for our FYP.
 * Each component is modular and reusable.
 * 
 * Features:
 * - Airline, departure/arrival, duration, price
 */

import React from 'react';

export interface FlightResult {
  id: number;
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
  originalPrice?: number;
  currency: string;
  aircraft?: string;
  baggage?: string;
}

interface FlightResultCardProps {
  flight: FlightResult;
  className?: string;
  onClick?: () => void;
}

const FlightResultCard: React.FC<FlightResultCardProps> = ({
  flight,
  className = '',
  onClick,
}) => {
  return (
    <div
      className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer ${className}`}
      onClick={onClick}
    >
      <div className="p-4 md:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Flight Details */}
          <div className="flex-1">
            {/* Airline */}
            <div className="flex items-center mb-4">
              {flight.airlineLogo ? (
                <img
                  src={flight.airlineLogo}
                  alt={flight.airline}
                  className="h-8 w-8 mr-3 object-contain"
                />
              ) : (
                <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-blue-600 font-semibold text-xs">
                    {flight.airline.charAt(0)}
                  </span>
                </div>
              )}
              <span className="font-semibold text-gray-900">{flight.airline}</span>
              {flight.aircraft && (
                <span className="ml-3 text-sm text-gray-500">{flight.aircraft}</span>
              )}
            </div>

            {/* Flight Route */}
            <div className="flex items-center justify-between mb-4">
              {/* Departure */}
              <div className="flex-1">
                <div className="text-2xl md:text-3xl font-bold text-gray-900">
                  {flight.departure.time}
                </div>
                <div className="text-sm text-gray-600 mt-1">{flight.departure.date}</div>
                <div className="text-base font-semibold text-gray-900 mt-1">
                  {flight.departure.code}
                </div>
                <div className="text-sm text-gray-600">{flight.departure.airport}</div>
              </div>

              {/* Duration and Stops */}
              <div className="flex-1 flex flex-col items-center px-4">
                <div className="text-sm text-gray-500 mb-2">{flight.duration}</div>
                <div className="flex items-center w-full">
                  <div className="flex-1 h-0.5 bg-gray-300"></div>
                  <div className="px-2">
                    {flight.stops === 0 ? (
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    ) : (
                      <div className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                        {flight.stops} {flight.stops === 1 ? 'stop' : 'stops'}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 h-0.5 bg-gray-300"></div>
                </div>
                {flight.stops > 0 && (
                  <div className="text-xs text-gray-500 mt-1 text-center">
                    {flight.stops === 1 ? '1 stop' : `${flight.stops} stops`}
                  </div>
                )}
              </div>

              {/* Arrival */}
              <div className="flex-1 text-right">
                <div className="text-2xl md:text-3xl font-bold text-gray-900">
                  {flight.arrival.time}
                </div>
                <div className="text-sm text-gray-600 mt-1">{flight.arrival.date}</div>
                <div className="text-base font-semibold text-gray-900 mt-1">
                  {flight.arrival.code}
                </div>
                <div className="text-sm text-gray-600">{flight.arrival.airport}</div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              {flight.baggage && (
                <div className="flex items-center">
                  <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                  {flight.baggage}
                </div>
              )}
              <div className="flex items-center">
                <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {flight.duration}
              </div>
            </div>
          </div>

          {/* Price and Book Button */}
          <div className="lg:border-l lg:border-gray-200 lg:pl-6 flex flex-col items-end justify-between min-w-[180px]">
            <div className="text-right mb-4">
              {flight.originalPrice && (
                <div className="text-gray-400 line-through text-sm mb-1">
                  PKR {flight.originalPrice.toLocaleString()}
                </div>
              )}
              <div className="text-3xl md:text-4xl font-bold text-blue-600">
                PKR {flight.price.toLocaleString()}
              </div>
              <p className="text-xs text-gray-500 mt-1">per person</p>
            </div>
            <button className="w-full lg:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors whitespace-nowrap">
              Select
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightResultCard;


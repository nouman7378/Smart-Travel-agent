/**
 * SimilarFlights Component
 * 
 * This component is part of the Expedia.fr Flight Detail Page replication for our FYP.
 * Each component is modular and reusable.
 * 
 * Features:
 * - Similar flights / Suggestions
 */

import React from 'react';

export interface SimilarFlight {
  id: number;
  airline: string;
  airlineLogo?: string;
  departure: {
    airport: string;
    code: string;
    time: string;
  };
  arrival: {
    airport: string;
    code: string;
    time: string;
  };
  duration: string;
  stops: number;
  price: number;
  originalPrice?: number;
  cabinClass?: string;
}

interface SimilarFlightsProps {
  flights: SimilarFlight[];
  title?: string;
  className?: string;
  onFlightClick?: (flightId: number) => void;
}

const SimilarFlights: React.FC<SimilarFlightsProps> = ({
  flights,
  title = 'Similar Flights',
  className = '',
  onFlightClick,
}) => {
  if (flights.length === 0) {
    return null;
  }

  return (
    <section className={`py-8 md:py-12 ${className}`}>
      <h2 className="text-3xl font-bold text-gray-900 mb-6">{title}</h2>
      
      <div className="grid grid-cols-1 gap-6">
        {flights.map((flight) => (
          <div
            key={flight.id}
            onClick={() => onFlightClick?.(flight.id)}
            className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
          >
            <div className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                {/* Flight Details */}
                <div className="flex-1">
                  {/* Airline */}
                  <div className="flex items-center mb-4">
                    {flight.airlineLogo ? (
                      <img
                        src={flight.airlineLogo}
                        alt={flight.airline}
                        className="h-8 w-8 object-contain mr-3"
                      />
                    ) : (
                      <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-blue-600 font-semibold text-sm">
                          {flight.airline.charAt(0)}
                        </span>
                      </div>
                    )}
                    <span className="font-semibold text-gray-900">{flight.airline}</span>
                    {flight.cabinClass && (
                      <span className="ml-3 px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                        {flight.cabinClass}
                      </span>
                    )}
                  </div>

                  {/* Flight Route */}
                  <div className="flex items-center justify-between">
                    {/* Departure */}
                    <div className="flex-1">
                      <div className="text-2xl font-bold text-gray-900 mb-1">
                        {flight.departure.time}
                      </div>
                      <div className="text-base font-semibold text-gray-900 mb-1">
                        {flight.departure.code}
                      </div>
                      <div className="text-sm text-gray-600">{flight.departure.airport}</div>
                    </div>

                    {/* Duration and Stops */}
                    <div className="flex-1 flex flex-col items-center px-4">
                      <div className="text-sm text-gray-600 mb-2">{flight.duration}</div>
                      <div className="flex items-center w-full">
                        <div className="flex-1 h-0.5 bg-gray-300"></div>
                        {flight.stops === 0 ? (
                          <div className="px-2">
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          </div>
                        ) : (
                          <div className="px-2">
                            <div className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                              {flight.stops} {flight.stops === 1 ? 'stop' : 'stops'}
                            </div>
                          </div>
                        )}
                        <div className="flex-1 h-0.5 bg-gray-300"></div>
                      </div>
                    </div>

                    {/* Arrival */}
                    <div className="flex-1 text-right">
                      <div className="text-2xl font-bold text-gray-900 mb-1">
                        {flight.arrival.time}
                      </div>
                      <div className="text-base font-semibold text-gray-900 mb-1">
                        {flight.arrival.code}
                      </div>
                      <div className="text-sm text-gray-600">{flight.arrival.airport}</div>
                    </div>
                  </div>
                </div>

                {/* Price and Select Button */}
                <div className="lg:border-l lg:border-gray-200 lg:pl-6 flex flex-col items-end justify-between min-w-[180px]">
                  <div className="text-right mb-4">
                    {flight.originalPrice && (
                      <div className="text-gray-400 line-through text-sm mb-1">
                        PKR {(flight.originalPrice * 300).toLocaleString()}
                      </div>
                    )}
                    <div className="text-3xl font-bold text-blue-600">PKR {(flight.price * 300).toLocaleString()}</div>
                    <p className="text-xs text-gray-500 mt-1">per person</p>
                  </div>
                  <button className="w-full lg:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors whitespace-nowrap">
                    Select
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SimilarFlights;


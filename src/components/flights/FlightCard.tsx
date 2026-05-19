import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { Flight } from '../../services/flightService';

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

  const EUR_TO_PKR_RATE = 300;
  const priceInPKR = Math.round(parseFloat(flight.price) * EUR_TO_PKR_RATE).toLocaleString();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -3, boxShadow: '0 8px 20px rgba(0,0,0,0.04)' }}
      className="bg-white rounded-lg border border-gray-200 p-6 mb-4 hover:border-blue-500 transition-all duration-350 cursor-pointer"
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Left Section: Airline & Flight Info */}
        <div className="flex-1">
          {/* Airline Block */}
          <div className="flex items-center gap-3.5 mb-5">
            <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-250">
              <span className="text-blue-600 text-lg font-black">✈️</span>
            </div>
            <div>
              <h3 className="font-bold text-gray-955 text-sm tracking-tight">{flight.airline_name}</h3>
              <p className="text-[10px] font-bold text-gray-700 uppercase tracking-wider mt-0.5">
                {flight.flight_number} • {getStopsText(flight.stops)}
              </p>
            </div>
          </div>

          {/* Flight Times & Sleek Minimalist Timeline */}
          <div className="grid grid-cols-1 sm:grid-cols-7 gap-4 items-center">
            {/* Departure */}
            <div className="sm:col-span-2">
              <div className="text-2xl font-black text-gray-950 tracking-tight">
                {flight.departure_time}
              </div>
              <div className="text-[10px] font-bold text-blue-700 uppercase tracking-wider mt-0.5">
                Departure
              </div>
            </div>

            {/* Journey Timeline */}
            <div className="sm:col-span-3 flex flex-col items-center px-2">
              <div className="text-[10px] font-extrabold text-gray-800 uppercase tracking-wide mb-1">
                {flight.duration}
              </div>
              <div className="relative w-full flex items-center justify-center">
                <div className="absolute left-0 right-0 h-[1.5px] bg-gray-200"></div>
                <div className="relative z-10 bg-white px-2 text-[10px] font-bold text-gray-800">
                  {flight.stops === 0 ? (
                    <span className="text-gray-955 font-black">Nonstop</span>
                  ) : (
                    <span className="text-orange-600 font-black">{flight.stops} {flight.stops === 1 ? 'stop' : 'stops'}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Arrival */}
            <div className="sm:col-span-2 text-left sm:text-right">
              <div className="text-2xl font-black text-gray-950 tracking-tight">
                {flight.arrival_time}
              </div>
              <div className="text-[10px] font-bold text-blue-700 uppercase tracking-wider mt-0.5">
                Arrival
              </div>
            </div>
          </div>
        </div>

        {/* Right Section: Price & CTA with exactly 8px radius */}
        <div className="lg:border-l lg:border-gray-200 lg:pl-6 flex flex-col items-center lg:items-end justify-between min-w-[170px]">
          <div className="text-center lg:text-right mb-4">
            <div className="text-2xl font-black text-blue-600 tracking-tight">PKR {priceInPKR}</div>
            <div className="text-[10px] font-bold text-gray-700 uppercase mt-0.5 tracking-wide">per person</div>
          </div>
          <Link
            to={`/flight/${flight.flight_number}`}
            state={{ flight }}
            className="w-full lg:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-lg text-xs uppercase tracking-wider transition-all shadow-sm text-center"
          >
            Book Now
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default FlightCard;

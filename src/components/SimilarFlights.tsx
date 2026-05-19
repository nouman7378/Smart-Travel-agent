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
      <h2 className="text-lg font-bold text-gray-955 tracking-tight uppercase mb-6 flex items-center space-x-2">
        <span>✨</span>
        <span>{title}</span>
      </h2>
      
      <div className="grid grid-cols-1 gap-6">
        {flights.map((flight) => (
          <div
            key={flight.id}
            onClick={() => onFlightClick?.(flight.id)}
            className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden hover:border-blue-500 hover:shadow-md transition-all duration-300 cursor-pointer"
          >
            <div className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                {/* Flight Details */}
                <div className="flex-1">
                  {/* Airline */}
                  <div className="flex items-center mb-4">
                    {flight.airlineLogo ? (
                      <div className="w-8 h-8 bg-gray-50 rounded-lg p-1.5 flex items-center justify-center border border-gray-250 mr-3">
                        <img
                          src={flight.airlineLogo}
                          alt={flight.airline}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="h-8 w-8 bg-blue-50 rounded-lg flex items-center justify-center mr-3 border border-blue-200">
                        <span className="text-blue-600 font-bold text-xs">
                          {flight.airline.charAt(0)}
                        </span>
                      </div>
                    )}
                    <span className="font-bold text-gray-950 text-sm tracking-tight">{flight.airline}</span>
                    {flight.cabinClass && (
                      <span className="ml-3 px-2 py-0.5 bg-gray-100 text-gray-800 border border-gray-200 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                        {flight.cabinClass}
                      </span>
                    )}
                  </div>

                  {/* Flight Route */}
                  <div className="grid grid-cols-1 sm:grid-cols-7 gap-4 items-center">
                    {/* Departure */}
                    <div className="sm:col-span-2">
                      <div className="text-xl font-black text-gray-950 tracking-tight">
                        {flight.departure.time}
                      </div>
                      <div className="text-xs font-extrabold text-blue-700 tracking-wider uppercase mt-0.5">
                        {flight.departure.code}
                      </div>
                      <div className="text-[10px] text-gray-800 font-bold mt-0.5 truncate">{flight.departure.airport}</div>
                    </div>

                    {/* Duration and Stops */}
                    <div className="sm:col-span-3 flex flex-col items-center px-2">
                      <div className="text-[10px] font-extrabold text-gray-800 uppercase tracking-wide mb-1">{flight.duration}</div>
                      <div className="relative w-full flex items-center justify-center">
                        <div className="absolute left-0 right-0 h-[1.5px] bg-gray-200"></div>
                        <div className="relative z-10 bg-white px-2 text-[10px] font-bold text-gray-800">
                          {flight.stops === 0 ? (
                            <span className="text-gray-950 font-black">Nonstop</span>
                          ) : (
                            <span className="text-orange-600 font-black">{flight.stops} {flight.stops === 1 ? 'stop' : 'stops'}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Arrival */}
                    <div className="sm:col-span-2 text-left sm:text-right">
                      <div className="text-xl font-black text-gray-950 tracking-tight">
                        {flight.arrival.time}
                      </div>
                      <div className="text-xs font-extrabold text-blue-700 tracking-wider uppercase mt-0.5">
                        {flight.arrival.code}
                      </div>
                      <div className="text-[10px] text-gray-800 font-bold mt-0.5 truncate">{flight.arrival.airport}</div>
                    </div>
                  </div>
                </div>

                {/* Price and Select Button */}
                <div className="lg:border-l lg:border-gray-200 lg:pl-6 flex flex-col items-end justify-between min-w-[180px]">
                  <div className="text-right mb-4">
                    {flight.originalPrice && (
                      <div className="text-gray-400 line-through text-xs font-semibold mb-0.5">
                        PKR {(flight.originalPrice * 300).toLocaleString()}
                      </div>
                    )}
                    <div className="text-xl font-black text-blue-600 tracking-tight">
                      PKR {(flight.price * 300).toLocaleString()}
                    </div>
                    <p className="text-[10px] font-bold text-gray-700 uppercase mt-0.5 tracking-wide">per person</p>
                  </div>
                  <button
                    type="button"
                    className="w-full lg:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-lg text-xs tracking-wider uppercase transition-all shadow-sm"
                  >
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

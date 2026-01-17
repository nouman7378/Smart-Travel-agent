/**
 * ItineraryDetails Component
 * 
 * This component is part of the Expedia.fr Booking Confirmation Page replication for our FYP.
 * Each component is modular and reusable.
 * 
 * Features:
 * - Flight / Hotel / Car info cards
 */

import React from 'react';

export interface FlightInfo {
  airline: string;
  flightNumber: string;
  departure: {
    airport: string;
    code: string;
    time: string;
    date: string;
    terminal?: string;
  };
  arrival: {
    airport: string;
    code: string;
    time: string;
    date: string;
    terminal?: string;
  };
  duration: string;
  stops: number;
  class: string;
}

export interface HotelInfo {
  name: string;
  location: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  roomType: string;
  guests: number;
  confirmationNumber?: string;
}

export interface CarInfo {
  model: string;
  company: string;
  pickup: {
    location: string;
    date: string;
    time: string;
  };
  dropoff: {
    location: string;
    date: string;
    time: string;
  };
  confirmationNumber?: string;
}

interface ItineraryDetailsProps {
  flight?: FlightInfo;
  hotel?: HotelInfo;
  car?: CarInfo;
  className?: string;
}

const ItineraryDetails: React.FC<ItineraryDetailsProps> = ({
  flight,
  hotel,
  car,
  className = '',
}) => {
  return (
    <div className={`space-y-6 ${className}`}>
      <h2 className="text-2xl font-bold text-gray-900">Itinerary Details</h2>

      {/* Flight Card */}
      {flight && (
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-900">Flight</h3>
            <div className="flex items-center space-x-2">
              <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
              <span className="text-sm font-medium text-gray-700">{flight.airline}</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            {/* Departure */}
            <div className="flex-1">
              <div className="text-2xl font-bold text-gray-900 mb-1">{flight.departure.time}</div>
              <div className="text-lg font-semibold text-gray-900 mb-1">
                {flight.departure.code}
              </div>
              <div className="text-sm text-gray-600">{flight.departure.airport}</div>
              <div className="text-sm text-gray-500 mt-1">{flight.departure.date}</div>
              {flight.departure.terminal && (
                <div className="text-xs text-gray-500 mt-1">Terminal {flight.departure.terminal}</div>
              )}
            </div>

            {/* Duration */}
            <div className="flex-1 flex flex-col items-center">
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
            <div className="flex-1 text-right md:text-left">
              <div className="text-2xl font-bold text-gray-900 mb-1">{flight.arrival.time}</div>
              <div className="text-lg font-semibold text-gray-900 mb-1">{flight.arrival.code}</div>
              <div className="text-sm text-gray-600">{flight.arrival.airport}</div>
              <div className="text-sm text-gray-500 mt-1">{flight.arrival.date}</div>
              {flight.arrival.terminal && (
                <div className="text-xs text-gray-500 mt-1">Terminal {flight.arrival.terminal}</div>
              )}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Flight Number: {flight.flightNumber}</span>
              <span className="text-gray-600">Class: {flight.class}</span>
            </div>
          </div>
        </div>
      )}

      {/* Hotel Card */}
      {hotel && (
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-900">Hotel</h3>
            <div className="flex items-center space-x-2">
              <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span className="text-sm font-medium text-gray-700">Accommodation</span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-1">{hotel.name}</h4>
              <p className="text-sm text-gray-600">{hotel.location}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Check-in</p>
                <p className="text-base font-medium text-gray-900">{hotel.checkIn}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Check-out</p>
                <p className="text-base font-medium text-gray-900">{hotel.checkOut}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
              <div>
                <p className="text-sm text-gray-600">Duration</p>
                <p className="text-base font-medium text-gray-900">
                  {hotel.nights} {hotel.nights === 1 ? 'night' : 'nights'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Room Type</p>
                <p className="text-base font-medium text-gray-900">{hotel.roomType}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Guests</p>
                <p className="text-base font-medium text-gray-900">
                  {hotel.guests} {hotel.guests === 1 ? 'guest' : 'guests'}
                </p>
              </div>
              {hotel.confirmationNumber && (
                <div>
                  <p className="text-sm text-gray-600">Confirmation</p>
                  <p className="text-base font-medium text-gray-900 font-mono">
                    {hotel.confirmationNumber}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Car Card */}
      {car && (
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-900">Car Rental</h3>
            <div className="flex items-center space-x-2">
              <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                />
              </svg>
              <span className="text-sm font-medium text-gray-700">{car.company}</span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-1">{car.model}</h4>
              <p className="text-sm text-gray-600">{car.company}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Pick-up</p>
                <p className="text-base font-medium text-gray-900">{car.pickup.location}</p>
                <p className="text-sm text-gray-600 mt-1">
                  {car.pickup.date} at {car.pickup.time}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Drop-off</p>
                <p className="text-base font-medium text-gray-900">{car.dropoff.location}</p>
                <p className="text-sm text-gray-600 mt-1">
                  {car.dropoff.date} at {car.dropoff.time}
                </p>
              </div>
            </div>

            {car.confirmationNumber && (
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">Confirmation Number</p>
                <p className="text-base font-medium text-gray-900 font-mono">
                  {car.confirmationNumber}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ItineraryDetails;


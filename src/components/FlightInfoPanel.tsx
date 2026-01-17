/**
 * FlightInfoPanel Component
 * 
 * This component is part of the Expedia.fr Flight Detail Page replication for our FYP.
 * Each component is modular and reusable.
 * 
 * Features:
 * - Airline logo, flight number, departure & arrival times
 * - Duration, stops
 */

import React from 'react';

export interface FlightSegment {
  departure: {
    airport: string;
    code: string;
    city: string;
    time: string;
    date: string;
    terminal?: string;
  };
  arrival: {
    airport: string;
    code: string;
    city: string;
    time: string;
    date: string;
    terminal?: string;
  };
  duration: string;
  stops: number;
  stopDetails?: {
    airport: string;
    code: string;
    duration: string;
  }[];
  aircraft?: string;
  flightNumber: string;
}

export interface FlightInfo {
  airline: string;
  airlineLogo?: string;
  segments: FlightSegment[];
  totalDuration: string;
  totalStops: number;
  cabinClass?: string;
}

interface FlightInfoPanelProps {
  flight: FlightInfo;
  className?: string;
}

const FlightInfoPanel: React.FC<FlightInfoPanelProps> = ({ flight, className = '' }) => {
  return (
    <div className={`bg-white rounded-xl shadow-lg border border-gray-200 p-6 md:p-8 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          {flight.airlineLogo ? (
            <img
              src={flight.airlineLogo}
              alt={flight.airline}
              className="h-12 w-12 object-contain"
            />
          ) : (
            <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-bold text-lg">
                {flight.airline.charAt(0)}
              </span>
            </div>
          )}
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">{flight.airline}</h2>
            <p className="text-sm text-gray-600">Flight {flight.segments[0]?.flightNumber}</p>
          </div>
        </div>
        {flight.cabinClass && (
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
            {flight.cabinClass}
          </span>
        )}
      </div>

      {/* Flight Segments */}
      <div className="space-y-8">
        {flight.segments.map((segment, segmentIndex) => (
          <div key={segmentIndex}>
            {/* Segment Header */}
            {flight.segments.length > 1 && (
              <div className="mb-4">
                <span className="text-sm font-semibold text-gray-700">
                  Segment {segmentIndex + 1} of {flight.segments.length}
                </span>
              </div>
            )}

            {/* Flight Route */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              {/* Departure */}
              <div className="flex-1">
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
                  {segment.departure.time}
                </div>
                <div className="text-lg font-semibold text-gray-900 mb-1">
                  {segment.departure.code}
                </div>
                <div className="text-sm text-gray-600 mb-1">{segment.departure.city}</div>
                <div className="text-sm text-gray-500">{segment.departure.airport}</div>
                {segment.departure.terminal && (
                  <div className="text-xs text-gray-500 mt-1">
                    Terminal {segment.departure.terminal}
                  </div>
                )}
                <div className="text-sm text-gray-600 mt-2">{segment.departure.date}</div>
              </div>

              {/* Duration and Route */}
              <div className="flex-1 flex flex-col items-center px-4">
                <div className="text-sm text-gray-600 mb-2 font-medium">{segment.duration}</div>
                <div className="flex items-center w-full mb-2">
                  <div className="flex-1 h-0.5 bg-gray-300"></div>
                  {segment.stops === 0 ? (
                    <div className="px-3">
                      <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                    </div>
                  ) : (
                    <div className="px-3">
                      <div className="text-xs text-gray-600 bg-gray-100 px-3 py-1 rounded-full font-medium">
                        {segment.stops} {segment.stops === 1 ? 'stop' : 'stops'}
                      </div>
                    </div>
                  )}
                  <div className="flex-1 h-0.5 bg-gray-300"></div>
                </div>
                {segment.stops > 0 && segment.stopDetails && (
                  <div className="text-xs text-gray-500 text-center space-y-1">
                    {segment.stopDetails.map((stop, idx) => (
                      <div key={idx}>
                        {stop.code} ({stop.duration})
                      </div>
                    ))}
                  </div>
                )}
                {segment.aircraft && (
                  <div className="text-xs text-gray-500 mt-2">{segment.aircraft}</div>
                )}
              </div>

              {/* Arrival */}
              <div className="flex-1 text-right md:text-left">
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
                  {segment.arrival.time}
                </div>
                <div className="text-lg font-semibold text-gray-900 mb-1">
                  {segment.arrival.code}
                </div>
                <div className="text-sm text-gray-600 mb-1">{segment.arrival.city}</div>
                <div className="text-sm text-gray-500">{segment.arrival.airport}</div>
                {segment.arrival.terminal && (
                  <div className="text-xs text-gray-500 mt-1">
                    Terminal {segment.arrival.terminal}
                  </div>
                )}
                <div className="text-sm text-gray-600 mt-2">{segment.arrival.date}</div>
              </div>
            </div>

            {/* Divider between segments */}
            {segmentIndex < flight.segments.length - 1 && (
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Layover: {segment.stopDetails?.[0]?.duration || '2h 30m'}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center">
              <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Total Duration: {flight.totalDuration}</span>
            </div>
            {flight.totalStops > 0 && (
              <div className="flex items-center">
                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                  />
                </svg>
                <span>{flight.totalStops} {flight.totalStops === 1 ? 'Stop' : 'Stops'}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightInfoPanel;


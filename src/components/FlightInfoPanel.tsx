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
    <div className={`bg-white rounded-lg border border-gray-200 shadow-sm p-6 md:p-8 ${className}`}>
      {/* Header - Dark & High Contrast */}
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          {flight.airlineLogo ? (
            <div className="w-12 h-12 bg-gray-50 rounded-lg p-2 flex items-center justify-center border border-gray-200">
              <img
                src={flight.airlineLogo}
                alt={flight.airline}
                className="w-full h-full object-contain"
              />
            </div>
          ) : (
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center border border-blue-200">
              <span className="text-blue-600 font-bold text-lg">
                {flight.airline.charAt(0)}
              </span>
            </div>
          )}
          <div>
            <h2 className="text-lg font-bold text-gray-900 tracking-tight">{flight.airline}</h2>
            <p className="text-xs text-gray-700 font-semibold">Flight {flight.segments[0]?.flightNumber}</p>
          </div>
        </div>
        {flight.cabinClass && (
          <span className="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200/50 rounded-full text-xs font-bold tracking-wide">
            {flight.cabinClass}
          </span>
        )}
      </div>

      {/* Flight Segments */}
      <div className="space-y-8">
        {flight.segments.map((segment, segmentIndex) => (
          <div key={segmentIndex}>
            {flight.segments.length > 1 && (
              <div className="mb-4">
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">
                  Segment {segmentIndex + 1} of {flight.segments.length}
                </span>
              </div>
            )}

            {/* Flight Route - Dark Texts & 8px Radius */}
            <div className="grid grid-cols-1 md:grid-cols-7 gap-6 items-center">
              {/* Departure */}
              <div className="md:col-span-2">
                <div className="text-3xl font-black text-gray-950 tracking-tight">
                  {segment.departure.time}
                </div>
                <div className="text-sm font-bold text-blue-700 mt-1 flex items-center space-x-1.5">
                  <span>{segment.departure.code}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                  <span className="text-gray-900 font-bold">{segment.departure.city}</span>
                </div>
                <div className="text-xs text-gray-800 font-semibold mt-1 leading-relaxed">
                  {segment.departure.airport}
                  {segment.departure.terminal && ` • Terminal ${segment.departure.terminal}`}
                </div>
                <div className="text-[11px] font-bold text-gray-800 mt-2 bg-gray-100 inline-block px-2.5 py-1 rounded-lg">
                  {segment.departure.date}
                </div>
              </div>

              {/* Journey Timeline */}
              <div className="md:col-span-3 flex flex-col items-center justify-center px-4">
                <span className="text-[11px] font-extrabold text-gray-800 tracking-wide uppercase mb-1">
                  {segment.duration}
                </span>
                
                <div className="relative w-full flex items-center justify-center py-2">
                  {/* Thin track line */}
                  <div className="absolute left-0 right-0 h-[2px] bg-gray-200"></div>
                  
                  {/* Dynamic flight path indicator */}
                  <div className="relative flex items-center justify-between w-full">
                    {/* Departure dot */}
                    <div className="w-2.5 h-2.5 rounded-full bg-white border-2 border-blue-600 shadow-sm z-10"></div>
                    
                    {/* Center Plane / Stop details */}
                    {segment.stops === 0 ? (
                      <div className="bg-white px-2 z-10 text-[10px] text-gray-800 font-bold">
                        ✈️ <span className="font-extrabold text-gray-850">Nonstop</span>
                      </div>
                    ) : (
                      <div className="bg-white px-2.5 py-0.5 rounded-full border border-orange-200 bg-orange-50 text-[10px] text-orange-700 font-bold z-10 flex items-center space-x-1">
                        <span>⚠️</span>
                        <span>{segment.stops} {segment.stops === 1 ? 'stop' : 'stops'}</span>
                      </div>
                    )}
                    
                    {/* Arrival dot */}
                    <div className="w-2.5 h-2.5 rounded-full bg-white border-2 border-blue-600 shadow-sm z-10"></div>
                  </div>
                </div>

                {segment.stops > 0 && segment.stopDetails && (
                  <div className="text-[10px] text-gray-800 mt-1 font-bold">
                    via {segment.stopDetails.map(stop => stop.code).join(', ')}
                  </div>
                )}
                {segment.aircraft && (
                  <div className="text-[10px] text-gray-800 mt-1.5 font-bold italic">
                    {segment.aircraft}
                  </div>
                )}
              </div>

              {/* Arrival */}
              <div className="md:col-span-2 text-left md:text-right">
                <div className="text-3xl font-black text-gray-950 tracking-tight">
                  {segment.arrival.time}
                </div>
                <div className="text-sm font-bold text-blue-700 mt-1 flex items-center md:justify-end space-x-1.5">
                  <span className="text-gray-950 font-bold">{segment.arrival.city}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                  <span>{segment.arrival.code}</span>
                </div>
                <div className="text-xs text-gray-850 font-semibold mt-1 leading-relaxed">
                  {segment.arrival.airport}
                  {segment.arrival.terminal && ` • Terminal ${segment.arrival.terminal}`}
                </div>
                <div className="text-[11px] font-bold text-gray-800 mt-2 bg-gray-100 inline-block px-2.5 py-1 rounded-lg">
                  {segment.arrival.date}
                </div>
              </div>
            </div>

            {/* Divider between segments */}
            {segmentIndex < flight.segments.length - 1 && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-center space-x-2 text-xs text-gray-850 font-semibold">
                  <span>🕒</span>
                  <span>Layover: {segment.stopDetails?.[0]?.duration || '2h 30m'}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Summary Footer */}
      <div className="mt-8 pt-6 border-t border-gray-200 flex items-center justify-between text-xs text-gray-800 font-extrabold tracking-wide">
        <div className="flex items-center space-x-1.5">
          <span>🕒</span>
          <span>TOTAL DURATION: {flight.totalDuration}</span>
        </div>
        {flight.totalStops > 0 && (
          <div className="flex items-center space-x-1.5 text-orange-600">
            <span>✈️</span>
            <span>{flight.totalStops} {flight.totalStops === 1 ? 'STOP' : 'STOPS'}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightInfoPanel;

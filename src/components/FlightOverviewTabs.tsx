import React, { useState } from 'react';
import { Briefcase, Calendar, X } from 'lucide-react';

interface FlightOverviewTabsProps {
  itinerary: {
    segments: {
      departure: string;
      arrival: string;
      duration: string;
      aircraft: string;
      class: string;
    }[];
  };
  baggage: {
    carryOn: string;
    checked: string;
    restrictions?: string[];
  };
  cancellationPolicy: {
    refundable: boolean;
    changeable: boolean;
    cancellationFee?: string;
    changeFee?: string;
    policyDetails: string;
  };
  className?: string;
}

const FlightOverviewTabs: React.FC<FlightOverviewTabsProps> = ({
  itinerary,
  baggage,
  cancellationPolicy,
  className = '',
}) => {
  const [activeTab, setActiveTab] = useState<'itinerary' | 'baggage' | 'cancellation'>('itinerary');

  const tabs = [
    { id: 'itinerary' as const, label: 'Itinerary', icon: <Calendar className="w-4 h-4" /> },
    { id: 'baggage' as const, label: 'Baggage', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'cancellation' as const, label: 'Policies', icon: <X className="w-4 h-4" /> },
  ];

  return (
    <div className={`bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden ${className}`}>
      {/* Tabs Menu */}
      <div className="border-b border-gray-200 bg-gray-50 px-2 flex overflow-x-auto whitespace-nowrap scrollbar-none">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-4 text-xs font-bold transition-all relative ${
                isActive
                  ? 'text-blue-700 font-extrabold'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <span>{tab.icon}</span>
              <span className="uppercase tracking-wider">{tab.label}</span>
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="p-6 md:p-8">
        {/* Itinerary Tab */}
        {activeTab === 'itinerary' && (
          <div className="space-y-6">
            <h3 className="text-sm font-bold text-gray-950 tracking-tight uppercase mb-4">Flight Itinerary</h3>
            {itinerary.segments.map((segment, index) => (
              <div key={index} className="relative pl-6 pb-6 border-l-2 border-blue-500/30 last:pb-0 last:border-l-0">
                {/* Visual timeline bullet */}
                <div className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-blue-600 border-2 border-white shadow-sm" />
                
                <h4 className="text-xs font-black text-gray-950 uppercase tracking-wider mb-2">
                  Segment {index + 1}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-gray-800 font-semibold">
                  <div>
                    <span className="text-gray-500">Route:</span>{' '}
                    <span className="text-gray-950 font-bold">{segment.departure} → {segment.arrival}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Duration:</span>{' '}
                    <span className="text-gray-950 font-bold">{segment.duration}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Aircraft:</span>{' '}
                    <span className="text-gray-950 font-bold">{segment.aircraft}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Cabin Class:</span>{' '}
                    <span className="text-gray-950 font-bold">{segment.class}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Baggage Tab */}
        {activeTab === 'baggage' && (
          <div className="space-y-6">
            <h3 className="text-sm font-bold text-gray-950 tracking-tight uppercase mb-4">Baggage Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Carry-on */}
              <div className="p-5 border border-gray-200 rounded-lg bg-gray-50/50">
                <div className="flex items-center space-x-2.5 mb-3">
                  <span className="text-blue-600 font-bold">💼</span>
                  <h4 className="text-xs font-bold text-gray-950 uppercase tracking-wide">Carry-on Baggage</h4>
                </div>
                <p className="text-xs text-gray-800 font-semibold leading-relaxed">{baggage.carryOn}</p>
              </div>

              {/* Checked */}
              <div className="p-5 border border-gray-200 rounded-lg bg-gray-50/50">
                <div className="flex items-center space-x-2.5 mb-3">
                  <span className="text-blue-600 font-bold">🧳</span>
                  <h4 className="text-xs font-bold text-gray-950 uppercase tracking-wide">Checked Baggage</h4>
                </div>
                <p className="text-xs text-gray-850 font-semibold leading-relaxed">{baggage.checked}</p>
              </div>
            </div>

            {/* Restrictions */}
            {baggage.restrictions && baggage.restrictions.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-xs font-bold text-gray-955 uppercase tracking-wide mb-3">Important Restrictions</h4>
                <ul className="space-y-2">
                  {baggage.restrictions.map((restriction, index) => (
                    <li key={index} className="flex items-start text-xs text-gray-800 font-semibold">
                      <span className="text-orange-600 mr-2 shrink-0 font-bold">!</span>
                      <span>{restriction}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Cancellation Policy Tab */}
        {activeTab === 'cancellation' && (
          <div className="space-y-6">
            <h3 className="text-sm font-bold text-gray-955 tracking-tight uppercase mb-4">Cancellation & Change Policy</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Refundable */}
              <div className={`p-5 rounded-lg border ${
                cancellationPolicy.refundable 
                  ? 'border-emerald-200 bg-emerald-50/20 text-emerald-900' 
                  : 'border-rose-200 bg-rose-50/20 text-rose-900'
              }`}>
                <div className="flex items-center space-x-2.5 mb-2">
                  <span className="font-bold">{cancellationPolicy.refundable ? '✓' : '✗'}</span>
                  <h4 className="text-xs font-bold uppercase tracking-wide">
                    {cancellationPolicy.refundable ? 'Refundable Option' : 'Non-Refundable'}
                  </h4>
                </div>
                {cancellationPolicy.cancellationFee && (
                  <p className="text-xs opacity-90 font-bold">
                    Fee details: {cancellationPolicy.cancellationFee}
                  </p>
                )}
              </div>

              {/* Changeable */}
              <div className={`p-5 rounded-lg border ${
                cancellationPolicy.changeable 
                  ? 'border-emerald-200 bg-emerald-50/20 text-emerald-900' 
                  : 'border-rose-200 bg-rose-50/20 text-rose-900'
              }`}>
                <div className="flex items-center space-x-2.5 mb-2">
                  <span className="font-bold">{cancellationPolicy.changeable ? '✓' : '✗'}</span>
                  <h4 className="text-xs font-bold uppercase tracking-wide">
                    {cancellationPolicy.changeable ? 'Flexible Changes' : 'Non-Changeable'}
                  </h4>
                </div>
                {cancellationPolicy.changeFee && (
                  <p className="text-xs opacity-90 font-bold">
                    Fee details: {cancellationPolicy.changeFee}
                  </p>
                )}
              </div>
            </div>

            {/* Policy Details */}
            <div className="p-5 border border-gray-200 rounded-lg bg-gray-50/50">
              <h4 className="text-xs font-bold text-gray-955 uppercase tracking-wide mb-3">Detailed Policy Terms</h4>
              <p className="text-xs text-gray-800 font-semibold leading-relaxed whitespace-pre-line">
                {cancellationPolicy.policyDetails}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightOverviewTabs;

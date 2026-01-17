/**
 * FlightOverviewTabs Component
 * 
 * This component is part of the Expedia.fr Flight Detail Page replication for our FYP.
 * Each component is modular and reusable.
 * 
 * Features:
 * - Itinerary, Baggage info, Cancellation Policy tabs
 */

import React, { useState } from 'react';

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
    { id: 'itinerary' as const, label: 'Itinerary', icon: '📅' },
    { id: 'baggage' as const, label: 'Baggage', icon: '🧳' },
    { id: 'cancellation' as const, label: 'Cancellation Policy', icon: '❌' },
  ];

  return (
    <div className={`bg-white rounded-xl shadow-lg border border-gray-200 ${className}`}>
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-6 py-4 text-sm md:text-base font-semibold transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6 md:p-8">
        {/* Itinerary Tab */}
        {activeTab === 'itinerary' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Flight Itinerary</h3>
            {itinerary.segments.map((segment, index) => (
              <div key={index} className="border-l-4 border-blue-600 pl-6 pb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      Segment {index + 1}
                    </h4>
                    <div className="text-gray-600">
                      <p className="mb-1">
                        <span className="font-medium">Route:</span> {segment.departure} →{' '}
                        {segment.arrival}
                      </p>
                      <p className="mb-1">
                        <span className="font-medium">Duration:</span> {segment.duration}
                      </p>
                      <p className="mb-1">
                        <span className="font-medium">Aircraft:</span> {segment.aircraft}
                      </p>
                      <p>
                        <span className="font-medium">Class:</span> {segment.class}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Baggage Tab */}
        {activeTab === 'baggage' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Baggage Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Carry-on */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center mb-3">
                  <svg className="h-6 w-6 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                  <h4 className="font-semibold text-gray-900">Carry-on Baggage</h4>
                </div>
                <p className="text-gray-700">{baggage.carryOn}</p>
              </div>

              {/* Checked */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center mb-3">
                  <svg className="h-6 w-6 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                  <h4 className="font-semibold text-gray-900">Checked Baggage</h4>
                </div>
                <p className="text-gray-700">{baggage.checked}</p>
              </div>
            </div>

            {/* Restrictions */}
            {baggage.restrictions && baggage.restrictions.length > 0 && (
              <div className="mt-6">
                <h4 className="font-semibold text-gray-900 mb-3">Important Restrictions</h4>
                <ul className="space-y-2">
                  {baggage.restrictions.map((restriction, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className="h-5 w-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700">{restriction}</span>
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
            <h3 className="text-xl font-bold text-gray-900 mb-4">Cancellation & Change Policy</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Refundable */}
              <div className={`p-4 rounded-lg ${
                cancellationPolicy.refundable ? 'bg-green-50 border-2 border-green-200' : 'bg-red-50 border-2 border-red-200'
              }`}>
                <div className="flex items-center mb-2">
                  {cancellationPolicy.refundable ? (
                    <svg className="h-6 w-6 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg className="h-6 w-6 text-red-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  <h4 className="font-semibold text-gray-900">
                    {cancellationPolicy.refundable ? 'Refundable' : 'Non-Refundable'}
                  </h4>
                </div>
                {cancellationPolicy.cancellationFee && (
                  <p className="text-sm text-gray-700">
                    Cancellation fee: {cancellationPolicy.cancellationFee}
                  </p>
                )}
              </div>

              {/* Changeable */}
              <div className={`p-4 rounded-lg ${
                cancellationPolicy.changeable ? 'bg-green-50 border-2 border-green-200' : 'bg-red-50 border-2 border-red-200'
              }`}>
                <div className="flex items-center mb-2">
                  {cancellationPolicy.changeable ? (
                    <svg className="h-6 w-6 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg className="h-6 w-6 text-red-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  <h4 className="font-semibold text-gray-900">
                    {cancellationPolicy.changeable ? 'Changeable' : 'Non-Changeable'}
                  </h4>
                </div>
                {cancellationPolicy.changeFee && (
                  <p className="text-sm text-gray-700">
                    Change fee: {cancellationPolicy.changeFee}
                  </p>
                )}
              </div>
            </div>

            {/* Policy Details */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Policy Details</h4>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
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


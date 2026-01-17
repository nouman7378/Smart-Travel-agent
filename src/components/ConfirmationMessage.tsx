/**
 * ConfirmationMessage Component
 * 
 * This component is part of the Expedia.fr Booking Confirmation Page replication for our FYP.
 * Each component is modular and reusable.
 * 
 * Features:
 * - Confirmation message with success icon
 */

import React from 'react';

interface ConfirmationMessageProps {
  bookingNumber: string;
  message?: string;
  className?: string;
}

const ConfirmationMessage: React.FC<ConfirmationMessageProps> = ({
  bookingNumber,
  message,
  className = '',
}) => {
  return (
    <div className={`bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border-2 border-green-200 p-6 md:p-8 ${className}`}>
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        {/* Success Icon */}
        <div className="flex-shrink-0">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Message */}
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Booking Confirmed!
          </h1>
          <p className="text-lg text-gray-700 mb-3">
            {message ||
              'Your booking has been successfully confirmed. A confirmation email has been sent to your email address.'}
          </p>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Booking Reference:</span>
            <span className="text-lg font-bold text-blue-600 font-mono">{bookingNumber}</span>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-6 pt-6 border-t border-green-200">
        <div className="flex items-start space-x-3">
          <svg className="h-5 w-5 text-green-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-sm text-gray-700">
            Please save your booking reference number for your records. You can use it to manage
            your booking or check-in.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationMessage;


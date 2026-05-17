/**
 * BookingActions Component
 * 
 * This component is part of the Expedia.fr Booking Confirmation Page replication for our FYP.
 * Each component is modular and reusable.
 * 
 * Features:
 * - Print button
 * - Email button
 * - Modify button
 */

import React from 'react';

interface BookingActionsProps {
  onPrint?: () => void;
  onEmail?: () => void;
  onModify?: () => void;
  className?: string;
}

const BookingActions: React.FC<BookingActionsProps> = ({
  onPrint,
  onEmail,
  onModify,
  className = '',
}) => {
  const handlePrint = () => {
    if (onPrint) {
      onPrint();
    } else {
      window.print();
    }
  };

  const handleEmail = () => {
    if (onEmail) {
      onEmail();
    } else {
      alert('Email confirmation will be sent to your registered email address.');
    }
  };

  const handleModify = () => {
    if (onModify) {
      onModify();
    } else {
      alert('Redirecting to modify booking...');
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-md border border-gray-200 p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Manage Your Booking</h3>
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Print Button */}
        <button
          onClick={handlePrint}
          className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 border-2 border-gray-300 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors"
        >
          <svg className="h-5 w-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
            />
          </svg>
          <span className="font-medium text-gray-700">Print</span>
        </button>

        {/* Email Button */}
        <button
          onClick={handleEmail}
          className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 border-2 border-gray-300 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors"
        >
          <svg className="h-5 w-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <span className="font-medium text-gray-700">Email</span>
        </button>

        {/* Modify Button */}
        <button
          onClick={handleModify}
          className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          <span className="font-medium">Modify</span>
        </button>
      </div>
    </div>
  );
};

export default BookingActions;


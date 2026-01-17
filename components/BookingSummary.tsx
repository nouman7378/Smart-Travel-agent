/**
 * BookingSummary Component
 * 
 * This component is part of the Expedia.fr Booking Confirmation Page replication for our FYP.
 * Each component is modular and reusable.
 * 
 * Features:
 * - User info
 * - Booking details
 * - Payment summary
 */

import React from 'react';

export interface BookingUser {
  name: string;
  email: string;
  phone?: string;
}

export interface BookingDetails {
  bookingNumber: string;
  bookingDate: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  bookingType: 'flight' | 'hotel' | 'car' | 'package';
}

export interface PaymentSummary {
  subtotal: number;
  taxes: number;
  fees: number;
  discount?: number;
  total: number;
  currency: string;
  paymentMethod: string;
  last4Digits?: string;
}

interface BookingSummaryProps {
  user: BookingUser;
  bookingDetails: BookingDetails;
  paymentSummary: PaymentSummary;
  className?: string;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({
  user,
  bookingDetails,
  paymentSummary,
  className = '',
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg border border-gray-200 p-6 md:p-8 ${className}`}>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Booking Summary</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {/* User Information */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Traveler Information</h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">Name</p>
              <p className="text-base font-medium text-gray-900">{user.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="text-base font-medium text-gray-900">{user.email}</p>
            </div>
            {user.phone && (
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="text-base font-medium text-gray-900">{user.phone}</p>
              </div>
            )}
          </div>
        </div>

        {/* Booking Details */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Details</h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">Booking Number</p>
              <p className="text-base font-medium text-gray-900 font-mono">
                {bookingDetails.bookingNumber}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Booking Date</p>
              <p className="text-base font-medium text-gray-900">{bookingDetails.bookingDate}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Status</p>
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                  bookingDetails.status
                )}`}
              >
                {bookingDetails.status.charAt(0).toUpperCase() + bookingDetails.status.slice(1)}
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Type</p>
              <p className="text-base font-medium text-gray-900 capitalize">
                {bookingDetails.bookingType}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Summary */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Summary</h3>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="text-gray-900 font-medium">
              {paymentSummary.currency} {paymentSummary.subtotal.toFixed(2)}
            </span>
          </div>
          {paymentSummary.discount && paymentSummary.discount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Discount</span>
              <span className="text-green-600 font-medium">
                -{paymentSummary.currency} {paymentSummary.discount.toFixed(2)}
              </span>
            </div>
          )}
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Taxes</span>
            <span className="text-gray-900 font-medium">
              {paymentSummary.currency} {paymentSummary.taxes.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Fees</span>
            <span className="text-gray-900 font-medium">
              {paymentSummary.currency} {paymentSummary.fees.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between pt-3 border-t border-gray-200">
            <span className="text-lg font-semibold text-gray-900">Total Paid</span>
            <span className="text-2xl font-bold text-blue-600">
              {paymentSummary.currency} {paymentSummary.total.toFixed(2)}
            </span>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Payment Method: {paymentSummary.paymentMethod}
              {paymentSummary.last4Digits && ` •••• ${paymentSummary.last4Digits}`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;


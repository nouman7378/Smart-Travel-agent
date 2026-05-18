/**
 * BookingConfirmationPage Component
 * 
 * This component is part of the Expedia.fr Booking Confirmation Page replication for our FYP.
 * Each component is modular and reusable.
 * 
 * This is the main booking confirmation page that combines all components:
 * - Header
 * - Booking Summary
 * - Itinerary Details
 * - Confirmation Message
 * - Call-to-Action Buttons
 * - Footer
 */

import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ConfirmationMessage from '../components/ConfirmationMessage';
import BookingSummary, {
  BookingUser,
  BookingDetails,
  PaymentSummary,
} from '../components/BookingSummary';
import ItineraryDetails, {
  FlightInfo,
  HotelInfo,
  CarInfo,
} from '../components/ItineraryDetails';
import BookingActions from '../components/BookingActions';

interface BookingConfirmationPageProps {
  bookingType?: 'flight' | 'hotel' | 'car' | 'package';
}

const BookingConfirmationPage: React.FC<BookingConfirmationPageProps> = ({
  bookingType = 'package',
}) => {
  // Sample booking data - Replace with actual API data
  const user: BookingUser = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
  };

  const bookingDetails: BookingDetails = {
    bookingNumber: 'BK-2024-123456',
    bookingDate: 'December 10, 2024',
    status: 'confirmed',
    bookingType: bookingType,
  };

  const paymentSummary: PaymentSummary = {
    subtotal: 2500.00,
    taxes: 375.00,
    fees: 50.00,
    discount: 200.00,
    total: 2725.00,
    currency: '$',
    paymentMethod: 'Credit Card',
    last4Digits: '4242',
  };

  const flightInfo: FlightInfo = {
    airline: 'Air France',
    flightNumber: 'AF001',
    departure: {
      airport: 'John F. Kennedy International',
      code: 'JFK',
      time: '08:30',
      date: 'Mon, Dec 15, 2024',
      terminal: '4',
    },
    arrival: {
      airport: 'Charles de Gaulle Airport',
      code: 'CDG',
      time: '21:45',
      date: 'Mon, Dec 15, 2024',
      terminal: '2E',
    },
    duration: '7h 15m',
    stops: 0,
    class: 'Economy',
  };

  const hotelInfo: HotelInfo = {
    name: 'Grand Plaza Hotel',
    location: 'Paris, France',
    checkIn: 'Mon, Dec 15, 2024',
    checkOut: 'Sat, Dec 20, 2024',
    nights: 5,
    roomType: 'Deluxe Room',
    guests: 2,
    confirmationNumber: 'HTL-789012',
  };

  const carInfo: CarInfo = {
    model: 'BMW 3 Series',
    company: 'Hertz',
    pickup: {
      location: 'Paris CDG Airport',
      date: 'Mon, Dec 15, 2024',
      time: '10:00',
    },
    dropoff: {
      location: 'Paris CDG Airport',
      date: 'Sat, Dec 20, 2024',
      time: '10:00',
    },
    confirmationNumber: 'CAR-345678',
  };

  const handlePrint = () => {
    window.print();
  };

  const handleEmail = () => {
    alert('Confirmation email will be sent to ' + user.email);
  };

  const handleModify = () => {
    alert('Redirecting to modify booking...');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Confirmation Message */}
        <ConfirmationMessage
          bookingNumber={bookingDetails.bookingNumber}
          className="mb-8"
        />

        {/* Booking Actions */}
        <BookingActions
          onPrint={handlePrint}
          onEmail={handleEmail}
          onModify={handleModify}
          className="mb-8"
        />

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Itinerary Details */}
          <div className="lg:col-span-2">
            <ItineraryDetails
              flight={bookingType === 'flight' || bookingType === 'package' ? flightInfo : undefined}
              hotel={bookingType === 'hotel' || bookingType === 'package' ? hotelInfo : undefined}
              car={bookingType === 'car' || bookingType === 'package' ? carInfo : undefined}
            />
          </div>

          {/* Right Column - Booking Summary */}
          <div className="lg:col-span-1">
            <BookingSummary
              user={user}
              bookingDetails={bookingDetails}
              paymentSummary={paymentSummary}
            />
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Important Information</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start">
              <svg
                className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>
                Please arrive at the airport at least 2 hours before your flight departure time.
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>
                Hotel check-in is available from 3:00 PM. Early check-in may be available upon
                request.
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>
                A confirmation email with all booking details has been sent to your email address.
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>
                For any changes or cancellations, please contact our customer service or use the
                Modify button above.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmationPage;


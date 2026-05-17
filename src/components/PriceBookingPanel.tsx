/**
 * PriceBookingPanel Component
 * 
 * This component is part of the Expedia.fr Flight Detail Page replication for our FYP.
 * Each component is modular and reusable.
 * 
 * Features:
 * - Ticket type selection
 * - Passenger selection
 * - Total price calculation
 * - "Book Flight" button
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export interface TicketType {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  refundable?: boolean;
  changeable?: boolean;
}

interface PriceBookingPanelProps {
  basePrice: number;
  ticketTypes: TicketType[];
  onBookFlight: (bookingData: BookingData) => void;
  className?: string;
}

export interface BookingData {
  ticketType: string;
  adults: number;
  children: number;
  infants: number;
  totalPrice: number;
}

const PriceBookingPanel: React.FC<PriceBookingPanelProps> = ({
  basePrice: _basePrice,
  ticketTypes,
  onBookFlight,
  className = '',
}) => {
  const navigate = useNavigate();
  const [selectedTicketType, setSelectedTicketType] = useState<TicketType>(
    ticketTypes.length > 0 ? ticketTypes[0] : ticketTypes[0]
  );
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);

  const calculateTotalPrice = () => {
    const adultPrice = selectedTicketType.price * adults;
    const childPrice = selectedTicketType.price * 0.75 * children; // 75% of adult price
    const infantPrice = selectedTicketType.price * 0.1 * infants; // 10% of adult price
    const subtotal = adultPrice + childPrice + infantPrice;
    const taxes = subtotal * 0.15; // 15% taxes and fees
    return subtotal + taxes;
  };

  const totalPrice = calculateTotalPrice();
  const subtotal = selectedTicketType.price * adults + 
                   selectedTicketType.price * 0.75 * children + 
                   selectedTicketType.price * 0.1 * infants;
  const taxes = subtotal * 0.15;

  const handleBookFlight = () => {
    const bookingData = {
      ticketType: selectedTicketType.id,
      adults,
      children,
      infants,
      totalPrice,
    };

    if (onBookFlight) {
      onBookFlight(bookingData);
    } else {
      navigate('/booking/confirmation/flight');
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg border border-gray-200 p-6 sticky top-4 ${className}`}>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Your Fare</h2>

      {/* Ticket Type Selection */}
      <div className="space-y-3 mb-6">
        {ticketTypes.map((ticket) => (
          <button
            key={ticket.id}
            onClick={() => setSelectedTicketType(ticket)}
            className={`w-full text-left p-4 border-2 rounded-lg transition-all ${
              selectedTicketType.id === ticket.id
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="font-semibold text-gray-900">{ticket.name}</h3>
                  {ticket.refundable && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                      Refundable
                    </span>
                  )}
                  {ticket.changeable && (
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                      Changeable
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-2">{ticket.description}</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  {ticket.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <svg
                        className="h-3 w-3 text-green-500 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="ml-4 text-right">
                <div className="text-2xl font-bold text-blue-600">PKR {(ticket.price * 300).toLocaleString()}</div>
                <div className="text-xs text-gray-500">per person</div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Passenger Selection */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Passengers</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Adults (12+ years)</label>
            <select
              value={adults}
              onChange={(e) => setAdults(Number(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'Adult' : 'Adults'}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Children (2-11 years)
            </label>
            <select
              value={children}
              onChange={(e) => setChildren(Number(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            >
              {[0, 1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'Child' : 'Children'}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Infants (Under 2 years)
            </label>
            <select
              value={infants}
              onChange={(e) => setInfants(Number(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            >
              {[0, 1, 2].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'Infant' : 'Infants'}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Price Summary */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">
              {adults} {adults === 1 ? 'Adult' : 'Adults'} × PKR {(selectedTicketType.price * 300).toLocaleString()}
            </span>
            <span className="text-gray-900 font-medium">
              PKR {(selectedTicketType.price * adults * 300).toLocaleString()}
            </span>
          </div>
          {children > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">
                {children} {children === 1 ? 'Child' : 'Children'} × PKR {(selectedTicketType.price * 0.75 * 300).toLocaleString()}
              </span>
              <span className="text-gray-900 font-medium">
                PKR {(selectedTicketType.price * 0.75 * children * 300).toLocaleString()}
              </span>
            </div>
          )}
          {infants > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">
                {infants} {infants === 1 ? 'Infant' : 'Infants'} × PKR {(selectedTicketType.price * 0.1 * 300).toLocaleString()}
              </span>
              <span className="text-gray-900 font-medium">
                PKR {(selectedTicketType.price * 0.1 * infants * 300).toLocaleString()}
              </span>
            </div>
          )}
          <div className="flex justify-between text-sm pt-2 border-t border-gray-300">
            <span className="text-gray-600">Subtotal</span>
            <span className="text-gray-900 font-medium">PKR {(subtotal * 300).toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Taxes and fees</span>
            <span className="text-gray-900 font-medium">PKR {(taxes * 300).toLocaleString()}</span>
          </div>
          <div className="border-t border-gray-300 pt-2 mt-2">
            <div className="flex justify-between">
              <span className="font-semibold text-gray-900">Total</span>
              <span className="text-2xl font-bold text-blue-600">PKR {(totalPrice * 300).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Book Flight Button */}
      <button
        onClick={handleBookFlight}
        className="w-full px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
      >
        Book Flight
      </button>

      {/* Additional Info */}
      <div className="mt-4 space-y-2 text-xs text-gray-500">
        <p className="flex items-center">
          <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
          Secure booking with instant confirmation
        </p>
        <p className="flex items-center">
          <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Best price guarantee
        </p>
      </div>
    </div>
  );
};

export default PriceBookingPanel;


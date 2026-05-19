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
    <div className={`bg-white rounded-lg border border-gray-200 shadow-sm p-6 md:p-8 ${className}`}>
      <h2 className="text-xl font-bold text-gray-950 tracking-tight mb-6 flex items-center space-x-2">
        <span>🎟️</span>
        <span>Select Your Fare</span>
      </h2>

      {/* Ticket Type Selection - Cards with 8px radius */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {ticketTypes.map((ticket) => {
          const isSelected = selectedTicketType.id === ticket.id;
          return (
            <button
              key={ticket.id}
              type="button"
              onClick={() => setSelectedTicketType(ticket)}
              className={`w-full text-left p-6 border rounded-lg transition-all duration-300 flex flex-col justify-between h-full relative ${
                isSelected
                  ? 'border-blue-600 bg-blue-50/20 shadow-md'
                  : 'border-gray-200 hover:border-gray-300 bg-white shadow-sm'
              }`}
            >
              {/* Selected top glowing bar with 8px radius */}
              {isSelected && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-t-lg" />
              )}

              <div className="w-full flex-1 flex flex-col">
                <div className="flex flex-wrap items-center gap-1.5 mb-2">
                  <h3 className="font-bold text-gray-950 text-sm tracking-tight">{ticket.name}</h3>
                  {ticket.refundable && (
                    <span className="text-[9px] font-black tracking-wide uppercase bg-emerald-100 text-emerald-800 border border-emerald-200 px-1.5 py-0.5 rounded-lg">
                      Refundable
                    </span>
                  )}
                  {ticket.changeable && (
                    <span className="text-[9px] font-black tracking-wide uppercase bg-blue-100 text-blue-800 border border-blue-200 px-1.5 py-0.5 rounded-lg">
                      Flex
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-700 font-semibold mb-4 leading-normal">{ticket.description}</p>
                
                <ul className="text-xs text-gray-800 space-y-2 mb-6">
                  {ticket.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-emerald-600 mr-2 shrink-0 font-extrabold">✓</span>
                      <span className="font-semibold text-gray-800 leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="w-full pt-4 border-t border-gray-250 mt-auto flex items-baseline justify-between">
                <div>
                  <div className="text-lg font-black text-gray-950 tracking-tight">
                    PKR {(ticket.price * 300).toLocaleString()}
                  </div>
                  <div className="text-[9px] font-extrabold text-gray-700 uppercase tracking-wider mt-0.5">
                    per traveler
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                  isSelected ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300'
                }`}>
                  {isSelected && <span className="text-[10px] font-black">✓</span>}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Interactive Passenger Controls with 8px radius and dark labels */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
          <h3 className="text-sm font-bold text-gray-955 tracking-tight mb-4 flex items-center space-x-2">
            <span>👥</span>
            <span>Travelers</span>
          </h3>
          <div className="space-y-4">
            {/* Adults */}
            <div className="flex items-center justify-between py-2.5 border-b border-gray-200 last:border-b-0">
              <div>
                <div className="text-xs font-bold text-gray-950">Adults</div>
                <div className="text-[10px] text-gray-700 font-bold">Ages 12+</div>
              </div>
              <div className="flex items-center space-x-3.5">
                <button
                  type="button"
                  disabled={adults <= 1}
                  onClick={() => setAdults(adults - 1)}
                  className="w-8 h-8 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-800 hover:bg-gray-50 active:scale-95 transition-all font-black disabled:opacity-30"
                >
                  -
                </button>
                <span className="text-xs font-bold text-gray-950 w-4 text-center">{adults}</span>
                <button
                  type="button"
                  onClick={() => setAdults(adults + 1)}
                  className="w-8 h-8 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-800 hover:bg-gray-50 active:scale-95 transition-all font-black"
                >
                  +
                </button>
              </div>
            </div>

            {/* Children */}
            <div className="flex items-center justify-between py-2.5 border-b border-gray-200 last:border-b-0">
              <div>
                <div className="text-xs font-bold text-gray-955">Children</div>
                <div className="text-[10px] text-gray-700 font-bold">Ages 2-11</div>
              </div>
              <div className="flex items-center space-x-3.5">
                <button
                  type="button"
                  disabled={children <= 0}
                  onClick={() => setChildren(children - 1)}
                  className="w-8 h-8 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-800 hover:bg-gray-50 active:scale-95 transition-all font-black disabled:opacity-30"
                >
                  -
                </button>
                <span className="text-xs font-bold text-gray-955 w-4 text-center">{children}</span>
                <button
                  type="button"
                  onClick={() => setChildren(children + 1)}
                  className="w-8 h-8 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-800 hover:bg-gray-50 active:scale-95 transition-all font-black"
                >
                  +
                </button>
              </div>
            </div>

            {/* Infants */}
            <div className="flex items-center justify-between py-2.5 border-b border-gray-200 last:border-b-0">
              <div>
                <div className="text-xs font-bold text-gray-955">Infants</div>
                <div className="text-[10px] text-gray-700 font-bold">Under 2</div>
              </div>
              <div className="flex items-center space-x-3.5">
                <button
                  type="button"
                  disabled={infants <= 0}
                  onClick={() => setInfants(infants - 1)}
                  className="w-8 h-8 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-800 hover:bg-gray-50 active:scale-95 transition-all font-black disabled:opacity-30"
                >
                  -
                </button>
                <span className="text-xs font-bold text-gray-955 w-4 text-center">{infants}</span>
                <button
                  type="button"
                  onClick={() => setInfants(infants + 1)}
                  className="w-8 h-8 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-800 hover:bg-gray-50 active:scale-95 transition-all font-black"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Minimal Receipt and Action Block */}
        <div>
          <div className="space-y-2 mb-6">
            <div className="flex justify-between text-xs font-semibold text-gray-700">
              <span>
                {adults} {adults === 1 ? 'Adult' : 'Adults'} × PKR {(selectedTicketType.price * 300).toLocaleString()}
              </span>
              <span className="text-gray-955 font-bold">
                PKR {(selectedTicketType.price * adults * 300).toLocaleString()}
              </span>
            </div>
            {children > 0 && (
              <div className="flex justify-between text-xs font-semibold text-gray-700">
                <span>
                  {children} {children === 1 ? 'Child' : 'Children'} × PKR {(selectedTicketType.price * 0.75 * 300).toLocaleString()}
                </span>
                <span className="text-gray-955 font-bold">
                  PKR {(selectedTicketType.price * 0.75 * children * 300).toLocaleString()}
                </span>
              </div>
            )}
            {infants > 0 && (
              <div className="flex justify-between text-xs font-semibold text-gray-700">
                <span>
                  {infants} {infants === 1 ? 'Infant' : 'Infants'} × PKR {(selectedTicketType.price * 0.1 * 300).toLocaleString()}
                </span>
                <span className="text-gray-955 font-bold">
                  PKR {(selectedTicketType.price * 0.1 * infants * 300).toLocaleString()}
                </span>
              </div>
            )}
            <div className="flex justify-between text-xs font-semibold text-gray-700 pt-2 border-t border-gray-200">
              <span>Subtotal</span>
              <span className="text-gray-955 font-bold">PKR {(subtotal * 300).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xs font-semibold text-gray-700">
              <span>Taxes and fees (15%)</span>
              <span className="text-gray-955 font-bold">PKR {(taxes * 300).toLocaleString()}</span>
            </div>
            <div className="border-t border-gray-200 pt-3 mt-3 flex justify-between items-baseline">
              <span className="text-xs font-bold text-gray-955">Total</span>
              <span className="text-2xl font-black text-blue-600 tracking-tight">
                PKR {(totalPrice * 300).toLocaleString()}
              </span>
            </div>
          </div>

          {/* Book Flight Button - 8px radius */}
          <button
            onClick={handleBookFlight}
            className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform active:scale-95 flex items-center justify-center space-x-2 text-sm"
          >
            <span>Book Flight</span>
            <span>➔</span>
          </button>

          <div className="mt-4 flex items-center justify-between text-[10px] text-gray-700 font-extrabold uppercase tracking-wider">
            <span className="flex items-center">🛡️ Secure booking</span>
            <span className="flex items-center">⭐ Best price guaranteed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceBookingPanel;

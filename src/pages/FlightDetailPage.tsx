/**
 * FlightDetailPage Component
 * 
 * This component is part of the Expedia.fr Flight Detail Page replication for our FYP.
 * Each component is modular and reusable.
 * 
 * This is the main flight detail page that combines all components:
 * - Header
 * - Flight Info Panel
 * - Price & Booking Panel
 * - Flight Overview Tabs
 * - Similar Flights
 * - Footer
 */

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useBooking } from '../contexts/BookingContext';
import { useAuth } from '../contexts/AuthContext';
import FlightInfoPanel, { FlightInfo } from '../components/FlightInfoPanel';
import PriceBookingPanel, { TicketType, BookingData } from '../components/PriceBookingPanel';
import FlightOverviewTabs from '../components/FlightOverviewTabs';
import SimilarFlights, { SimilarFlight } from '../components/SimilarFlights';

interface FlightDetailPageProps {
  flightId?: number;
}

const FlightDetailPage: React.FC<FlightDetailPageProps> = ({ flightId: _flightId = 1 }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addItemToBooking } = useBooking();
  const { isAuthenticated } = useAuth();
  
  const stateFlight = location.state?.flight;

  const defaultFlight = {
    airline_name: 'Air France',
    flight_number: 'AF001',
    departure_time: '08:30',
    departure_datetime: '2026-12-15T08:30:00Z',
    arrival_time: '11:45',
    arrival_datetime: '2026-12-15T11:45:00Z',
    duration: '8h 15m',
    stops: 0,
    price: '650',
    departure_airport: 'Charles de Gaulle Airport',
    departure_code: 'CDG',
    departure_city: 'Paris',
    arrival_airport: 'John F. Kennedy International',
    arrival_code: 'JFK',
    arrival_city: 'New York'
  };

  const initialFlight = stateFlight ? {
    airline_name: stateFlight.airline_name,
    flight_number: stateFlight.flight_number,
    departure_time: stateFlight.departure_time,
    departure_datetime: stateFlight.departure_datetime,
    arrival_time: stateFlight.arrival_time,
    arrival_datetime: stateFlight.arrival_datetime,
    duration: stateFlight.duration,
    stops: stateFlight.stops || 0,
    price: String(stateFlight.price),
    departure_airport: stateFlight.flight_number.substring(0, 2) === 'PK' ? "Islamabad Int'l" : "London Heathrow",
    departure_code: stateFlight.flight_number.substring(0, 2) === 'PK' ? 'ISB' : 'LHR',
    departure_city: stateFlight.flight_number.substring(0, 2) === 'PK' ? 'Islamabad' : 'London',
    arrival_airport: "Quaid-E-Azam Int'l",
    arrival_code: 'KHI',
    arrival_city: 'Karachi'
  } : defaultFlight;

  const [currentFlight, setCurrentFlight] = useState(initialFlight);

  // Sample or API-driven flight data
  const flightInfo: FlightInfo = {
    airline: currentFlight.airline_name,
    airlineLogo: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=200&q=80',
    cabinClass: 'Economy',
    segments: [
      {
        departure: {
          airport: currentFlight.departure_airport || 'London Heathrow',
          code: currentFlight.departure_code || 'LHR',
          city: currentFlight.departure_city || 'London',
          time: currentFlight.departure_time,
          date: new Date(currentFlight.departure_datetime).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }),
          terminal: '2E',
        },
        arrival: {
          airport: currentFlight.arrival_airport || 'John F. Kennedy International',
          code: currentFlight.arrival_code || 'JFK',
          city: currentFlight.arrival_city || 'New York',
          time: currentFlight.arrival_time,
          date: new Date(currentFlight.arrival_datetime).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }),
          terminal: '4',
        },
        duration: currentFlight.duration,
        stops: currentFlight.stops || 0,
        aircraft: 'Boeing 777-300ER',
        flightNumber: currentFlight.flight_number,
      },
    ],
    totalDuration: currentFlight.duration,
    totalStops: currentFlight.stops || 0,
  };

  const basePriceVal = parseFloat(currentFlight.price);

  const ticketTypes: TicketType[] = [
    {
      id: 'economy-basic',
      name: 'Economy Basic',
      description: 'Best value for budget travelers',
      price: basePriceVal,
      features: [
        'Seat selection (fee applies)',
        '1 carry-on bag included',
        'No checked baggage',
        'No refunds',
        'Changes for a fee',
      ],
      refundable: false,
      changeable: true,
    },
    {
      id: 'economy-flex',
      name: 'Economy Flex',
      description: 'More flexibility with refundable option',
      price: basePriceVal * 1.3,
      features: [
        'Free seat selection',
        '1 carry-on bag included',
        '1 checked bag included',
        'Refundable',
        'Free changes',
        'Priority boarding',
      ],
      refundable: true,
      changeable: true,
    },
    {
      id: 'business',
      name: 'Business Class',
      description: 'Premium comfort and service',
      price: basePriceVal * 3,
      features: [
        'Free seat selection',
        '2 carry-on bags included',
        '2 checked bags included',
        'Fully refundable',
        'Free changes',
        'Priority boarding',
        'Lounge access',
        'Premium meals',
      ],
      refundable: true,
      changeable: true,
    },
  ];

  const similarFlights: SimilarFlight[] = [
    {
      id: 2,
      airline: 'Lufthansa',
      departure: {
        airport: 'Frankfurt Airport',
        code: 'FRA',
        time: '14:20',
      },
      arrival: {
        airport: 'John F. Kennedy International',
        code: 'JFK',
        time: '17:50',
      },
      duration: '8h 30m',
      stops: 1,
      price: 720,
      originalPrice: 900,
      cabinClass: 'Economy',
    },
    {
      id: 3,
      airline: 'British Airways',
      departure: {
        airport: 'Heathrow Airport',
        code: 'LHR',
        time: '10:15',
      },
      arrival: {
        airport: 'John F. Kennedy International',
        code: 'JFK',
        time: '13:30',
      },
      duration: '7h 15m',
      stops: 0,
      price: 680,
      cabinClass: 'Economy',
    },
    {
      id: 4,
      airline: 'Emirates',
      departure: {
        airport: 'Dubai International',
        code: 'DXB',
        time: '02:30',
      },
      arrival: {
        airport: 'John F. Kennedy International',
        code: 'JFK',
        time: '08:45',
      },
      duration: '14h 15m',
      stops: 0,
      price: 950,
      cabinClass: 'Economy',
    },
  ];

  const handleBookFlight = async (bookingData: BookingData) => {
    if (!isAuthenticated) {
      alert('Please log in to add items to your booking cart.');
      navigate('/login');
      return;
    }

    try {
      const departureDateString = flightInfo.segments[0].departure.date;
      await addItemToBooking({
        item_type: 'flight',
        reference_id: Math.floor(Math.random() * 1000000) + 1,
        title: `${flightInfo.airline} ${flightInfo.segments[0].flightNumber}`,
        subtitle: `${flightInfo.segments[0].departure.city} (${flightInfo.segments[0].departure.code}) to ${flightInfo.segments[0].arrival.city} (${flightInfo.segments[0].arrival.code})`,
        unit_price: bookingData.totalPrice,
        quantity: 1,
        metadata: {
          flight_number: flightInfo.segments[0].flightNumber,
          class: bookingData.ticketType,
          departDate: departureDateString,
          ticketType: bookingData.ticketType,
        }
      });
      
      alert('Flight successfully added to your booking cart!');
      navigate('/booking/demo');
    } catch (err: any) {
      alert(err.message || 'Failed to add flight to booking.');
    }
  };

  const handleFlightClick = (flightId: number) => {
    const selected = similarFlights.find(f => f.id === flightId);
    if (selected) {
      setCurrentFlight({
        airline_name: selected.airline,
        flight_number: selected.id === 2 ? 'LH400' : selected.id === 3 ? 'BA173' : 'EK201',
        departure_time: selected.departure.time,
        departure_datetime: '2026-12-15T' + selected.departure.time + ':00Z',
        arrival_time: selected.arrival.time,
        arrival_datetime: '2026-12-15T' + selected.arrival.time + ':00Z',
        duration: selected.duration,
        stops: selected.stops,
        price: String(selected.price),
        departure_airport: selected.departure.airport,
        departure_code: selected.departure.code,
        departure_city: selected.departure.airport.split(' ')[0],
        arrival_airport: selected.arrival.airport,
        arrival_code: selected.arrival.code,
        arrival_city: 'New York'
      });
      // Scroll smoothly to top to display selected flight details
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {/* Flight Info Panel */}
        <FlightInfoPanel flight={flightInfo} className="mb-8" />

        {/* Flight Info and Booking Panel - Stacked vertically to eliminate all side-by-side empty spaces */}
        <div className="flex flex-col gap-8 mb-12">
          {/* Booking Panel - Select Your Fare is now full-width at the top! */}
          <div className="w-full">
            <PriceBookingPanel
              basePrice={basePriceVal}
              ticketTypes={ticketTypes}
              onBookFlight={handleBookFlight}
            />
          </div>

          {/* Flight Overview Tabs - Flight Itinerary, baggage & rules is now full-width below it! */}
          <div className="w-full">
            <FlightOverviewTabs
              itinerary={{
                segments: flightInfo.segments.map((seg) => ({
                  departure: `${seg.departure.city} (${seg.departure.code})`,
                  arrival: `${seg.arrival.city} (${seg.arrival.code})`,
                  duration: seg.duration,
                  aircraft: seg.aircraft || 'Not specified',
                  class: flightInfo.cabinClass || 'Economy',
                })),
              }}
              baggage={{
                carryOn:
                  '1 personal item and 1 carry-on bag (max 8kg) included. Dimensions: 55cm x 35cm x 25cm.',
                checked:
                  'Checked baggage allowance depends on your fare type. Economy Basic: No checked baggage included. Economy Flex: 1 bag (23kg) included. Business: 2 bags (32kg each) included.',
                restrictions: [
                  'Liquids must be in containers of 100ml or less',
                  'All liquids must fit in a single transparent bag',
                  'Prohibited items include sharp objects, flammable materials, and certain batteries',
                  'Sports equipment may require special handling and additional fees',
                ],
              }}
              cancellationPolicy={{
                refundable: true,
                changeable: true,
                cancellationFee: 'Varies by fare type. Economy Basic: Non-refundable. Economy Flex: $200 cancellation fee. Business: Fully refundable.',
                changeFee: 'Varies by fare type. Economy Basic: $150 change fee. Economy Flex: Free changes. Business: Free changes.',
                policyDetails: `Cancellation and change policies vary by fare type:

Economy Basic:
- Non-refundable
- Changes allowed for a fee of $150 per person
- Changes must be made at least 24 hours before departure

Economy Flex:
- Refundable with a $200 cancellation fee per person
- Free changes up to 24 hours before departure
- Changes within 24 hours subject to availability and fees

Business Class:
- Fully refundable
- Free changes at any time
- No cancellation or change fees

All refunds will be processed to the original form of payment within 7-14 business days.`,
              }}
            />
          </div>
        </div>

        {/* Similar Flights */}
        <SimilarFlights
          flights={similarFlights}
          title="Other Flights You Might Like"
          onFlightClick={handleFlightClick}
          className="border-t border-gray-200"
        />
      </div>
    </div>
  );
};

export default FlightDetailPage;


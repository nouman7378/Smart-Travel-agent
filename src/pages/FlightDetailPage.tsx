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

import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import FlightInfoPanel, { FlightInfo } from '../components/FlightInfoPanel';
import PriceBookingPanel, { TicketType, BookingData } from '../components/PriceBookingPanel';
import FlightOverviewTabs from '../components/FlightOverviewTabs';
import SimilarFlights, { SimilarFlight } from '../components/SimilarFlights';

interface FlightDetailPageProps {
  flightId?: number;
}

const FlightDetailPage: React.FC<FlightDetailPageProps> = ({ flightId: _flightId = 1 }) => {
  // Sample flight data - Replace with actual API data
  const flightInfo: FlightInfo = {
    airline: 'Air France',
    airlineLogo: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=200&q=80',
    cabinClass: 'Economy',
    segments: [
      {
        departure: {
          airport: 'Charles de Gaulle Airport',
          code: 'CDG',
          city: 'Paris',
          time: '08:30',
          date: 'Mon, Dec 15, 2024',
          terminal: '2E',
        },
        arrival: {
          airport: 'John F. Kennedy International',
          code: 'JFK',
          city: 'New York',
          time: '11:45',
          date: 'Mon, Dec 15, 2024',
          terminal: '4',
        },
        duration: '8h 15m',
        stops: 0,
        aircraft: 'Boeing 777-300ER',
        flightNumber: 'AF001',
      },
    ],
    totalDuration: '8h 15m',
    totalStops: 0,
  };

  const ticketTypes: TicketType[] = [
    {
      id: 'economy-basic',
      name: 'Economy Basic',
      description: 'Best value for budget travelers',
      price: 650,
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
      price: 850,
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
      price: 2500,
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

  const handleBookFlight = (bookingData: BookingData) => {
    console.log('Booking data:', bookingData);
    // Handle booking logic here
    alert(
      `Flight booked successfully!\nTicket Type: ${bookingData.ticketType}\nTotal: $${bookingData.totalPrice.toFixed(2)}`
    );
  };

  const handleFlightClick = (flightId: number) => {
    console.log('Navigate to flight:', flightId);
    // Navigate to flight detail page
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {/* Flight Info Panel */}
        <FlightInfoPanel flight={flightInfo} className="mb-8" />

        {/* Flight Info and Booking Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Flight Overview Tabs - Takes 2 columns on large screens */}
          <div className="lg:col-span-2">
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

          {/* Booking Panel - Sticky on large screens */}
          <div className="lg:col-span-1">
            <PriceBookingPanel
              basePrice={650}
              ticketTypes={ticketTypes}
              onBookFlight={handleBookFlight}
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

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default FlightDetailPage;


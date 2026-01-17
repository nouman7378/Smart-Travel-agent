// Itinerary-related types

export interface ItineraryFlightInfo {
  id: string;
  airline: string;
  flightNumber: string;
  departure: {
    code: string;
    city: string;
    time: string;
    date: string;
  };
  arrival: {
    code: string;
    city: string;
    time: string;
    date: string;
  };
  duration: string;
  stops: number;
  class: 'economy' | 'business' | 'first';
}

export interface HotelInfo {
  id: string;
  name: string;
  location: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  roomType: string;
  guests: number;
}

export interface CarInfo {
  id: string;
  name: string;
  pickupLocation: string;
  returnLocation: string;
  pickupDate: string;
  returnDate: string;
  days: number;
}

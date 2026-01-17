// Flight-related types

export interface FlightResult {
  id: number;
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
  price: number;
  originalPrice?: number;
  class: 'economy' | 'business' | 'first';
}

export interface FlightSegment {
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
  airline: string;
  flightNumber: string;
  aircraft?: string;
}

export interface FlightInfo {
  id: string;
  segments: FlightSegment[];
  totalDuration: string;
  stops: number;
  price: number;
  class: 'economy' | 'business' | 'first';
}

export interface SimilarFlight {
  id: number;
  airline: string;
  departure: {
    code: string;
    time: string;
  };
  arrival: {
    code: string;
    time: string;
  };
  duration: string;
  stops: number;
  price: number;
}

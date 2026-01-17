/**
 * Dummy Flight Data
 * 
 * Sample flight data for the flights page
 */

export interface Flight {
  id: string;
  airline: string;
  airlineLogo?: string;
  departure: {
    airport: string;
    code: string;
    time: string;
    date: string;
  };
  arrival: {
    airport: string;
    code: string;
    time: string;
    date: string;
  };
  duration: string;
  stops: number;
  price: number;
  refundable?: boolean;
  flexible?: boolean;
}

export const dummyFlights: Flight[] = [
  {
    id: '1',
    airline: 'Air France',
    departure: {
      airport: 'Paris Charles de Gaulle',
      code: 'CDG',
      time: '08:30',
      date: '2024-12-20',
    },
    arrival: {
      airport: 'New York JFK',
      code: 'JFK',
      time: '11:45',
      date: '2024-12-20',
    },
    duration: '8h 15m',
    stops: 0,
    price: 650,
    refundable: true,
    flexible: true,
  },
  {
    id: '2',
    airline: 'Lufthansa',
    departure: {
      airport: 'Paris Charles de Gaulle',
      code: 'CDG',
      time: '10:15',
      date: '2024-12-20',
    },
    arrival: {
      airport: 'New York JFK',
      code: 'JFK',
      time: '14:30',
      date: '2024-12-20',
    },
    duration: '9h 15m',
    stops: 1,
    price: 580,
    refundable: false,
  },
  {
    id: '3',
    airline: 'British Airways',
    departure: {
      airport: 'Paris Charles de Gaulle',
      code: 'CDG',
      time: '14:00',
      date: '2024-12-20',
    },
    arrival: {
      airport: 'New York JFK',
      code: 'JFK',
      time: '17:20',
      date: '2024-12-20',
    },
    duration: '8h 20m',
    stops: 0,
    price: 720,
    refundable: true,
    flexible: true,
  },
  {
    id: '4',
    airline: 'KLM',
    departure: {
      airport: 'Paris Charles de Gaulle',
      code: 'CDG',
      time: '06:45',
      date: '2024-12-20',
    },
    arrival: {
      airport: 'New York JFK',
      code: 'JFK',
      time: '11:00',
      date: '2024-12-20',
    },
    duration: '9h 15m',
    stops: 1,
    price: 540,
    refundable: false,
  },
  {
    id: '5',
    airline: 'Emirates',
    departure: {
      airport: 'Paris Charles de Gaulle',
      code: 'CDG',
      time: '22:30',
      date: '2024-12-20',
    },
    arrival: {
      airport: 'New York JFK',
      code: 'JFK',
      time: '07:15',
      date: '2024-12-21',
    },
    duration: '11h 45m',
    stops: 1,
    price: 680,
    refundable: true,
    flexible: true,
  },
  {
    id: '6',
    airline: 'Turkish Airlines',
    departure: {
      airport: 'Paris Charles de Gaulle',
      code: 'CDG',
      time: '12:20',
      date: '2024-12-20',
    },
    arrival: {
      airport: 'New York JFK',
      code: 'JFK',
      time: '20:45',
      date: '2024-12-20',
    },
    duration: '13h 25m',
    stops: 1,
    price: 490,
    refundable: false,
  },
  {
    id: '7',
    airline: 'Air France',
    departure: {
      airport: 'Paris Charles de Gaulle',
      code: 'CDG',
      time: '16:00',
      date: '2024-12-20',
    },
    arrival: {
      airport: 'New York JFK',
      code: 'JFK',
      time: '19:15',
      date: '2024-12-20',
    },
    duration: '8h 15m',
    stops: 0,
    price: 750,
    refundable: true,
    flexible: true,
  },
  {
    id: '8',
    airline: 'Lufthansa',
    departure: {
      airport: 'Paris Charles de Gaulle',
      code: 'CDG',
      time: '09:30',
      date: '2024-12-20',
    },
    arrival: {
      airport: 'New York JFK',
      code: 'JFK',
      time: '13:45',
      date: '2024-12-20',
    },
    duration: '9h 15m',
    stops: 1,
    price: 620,
    refundable: true,
  },
];


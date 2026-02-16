/**
 * Flight Service
 * 
 * Handles API calls to the Django backend for flight search functionality.
 * Communicates with the Amadeus API through the backend proxy.
 */

import { API_PREFIX } from '../config/env.config';

export interface FlightSearchRequest {
  departure_airport_code: string;
  destination_airport_code: string;
  travel_date: string;
  number_of_passengers: number;
}

export interface City {
  id: number;
  name: string;
  iata_code: string;
  airport_name: string;
  country: string;
  country_code: string;
  display_name: string;
  full_display: string;
}

export interface CitySearchResponse {
  success: boolean;
  results: City[];
  count: number;
  message?: string;
}

export interface Flight {
  airline_name: string;
  flight_number: string;
  departure_time: string;
  departure_datetime: string;
  arrival_time: string;
  arrival_datetime: string;
  duration: string;
  stops: number;
  price: string;
  currency: string;
}

export interface FlightSearchResponse {
  success: boolean;
  flights?: Flight[];
  count?: number;
  message?: string;
}

export interface FlightSearchError {
  success: false;
  message: string;
}

/**
 * Search for flights via the backend API
 * 
 * @param params - Flight search parameters
 * @returns Promise with flight search results
 * @throws Error if the request fails
 */
export const searchFlights = async (
  params: FlightSearchRequest
): Promise<FlightSearchResponse> => {
  const response = await fetch(`${API_PREFIX}/flights/search/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  const data: FlightSearchResponse | FlightSearchError = await response.json();

  if (!response.ok) {
    throw new Error(
      (data as FlightSearchError).message || `HTTP error! status: ${response.status}`
    );
  }

  return data as FlightSearchResponse;
};

/**
 * Extract airport code from a string that may contain city name and code
 * e.g., "New York (JFK)" -> "JFK"
 * 
 * @param input - User input that may contain airport code
 * @returns Extracted 3-letter IATA code or the input itself
 */
export const extractAirportCode = (input: string): string => {
  if (!input) return '';
  
  // Try to extract code from format "City (XXX)" or "City - XXX"
  const match = input.match(/\(([A-Z]{3})\)/i) || input.match(/[-\s]([A-Z]{3})$/i);
  if (match) {
    return match[1].toUpperCase();
  }
  
  // If input is already a 3-letter code, return it as is
  if (/^[A-Z]{3}$/i.test(input.trim())) {
    return input.trim().toUpperCase();
  }
  
  // Return the input for the backend to handle
  return input.trim().toUpperCase();
};

/**
 * Format date from input to YYYY-MM-DD format
 * 
 * @param dateString - Date string from date input
 * @returns Formatted date string
 */
export const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  
  // If already in YYYY-MM-DD format, return as is
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    return dateString;
  }
  
  // Otherwise, parse and format
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return '';
  }
  
  return date.toISOString().split('T')[0];
};

/**
 * Search for cities/airports by name or IATA code
 * 
 * @param query - Search query (min 2 characters)
 * @param limit - Maximum number of results (default: 10)
 * @returns Promise with city search results
 */
export const searchCities = async (
  query: string,
  limit: number = 10
): Promise<City[]> => {
  if (query.length < 2) {
    return [];
  }

  const response = await fetch(
    `${API_PREFIX}/cities/search/?query=${encodeURIComponent(query)}&limit=${limit}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch cities');
  }

  const data: CitySearchResponse = await response.json();

  if (!data.success) {
    throw new Error(data.message || 'Failed to fetch cities');
  }

  return data.results;
};

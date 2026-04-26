/**
 * Itinerary Service
 *
 * Handles API calls to the Django backend for AI-generated itineraries.
 */

import { API_PREFIX } from '../config/env.config';

export interface Activity {
  id: string;
  time: string;
  title: string;
  description: string;
  location: string;
  duration: string;
  cost: number;
}

export interface DayPlan {
  day: number;
  date: string;
  activities: Activity[];
  totalCost: number;
}

export interface Itinerary {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  budget: number;
  days: DayPlan[];
  totalCost: number;
}

export interface GenerateItineraryParams {
  destination: string;
  startDate: string;
  endDate: string;
  budget: number;
  preferences?: string;
  travelers?: number;
  sessionId?: string;
}

interface GenerateItineraryResponse {
  success: boolean;
  itineraryId: number;
  itinerary: Itinerary;
  message?: string;
}

interface ErrorResponse {
  success: false;
  message?: string;
}

export const generateItinerary = async (
  params: GenerateItineraryParams
): Promise<Itinerary> => {
  const response = await fetch(`${API_PREFIX}/ai/itinerary/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      destination: params.destination,
      start_date: params.startDate,
      end_date: params.endDate,
      budget: params.budget,
      preferences: params.preferences,
      travelers: params.travelers,
      sessionId: params.sessionId,
    }),
  });

  const data: GenerateItineraryResponse | ErrorResponse = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(
      (data as ErrorResponse).message ||
        `Failed to generate itinerary (status ${response.status})`
    );
  }

  return (data as GenerateItineraryResponse).itinerary;
};

export const fetchItinerary = async (id: string): Promise<Itinerary> => {
  const response = await fetch(`${API_PREFIX}/ai/itineraries/${id}/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || `Failed to fetch itinerary ${id}`);
  }

  return data.itinerary as Itinerary;
};


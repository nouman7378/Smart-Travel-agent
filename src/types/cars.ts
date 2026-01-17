// Car rental-related types

export interface Car {
  id: number;
  name: string;
  type: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  features: string[];
  transmission: 'automatic' | 'manual';
  seats: number;
  luggage: number;
}

export interface CarResult {
  id: number;
  name: string;
  type: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  features: string[];
  transmission: 'automatic' | 'manual';
  seats: number;
  luggage: number;
  pickupLocation: string;
  returnLocation: string;
  pickupDate: string;
  returnDate: string;
}

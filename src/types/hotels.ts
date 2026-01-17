// Hotel-related types

export interface HotelResult {
  id: number;
  name: string;
  location: string;
  image: string;
  stars: number;
  rating: number;
  reviewCount: number;
  price: number;
  originalPrice?: number;
  amenities: string[];
  distance?: string;
}

export interface NearbyHotel {
  id: number;
  name: string;
  location: string;
  image: string;
  stars: number;
  rating: number;
  price: number;
  distance: string;
}

export interface HotelAmenity {
  id: number;
  name: string;
  icon: string;
  category: 'basic' | 'premium' | 'luxury';
}

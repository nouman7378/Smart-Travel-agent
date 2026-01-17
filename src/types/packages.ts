// Package-related types

export interface TravelPackage {
  id: number;
  hotel: {
    name: string;
    location: string;
    image: string;
    stars: number;
    rating: number;
    reviewCount: number;
  };
  flight: {
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
  };
  price: number;
  originalPrice?: number;
  pricePer: 'person' | 'package';
  nights: number;
  highlights: string[];
  packageType?: string;
  includes: string[];
}

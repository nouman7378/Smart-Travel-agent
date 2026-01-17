// Filter-related types

export interface FilterState {
  priceRange: [number, number];
  rating: number;
  amenities: string[];
  sortBy: 'price' | 'rating' | 'popularity';
}

export interface PackageFilters {
  destination: string;
  priceRange: [number, number];
  rating: number;
  packageType: string[];
  sortBy: 'price' | 'rating' | 'popularity';
}

export interface CarFilters {
  priceRange: [number, number];
  carType: string[];
  transmission: ('automatic' | 'manual')[];
  seats: number[];
  sortBy: 'price' | 'rating' | 'popularity';
}

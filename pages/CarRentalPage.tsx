/**
 * CarRentalPage Component
 * 
 * This component is part of the Expedia.fr Car Rental Page replication for our FYP.
 * Each component is modular and reusable.
 * 
 * This is the main car rental page that combines all components:
 * - Header
 * - Search & Filters
 * - Car List
 * - Sort Bar
 * - Pagination
 * - Footer
 */

import React, { useState, useMemo } from 'react';
import CarSearchFilters, { CarFilters } from '../components/CarSearchFilters';
import CarList from '../components/CarList';
import { Car } from '../components/CarCard';
import CarSortBar from '../components/CarSortBar';
import Pagination from '../components/Pagination';

interface CarRentalPageProps {
  initialFilters?: Partial<CarFilters>;
}

const CarRentalPage: React.FC<CarRentalPageProps> = ({ initialFilters }) => {
  const [filters, setFilters] = useState<CarFilters>({
    pickupLocation: initialFilters?.pickupLocation || '',
    dropoffLocation: initialFilters?.dropoffLocation || '',
    pickupDate: initialFilters?.pickupDate || '',
    pickupTime: initialFilters?.pickupTime || '10:00',
    dropoffDate: initialFilters?.dropoffDate || '',
    dropoffTime: initialFilters?.dropoffTime || '10:00',
    carType: initialFilters?.carType || [],
    priceRange: initialFilters?.priceRange || [0, 200],
    companies: initialFilters?.companies || [],
  });
  const [currentSort, setCurrentSort] = useState('popularity');
  const [currentPage, setCurrentPage] = useState(1);

  // Sample car data - Replace with actual API data
  const allCars: Car[] = [
    {
      id: 1,
      model: 'Toyota Camry',
      type: 'Mid-size',
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80',
      company: 'Hertz',
      price: 45,
      originalPrice: 60,
      pricePer: 'day',
      rating: 4.5,
      reviewCount: 234,
      features: ['GPS', 'Bluetooth', 'USB Charger', 'Backup Camera'],
      transmission: 'Automatic',
      seats: 5,
      luggage: 2,
      fuelType: 'Gasoline',
      mileage: 'Unlimited',
    },
    {
      id: 2,
      model: 'BMW 3 Series',
      type: 'Luxury',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80',
      company: 'Avis',
      price: 89,
      originalPrice: 120,
      pricePer: 'day',
      rating: 4.8,
      reviewCount: 456,
      features: ['GPS', 'Leather Seats', 'Sunroof', 'Premium Sound'],
      transmission: 'Automatic',
      seats: 5,
      luggage: 2,
      fuelType: 'Gasoline',
      mileage: 'Unlimited',
    },
    {
      id: 3,
      model: 'Honda Civic',
      type: 'Compact',
      image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80',
      company: 'Enterprise',
      price: 35,
      originalPrice: 45,
      pricePer: 'day',
      rating: 4.6,
      reviewCount: 189,
      features: ['GPS', 'Bluetooth', 'USB Charger'],
      transmission: 'Automatic',
      seats: 5,
      luggage: 1,
      fuelType: 'Gasoline',
      mileage: 'Unlimited',
    },
    {
      id: 4,
      model: 'Ford Explorer',
      type: 'SUV',
      image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80',
      company: 'Budget',
      price: 75,
      originalPrice: 95,
      pricePer: 'day',
      rating: 4.4,
      reviewCount: 312,
      features: ['GPS', 'Third Row Seating', 'AWD', 'Roof Rack'],
      transmission: 'Automatic',
      seats: 7,
      luggage: 4,
      fuelType: 'Gasoline',
      mileage: 'Unlimited',
    },
    {
      id: 5,
      model: 'Mercedes-Benz E-Class',
      type: 'Luxury',
      image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80',
      company: 'National',
      price: 120,
      originalPrice: 150,
      pricePer: 'day',
      rating: 4.9,
      reviewCount: 278,
      features: ['GPS', 'Leather Seats', 'Sunroof', 'Premium Sound', 'Heated Seats'],
      transmission: 'Automatic',
      seats: 5,
      luggage: 3,
      fuelType: 'Gasoline',
      mileage: 'Unlimited',
    },
    {
      id: 6,
      model: 'Nissan Altima',
      type: 'Mid-size',
      image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80',
      company: 'Alamo',
      price: 42,
      pricePer: 'day',
      rating: 4.3,
      reviewCount: 156,
      features: ['GPS', 'Bluetooth', 'USB Charger'],
      transmission: 'Automatic',
      seats: 5,
      luggage: 2,
      fuelType: 'Gasoline',
      mileage: 'Unlimited',
    },
    {
      id: 7,
      model: 'Jeep Wrangler',
      type: 'SUV',
      image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80',
      company: 'Thrifty',
      price: 68,
      originalPrice: 85,
      pricePer: 'day',
      rating: 4.7,
      reviewCount: 421,
      features: ['GPS', '4WD', 'Removable Doors', 'Roof Rack'],
      transmission: 'Manual',
      seats: 5,
      luggage: 2,
      fuelType: 'Gasoline',
      mileage: 'Unlimited',
    },
    {
      id: 8,
      model: 'Tesla Model 3',
      type: 'Electric',
      image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&q=80',
      company: 'Hertz',
      price: 95,
      originalPrice: 125,
      pricePer: 'day',
      rating: 4.9,
      reviewCount: 567,
      features: ['GPS', 'Autopilot', 'Supercharging', 'Premium Sound'],
      transmission: 'Automatic',
      seats: 5,
      luggage: 2,
      fuelType: 'Electric',
      mileage: 'Unlimited',
    },
    {
      id: 9,
      model: 'Chevrolet Malibu',
      type: 'Mid-size',
      image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80',
      company: 'Enterprise',
      price: 38,
      pricePer: 'day',
      rating: 4.2,
      reviewCount: 198,
      features: ['GPS', 'Bluetooth', 'USB Charger'],
      transmission: 'Automatic',
      seats: 5,
      luggage: 2,
      fuelType: 'Gasoline',
      mileage: 'Unlimited',
    },
  ];

  // Filter and sort cars
  const filteredAndSortedCars = useMemo(() => {
    let cars = [...allCars];

    // Apply filters
    if (filters.carType.length > 0) {
      cars = cars.filter((car) => filters.carType.includes(car.type));
    }

    if (filters.companies.length > 0) {
      cars = cars.filter((car) => filters.companies.includes(car.company));
    }

    cars = cars.filter(
      (car) => car.price >= filters.priceRange[0] && car.price <= filters.priceRange[1]
    );

    // Apply sorting
    cars.sort((a, b) => {
      switch (currentSort) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'company':
          return a.company.localeCompare(b.company);
        default: // popularity
          return (b.reviewCount || 0) - (a.reviewCount || 0);
      }
    });

    return cars;
  }, [filters, currentSort, allCars]);

  // Pagination
  const itemsPerPage = 9;
  const totalPages = Math.ceil(filteredAndSortedCars.length / itemsPerPage);
  const paginatedCars = filteredAndSortedCars.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCarClick = (carId: number) => {
    console.log('Navigate to car detail:', carId);
    // Navigate to car detail page
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <aside className="lg:w-80 flex-shrink-0">
            <CarSearchFilters onFiltersChange={setFilters} />
          </aside>

          {/* Results Section */}
          <main className="flex-1 min-w-0">
            {/* Sort Bar */}
            <CarSortBar
              totalResults={filteredAndSortedCars.length}
              currentSort={currentSort}
              onSortChange={setCurrentSort}
              className="mb-6"
            />

            {/* Car List */}
            <CarList cars={paginatedCars} onCarClick={handleCarClick} className="mb-6" />

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredAndSortedCars.length}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              showLoadMore={false}
            />
          </main>
        </div>
      </div>
    </div>
  );
};

export default CarRentalPage;


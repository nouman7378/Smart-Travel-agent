import React, { useState, useMemo, useEffect } from 'react';
import CarSearchFilters, { CarFilters } from '../components/CarSearchFilters';
import CarList from '../components/CarList';
import { Car } from '../components/CarCard';
import CarSortBar from '../components/CarSortBar';
import Pagination from '../components/Pagination';
import { API_PREFIX, getMediaUrl } from '../config/env.config';

interface CarRentalPageProps {
  initialFilters?: Partial<CarFilters>;
}

const CarRentalPage: React.FC<CarRentalPageProps> = ({ initialFilters }) => {
  // All hooks declared first, in consistent order
  const [filters, setFilters] = useState<CarFilters>({
    pickupLocation: initialFilters?.pickupLocation || '',
    dropoffLocation: initialFilters?.dropoffLocation || '',
    pickupDate: initialFilters?.pickupDate || '',
    pickupTime: initialFilters?.pickupTime || '10:00',
    dropoffDate: initialFilters?.dropoffDate || '',
    dropoffTime: initialFilters?.dropoffTime || '10:00',
    carType: initialFilters?.carType || [],
    priceRange: initialFilters?.priceRange || [0, 100000],
    companies: initialFilters?.companies || [],
  });
  
  const [currentSort, setCurrentSort] = useState('popularity');
  const [currentPage, setCurrentPage] = useState(1);
  const [allCars, setAllCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Memoized filtered and sorted cars - declared after all useState hooks
  const filteredAndSortedCars = useMemo(() => {
    let cars = [...allCars];

    if (filters.pickupLocation.trim()) {
      const q = filters.pickupLocation.toLowerCase().trim();
      cars = cars.filter(
        (car) =>
          car.company.toLowerCase().includes(q) ||
          car.model.toLowerCase().includes(q)
      );
    }

    if (filters.dropoffLocation.trim()) {
      const q = filters.dropoffLocation.toLowerCase().trim();
      cars = cars.filter(
        (car) =>
          car.company.toLowerCase().includes(q) ||
          car.model.toLowerCase().includes(q)
      );
    }

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

  const availableCarTypes = useMemo(
    () => [...new Set(allCars.map((c) => c.type).filter(Boolean))],
    [allCars]
  );

  const availableCompanies = useMemo(
    () => [...new Set(allCars.map((c) => c.company).filter(Boolean))].sort(),
    [allCars]
  );

  const priceMax = useMemo(() => {
    if (allCars.length === 0) return 100000;
    const max = Math.max(...allCars.map((c) => c.price));
    return Math.ceil(max / 1000) * 1000 || 100000;
  }, [allCars]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, currentSort]);
  
  // Effect to fetch cars - declared after useMemo
  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`${API_PREFIX}/cars/`);
        const data = await response.json();
        
        if (data.success) {
          // Transform API data to match Car interface
          const transformedCars: Car[] = data.cars.map((car: any) => ({
            id: car.id,
            model: car.model,
            type: car.type_display,
            image: getMediaUrl(car.car_image_url) || 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80',
            company: car.company,
            price: car.price_per_day,
            originalPrice: car.original_price,
            pricePer: 'day' as const,
            rating: car.rating,
            reviewCount: car.review_count,
            features: car.features,
            transmission: car.transmission === 'automatic' ? 'Automatic' : 'Manual',
            seats: car.seats,
            luggage: car.luggage_capacity,
            fuelType: car.fuel_type,
            mileage: car.mileage,
          }));
          
          setAllCars(transformedCars);
        } else {
          setError(data.message || 'Failed to load cars');
        }
      } catch (err) {
        setError('Network error. Please try again.');
        console.error('Error fetching cars:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCars();
  }, []);

  // Loading state - early return after all hooks
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading cars...</p>
        </div>
      </div>
    );
  }

  // Error state - early return after all hooks
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-md max-w-md">
          <div className="text-red-500 mb-4">
            <svg className="h-16 w-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Cars</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Pagination calculations
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

  // Main render
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <aside className="lg:w-80 flex-shrink-0">
            <CarSearchFilters
              filters={filters}
              onFiltersChange={setFilters}
              availableCarTypes={availableCarTypes}
              availableCompanies={availableCompanies}
              priceMax={priceMax}
            />
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
import React, { useState, useMemo, useEffect } from 'react';
import PackageSearchFilters, { PackageFilters } from '../components/PackageSearchFilters';
import PackagesGrid from '../components/PackagesGrid';
import { TravelPackage } from '../components/PackageCard';
import PackageSortBar from '../components/PackageSortBar';
import Pagination from '../components/Pagination';

interface PackagesPageProps {
  initialFilters?: Partial<PackageFilters>;
}

const PackagesPage: React.FC<PackagesPageProps> = ({ initialFilters }) => {
  // All hooks declared first, in consistent order
  const [filters, setFilters] = useState<PackageFilters>({
    destination: initialFilters?.destination || '',
    checkIn: initialFilters?.checkIn || '',
    checkOut: initialFilters?.checkOut || '',
    adults: initialFilters?.adults || 2,
    children: initialFilters?.children || 0,
    priceRange: initialFilters?.priceRange || [0, 500000], // PKR range
    starRating: initialFilters?.starRating || [],
    packageType: initialFilters?.packageType || [],
  });
  
  const [currentSort, setCurrentSort] = useState('popularity');
  const [currentPage, setCurrentPage] = useState(1);
  const [showLoadMore] = useState(false);
  const [allPackages, setAllPackages] = useState<TravelPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Memoized filtered and sorted packages - declared after all useState hooks
  const filteredAndSortedPackages = useMemo(() => {
    let packages = [...allPackages];

    // Apply filters
    if (filters.destination) {
      packages = packages.filter((pkg) =>
        pkg.hotel.location.toLowerCase().includes(filters.destination.toLowerCase()) ||
        pkg.hotel.name.toLowerCase().includes(filters.destination.toLowerCase())
      );
    }

    if (filters.starRating.length > 0) {
      packages = packages.filter((pkg) => filters.starRating.includes(pkg.hotel.stars));
    }

    if (filters.packageType.length > 0) {
      packages = packages.filter(
        (pkg) => pkg.packageType && filters.packageType.includes(pkg.packageType)
      );
    }

    packages = packages.filter(
      (pkg) => pkg.price >= filters.priceRange[0] && pkg.price <= filters.priceRange[1]
    );

    // Apply sorting
    packages.sort((a, b) => {
      switch (currentSort) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.hotel.rating - a.hotel.rating;
        case 'nights':
          return b.nights - a.nights;
        default: // popularity
          return b.hotel.reviewCount - a.hotel.reviewCount;
      }
    });

    return packages;
  }, [filters, currentSort, allPackages]);
  
  // Effect to fetch packages - declared after useMemo
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('http://localhost:8001/api/packages/');
        const data = await response.json();
        
        if (data.success) {
          // Transform API data to match TravelPackage interface
          const transformedPackages: TravelPackage[] = data.packages.map((pkg: any) => ({
            id: pkg.id,
            title: pkg.title,
            destination: pkg.destination,
            price: pkg.price,
            originalPrice: pkg.originalPrice,
            pricePer: 'person' as const,
            nights: pkg.nights,
            packageType: pkg.packageType,
            highlights: pkg.highlights,
            hotel: {
              name: pkg.hotel.name,
              location: pkg.hotel.location,
              stars: pkg.hotel.stars,
              rating: pkg.hotel.rating,
              reviewCount: pkg.hotel.reviewCount,
              image: pkg.hotel.image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80'
            },
            flight: {
              airline: pkg.flight.airline,
              departureTime: pkg.flight.departure?.time || '',
              arrivalTime: pkg.flight.arrival?.time || '',
              duration: pkg.flight.duration || '',
              departureAirport: pkg.flight.departure?.code || '',
              arrivalAirport: pkg.flight.arrival?.code || '',
              stops: pkg.flight.stops || 0
            },
            includes: pkg.includes || []
          }));
          
          setAllPackages(transformedPackages);
        } else {
          setError('Failed to load packages');
        }
      } catch (err) {
        setError('Network error. Please try again.');
        console.error('Error fetching packages:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPackages();
  }, []);

  // Loading state - early return after all hooks
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading packages...</p>
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
          <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Packages</h3>
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

  // All packages are now loaded from the API
  const itemsPerPage = 9;
  const totalPages = Math.ceil(filteredAndSortedPackages.length / itemsPerPage);
  const paginatedPackages = filteredAndSortedPackages.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePackageClick = (packageId: number) => {
    console.log('Navigate to package detail:', packageId);
    // Navigate to package detail page
  };

  // Main render
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <aside className="lg:w-80 flex-shrink-0">
            <PackageSearchFilters onFiltersChange={setFilters} />
          </aside>

          {/* Results Section */}
          <main className="flex-1 min-w-0">
            {/* Sort Bar */}
            <PackageSortBar
              totalResults={filteredAndSortedPackages.length}
              currentSort={currentSort}
              onSortChange={setCurrentSort}
              className="mb-6"
            />

            {/* Packages Grid */}
            <PackagesGrid packages={paginatedPackages} onPackageClick={handlePackageClick} className="mb-6" />

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredAndSortedPackages.length}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              showLoadMore={showLoadMore}
            />
          </main>
        </div>
      </div>
    </div>
  );
};

export default PackagesPage;
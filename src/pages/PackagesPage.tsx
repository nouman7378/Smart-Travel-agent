/**
 * PackagesPage Component
 * 
 * This component is part of the Expedia.fr Packages Page replication for our FYP.
 * Each component is modular and reusable.
 * 
 * This is the main packages page that combines all components:
 * - Header
 * - Search & Filters
 * - Packages Grid
 * - Sort Bar
 * - Pagination / Load More
 * - Footer
 */

import React, { useState, useMemo } from 'react';
import PackageSearchFilters, { PackageFilters } from '../components/PackageSearchFilters';
import PackagesGrid from '../components/PackagesGrid';
import { TravelPackage } from '../components/PackageCard';
import PackageSortBar from '../components/PackageSortBar';
import Pagination from '../components/Pagination';

interface PackagesPageProps {
  initialFilters?: Partial<PackageFilters>;
}

const PackagesPage: React.FC<PackagesPageProps> = ({ initialFilters }) => {
  const [filters, setFilters] = useState<PackageFilters>({
    destination: initialFilters?.destination || '',
    checkIn: initialFilters?.checkIn || '',
    checkOut: initialFilters?.checkOut || '',
    adults: initialFilters?.adults || 2,
    children: initialFilters?.children || 0,
    priceRange: initialFilters?.priceRange || [0, 5000],
    starRating: initialFilters?.starRating || [],
    packageType: initialFilters?.packageType || [],
  });
  const [currentSort, setCurrentSort] = useState('popularity');
  const [currentPage, setCurrentPage] = useState(1);
  const [showLoadMore] = useState(false);

  // Sample package data - Replace with actual API data
  const allPackages: TravelPackage[] = [
    {
      id: 1,
      hotel: {
        name: 'Grand Plaza Hotel',
        location: 'Paris, France',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
        stars: 5,
        rating: 4.8,
        reviewCount: 1245,
      },
      flight: {
        airline: 'Air France',
        departure: { code: 'JFK', time: '08:30' },
        arrival: { code: 'CDG', time: '21:45' },
        duration: '7h 15m',
        stops: 0,
      },
      price: 1299,
      originalPrice: 1699,
      pricePer: 'person',
      nights: 5,
      highlights: ['Free Cancellation', 'Breakfast Included', 'City Center'],
      packageType: 'City Break',
      includes: ['Round-trip flights', '5 nights hotel', 'Daily breakfast', 'Airport transfers'],
    },
    {
      id: 2,
      hotel: {
        name: 'Oceanview Resort',
        location: 'Bali, Indonesia',
        image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
        stars: 5,
        rating: 4.9,
        reviewCount: 892,
      },
      flight: {
        airline: 'Emirates',
        departure: { code: 'JFK', time: '22:00' },
        arrival: { code: 'DPS', time: '06:30' },
        duration: '18h 30m',
        stops: 1,
      },
      price: 1899,
      originalPrice: 2399,
      pricePer: 'person',
      nights: 7,
      highlights: ['Beachfront', 'All-Inclusive', 'Spa Access'],
      packageType: 'Beach',
      includes: ['Round-trip flights', '7 nights hotel', 'All meals', 'Spa treatments'],
    },
    {
      id: 3,
      hotel: {
        name: 'Metropolitan Suites',
        location: 'New York, USA',
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
        stars: 4,
        rating: 4.7,
        reviewCount: 2103,
      },
      flight: {
        airline: 'Delta',
        departure: { code: 'LAX', time: '06:00' },
        arrival: { code: 'JFK', time: '14:30' },
        duration: '5h 30m',
        stops: 0,
      },
      price: 899,
      originalPrice: 1199,
      pricePer: 'person',
      nights: 3,
      highlights: ['Central Location', 'Free WiFi', 'Gym Access'],
      packageType: 'City Break',
      includes: ['Round-trip flights', '3 nights hotel', 'Daily breakfast'],
    },
    {
      id: 4,
      hotel: {
        name: 'Sakura Garden Hotel',
        location: 'Tokyo, Japan',
        image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80',
        stars: 5,
        rating: 4.9,
        reviewCount: 1567,
      },
      flight: {
        airline: 'Japan Airlines',
        departure: { code: 'JFK', time: '11:00' },
        arrival: { code: 'NRT', time: '14:30' },
        duration: '13h 30m',
        stops: 0,
      },
      price: 2199,
      originalPrice: 2799,
      pricePer: 'person',
      nights: 6,
      highlights: ['Traditional Experience', 'Breakfast Included', 'Near Shrines'],
      packageType: 'Adventure',
      includes: ['Round-trip flights', '6 nights hotel', 'Daily breakfast', 'JR Pass'],
    },
    {
      id: 5,
      hotel: {
        name: 'Royal Heritage Inn',
        location: 'London, UK',
        image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80',
        stars: 4,
        rating: 4.6,
        reviewCount: 987,
      },
      flight: {
        airline: 'British Airways',
        departure: { code: 'JFK', time: '20:00' },
        arrival: { code: 'LHR', time: '07:30' },
        duration: '6h 30m',
        stops: 0,
      },
      price: 1099,
      originalPrice: 1399,
      pricePer: 'person',
      nights: 4,
      highlights: ['Historic Area', 'Afternoon Tea', 'Museum Access'],
      packageType: 'Romantic',
      includes: ['Round-trip flights', '4 nights hotel', 'Daily breakfast', 'Afternoon tea'],
    },
    {
      id: 6,
      hotel: {
        name: 'Desert Oasis Resort',
        location: 'Dubai, UAE',
        image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80',
        stars: 5,
        rating: 4.8,
        reviewCount: 1345,
      },
      flight: {
        airline: 'Emirates',
        departure: { code: 'JFK', time: '23:30' },
        arrival: { code: 'DXB', time: '19:45' },
        duration: '12h 15m',
        stops: 0,
      },
      price: 2499,
      originalPrice: 3199,
      pricePer: 'person',
      nights: 5,
      highlights: ['Luxury Resort', 'Private Beach', 'Butler Service'],
      packageType: 'Luxury',
      includes: [
        'Round-trip flights',
        '5 nights hotel',
        'All meals',
        'Spa access',
        'Desert safari',
      ],
    },
    {
      id: 7,
      hotel: {
        name: 'Mountain View Lodge',
        location: 'Switzerland',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
        stars: 4,
        rating: 4.7,
        reviewCount: 654,
      },
      flight: {
        airline: 'Swiss International',
        departure: { code: 'JFK', time: '18:00' },
        arrival: { code: 'ZRH', time: '07:30' },
        duration: '7h 30m',
        stops: 0,
      },
      price: 1799,
      originalPrice: 2199,
      pricePer: 'person',
      nights: 6,
      highlights: ['Mountain Views', 'Ski Access', 'Spa'],
      packageType: 'Adventure',
      includes: ['Round-trip flights', '6 nights hotel', 'Daily breakfast', 'Ski passes'],
    },
    {
      id: 8,
      hotel: {
        name: 'Tropical Paradise Resort',
        location: 'Maldives',
        image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
        stars: 5,
        rating: 4.9,
        reviewCount: 1123,
      },
      flight: {
        airline: 'Qatar Airways',
        departure: { code: 'JFK', time: '22:30' },
        arrival: { code: 'MLE', time: '20:00' },
        duration: '17h 30m',
        stops: 1,
      },
      price: 2999,
      originalPrice: 3799,
      pricePer: 'person',
      nights: 7,
      highlights: ['Overwater Villa', 'All-Inclusive', 'Snorkeling'],
      packageType: 'Beach',
      includes: [
        'Round-trip flights',
        '7 nights hotel',
        'All meals',
        'Water activities',
        'Spa treatments',
      ],
    },
    {
      id: 9,
      hotel: {
        name: 'Family Fun Resort',
        location: 'Orlando, USA',
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
        stars: 4,
        rating: 4.5,
        reviewCount: 2341,
      },
      flight: {
        airline: 'American Airlines',
        departure: { code: 'LAX', time: '08:00' },
        arrival: { code: 'MCO', time: '16:00' },
        duration: '5h 00m',
        stops: 0,
      },
      price: 799,
      originalPrice: 999,
      pricePer: 'person',
      nights: 4,
      highlights: ['Theme Park Access', 'Kids Club', 'Family Rooms'],
      packageType: 'Family',
      includes: [
        'Round-trip flights',
        '4 nights hotel',
        'Theme park tickets',
        'Breakfast',
      ],
    },
  ];

  // Filter and sort packages
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

  // Pagination
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

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

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
            <PackagesGrid
              packages={paginatedPackages}
              onPackageClick={handlePackageClick}
              className="mb-6"
            />

            {/* Pagination / Load More */}
            {showLoadMore ? (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={filteredAndSortedPackages.length}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
                showLoadMore={true}
                onLoadMore={handleLoadMore}
                hasMore={currentPage < totalPages}
              />
            ) : (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={filteredAndSortedPackages.length}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
                showLoadMore={false}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default PackagesPage;


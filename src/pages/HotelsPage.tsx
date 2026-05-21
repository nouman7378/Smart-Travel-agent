/**
 * HotelsPage — hero search + dynamic filtered hotel listings from API
 */

import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero, { HeroSearchFormData } from '../components/Hero';
import PopularDestinations from '../components/PopularDestinations';
import FeaturedHotels from '../components/FeaturedHotels';
import HotelSearchFilters, { HotelFilters } from '../components/HotelSearchFilters';
import SearchResultsList from '../components/SearchResultsList';
import SortBar from '../components/SortBar';
import Pagination from '../components/Pagination';
import { HotelResult } from '../components/HotelResultCard';
import RoomSelectionModal from '../components/RoomSelectionModal';
import { API_PREFIX, getMediaUrl } from '../config/env.config';

const HotelsPage: React.FC = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<HotelFilters>({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: 2,
    priceRange: [0, 100000],
    starRating: [],
    minRating: 0,
  });
  const [allHotels, setAllHotels] = useState<HotelResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSort, setCurrentSort] = useState('popularity');
  const [currentPage, setCurrentPage] = useState(1);
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<{
    id: number;
    name: string;
    location: string;
  } | null>(null);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setLoading(true);
        setError(null);
        const params = new URLSearchParams();
        if (filters.destination.trim()) {
          params.set('search', filters.destination.trim());
        }
        const response = await fetch(`${API_PREFIX}/hotels/?${params.toString()}`);
        const data = await response.json();
        if (data.success) {
          const placeholderImages = [
            'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
            'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
            'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80',
          ];
          const transformed: HotelResult[] = data.hotels.map((hotel: Record<string, unknown>) => {
            const id = hotel.id as number;
            const rating = Number(hotel.rating) || 0;
            const stars = Number(hotel.stars) || 3;
            const basePrice = Math.round(rating * 800 + stars * 2500);
            return {
              id,
              name: String(hotel.name),
              location: String(hotel.location),
              image:
                getMediaUrl(hotel.image_url as string) ||
                placeholderImages[id % placeholderImages.length],
              rating,
              reviewCount: Number(hotel.review_count) || 0,
              stars,
              price: basePrice,
              originalPrice: Math.round(basePrice * 1.15),
              currency: 'PKR',
              amenities: ['Free WiFi', 'Air Conditioning', '24/7 Service'],
              availability: true,
              distance: `${hotel.distance_from_center} km`,
            };
          });
          setAllHotels(transformed);
        } else {
          setError(data.message || 'Failed to load hotels');
        }
      } catch {
        setError('Network error. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchHotels();
  }, [filters.destination]);

  const priceMax = useMemo(() => {
    if (allHotels.length === 0) return 100000;
    const max = Math.max(...allHotels.map((h) => h.price));
    return Math.ceil(max / 1000) * 1000 || 100000;
  }, [allHotels]);

  const filteredHotels = useMemo(() => {
    let list = [...allHotels];
    if (filters.destination.trim()) {
      const q = filters.destination.toLowerCase().trim();
      list = list.filter(
        (h) =>
          h.name.toLowerCase().includes(q) ||
          h.location.toLowerCase().includes(q)
      );
    }
    if (filters.starRating.length > 0) {
      list = list.filter((h) => filters.starRating.includes(h.stars));
    }
    if (filters.minRating > 0) {
      list = list.filter((h) => h.rating >= filters.minRating);
    }
    list = list.filter(
      (h) => h.price >= filters.priceRange[0] && h.price <= filters.priceRange[1]
    );
    list.sort((a, b) => {
      switch (currentSort) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return b.reviewCount - a.reviewCount;
      }
    });
    return list;
  }, [allHotels, filters, currentSort]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, currentSort]);

  const itemsPerPage = 9;
  const totalPages = Math.max(1, Math.ceil(filteredHotels.length / itemsPerPage));
  const paginated = filteredHotels.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleViewDeal = (hotel: HotelResult) => {
    setSelectedHotel({ id: hotel.id, name: hotel.name, location: hotel.location });
    setShowRoomModal(true);
  };

  const handleHeroSearch = (_tab: string, data: HeroSearchFormData) => {
    setFilters((prev) => ({
      ...prev,
      destination: data.to.trim(),
      checkIn: data.checkIn,
      checkOut: data.checkOut,
      guests: data.rooms || data.passengers || prev.guests,
    }));
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-white">
      <Hero
        embedded
        className="!min-h-fit pt-4 pb-6 md:pt-6 md:pb-8"
        hideTag
        smallTitle
        hideStats
        onSearch={handleHeroSearch}
      />

      {/* Hotel results directly below hero — no overlap */}
      <section
        id="hotel-results"
        className="bg-gray-50 pt-6 md:pt-8 pb-10 md:pb-14 scroll-mt-4"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6">
            <aside className="lg:w-80 flex-shrink-0">
              <HotelSearchFilters
                filters={filters}
                onFiltersChange={setFilters}
                priceMax={priceMax}
              />
            </aside>
            <main className="flex-1 min-w-0">
              <SortBar
                totalResults={filteredHotels.length}
                currentSort={currentSort}
                onSortChange={setCurrentSort}
                className="mb-6"
              />
              {loading && (
                <div className="flex justify-center py-16">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
                </div>
              )}
              {error && !loading && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6">
                  {error}
                </div>
              )}
              {!loading && !error && filteredHotels.length === 0 && (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No hotels match your filters</h3>
                  <p className="text-gray-500 mb-4">Try clearing filters or another destination.</p>
                  <button
                    type="button"
                    onClick={() =>
                      setFilters({
                        destination: '',
                        checkIn: '',
                        checkOut: '',
                        guests: 2,
                        priceRange: [0, priceMax],
                        starRating: [],
                        minRating: 0,
                      })
                    }
                    className="text-blue-600 font-medium hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
              {!loading && filteredHotels.length > 0 && (
                <>
                  <SearchResultsList
                    searchType="hotels"
                    hotels={paginated}
                    onItemClick={(id) => navigate(`/hotel/${id}`)}
                    onViewDeal={handleViewDeal}
                    className="mb-6"
                  />
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={filteredHotels.length}
                    itemsPerPage={itemsPerPage}
                    onPageChange={setCurrentPage}
                    showLoadMore={false}
                  />
                </>
              )}
            </main>
          </div>
        </div>
      </section>

      <PopularDestinations className="!pt-16 md:!pt-20" />

      <FeaturedHotels />

      {selectedHotel && (
        <RoomSelectionModal
          isOpen={showRoomModal}
          onClose={() => setShowRoomModal(false)}
          hotel={selectedHotel}
          onBookRoom={() => setShowRoomModal(false)}
        />
      )}
    </div>
  );
};

export default HotelsPage;

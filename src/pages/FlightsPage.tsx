import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FlightSearchBar from '../components/flights/FlightSearchBar';
import FlightFilters from '../components/flights/FlightFilters';
import FlightResults from '../components/flights/FlightResults';
import { searchFlights, Flight } from '../services/flightService';
import { Frown } from 'lucide-react';
import downloadBg from '../assets/download.png';

const FlightsPage: React.FC = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [filteredFlights, setFilteredFlights] = useState<Flight[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (params: any) => {
    setIsLoading(true);
    setError(null);
    try {
      const results = await searchFlights(params);
      const list = (results && results.flights) ? results.flights : [];
      setFlights(list);
      setFilteredFlights(list);
      setShowResults(true);
    } catch (e: any) {
      setError(e?.message || 'Search failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (filtered: Flight[]) => {
    setFilteredFlights(filtered);
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 bg-cover bg-center transform scale-110"
              style={{ backgroundImage: `url(${downloadBg})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-950 via-blue-950/80 to-blue-900/45 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-b from-blue-950/40 via-transparent to-blue-950/70" />
          </div>

          <div className="absolute left-10 w-20 h-20 bg-blue-300/20 rounded-full blur-xl" />
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl" />
          <div className="absolute top-40 right-40 w-16 h-16 bg-blue-300/30 rounded-full blur-lg" />
        </div>

        <header className="relative pt-8 pb-4 bg-transparent">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-extrabold text-white">Find Flights</h1>
            <p className="text-white/80">Search flights and view results.</p>
          </div>
        </header>

        <main className="relative overflow-hidden pt-4 pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FlightSearchBar onSearch={handleSearch} />

          {!showResults && !isLoading && !error && (
            <section className="mt-10 text-white">
              <h2 className="text-2xl font-bold mb-2">Popular Destinations</h2>
              <p className="text-white/80">Use the search bar to find flights.</p>
            </section>
          )}

          {isLoading && (
            <div className="mt-10">Searching for the best flights...</div>
          )}

          {error && (
            <div className="mt-10 bg-white rounded-lg shadow-md p-8 text-center">
              <div className="text-6xl mb-4"><Frown className="inline w-8 h-8" /></div>
              <h3 className="text-xl font-semibold mb-2">Oops!</h3>
              <p className="text-gray-600 mb-4">{error}</p>
            </div>
          )}

          {showResults && !isLoading && !error && (
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-6">
              <aside className="lg:col-span-1">
                <FlightFilters onFilterChange={handleFilterChange} />
              </aside>
              <div className="lg:col-span-3">
                <FlightResults flights={filteredFlights} />
              </div>
            </div>
          )}
          </div>
        </main>
      </section>
    </div>
  );
};

export default FlightsPage;

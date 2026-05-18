/**
 * FlightSearchBar Component
 * 
 * Expedia.fr-style flight search form with tabs and inputs
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import CityAutocomplete, { City } from './CityAutocomplete';
import { Plane, Target } from 'lucide-react';
import DatePicker from '../common/DatePicker';


type TripType = 'round-trip' | 'one-way' | 'multi-city';

interface FlightSearchBarProps {
  onSearch?: (searchData: any) => void;
}

interface LocationData {
  display: string;
  iataCode: string;
  city: City | null;
}

const FlightSearchBar: React.FC<FlightSearchBarProps> = ({ onSearch }) => {
  const navigate = useNavigate();
  const [tripType, setTripType] = useState<TripType>('round-trip');
  const [fromLocation, setFromLocation] = useState<LocationData>({
    display: '',
    iataCode: '',
    city: null,
  });
  const [toLocation, setToLocation] = useState<LocationData>({
    display: '',
    iataCode: '',
    city: null,
  });
  const [formData, setFormData] = useState({
    departDate: '',
    returnDate: '',
    passengers: 1,
    class: 'economy',
  });

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const todayStr = `${year}-${month}-${day}`;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const nextData = {
        ...prev,
        [name]: name === 'passengers' ? parseInt(value) || 1 : value,
      };

      // Keep return date aligned if depart date is moved past the return date
      if (name === 'departDate' && nextData.returnDate && nextData.returnDate < value) {
        nextData.returnDate = value;
      }

      return nextData;
    });
  };

  const handleFromChange = (value: string, city: City | null) => {
    setFromLocation({
      display: value,
      iataCode: city?.iata_code || '',
      city: city,
    });
  };

  const handleToChange = (value: string, city: City | null) => {
    setToLocation({
      display: value,
      iataCode: city?.iata_code || '',
      city: city,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const searchData = {
      from: fromLocation.display,
      fromIataCode: fromLocation.iataCode,
      fromCity: fromLocation.city,
      to: toLocation.display,
      toIataCode: toLocation.iataCode,
      toCity: toLocation.city,
      ...formData,
      tripType,
    };

    if (onSearch) {
      onSearch(searchData);
    } else {
      navigate('/search/flights', { state: searchData });
    }
  };

  return (
    <div className="bg-blue-950 rounded-2xl shadow-2xl overflow-visible border border-blue-800/40 p-1">
      {/* Tabs */}
      <div className="flex border-b border-blue-900/60 overflow-hidden rounded-t-xl bg-blue-950/40">
        {[
          { id: 'round-trip' as TripType, label: 'Round trip' },
          { id: 'one-way' as TripType, label: 'One way' },
          { id: 'multi-city' as TripType, label: 'Multi-city' },
        ].map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setTripType(tab.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`flex-1 px-6 py-4 text-sm font-semibold transition-all duration-300 ${tripType === tab.id
                ? 'text-white bg-blue-950/40 backdrop-blur-md border-b-2 border-blue-400 shadow-inner'
                : 'text-blue-200 hover:text-white hover:bg-blue-900/30'
              }`}
          >
            {tab.label}
          </motion.button>
        ))}
      </div>

      {/* Search Form */}
      <form onSubmit={handleSubmit} className="p-6 overflow-visible">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 overflow-visible">
          {/* From */}
          <div className="lg:col-span-2">
            <CityAutocomplete
              label="From"
              value={fromLocation.display}
              onChange={handleFromChange}
              placeholder="City or airport"
              icon=<Plane className="text-blue-300 w-5 h-5" />
              required
              dark
            />
          </div>

          {/* To */}
          <div className="lg:col-span-2">
            <CityAutocomplete
              label="To"
              value={toLocation.display}
              onChange={handleToChange}
              placeholder="City or airport"
              icon=<Target className="text-blue-300 w-5 h-5" />
              required
              dark
            />
          </div>

          {/* Dates and Passengers Row */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-4">
            {/* Depart Date */}
            <div>
              <label className="block text-sm font-medium text-blue-100 mb-2">Departure</label>
              <DatePicker
                name="departDate"
                value={formData.departDate}
                onChange={handleInputChange}
                minDate={todayStr}
                className="w-full px-4 py-3 bg-blue-950/40 backdrop-blur-md border border-blue-400 rounded-lg focus-within:ring-2 focus-within:ring-blue-400 focus-within:border-transparent text-white placeholder-blue-200/60 transition-all duration-200"
              />
            </div>

            {/* Return Date - Only show for round-trip */}
            {tripType === 'round-trip' && (
              <div>
                <label className="block text-sm font-medium text-blue-100 mb-2">Return</label>
                <DatePicker
                  name="returnDate"
                  value={formData.returnDate}
                  onChange={handleInputChange}
                  minDate={formData.departDate || todayStr}
                  className="w-full px-4 py-3 bg-blue-950/40 backdrop-blur-md border border-blue-400 rounded-lg focus-within:ring-2 focus-within:ring-blue-400 focus-within:border-transparent text-white placeholder-blue-200/60 transition-all duration-200"
                />
              </div>
            )}
          </div>
        </div>

        {/* Second Row: Passengers and Class */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-blue-100 mb-2">Passengers</label>
            <select
              name="passengers"
              value={formData.passengers}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-blue-950/40 backdrop-blur-md border border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white transition-all duration-200"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <option key={num} value={num} className="bg-blue-950 text-white">
                  {num} {num === 1 ? 'passenger' : 'passengers'}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-100 mb-2">Class</label>
            <select
              name="class"
              value={formData.class}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-blue-950/40 backdrop-blur-md border border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white transition-all duration-200"
            >
              <option value="economy" className="bg-blue-950 text-white">Economy</option>
              <option value="premium" className="bg-blue-950 text-white">Premium</option>
              <option value="business" className="bg-blue-950 text-white">Business</option>
              <option value="first" className="bg-blue-950 text-white">First</option>
            </select>
          </div>

          {/* Search Button */}
          <div className="flex items-end">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-8 py-3 bg-white hover:bg-blue-50 text-blue-900 font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Search for flights
            </motion.button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FlightSearchBar;


export const SearchBar = () => {
  return (
    <div className="container mx-auto px-4 -mt-2">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Where to?</h2>
        
        <div className="space-y-4">
          {/* Main Search Row */}
          <div className="flex space-x-4">
            {/* Destination Input */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Going to
              </label>
              <input
                type="text"
                placeholder="Search destinations"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>

            {/* Dates Input */}
            <div className="w-48">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dates
              </label>
              <input
                type="text"
                placeholder="1 Dec - 7 Dec"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>

            {/* Travelers Input */}
            <div className="w-48">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Travellers
              </label>
              <input
                type="text"
                placeholder="2 travellers, 1 room"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors">
                Search
              </button>
            </div>
          </div>

          {/* Additional Options */}
          <div className="flex items-center space-x-6 text-sm">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded border-gray-300" />
              <span className="text-gray-700">Add a flight</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded border-gray-300" />
              <span className="text-gray-700">Add a car</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
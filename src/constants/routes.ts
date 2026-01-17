// Application routes

export const ROUTES = {
  // Main pages
  HOME: '/',
  FLIGHTS: '/flights',
  HOTELS: '/hotels',
  CARS: '/cars',
  PACKAGES: '/packages',
  DEALS: '/deals',
  
  // Search
  SEARCH_HOTELS: '/search/hotels',
  SEARCH_FLIGHTS: '/search/flights',
  SEARCH_CARS: '/search/cars',
  
  // Detail pages
  HOTEL_DETAIL: (id: string | number) => `/hotel/${id}`,
  FLIGHT_DETAIL: (id: string | number) => `/flight/${id}`,
  
  // Authentication
  LOGIN: '/login',
  SIGNUP: '/signup',
  
  // Booking
  BOOKING_CONFIRMATION: '/booking/confirmation',
  BOOKING_DEMO: '/booking/demo',
  
  // Chat & Itinerary
  CHAT: '/chat',
  CHAT_HISTORY: '/chat/history',
  ITINERARY_BUILDER: '/itinerary/builder',
  
  // Company pages
  ABOUT: '/about',
  JOBS: '/jobs',
  LIST_PROPERTY: '/list-property',
  PARTNERSHIPS: '/partnerships',
  ADVERTISING: '/advertising',
  AFFILIATE: '/affiliate',
  SUPPORT: '/support',
  
  // Explore
  EXPLORE_FRANCE: '/explore/france-travel-guide',
  HOTELS_FRANCE: '/explore/hotels-france',
  
  // Policies
  TERMS: '/policies/terms',
  PRIVACY: '/policies/privacy',
  COOKIES: '/policies/cookies',
} as const;

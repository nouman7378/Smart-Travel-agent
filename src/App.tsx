/**
 * App Component
 * 
 * Main application component with React Router v6 setup.
 * Uses LayoutWrapper to prevent Header/Footer duplication.
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { BookingProvider } from './contexts/BookingContext';
import LayoutWrapper from './components/layout/LayoutWrapper';
import AdminRoute from './components/AdminRoute';

// Main Pages
import HomePage from './pages/HomePage';
import FlightsPage from './pages/FlightsPage';
import HotelsPage from './pages/HotelsPage';
import SearchResultsPage from './pages/SearchResultsPage';
import HotelDetailPage from './pages/HotelDetailPage';
import FlightDetailPage from './pages/FlightDetailPage';
import CarRentalPage from './pages/CarRentalPage';
import PackagesPage from './pages/PackagesPage';
import AuthPage from './pages/AuthPage';
import BookingConfirmationPage from './pages/BookingConfirmationPage';
import ProfilePage from './pages/ProfilePage';

// Company Pages
import AboutPage from './pages/AboutPage';
import JobsPage from './pages/JobsPage';
import JobPage from './pages/JobPage';
import ListPropertyPage from './pages/ListPropertyPage';
import PartnershipsPage from './pages/PartnershipsPage';
import AdvertisingPage from './pages/AdvertisingPage';
import AffiliatePage from './pages/AffiliatePage';

// Deals & New Pages
import DealsPage from './pages/deals/DealsPage';

// Explore Pages
import FranceTravelGuidePage from './pages/explore/FranceTravelGuidePage';
import HotelsFrancePage from './pages/explore/HotelsFrancePage';
import HolidayRentalsFrancePage from './pages/explore/HolidayRentalsFrancePage';
import PackagesFrancePage from './pages/explore/PackagesFrancePage';
import DomesticFlightsPage from './pages/explore/DomesticFlightsPage';
import CarHireFrancePage from './pages/explore/CarHireFrancePage';
import AccommodationTypesPage from './pages/explore/AccommodationTypesPage';
import RewardsPage from './pages/explore/RewardsPage';

// Policies Pages
import TermsPage from './pages/policies/TermsPage';
import OneKeyTermsPage from './pages/policies/OneKeyTermsPage';
import AbritelTermsPage from './pages/policies/AbritelTermsPage';
import AccessibilityPage from './pages/policies/AccessibilityPage';
import HowSiteWorksPage from './pages/policies/HowSiteWorksPage';
import PrivacyPage from './pages/policies/PrivacyPage';
import CookiesPage from './pages/policies/CookiesPage';
import TermsOfUsePage from './pages/policies/TermsOfUsePage';
import LegalPage from './pages/policies/LegalPage';
import ContentGuidelinesPage from './pages/policies/ContentGuidelinesPage';

// Support Page
import SupportPage from './pages/SupportPage';

// Booking Pages
import FindTourPage from './pages/booking/FindTourPage';
import CustomizeTourPage from './pages/booking/CustomizeTourPage';
import DestinationsPage from './pages/booking/DestinationsPage';
import CancellationPage from './pages/booking/CancellationPage';
import SubmitPaymentPage from './pages/booking/SubmitPaymentPage';
import WaiverPolicyPage from './pages/booking/WaiverPolicyPage';
import InsurancePolicyPage from './pages/booking/InsurancePolicyPage';

// Travel Resources Pages
import TravelingPakistanPage from './pages/resources/TravelingPakistanPage';
import PakistanVisaPage from './pages/resources/PakistanVisaPage';
import TourismInfrastructurePage from './pages/resources/TourismInfrastructurePage';
import ResponsibleTourismPage from './pages/resources/ResponsibleTourismPage';
import TravelGuidePage from './pages/resources/TravelGuidePage';
import WhatToPackPage from './pages/resources/WhatToPackPage';
import FAQsPage from './pages/resources/FAQsPage';
import BlogPage from './pages/resources/BlogPage';

// Company Pages (New)
import CompanyAboutPage from './pages/company/AboutPage';
import ContactPage from './pages/company/ContactPage';
import ReviewsPage from './pages/company/ReviewsPage';
import PortfolioPage from './pages/company/PortfolioPage';
import CompanyJobsPage from './pages/company/JobsPage';

// Chat Pages (Frontend-only, no backend integration)
import ChatPage from './pages/chat/ChatPage';
import ChatHistoryPage from './pages/chat/ChatHistoryPage';
import QuickActionsPanel from './pages/chat/QuickActionsPanel';


// Integration Pages
import BusRoutesPage from './pages/integrations/BusRoutesPage';
import PackageSuggestionsPage from './pages/integrations/PackageSuggestionsPage';

// Admin Dashboard Pages (Frontend-only, no backend integration)
import ChatAnalytics from './pages/admin/ChatAnalytics';
import UserQueryTrends from './pages/admin/UserQueryTrends';
import ModelPerformance from './pages/admin/ModelPerformance';
import TrainingDataManager from './pages/admin/TrainingDataManager';
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagement from './pages/admin/UserManagement';
import PackageManagement from './pages/admin/PackageManagement';
import HotelManagement from './pages/admin/HotelManagement';
import CarManagement from './pages/admin/CarManagement';
import BookingManagement from './pages/admin/BookingManagement';
import PaymentsRevenue from './pages/admin/PaymentsRevenue';
// ReportsAnalytics removed from admin dashboard

// Booking Pages
import BookingDemoPage from './pages/booking/BookingDemoPage';

// Payment & Community Pages
import PaymentGatewayDemoPage from './pages/payment/PaymentGatewayDemoPage';
import CommunityPage from './pages/community/CommunityPage';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
                <BookingProvider>
                    <Router>
                        <Routes>
            <Route element={<LayoutWrapper />}>
          {/* Home Page */}
              <Route path="/" element={<HomePage />} />

          {/* Search Results Pages */}
              <Route path="/search/hotels" element={<SearchResultsPage searchType="hotels" />} />
              <Route path="/search/flights" element={<SearchResultsPage searchType="flights" />} />
              <Route path="/search/cars" element={<SearchResultsPage searchType="cars" />} />

          {/* Detail Pages */}
              <Route path="/hotel/:id" element={<HotelDetailPage />} />
              <Route path="/flight/:id" element={<FlightDetailPage />} />

              {/* Main Category Pages */}
              <Route path="/flights" element={<FlightsPage />} />
              <Route path="/hotels" element={<HotelsPage />} />
              <Route path="/cars" element={<CarRentalPage />} />
              <Route path="/packages" element={<PackagesPage />} />
              <Route path="/deals" element={<DealsPage />} />

          {/* Authentication Pages */}
              <Route path="/login" element={<AuthPage initialMode="login" />} />
              <Route path="/signup" element={<AuthPage initialMode="signup" />} />

          {/* Booking Confirmation Page */}
              <Route path="/booking/confirmation" element={<BookingConfirmationPage />} />
              <Route path="/booking/confirmation/:type" element={<BookingConfirmationPage />} />
              <Route path="/profile" element={<ProfilePage />} />

          {/* Company Pages */}
              <Route path="/about" element={<AboutPage />} />
              <Route path="/jobs" element={<JobsPage />} />
              <Route path="/job" element={<JobPage />} />
              <Route path="/list-property" element={<ListPropertyPage />} />
              <Route path="/partnerships" element={<PartnershipsPage />} />
              <Route path="/advertising" element={<AdvertisingPage />} />
              <Route path="/affiliate" element={<AffiliatePage />} />

          {/* Explore Pages */}
              <Route path="/explore/france-travel-guide" element={<FranceTravelGuidePage />} />
              <Route path="/explore/hotels-france" element={<HotelsFrancePage />} />
              <Route path="/explore/holiday-rentals-france" element={<HolidayRentalsFrancePage />} />
              <Route path="/explore/packages-france" element={<PackagesFrancePage />} />
              <Route path="/explore/domestic-flights" element={<DomesticFlightsPage />} />
              <Route path="/explore/car-hire-france" element={<CarHireFrancePage />} />
              <Route path="/explore/accommodation-types" element={<AccommodationTypesPage />} />
              <Route path="/explore/rewards" element={<RewardsPage />} />

          {/* Policies Pages */}
              <Route path="/policies/terms" element={<TermsPage />} />
              <Route path="/policies/onekey-terms" element={<OneKeyTermsPage />} />
              <Route path="/policies/abritel-terms" element={<AbritelTermsPage />} />
              <Route path="/policies/accessibility" element={<AccessibilityPage />} />
              <Route path="/policies/how-site-works" element={<HowSiteWorksPage />} />
              <Route path="/policies/privacy" element={<PrivacyPage />} />
              <Route path="/policies/cookies" element={<CookiesPage />} />
              <Route path="/policies/terms-of-use" element={<TermsOfUsePage />} />
              <Route path="/policies/legal" element={<LegalPage />} />
              <Route path="/policies/content-guidelines" element={<ContentGuidelinesPage />} />

          {/* Support Page */}
              <Route path="/support" element={<SupportPage />} />

          {/* Booking Pages */}
              <Route path="/booking/find-tour" element={<FindTourPage />} />
              <Route path="/booking/customize-tour" element={<CustomizeTourPage />} />
              <Route path="/booking/destinations" element={<DestinationsPage />} />
              <Route path="/booking/cancellation" element={<CancellationPage />} />
              <Route path="/booking/submit-payment" element={<SubmitPaymentPage />} />
              <Route path="/booking/waiver-policy" element={<WaiverPolicyPage />} />
              <Route path="/booking/insurance-policy" element={<InsurancePolicyPage />} />
              <Route path="/booking/demo" element={<BookingDemoPage />} />

          {/* Travel Resources Pages */}
              <Route path="/resources/traveling-pakistan" element={<TravelingPakistanPage />} />
              <Route path="/resources/pakistan-visa" element={<PakistanVisaPage />} />
              <Route path="/resources/tourism-infrastructure" element={<TourismInfrastructurePage />} />
              <Route path="/resources/responsible-tourism" element={<ResponsibleTourismPage />} />
              <Route path="/resources/travel-guide" element={<TravelGuidePage />} />
              <Route path="/resources/what-to-pack" element={<WhatToPackPage />} />
              <Route path="/resources/faqs" element={<FAQsPage />} />
              <Route path="/resources/blog" element={<BlogPage />} />

          {/* Company Pages (New) */}
              <Route path="/company/about" element={<CompanyAboutPage />} />
              <Route path="/company/contact" element={<ContactPage />} />
              <Route path="/company/reviews" element={<ReviewsPage />} />
              <Route path="/company/portfolio" element={<PortfolioPage />} />
              <Route path="/company/jobs" element={<CompanyJobsPage />} />

          {/* Chat Pages */}
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/chat/history" element={<ChatHistoryPage />} />
              <Route path="/chat/quick-actions" element={<QuickActionsPanel />} />


          {/* Integration Pages */}
              <Route path="/bus-routes" element={<BusRoutesPage />} />
              <Route path="/bus/routes" element={<BusRoutesPage />} />
              <Route path="/packages-suggestions" element={<PackageSuggestionsPage />} />
              <Route path="/packages/suggestions" element={<PackageSuggestionsPage />} />

          {/* Payment & Community Pages */}
              <Route path="/payment/demo" element={<PaymentGatewayDemoPage />} />
              <Route path="/community" element={<CommunityPage />} />

              {/* 404 - Redirect to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>

          {/* Admin Dashboard – only for superadmin/staff (is_staff) */}
              <Route path="/admin" element={<AdminRoute />}>
                <Route index element={<AdminDashboard />} />
                <Route path="users" element={<UserManagement />} />
                <Route path="packages" element={<PackageManagement />} />
                <Route path="hotels" element={<HotelManagement />} />
                <Route path="cars" element={<CarManagement />} />
                <Route path="bookings" element={<BookingManagement />} />
                <Route path="payments" element={<PaymentsRevenue />} />
                {/* Reports route removed from admin dashboard */}
                {/* Settings route removed from admin dashboard */}
                <Route path="analytics" element={<ChatAnalytics />} />
                <Route path="query-trends" element={<UserQueryTrends />} />
                <Route path="trends" element={<UserQueryTrends />} />
                <Route path="model-performance" element={<ModelPerformance />} />
                <Route path="performance" element={<ModelPerformance />} />
                <Route path="training-data" element={<TrainingDataManager />} />
                <Route path="training" element={<TrainingDataManager />} />
              </Route>
                        </Routes>
                    </Router>
                </BookingProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;

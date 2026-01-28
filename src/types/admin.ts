// Admin Dashboard Types

export type UserRole = 'admin' | 'agent' | 'traveler';
export type UserStatus = 'active' | 'inactive' | 'suspended';
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';
export type TripStatus = 'active' | 'inactive' | 'draft' | 'expired';

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  status: UserStatus;
  registrationDate: string;
  lastLogin?: string;
  totalBookings: number;
  totalSpent: number;
  phone?: string;
  avatar?: string;
}

export interface AdminPackage {
  id: string;
  title: string;
  destination: string;
  price: number;
  originalPrice?: number;
  duration: number; // days
  availability: number; // available slots
  status: TripStatus;
  featured: boolean;
  popular: boolean;
  bookings: number;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminBooking {
  id: string;
  bookingNumber: string;
  userId: string;
  userName: string;
  userEmail: string;
  packageId?: string;
  packageName?: string;
  bookingType: 'flight' | 'hotel' | 'car' | 'package';
  status: BookingStatus;
  totalAmount: number;
  paymentStatus: PaymentStatus;
  bookingDate: string;
  travelDate: string;
  assignedAgent?: string;
  notes?: string;
}

export interface Payment {
  id: string;
  bookingId: string;
  bookingNumber: string;
  userId: string;
  userName: string;
  amount: number;
  status: PaymentStatus;
  paymentMethod: string;
  transactionId?: string;
  paymentDate: string;
  currency: string;
}

export interface DashboardStats {
  totalUsers: number;
  activeTravelers: number;
  totalTrips: number;
  ongoingBookings: number;
  completedTrips: number;
  monthlyRevenue: number;
  pendingRequests: number;
  expiringSubscriptions?: number;
  growth: {
    users: number;
    bookings: number;
    revenue: number;
  };
}

export interface Notification {
  id: string;
  type: 'booking' | 'payment' | 'system' | 'alert';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  priority: 'low' | 'medium' | 'high';
}

export interface Report {
  id: string;
  name: string;
  type: 'users' | 'bookings' | 'revenue' | 'packages';
  dateRange: {
    start: string;
    end: string;
  };
  generatedAt: string;
  downloadUrl?: string;
}

export interface SystemSettings {
  platformName: string;
  maintenanceMode: boolean;
  allowRegistrations: boolean;
  maxBookingDays: number;
  currency: string;
  timezone: string;
  emailNotifications: boolean;
  smsNotifications: boolean;
}

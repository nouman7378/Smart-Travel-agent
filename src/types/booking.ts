// Booking-related types

export interface BookingUser {
  name: string;
  email: string;
  phone?: string;
}

export interface BookingDetails {
  bookingNumber: string;
  bookingDate: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  bookingType: 'flight' | 'hotel' | 'car' | 'package';
}

export interface PaymentSummary {
  subtotal: number;
  taxes: number;
  fees: number;
  discount?: number;
  total: number;
  currency: string;
  paymentMethod: string;
  last4Digits?: string;
}

export interface BookingData {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  roomTypeId: number;
  totalPrice: number;
}

export interface RoomType {
  id: number;
  name: string;
  description: string;
  maxGuests: number;
  price: number;
  originalPrice?: number;
  amenities: string[];
  image?: string;
}

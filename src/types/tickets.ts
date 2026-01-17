// Ticket-related types

export interface TicketType {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  features: string[];
  available: boolean;
  changeable?: boolean;
}

export interface TicketBookingData {
  ticketTypeId: number;
  passengers: number;
  totalPrice: number;
}

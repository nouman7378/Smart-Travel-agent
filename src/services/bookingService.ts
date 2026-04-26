import { API_PREFIX } from '../config/env.config';
import { APP_CONFIG } from '../constants/config';

export type BookingItemType = 'hotel_room' | 'car' | 'package';

export interface BookingCartItem {
  id: number;
  item_type: BookingItemType;
  reference_id: number;
  title: string;
  subtitle: string;
  unit_price: number;
  quantity: number;
  line_total: number;
  metadata?: Record<string, unknown>;
  created_at?: string;
}

export interface BookingCart {
  id: number;
  items: BookingCartItem[];
  item_count: number;
  subtotal: number;
}

export interface AddBookingItemPayload {
  item_type: BookingItemType;
  reference_id: number;
  title: string;
  subtitle?: string;
  unit_price: number;
  quantity?: number;
  metadata?: Record<string, unknown>;
}

async function parseJson<T>(response: Response): Promise<T> {
  try {
    return (await response.json()) as T;
  } catch {
    throw new Error('Invalid server response.');
  }
}

function getUserIdHeader(): Record<string, string> {
  try {
    const raw = localStorage.getItem(APP_CONFIG.STORAGE_KEYS.USER_DATA);
    if (!raw) {
      return {};
    }
    const parsed = JSON.parse(raw) as { id?: number };
    if (typeof parsed.id === 'number') {
      return { 'X-User-Id': String(parsed.id) };
    }
    return {};
  } catch {
    return {};
  }
}

export async function getBookingCart(): Promise<BookingCart> {
  const response = await fetch(`${API_PREFIX}/bookings/cart/`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      ...getUserIdHeader(),
    },
  });

  const data = await parseJson<{ success: boolean; message?: string; cart?: BookingCart }>(response);

  if (!response.ok || !data.success || !data.cart) {
    throw new Error(data.message || 'Failed to load booking cart.');
  }

  return data.cart;
}

export async function addBookingItem(payload: AddBookingItemPayload): Promise<BookingCartItem> {
  const response = await fetch(`${API_PREFIX}/bookings/cart/add/`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...getUserIdHeader(),
    },
    body: JSON.stringify({
      ...payload,
      quantity: payload.quantity || 1,
      subtitle: payload.subtitle || '',
    }),
  });

  const data = await parseJson<{ success: boolean; message?: string; item?: BookingCartItem }>(response);

  if (!response.ok || !data.success || !data.item) {
    throw new Error(data.message || 'Failed to add booking item.');
  }

  return data.item;
}

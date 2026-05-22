import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useAuth } from './AuthContext';
import {
  addBookingItem,
  AddBookingItemPayload,
  BookingCartItem,
  deleteBookingItem,
  getBookingCart,
} from '../services/bookingService';

interface BookingContextType {
  items: BookingCartItem[];
  itemCount: number;
  subtotal: number;
  isLoading: boolean;
  refreshCart: () => Promise<void>;
  addItemToBooking: (payload: AddBookingItemPayload) => Promise<void>;
  removeItemFromBooking: (itemId: number) => Promise<void>;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const useBooking = (): BookingContextType => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within BookingProvider');
  }
  return context;
};

interface BookingProviderProps {
  children: React.ReactNode;
}

export const BookingProvider: React.FC<BookingProviderProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [items, setItems] = useState<BookingCartItem[]>([]);
  const [itemCount, setItemCount] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const refreshCart = useCallback(async () => {
    if (!isAuthenticated) {
      setItems([]);
      setItemCount(0);
      setSubtotal(0);
      return;
    }

    setIsLoading(true);
    try {
      const cart = await getBookingCart();
      setItems(cart.items);
      setItemCount(cart.item_count);
      setSubtotal(cart.subtotal);
    } catch (error) {
      console.error('Failed to refresh booking cart:', error);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  const addItemToBooking = useCallback(
    async (payload: AddBookingItemPayload) => {
      if (!isAuthenticated) {
        throw new Error('Please sign in to add items to booking.');
      }

      const addedItem = await addBookingItem(payload);

      // Optimistically update local booking state so the booking page reflects
      // the added item immediately, even if a subsequent refresh fails.
      setItems((prev) => {
        const existingIndex = prev.findIndex((item) => item.id === addedItem.id);
        if (existingIndex >= 0) {
          const updated = [...prev];
          updated[existingIndex] = addedItem;
          return updated;
        }
        return [addedItem, ...prev];
      });

      setItemCount((prevCount) => {
        if (items.some((item) => item.id === addedItem.id)) {
          return prevCount;
        }
        return prevCount + 1;
      });

      setSubtotal((prevSubtotal) => {
        const existing = items.find((item) => item.id === addedItem.id);
        if (existing) {
          return prevSubtotal - existing.line_total + addedItem.line_total;
        }
        return prevSubtotal + addedItem.line_total;
      });

      // Keep backend as source of truth when available.
      void refreshCart();
    },
    [isAuthenticated, refreshCart, items]
  );

  const removeItemFromBooking = useCallback(
    async (itemId: number) => {
      if (!isAuthenticated) {
        throw new Error('Please sign in to manage booking items.');
      }

      await deleteBookingItem(itemId);
      await refreshCart();
    },
    [isAuthenticated, refreshCart]
  );

  useEffect(() => {
    void refreshCart();
  }, [refreshCart]);

  const value = useMemo(
    () => ({
      items,
      itemCount,
      subtotal,
      isLoading,
      refreshCart,
      addItemToBooking,
      removeItemFromBooking,
    }),
    [items, itemCount, subtotal, isLoading, refreshCart, addItemToBooking, removeItemFromBooking]
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
};

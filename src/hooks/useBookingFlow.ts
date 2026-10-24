import { useContext } from 'react';
import { BookingContext } from '@/context/bookingContextDef';
import type { BookingContextValue } from '@/context/bookingContextDef';

export function useBookingFlow(): BookingContextValue {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBookingFlow must be used within a BookingProvider');
  }
  return context;
}

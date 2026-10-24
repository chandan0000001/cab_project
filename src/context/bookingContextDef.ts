import { createContext } from 'react';
import { TripType, SelectedPlace } from '@/types';

export interface BookingData {
  tripType: TripType;
  pickupLocation: string;
  dropLocation: string;
  pickupPlace: SelectedPlace | null;
  dropPlace: SelectedPlace | null;
  travelDate: string;
  pickupTime: string;
  returnDate: string;
  rentalDuration: string;
  passengerCount: string;
  vehiclePreference: string;
}

export interface BookingContextValue {
  isBookingOpen: boolean;
  openBooking: (initialData?: Partial<BookingData>) => void;
  closeBooking: () => void;
  bookingData: BookingData;
  updateBookingData: (updates: Partial<BookingData>) => void;
  resetBookingData: () => void;
}

export const BookingContext = createContext<BookingContextValue | undefined>(undefined);

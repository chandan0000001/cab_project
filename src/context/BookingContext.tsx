import { useState, ReactNode } from 'react';
import { BookingContext } from './bookingContextDef';
import type { BookingData } from './bookingContextDef';

export type { BookingData, BookingContextValue } from './bookingContextDef';

const todayStr = new Date().toISOString().split('T')[0];

const defaultBookingData: BookingData = {
  tripType: 'one-way',
  pickupLocation: '',
  dropLocation: '',
  pickupPlace: null,
  dropPlace: null,
  travelDate: todayStr,
  pickupTime: '09:00 AM',
  returnDate: '',
  rentalDuration: '8 Hours / 80 km',
  passengerCount: '2 to 4 Passengers',
  vehiclePreference: 'Sedan (Dzire / Aura)',
};

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingData, setBookingData] = useState<BookingData>(defaultBookingData);

  const openBooking = (initialData?: Partial<BookingData>) => {
    if (initialData) {
      setBookingData((prev) => ({
        ...prev,
        ...initialData,
        returnDate:
          initialData.tripType === 'round-trip' && !initialData.returnDate
            ? initialData.travelDate || prev.travelDate || todayStr
            : initialData.returnDate || prev.returnDate,
      }));
    }
    setIsBookingOpen(true);
  };

  const closeBooking = () => {
    setIsBookingOpen(false);
  };

  const updateBookingData = (updates: Partial<BookingData>) => {
    setBookingData((prev) => ({ ...prev, ...updates }));
  };

  const resetBookingData = () => {
    setBookingData(defaultBookingData);
  };

  return (
    <BookingContext.Provider
      value={{
        isBookingOpen,
        openBooking,
        closeBooking,
        bookingData,
        updateBookingData,
        resetBookingData,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

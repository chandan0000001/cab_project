import { brandConfig } from '@/data/brandConfig';
import { BookingData, RouteCalculationResult } from '@/types';

/**
 * Checks if business phone is configured with a valid real number
 */
export function isPhoneConfigured(): boolean {
  const digits = brandConfig.contact.phoneRaw.replace(/\D/g, '');
  return digits.length >= 10 && !/^0+$/.test(digits) && !digits.startsWith('91000000');
}

/**
 * Checks if WhatsApp is configured with a valid real number
 */
export function isWhatsAppConfigured(): boolean {
  const digits = brandConfig.contact.whatsappRaw.replace(/\D/g, '');
  return digits.length >= 10 && !/^0+$/.test(digits) && !digits.startsWith('91000000');
}

/**
 * Generates the formal, pre-filled WhatsApp enquiry message matching Phase 4 specs.
 */
export function generateWhatsAppMessage(
  booking: BookingData,
  routeResult?: RouteCalculationResult | null
): string {
  const tripLabel =
    booking.tripType === 'one-way'
      ? 'one-way'
      : booking.tripType === 'round-trip'
      ? 'round-trip'
      : 'local hourly rental';

  const pickupName = booking.pickupPlace?.displayName || booking.pickupLocation || 'To be specified';
  const dropName = booking.dropPlace?.displayName || booking.dropLocation || '';

  const lines: (string | null)[] = [
    `Hello ${brandConfig.brandName},`,
    '',
    `I would like to enquire about a ${tripLabel} cab booking.`,
    '',
    `Pickup: ${pickupName}`,
  ];

  if (booking.tripType !== 'local-rental' && dropName) {
    lines.push(`Destination: ${dropName}`);
  }

  lines.push(`Travel date: ${booking.travelDate}`);
  lines.push(`Pickup time: ${booking.pickupTime}`);

  if (booking.tripType === 'round-trip' && booking.returnDate) {
    lines.push(`Return date: ${booking.returnDate}`);
  }

  if (booking.tripType === 'local-rental' && booking.rentalDuration) {
    lines.push(`Rental package: ${booking.rentalDuration}`);
  }

  lines.push(`Passengers: ${booking.passengerCount}`);
  lines.push(`Preferred vehicle: ${booking.vehiclePreference}`);

  if (routeResult) {
    lines.push(`Estimated road distance: ${routeResult.distanceText}`);
    lines.push(`Estimated duration: ${routeResult.durationText}`);
  }

  lines.push('');
  lines.push('Please confirm vehicle availability and share the final fare.');
  lines.push('');
  lines.push('Thank you.');

  return lines.filter((line) => line !== null).join('\n');
}

/**
 * Returns the click-to-chat WhatsApp URL
 */
export function getWhatsAppUrl(message: string): string {
  const targetNumber = brandConfig.contact.whatsappRaw;
  return `https://wa.me/${targetNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Returns telephone dialer URL
 */
export function getPhoneUrl(): string {
  return `tel:${brandConfig.contact.phoneRaw}`;
}

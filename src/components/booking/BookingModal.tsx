import { useState, lazy, Suspense, useEffect } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  Users, 
  Car, 
  ArrowRight, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle, 
  Phone, 
  MessageSquare,
  Compass,
  Loader2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { TripType } from '@/types';
import { useBookingFlow } from '@/hooks/useBookingFlow';
import { LocationAutocomplete } from '@/components/maps/LocationAutocomplete';
import { RouteSummary } from '@/components/maps/RouteSummary';
import { useRouteCalculation } from '@/hooks/useRouteCalculation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { brandConfig } from '@/data/brandConfig';
import { 
  isPhoneConfigured, 
  isWhatsAppConfigured, 
  generateWhatsAppMessage, 
  getWhatsAppUrl, 
  getPhoneUrl 
} from '@/lib/contactUtils';
import { sound } from '@/lib/sound';

// Lazy-load RouteMap so Leaflet and OpenStreetMap tiles are only downloaded when explicitly requested
const LazyRouteMap = lazy(() =>
  import('@/components/maps/RouteMap').then((module) => ({ default: module.RouteMap }))
);

export function BookingModal() {
  const { isBookingOpen, closeBooking, bookingData, updateBookingData } = useBookingFlow();

  const todayStr = new Date().toISOString().split('T')[0];

  const [step, setStep] = useState<'form' | 'review'>('form');
  const [showMapPreview, setShowMapPreview] = useState(false);

  const [errors, setErrors] = useState<{
    pickup?: string;
    drop?: string;
    travelDate?: string;
    returnDate?: string;
    rentalDuration?: string;
  }>({});

  // Sync state with context
  const {
    tripType,
    pickupLocation,
    dropLocation,
    pickupPlace,
    dropPlace,
    travelDate,
    pickupTime,
    returnDate,
    rentalDuration,
    passengerCount,
    vehiclePreference,
  } = bookingData;

  // Compute route on demand when both locations are provided and map preview is toggled
  const { routeResult, isLoading: isRouteLoading, error: routeError } = useRouteCalculation({
    pickup: showMapPreview ? pickupPlace : null,
    destination: showMapPreview ? (tripType === 'local-rental' ? dropPlace || null : dropPlace) : null,
  });

  // Handle ESC key to dismiss modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isBookingOpen) {
        sound.playClose();
        closeBooking();
      }
    };
    if (isBookingOpen) {
      sound.playPop();
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
      setStep('form');
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isBookingOpen, closeBooking]);

  if (!isBookingOpen) {
    return null;
  }

  const handleTripTypeChange = (newType: TripType) => {
    sound.playTap();
    updateBookingData({
      tripType: newType,
      returnDate:
        newType === 'round-trip' && !returnDate ? travelDate || todayStr : returnDate,
    });
    setErrors({});
  };

  const validate = (): boolean => {
    const newErrors: typeof errors = {};

    if (!pickupPlace && !pickupLocation.trim()) {
      newErrors.pickup = 'Please select a valid pickup location.';
    }

    if (tripType !== 'local-rental' && !dropPlace && !dropLocation.trim()) {
      newErrors.drop = 'Please select a destination.';
    }

    if (
      pickupPlace &&
      dropPlace &&
      pickupPlace.coordinates.lat === dropPlace.coordinates.lat &&
      pickupPlace.coordinates.lng === dropPlace.coordinates.lng
    ) {
      newErrors.drop = 'Pickup and destination cannot be identical.';
    }

    if (!travelDate) {
      newErrors.travelDate = 'Please select a departure date.';
    } else if (travelDate < todayStr) {
      newErrors.travelDate = 'Departure date cannot be in the past.';
    }

    if (tripType === 'round-trip') {
      if (!returnDate) {
        newErrors.returnDate = 'Please select a return date.';
      } else if (returnDate < travelDate) {
        newErrors.returnDate = 'Return date cannot precede departure date.';
      }
    }

    if (tripType === 'local-rental' && !rentalDuration) {
      newErrors.rentalDuration = 'Please select a rental duration package.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProceedToReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    sound.playSuccess();
    setStep('review');
  };

  const handleToggleMap = () => {
    if (!pickupPlace) {
      setErrors((prev) => ({ ...prev, pickup: 'Please select a pickup location first.' }));
      return;
    }
    if (tripType !== 'local-rental' && !dropPlace) {
      setErrors((prev) => ({ ...prev, drop: 'Please select a destination to preview route.' }));
      return;
    }
    setShowMapPreview((prev) => !prev);
  };

  const whatsappMessage = generateWhatsAppMessage(bookingData, routeResult);
  const whatsappUrl = getWhatsAppUrl(whatsappMessage);
  const phoneUrl = getPhoneUrl();
  const phoneReady = isPhoneConfigured();
  const whatsappReady = isWhatsAppConfigured();

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-flow-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-navy-950/70 backdrop-blur-sm overflow-y-auto"
    >
      <div className="bg-white rounded-2xl max-w-2xl w-full my-auto shadow-2xl border border-navy-100 flex flex-col max-h-[92vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header Bar */}
        <div className="p-4 sm:p-5 border-b border-navy-100 flex items-center justify-between bg-sand-50/80">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-700">
              Direct Travel Enquiry Desk
            </span>
            <h2 id="booking-flow-title" className="text-lg sm:text-xl font-bold text-navy-950">
              {step === 'form' ? 'Plan Your Travel & Book Cab' : 'Review & Confirm Enquiry'}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => {
              sound.playClose();
              closeBooking();
            }}
            aria-label="Close dialog"
            className="p-2 rounded-lg text-navy-400 hover:text-navy-900 hover:bg-navy-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {step === 'form' ? (
            /* STEP 1: JOURNEY CONFIGURATION FORM */
            <form onSubmit={handleProceedToReview} noValidate className="space-y-4">
              {/* Trip Type Tabs */}
              <div className="flex items-center gap-1.5 p-1 bg-navy-50 rounded-xl">
                {(
                  [
                    { id: 'one-way', label: 'One Way', icon: ArrowRight },
                    { id: 'round-trip', label: 'Round Trip', icon: RotateCcw },
                    { id: 'local-rental', label: 'Local Rental', icon: Clock },
                  ] as const
                ).map((tab) => {
                  const Icon = tab.icon;
                  const isSelected = tripType === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => handleTripTypeChange(tab.id)}
                      className={`flex-1 flex items-center justify-center gap-1.5 text-xs sm:text-sm font-bold py-2.5 px-3 rounded-lg transition-all select-none ${
                        isSelected
                          ? 'bg-navy-950 text-white shadow-sm'
                          : 'text-navy-600 hover:text-navy-950 hover:bg-white/60'
                      }`}
                      aria-pressed={isSelected}
                    >
                      <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-brand-400' : 'text-navy-400'}`} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Row 1: Location Autocomplete Inputs (Photon API with Odisha Fallback) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <LocationAutocomplete
                  label="Pickup Location"
                  required
                  placeholder="Enter pickup city, station, or airport..."
                  value={pickupPlace}
                  onChange={(place) => {
                    updateBookingData({
                      pickupPlace: place,
                      pickupLocation: place?.displayName || '',
                    });
                    if (errors.pickup) setErrors({ ...errors, pickup: undefined });
                  }}
                  error={errors.pickup}
                  iconColor="text-brand-600"
                  excludePlaceId={dropPlace?.placeId}
                />

                {tripType !== 'local-rental' ? (
                  <LocationAutocomplete
                    label="Destination Location"
                    required
                    placeholder="Enter destination temple, town, or city..."
                    value={dropPlace}
                    onChange={(place) => {
                      updateBookingData({
                        dropPlace: place,
                        dropLocation: place?.displayName || '',
                      });
                      if (errors.drop) setErrors({ ...errors, drop: undefined });
                    }}
                    error={errors.drop}
                    iconColor="text-blue-600"
                    excludePlaceId={pickupPlace?.placeId}
                  />
                ) : (
                  <Select
                    label="Local Rental Duration"
                    required
                    value={rentalDuration}
                    onChange={(e) => {
                      updateBookingData({ rentalDuration: e.target.value });
                      if (errors.rentalDuration) setErrors({ ...errors, rentalDuration: undefined });
                    }}
                    error={errors.rentalDuration}
                    options={[
                      { value: '4 Hours / 40 km', label: '4 Hours / 40 km (Half Day City)' },
                      { value: '8 Hours / 80 km', label: '8 Hours / 80 km (Full Day City)' },
                      { value: '12 Hours / 120 km', label: '12 Hours / 120 km (Extended Day)' },
                    ]}
                  />
                )}
              </div>

              {/* On-Demand Route Preview Toggle (Only loads Leaflet when requested!) */}
              <div className="pt-1">
                <div className="flex items-center justify-between p-3 rounded-xl bg-sand-50 border border-navy-100">
                  <div className="flex items-center gap-2">
                    <Compass className="w-4 h-4 text-brand-600" />
                    <div>
                      <p className="text-xs font-semibold text-navy-900">
                        Interactive Highway Route Preview
                      </p>
                      <p className="text-[11px] text-navy-500">
                        {showMapPreview
                          ? 'Showing road geometry and live distance calculation'
                          : 'Preview road route on OpenStreetMap on demand'}
                      </p>
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleToggleMap}
                    rightIcon={showMapPreview ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    className="text-xs shrink-0"
                  >
                    {showMapPreview ? 'Hide Map' : 'Show Route Preview'}
                  </Button>
                </div>

                {/* Lazy-Loaded Leaflet Map and OSRM Route Summary */}
                {showMapPreview && (
                  <div className="mt-3 space-y-3 animate-in fade-in duration-200">
                    <Suspense
                      fallback={
                        <div className="h-[280px] rounded-xl bg-navy-50 border border-navy-200 flex flex-col items-center justify-center text-navy-500 gap-2">
                          <Loader2 className="w-6 h-6 animate-spin text-brand-600" />
                          <span className="text-xs font-medium">Loading OpenStreetMap Engine...</span>
                        </div>
                      }
                    >
                      <LazyRouteMap
                        routeResult={routeResult}
                        pickup={pickupPlace}
                        destination={dropPlace}
                        isLoading={isRouteLoading}
                        className="h-[280px]"
                      />
                    </Suspense>

                    {routeError && (
                      <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-800 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                        <span>{routeError.message}</span>
                      </div>
                    )}

                    {routeResult && (
                      <RouteSummary route={routeResult} tripType={tripType} />
                    )}
                  </div>
                )}
              </div>

              {/* Row 2: Date, Time, and Return Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
                <Input
                  label="Departure Date"
                  type="date"
                  required
                  min={todayStr}
                  value={travelDate}
                  onChange={(e) => {
                    updateBookingData({ travelDate: e.target.value });
                    if (errors.travelDate) setErrors({ ...errors, travelDate: undefined });
                  }}
                  error={errors.travelDate}
                  leftIcon={<Calendar className="w-4 h-4 text-brand-600" />}
                />

                <Select
                  label="Pickup Time"
                  value={pickupTime}
                  onChange={(e) => updateBookingData({ pickupTime: e.target.value })}
                  leftIcon={<Clock className="w-4 h-4 text-brand-600" />}
                  options={[
                    { value: '05:00 AM', label: '05:00 AM (Early Morning)' },
                    { value: '06:00 AM', label: '06:00 AM' },
                    { value: '07:00 AM', label: '07:00 AM' },
                    { value: '08:00 AM', label: '08:00 AM' },
                    { value: '09:00 AM', label: '09:00 AM (Standard Morning)' },
                    { value: '10:00 AM', label: '10:00 AM' },
                    { value: '11:00 AM', label: '11:00 AM' },
                    { value: '12:00 PM', label: '12:00 PM (Noon)' },
                    { value: '02:00 PM', label: '02:00 PM (Afternoon)' },
                    { value: '04:00 PM', label: '04:00 PM' },
                    { value: '06:00 PM', label: '06:00 PM (Evening)' },
                    { value: '08:00 PM', label: '08:00 PM (Night)' },
                    { value: '10:00 PM', label: '10:00 PM (Late Night)' },
                  ]}
                />

                {tripType === 'round-trip' ? (
                  <Input
                    label="Return Date"
                    type="date"
                    required
                    min={travelDate || todayStr}
                    value={returnDate}
                    onChange={(e) => {
                      updateBookingData({ returnDate: e.target.value });
                      if (errors.returnDate) setErrors({ ...errors, returnDate: undefined });
                    }}
                    error={errors.returnDate}
                    leftIcon={<Calendar className="w-4 h-4 text-blue-600" />}
                  />
                ) : (
                  <Select
                    label="Passengers"
                    value={passengerCount}
                    onChange={(e) => updateBookingData({ passengerCount: e.target.value })}
                    leftIcon={<Users className="w-4 h-4 text-brand-600" />}
                    options={[
                      { value: '1 to 2 Passengers', label: '1 to 2 Passengers (Sedan)' },
                      { value: '3 to 4 Passengers', label: '3 to 4 Passengers (Sedan / MUV)' },
                      { value: '5 to 6 Passengers', label: '5 to 6 Passengers (Ertiga SUV)' },
                      { value: '7 Passengers', label: '7 Passengers (Innova Crysta)' },
                      { value: '8 to 16+ Passengers', label: '8 to 16+ Passengers (Tempo Traveller)' },
                    ]}
                  />
                )}
              </div>

              {/* Row 3: Vehicle Preference */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                  label="Preferred Vehicle Category"
                  value={vehiclePreference}
                  onChange={(e) => updateBookingData({ vehiclePreference: e.target.value })}
                  leftIcon={<Car className="w-4 h-4 text-brand-600" />}
                  options={[
                    { value: 'Sedan (Dzire / Aura)', label: 'Comfort Sedan (Dzire / Aura - 4 Seater)' },
                    { value: 'Family MUV (Ertiga)', label: 'Family SUV (Ertiga - 6 Seater)' },
                    { value: 'Toyota Innova Crysta', label: 'Premium MPV (Innova Crysta - 7 Seater)' },
                    { value: 'Tempo Traveller', label: 'Group Van (Tempo Traveller - 12/17 Seater)' },
                  ]}
                />

                {tripType === 'round-trip' && (
                  <Select
                    label="Passengers"
                    value={passengerCount}
                    onChange={(e) => updateBookingData({ passengerCount: e.target.value })}
                    leftIcon={<Users className="w-4 h-4 text-brand-600" />}
                    options={[
                      { value: '1 to 2 Passengers', label: '1 to 2 Passengers (Sedan)' },
                      { value: '3 to 4 Passengers', label: '3 to 4 Passengers (Sedan / MUV)' },
                      { value: '5 to 6 Passengers', label: '5 to 6 Passengers (Ertiga SUV)' },
                      { value: '7 Passengers', label: '7 Passengers (Innova Crysta)' },
                      { value: '8 to 16+ Passengers', label: '8 to 16+ Passengers (Tempo Traveller)' },
                    ]}
                  />
                )}
              </div>

              {/* Actions */}
              <div className="pt-3 flex gap-3">
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="flex-1 font-bold shadow-sm"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Review Booking Details
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  onClick={() => {
              sound.playClose();
              closeBooking();
            }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            /* STEP 2: REVIEW & DIRECT CONTACT CONFIRMATION */
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-brand-50 border border-brand-200">
                <CheckCircle2 className="w-5 h-5 text-brand-700 shrink-0" />
                <p className="text-xs text-brand-950 font-medium">
                  Please review your journey summary. When you proceed, your exact enquiry will be delivered directly to our reservation desk.
                </p>
              </div>

              {/* Structured Summary Table */}
              <div className="bg-sand-50 rounded-xl p-4 border border-navy-100 divide-y divide-navy-200/60 text-xs text-navy-800">
                <div className="flex justify-between py-2">
                  <span className="font-semibold text-navy-500">Trip Format:</span>
                  <span className="font-bold text-navy-950 uppercase">
                    {tripType.replace('-', ' ')}
                  </span>
                </div>

                <div className="flex justify-between py-2">
                  <span className="font-semibold text-navy-500">Pickup Location:</span>
                  <span className="font-bold text-navy-950 text-right max-w-[280px]">
                    {pickupPlace?.displayName || pickupLocation}
                  </span>
                </div>

                {tripType !== 'local-rental' && (
                  <div className="flex justify-between py-2">
                    <span className="font-semibold text-navy-500">Destination:</span>
                    <span className="font-bold text-navy-950 text-right max-w-[280px]">
                      {dropPlace?.displayName || dropLocation}
                    </span>
                  </div>
                )}

                {routeResult && (
                  <>
                    <div className="flex justify-between py-2">
                      <span className="font-semibold text-navy-500">Road Distance:</span>
                      <span className="font-bold text-brand-700">{routeResult.distanceText}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="font-semibold text-navy-500">Estimated Duration:</span>
                      <span className="font-bold text-brand-700">{routeResult.durationText}</span>
                    </div>
                  </>
                )}

                <div className="flex justify-between py-2">
                  <span className="font-semibold text-navy-500">Departure Schedule:</span>
                  <span className="font-bold text-navy-950">{travelDate} at {pickupTime}</span>
                </div>

                {tripType === 'round-trip' && returnDate && (
                  <div className="flex justify-between py-2">
                    <span className="font-semibold text-navy-500">Return Date:</span>
                    <span className="font-bold text-navy-950">{returnDate}</span>
                  </div>
                )}

                {tripType === 'local-rental' && rentalDuration && (
                  <div className="flex justify-between py-2">
                    <span className="font-semibold text-navy-500">Rental Duration:</span>
                    <span className="font-bold text-navy-950">{rentalDuration}</span>
                  </div>
                )}

                <div className="flex justify-between py-2">
                  <span className="font-semibold text-navy-500">Passenger Count:</span>
                  <span className="font-bold text-navy-950">{passengerCount}</span>
                </div>

                <div className="flex justify-between py-2">
                  <span className="font-semibold text-navy-500">Vehicle Category:</span>
                  <span className="font-bold text-navy-950">{vehiclePreference}</span>
                </div>
              </div>

              {/* Truth in Advertising Notice */}
              <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>
                  <strong>Important Notice:</strong> Your enquiry is not a confirmed booking. Subham Travelers will confirm vehicle availability and the final fare directly with you.
                </span>
              </div>

              {/* Direct Enquiry Actions */}
              <div className="space-y-2.5 pt-1">
                {whatsappReady ? (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full block"
                  >
                    <Button
                      variant="whatsapp"
                      size="md"
                      className="w-full font-bold shadow-sm"
                      leftIcon={<MessageSquare className="w-4 h-4" />}
                    >
                      Enquire on WhatsApp
                    </Button>
                  </a>
                ) : (
                  <div className="p-2.5 rounded-lg bg-navy-50 border border-navy-200 text-center text-xs text-navy-500">
                    WhatsApp enquiry unavailable (Contact number pending business owner configuration)
                  </div>
                )}

                {phoneReady ? (
                  <a href={phoneUrl} className="w-full block">
                    <Button
                      variant="primary"
                      size="md"
                      className="w-full font-bold shadow-sm"
                      leftIcon={<Phone className="w-4 h-4 text-brand-400" />}
                    >
                      Call Reservation Desk ({brandConfig.contact.phoneDisplay})
                    </Button>
                  </a>
                ) : (
                  <div className="p-2.5 rounded-lg bg-navy-50 border border-navy-200 text-center text-xs text-navy-500">
                    Direct phone support: {brandConfig.contact.phoneDisplay} (Placeholder)
                  </div>
                )}

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setStep('form')}
                  className="w-full text-xs"
                >
                  Modify Travel Details
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

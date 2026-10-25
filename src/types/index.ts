export type TripType = 'one-way' | 'round-trip' | 'local-rental';

export type VehicleCategory = 'hatchback' | 'sedan' | 'suv' | 'tempo-traveller' | 'luxury';

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface SelectedPlace {
  displayName: string;
  placeId?: string;
  coordinates: Coordinates;
  formattedAddress?: string;
  isPopularPreset?: boolean;
  distanceKm?: number;
  distanceText?: string;
}

export interface RouteCalculationResult {
  pickup: SelectedPlace;
  destination: SelectedPlace;
  distanceText: string;
  distanceValueMeters: number;
  durationText: string;
  durationValueSeconds: number;
  polylinePoints: Coordinates[];
  provider?: 'osrm' | 'cached-preset';
}

export type RouteCalculationErrorKind =
  | 'INVALID_LOCATIONS'
  | 'SAME_LOCATIONS'
  | 'NO_ROUTE_FOUND'
  | 'RATE_LIMITED'
  | 'NETWORK_ERROR'
  | 'UNKNOWN_ERROR';

export interface RouteCalculationError {
  kind: RouteCalculationErrorKind;
  message: string;
}

export interface Vehicle {
  id: string;
  name: string;
  category: VehicleCategory;
  categoryLabel: string;
  seatingCapacity: number;
  luggageCapacity: number;
  hasAC: boolean;
  idealFor: string;
  features: string[];
  rateEstimateNote?: string;
  imageUrl: string;
  badge?: string;
  isPopular?: boolean;
  isPlaceholderSpecs?: boolean;
}

export interface Destination {
  id: string;
  name: string;
  location: string;
  tagline: string;
  description: string;
  distanceFromBerhampur: string;
  distanceFromBhubaneswar?: string;
  bestTimeToVisit: string;
  keyHighlights: string[];
  imageUrl: string;
  collageImages?: { url: string; title: string }[];
  isFeatured?: boolean;
  coordinates?: Coordinates;
  circuit?: 'all' | 'coastal-pilgrimage' | 'heritage-culture' | 'hills-nature';
}

export type RouteRegion = 'all' | 'coastal-heritage' | 'southern-hills' | 'western-odisha';

export interface TravelRoute {
  id: string;
  origin: string;
  destination: string;
  distanceKm: number;
  durationEst: string;
  highlight: string;
  popularCabs: string[];
  isPopular?: boolean;
  isProposed?: boolean;
  region: 'coastal-heritage' | 'southern-hills' | 'western-odisha';
  originCoords?: Coordinates;
  destinationCoords?: Coordinates;
}

export interface ServiceCategory {
  id: string;
  title: string;
  tagline: string;
  description: string;
  iconName: 'car' | 'repeat' | 'clock' | 'plane' | 'map' | 'compass';
  features: string[];
  imageUrl: string;
  isProposed?: boolean;
}

export interface TripSearchState {
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

export type BookingData = TripSearchState;

export interface TripSearchErrors {
  pickupLocation?: string;
  dropLocation?: string;
  travelDate?: string;
  returnDate?: string;
  rentalDuration?: string;
  routeError?: string;
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  location: string;
  travelRoute: string;
  quote: string;
  date: string;
  isDemoSample: boolean;
}

export interface NavItem {
  label: string;
  path: string;
  badge?: string;
  isExternal?: boolean;
}

export interface BrandConfig {
  brandName: string;
  tagline: string;
  subTagline: string;
  legalEntityNotice: string;
  headquarters: string;
  serviceArea: string;
  contact: {
    phoneDisplay: string;
    phoneRaw: string;
    whatsappRaw: string;
    email: string;
    officeHours: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    pinCode: string;
  };
  navigation: {
    main: NavItem[];
    footerServices: NavItem[];
    footerDestinations: NavItem[];
    footerQuickLinks: NavItem[];
    legal: NavItem[];
  };
  ceoProfile: {
    namePlaceholder: string;
    titlePlaceholder: string;
    bioPlaceholder: string;
    messagePlaceholder: string;
    isVerified: boolean;
    image?: string;
  };
}

import { Coordinates, SelectedPlace } from '@/types';

export interface UserIpLocation {
  city: string;
  region?: string;
  country?: string;
  latitude: number;
  longitude: number;
  isApproximate: boolean;
}

const BERHAMPUR_DEFAULT: UserIpLocation = {
  city: 'Berhampur',
  region: 'Odisha',
  country: 'IN',
  latitude: 19.3149,
  longitude: 84.7941,
  isApproximate: true,
};

const STORAGE_KEY = 'st_user_ip_location';
let inMemoryLocation: UserIpLocation | null = null;
let fetchPromise: Promise<UserIpLocation> | null = null;

/**
 * Calculates great-circle distance in kilometers between two geographic coordinates
 * using the standard Haversine formula.
 */
export function calculateDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Formats distance into human-friendly representation
 */
export function formatDistanceText(distanceKm: number): string {
  if (distanceKm < 1) {
    return '< 1 km away';
  }
  if (distanceKm < 2) {
    return '~1 km away';
  }
  return `~${Math.round(distanceKm)} km away`;
}

export class IpLocationService {
  /**
   * Fetches approximate user location from IP/network headers (no GPS permissions required).
   * Caches result in memory and sessionStorage to avoid redundant network requests.
   */
  public static async getUserIpLocation(): Promise<UserIpLocation> {
    if (inMemoryLocation) {
      return inMemoryLocation;
    }

    if (typeof window !== 'undefined') {
      try {
        const cached = sessionStorage.getItem(STORAGE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached) as UserIpLocation;
          if (parsed && typeof parsed.latitude === 'number' && typeof parsed.longitude === 'number') {
            inMemoryLocation = parsed;
            return parsed;
          }
        }
      } catch {
        // Ignore session storage errors
      }
    }

    if (fetchPromise) {
      return fetchPromise;
    }

    fetchPromise = this.resolveLocation();
    const result = await fetchPromise;
    fetchPromise = null;
    inMemoryLocation = result;

    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(result));
      } catch {
        // Ignore session storage quota
      }
    }

    return result;
  }

  private static async resolveLocation(): Promise<UserIpLocation> {
    // 1. Try Vercel edge endpoint (/api/geo) - zero latency, internal, respects CSP
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 2000);
      const res = await fetch('/api/geo', { signal: controller.signal });
      clearTimeout(timeout);

      if (res.ok) {
        const data = await res.json();
        if (data && typeof data.latitude === 'number' && typeof data.longitude === 'number' && data.latitude !== 0) {
          return {
            city: data.city || 'Your Area',
            region: data.region || 'Odisha',
            country: data.country || 'IN',
            latitude: data.latitude,
            longitude: data.longitude,
            isApproximate: true,
          };
        }
      }
    } catch {
      // Endpoint unavailable or aborted, fallback to public IP lookup
    }

    // 2. Try public IP lookup (ipapi.co) as fallback for local dev or non-Vercel environments
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 2500);
      const res = await fetch('https://ipapi.co/json/', { signal: controller.signal });
      clearTimeout(timeout);

      if (res.ok) {
        const data = await res.json();
        if (data && typeof data.latitude === 'number' && typeof data.longitude === 'number') {
          return {
            city: data.city || 'Your Area',
            region: data.region || 'Odisha',
            country: data.country_code || 'IN',
            latitude: data.latitude,
            longitude: data.longitude,
            isApproximate: true,
          };
        }
      }
    } catch {
      // Network failure, use Berhampur default
    }

    // 3. Fallback to Berhampur Hub
    return BERHAMPUR_DEFAULT;
  }

  /**
   * Sorts places by proximity to user coordinates (Nearest to Farthest)
   * and attaches formatted distance strings.
   */
  public static sortPlacesByDistance(
    places: SelectedPlace[],
    userCoords?: Coordinates | null
  ): SelectedPlace[] {
    if (!userCoords || typeof userCoords.lat !== 'number' || typeof userCoords.lng !== 'number') {
      return places;
    }

    return [...places]
      .map((place) => {
        const distanceKm = calculateDistanceKm(
          userCoords.lat,
          userCoords.lng,
          place.coordinates.lat,
          place.coordinates.lng
        );
        return {
          ...place,
          distanceKm: Math.round(distanceKm * 10) / 10,
          distanceText: formatDistanceText(distanceKm),
        };
      })
      .sort((a, b) => (a.distanceKm ?? 0) - (b.distanceKm ?? 0));
  }
}

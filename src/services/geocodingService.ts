import { SelectedPlace, Coordinates } from '@/types';
import { env } from '@/lib/env';
import { ODISHA_PRESET_LOCATIONS } from '@/data/odishaPlaces';
import { IpLocationService } from '@/services/ipLocationService';

interface PhotonFeature {
  geometry: {
    coordinates: [number, number]; // [lng, lat]
  };
  properties: {
    name?: string;
    osm_id?: number | string;
    osm_type?: string;
    country?: string;
    city?: string;
    state?: string;
    district?: string;
    postcode?: string;
    street?: string;
    housenumber?: string;
  };
}

interface PhotonResponse {
  features?: PhotonFeature[];
}

export class GeocodingService {
  private static activeAbortController: AbortController | null = null;

  /**
   * Searches for location suggestions using Photon API with Odisha geographic bias.
   * Ranks results nearest-to-farthest from user's approximate IP coordinates.
   * Gracefully falls back to curated Odisha presets if network fails or rate-limited.
   */
  public static async searchLocations(
    query: string,
    excludePlaceId?: string,
    userCoords?: Coordinates | null
  ): Promise<SelectedPlace[]> {
    const trimmed = query.trim();
    if (!trimmed || trimmed.length < 2) {
      return this.getFallbackPresets('', excludePlaceId, userCoords);
    }

    // Cancel any previous in-flight request
    if (this.activeAbortController) {
      this.activeAbortController.abort();
    }
    this.activeAbortController = new AbortController();

    try {
      const baseUrl = env.photonApiUrl.replace(/\/+$/, '');
      // Center bias around user's IP coordinates or default Odisha hub
      const biasLat = userCoords?.lat || 20.2961;
      const biasLon = userCoords?.lng || 85.8245;
      const url = `${baseUrl}?q=${encodeURIComponent(trimmed)}&lat=${biasLat}&lon=${biasLon}&limit=8`;

      const response = await fetch(url, {
        signal: this.activeAbortController.signal,
        headers: {
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        // Handle 429 or other HTTP error codes gracefully
        return this.getFallbackPresets(trimmed, excludePlaceId, userCoords);
      }

      const data: PhotonResponse = await response.json();
      if (!data.features || data.features.length === 0) {
        return this.getFallbackPresets(trimmed, excludePlaceId, userCoords);
      }

      const places: SelectedPlace[] = data.features
        .filter((feature) => {
          const [lng, lat] = feature.geometry.coordinates;
          return !isNaN(lat) && !isNaN(lng);
        })
        .map((feature, idx) => {
          const [lng, lat] = feature.geometry.coordinates;
          const props = feature.properties;
          const name = props.name || props.city || 'Location';

          const addressParts = [
            props.district,
            props.city,
            props.state,
            props.country,
          ].filter(Boolean);

          const uniqueAddressParts = Array.from(new Set(addressParts));
          const formattedAddress = uniqueAddressParts.join(', ');

          return {
            displayName: name,
            formattedAddress: formattedAddress || undefined,
            placeId: props.osm_id ? `osm-${props.osm_id}` : `photon-${lat}-${lng}-${idx}`,
            coordinates: { lat, lng },
            isPopularPreset: false,
          };
        })
        .filter((place) => place.placeId !== excludePlaceId);

      // If Photon results are scarce, append relevant local Odisha presets
      if (places.length < 3) {
        const presets = this.getFallbackPresets(trimmed, excludePlaceId, userCoords);
        const seenNames = new Set(places.map((p) => p.displayName.toLowerCase()));
        for (const p of presets) {
          if (!seenNames.has(p.displayName.toLowerCase())) {
            places.push(p);
          }
        }
      }

      // Sort places nearest to farthest from user's IP location
      const sorted = userCoords
        ? IpLocationService.sortPlacesByDistance(places, userCoords)
        : places;

      return sorted.slice(0, 7);
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') {
        // Request was aborted by user typing newer text
        return [];
      }
      // On network failure or CORS, fall back smoothly
      return this.getFallbackPresets(trimmed, excludePlaceId, userCoords);
    } finally {
      this.activeAbortController = null;
    }
  }

  /**
   * Returns preset Odisha landmarks and cities sorted nearest to farthest from user's IP location
   */
  public static getFallbackPresets(
    query: string,
    excludePlaceId?: string,
    userCoords?: Coordinates | null
  ): SelectedPlace[] {
    const q = query.toLowerCase().trim();
    const available = ODISHA_PRESET_LOCATIONS.filter((p) => p.placeId !== excludePlaceId);

    // If query is present, filter by matching text
    const filtered = !q
      ? available
      : available.filter(
          (p) =>
            p.displayName.toLowerCase().includes(q) ||
            (p.formattedAddress && p.formattedAddress.toLowerCase().includes(q))
        );

    // Sort nearest to farthest using user's approximate IP coordinates
    if (userCoords) {
      const sorted = IpLocationService.sortPlacesByDistance(filtered, userCoords);
      return sorted.slice(0, !q ? 8 : 6);
    }

    return filtered.slice(0, 6);
  }
}

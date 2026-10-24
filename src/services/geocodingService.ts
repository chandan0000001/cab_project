import { SelectedPlace } from '@/types';
import { env } from '@/lib/env';
import { ODISHA_PRESET_LOCATIONS } from '@/data/odishaPlaces';

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
   * Gracefully falls back to curated Odisha presets if network fails or rate-limited.
   */
  public static async searchLocations(
    query: string,
    excludePlaceId?: string
  ): Promise<SelectedPlace[]> {
    const trimmed = query.trim();
    if (!trimmed || trimmed.length < 2) {
      return this.getFallbackPresets('', excludePlaceId);
    }

    // Cancel any previous in-flight request
    if (this.activeAbortController) {
      this.activeAbortController.abort();
    }
    this.activeAbortController = new AbortController();

    try {
      const baseUrl = env.photonApiUrl.replace(/\/+$/, '');
      // Biased toward Odisha (lat 20.2961, lon 85.8245)
      const url = `${baseUrl}?q=${encodeURIComponent(trimmed)}&lat=20.2961&lon=85.8245&limit=8`;

      const response = await fetch(url, {
        signal: this.activeAbortController.signal,
        headers: {
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        // Handle 429 or other HTTP error codes gracefully
        return this.getFallbackPresets(trimmed, excludePlaceId);
      }

      const data: PhotonResponse = await response.json();
      if (!data.features || data.features.length === 0) {
        return this.getFallbackPresets(trimmed, excludePlaceId);
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
        const presets = this.getFallbackPresets(trimmed, excludePlaceId);
        const seenNames = new Set(places.map((p) => p.displayName.toLowerCase()));
        for (const p of presets) {
          if (!seenNames.has(p.displayName.toLowerCase())) {
            places.push(p);
          }
        }
      }

      return places.slice(0, 7);
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') {
        // Request was aborted by user typing newer text
        return [];
      }
      // On network failure or CORS, fall back smoothly
      return this.getFallbackPresets(trimmed, excludePlaceId);
    } finally {
      this.activeAbortController = null;
    }
  }

  /**
   * Returns preset Odisha landmarks and cities
   */
  public static getFallbackPresets(query: string, excludePlaceId?: string): SelectedPlace[] {
    const q = query.toLowerCase().trim();
    if (!q) {
      return ODISHA_PRESET_LOCATIONS.filter((p) => p.placeId !== excludePlaceId).slice(0, 6);
    }
    return ODISHA_PRESET_LOCATIONS.filter(
      (p) =>
        p.placeId !== excludePlaceId &&
        (p.displayName.toLowerCase().includes(q) ||
          (p.formattedAddress && p.formattedAddress.toLowerCase().includes(q)))
    );
  }
}

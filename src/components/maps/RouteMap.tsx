import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { RouteCalculationResult, SelectedPlace } from '@/types';
import { Navigation, Compass, Sparkles, Layers } from 'lucide-react';

export interface RouteMapProps {
  routeResult: RouteCalculationResult | null;
  pickup: SelectedPlace | null;
  destination: SelectedPlace | null;
  isLoading?: boolean;
  className?: string;
}

// Center of Odisha (Bhubaneswar/Cuttack regional hub)
const ODISHA_DEFAULT_CENTER: [number, number] = [20.35, 85.82];
const DEFAULT_ZOOM = 7.5;

// Custom Leaflet DivIcons to avoid broken asset URL issues and provide crisp retina styling
function createPickupIcon(): L.DivIcon {
  return L.divIcon({
    className: 'custom-pickup-marker',
    html: `
      <div style="position: relative; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center;">
        <div style="position: absolute; width: 24px; height: 24px; background: rgba(13, 148, 136, 0.35); border-radius: 50%; animation: ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
        <div style="width: 16px; height: 16px; background: #0D9488; border: 2.5px solid #FFFFFF; border-radius: 50%; box-shadow: 0 2px 6px rgba(0,0,0,0.35);"></div>
      </div>
    `,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });
}

function createDestinationIcon(): L.DivIcon {
  return L.divIcon({
    className: 'custom-dest-marker',
    html: `
      <div style="position: relative; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center;">
        <div style="position: absolute; width: 26px; height: 26px; background: rgba(217, 119, 6, 0.35); border-radius: 50%; animation: ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
        <div style="width: 18px; height: 18px; background: #D97706; border: 2.5px solid #FFFFFF; border-radius: 50%; box-shadow: 0 2px 6px rgba(0,0,0,0.35);"></div>
      </div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
}

function createMovingCarIcon(headingDegrees: number): L.DivIcon {
  return L.divIcon({
    className: 'custom-moving-marker',
    html: `
      <div style="width: 26px; height: 26px; background: #042F2E; border: 2px solid #5EEAD4; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(0,0,0,0.4); transform: rotate(${headingDegrees}deg); transition: transform 0.08s linear;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#5EEAD4" xmlns="http://www.w3.org/2000/svg">
          <polygon points="12 2 19 21 12 17 5 21 12 2"/>
        </svg>
      </div>
    `,
    iconSize: [26, 26],
    iconAnchor: [13, 13],
  });
}

export function RouteMap({
  routeResult,
  pickup,
  destination,
  isLoading = false,
  className = '',
}: RouteMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  const pickupMarkerRef = useRef<L.Marker | null>(null);
  const destMarkerRef = useRef<L.Marker | null>(null);
  const routePolylineRef = useRef<L.Polyline | null>(null);
  const movingMarkerRef = useRef<L.Marker | null>(null);

  const animationFrameIdRef = useRef<number | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  // Check user prefers-reduced-motion preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent) => {
        setPrefersReducedMotion(e.matches);
      };
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  // Stop any active route animation loop
  const stopAnimation = () => {
    if (animationFrameIdRef.current !== null) {
      cancelAnimationFrame(animationFrameIdRef.current);
      animationFrameIdRef.current = null;
    }
    if (movingMarkerRef.current && mapInstanceRef.current) {
      mapInstanceRef.current.removeLayer(movingMarkerRef.current);
      movingMarkerRef.current = null;
    }
  };

  // 1. Initialize Leaflet Map instance once
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: ODISHA_DEFAULT_CENTER,
        zoom: DEFAULT_ZOOM,
        zoomControl: true,
        scrollWheelZoom: true,
      });

      // Add OpenStreetMap Tile Layer with required attribution
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors | OSRM Routing',
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    // Force map to invalidate size after render to avoid grey tile slices
    const timeout = setTimeout(() => {
      mapInstanceRef.current?.invalidateSize();
    }, 200);

    return () => {
      clearTimeout(timeout);
      stopAnimation();
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // 2. Render route polyline, markers, and path animation when inputs or route change
  useEffect(() => {
    stopAnimation();

    const map = mapInstanceRef.current;
    if (!map) return;

    // Clean up previous layers
    if (pickupMarkerRef.current) {
      map.removeLayer(pickupMarkerRef.current);
      pickupMarkerRef.current = null;
    }
    if (destMarkerRef.current) {
      map.removeLayer(destMarkerRef.current);
      destMarkerRef.current = null;
    }
    if (routePolylineRef.current) {
      map.removeLayer(routePolylineRef.current);
      routePolylineRef.current = null;
    }

    // Case A: A full route is computed
    if (routeResult && routeResult.polylinePoints.length > 0) {
      const latLngs: L.LatLngExpression[] = routeResult.polylinePoints.map((pt) => [
        pt.lat,
        pt.lng,
      ]);

      // Create Route Polyline along road path
      const polyline = L.polyline(latLngs, {
        color: '#0F766E', // Brand Teal-700
        weight: 5,
        opacity: 0.88,
        lineCap: 'round',
        lineJoin: 'round',
      }).addTo(map);
      routePolylineRef.current = polyline;

      // Create Pickup Marker
      const pMarker = L.marker([routeResult.pickup.coordinates.lat, routeResult.pickup.coordinates.lng], {
        icon: createPickupIcon(),
        title: `Pickup: ${routeResult.pickup.displayName}`,
      }).addTo(map);
      pMarker.bindPopup(`<strong>Pickup:</strong><br />${routeResult.pickup.displayName}`);
      pickupMarkerRef.current = pMarker;

      // Create Destination Marker
      const dMarker = L.marker(
        [routeResult.destination.coordinates.lat, routeResult.destination.coordinates.lng],
        {
          icon: createDestinationIcon(),
          title: `Destination: ${routeResult.destination.displayName}`,
        }
      ).addTo(map);
      dMarker.bindPopup(`<strong>Destination:</strong><br />${routeResult.destination.displayName}`);
      destMarkerRef.current = dMarker;

      // Automatically fit map bounds to the route with comfortable padding
      map.fitBounds(polyline.getBounds(), {
        padding: [45, 45],
        maxZoom: 15,
      });

      // Animate directional marker along the road geometry if motion is permitted
      if (!prefersReducedMotion && routeResult.polylinePoints.length > 1) {
        const points = routeResult.polylinePoints;
        let step = 0;
        const totalSteps = points.length;

        // Calculate initial heading angle
        const initialHeading =
          (Math.atan2(points[1].lng - points[0].lng, points[1].lat - points[0].lat) * 180) / Math.PI;

        const carMarker = L.marker([points[0].lat, points[0].lng], {
          icon: createMovingCarIcon(initialHeading),
          zIndexOffset: 1000,
        }).addTo(map);
        movingMarkerRef.current = carMarker;

        let lastTime = performance.now();
        const stepIntervalMs = 70; // Smooth traversal cadence

        const animateLoop = (now: number) => {
          if (!movingMarkerRef.current) return;

          if (now - lastTime >= stepIntervalMs) {
            lastTime = now;
            step = (step + 1) % totalSteps;
            const curr = points[step];
            const next = points[(step + 1) % totalSteps];

            const heading =
              (Math.atan2(next.lng - curr.lng, next.lat - curr.lat) * 180) / Math.PI;

            movingMarkerRef.current.setLatLng([curr.lat, curr.lng]);
            movingMarkerRef.current.setIcon(createMovingCarIcon(heading));
          }

          animationFrameIdRef.current = requestAnimationFrame(animateLoop);
        };

        animationFrameIdRef.current = requestAnimationFrame(animateLoop);
      }
    }
    // Case B: Only pickup is selected
    else if (pickup) {
      const pMarker = L.marker([pickup.coordinates.lat, pickup.coordinates.lng], {
        icon: createPickupIcon(),
        title: `Pickup: ${pickup.displayName}`,
      }).addTo(map);
      pMarker.bindPopup(`<strong>Pickup:</strong><br />${pickup.displayName}`);
      pickupMarkerRef.current = pMarker;

      map.setView([pickup.coordinates.lat, pickup.coordinates.lng], 11);
    }
    // Case C: Only destination is selected
    else if (destination) {
      const dMarker = L.marker([destination.coordinates.lat, destination.coordinates.lng], {
        icon: createDestinationIcon(),
        title: `Destination: ${destination.displayName}`,
      }).addTo(map);
      dMarker.bindPopup(`<strong>Destination:</strong><br />${destination.displayName}`);
      destMarkerRef.current = dMarker;

      map.setView([destination.coordinates.lat, destination.coordinates.lng], 11);
    }
    // Case D: Neither selected -> reset to regional Odisha overview
    else {
      map.setView(ODISHA_DEFAULT_CENTER, DEFAULT_ZOOM);
    }
  }, [routeResult, pickup, destination, prefersReducedMotion]);

  return (
    <div
      className={`relative w-full rounded-2xl overflow-hidden shadow-card border border-navy-100 bg-white ${className}`}
    >
      {/* Interactive Leaflet Map Container */}
      <div className="relative w-full h-[380px] sm:h-[440px]">
        <div ref={mapContainerRef} className="w-full h-full min-h-[380px] z-0" />

        {/* Loading Indicator Overlay */}
        {isLoading && (
          <div className="absolute inset-0 z-20 bg-navy-950/30 backdrop-blur-xs flex items-center justify-center">
            <div className="p-3.5 rounded-xl bg-white text-navy-900 shadow-elevated flex items-center gap-3 text-xs font-semibold">
              <Navigation className="w-4 h-4 text-brand-600 animate-spin" />
              <span>Calculating OSRM Road Route...</span>
            </div>
          </div>
        )}

        {/* Top-Left Map Marker Legend */}
        <div className="absolute top-3 left-3 z-10 flex gap-2 flex-wrap pointer-events-none">
          <span className="text-[11px] font-semibold bg-white/95 text-navy-800 px-2.5 py-1 rounded-md shadow-sm border border-navy-100 flex items-center gap-1.5 backdrop-blur-sm pointer-events-auto">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-600" /> Pickup
          </span>
          <span className="text-[11px] font-semibold bg-white/95 text-navy-800 px-2.5 py-1 rounded-md shadow-sm border border-navy-100 flex items-center gap-1.5 backdrop-blur-sm pointer-events-auto">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-600" /> Destination
          </span>
          {routeResult && (
            <span className="text-[11px] font-semibold bg-navy-900/90 text-sand-100 px-2.5 py-1 rounded-md shadow-sm border border-navy-700 flex items-center gap-1.5 backdrop-blur-sm pointer-events-auto">
              <Sparkles className="w-3 h-3 text-brand-400" /> Road Route
            </span>
          )}
        </div>

        {/* Empty state compass notice when no locations selected */}
        {!pickup && !destination && !isLoading && (
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
            <div className="p-3 bg-white/95 text-navy-700 text-xs font-semibold rounded-xl shadow-card border border-navy-100 flex items-center gap-2 backdrop-blur-sm">
              <Compass className="w-4 h-4 text-brand-600" />
              <span>Select Pickup & Destination to preview driving route</span>
            </div>
          </div>
        )}

        {/* Bottom OpenStreetMap Technology Badge */}
        <div className="absolute bottom-2 left-2 z-10 pointer-events-none hidden sm:block">
          <span className="text-[10px] font-medium bg-white/90 text-navy-600 px-2 py-0.5 rounded border border-navy-200/60 backdrop-blur-sm flex items-center gap-1">
            <Layers className="w-3 h-3 text-brand-600" /> OpenStreetMap + OSRM
          </span>
        </div>
      </div>
    </div>
  );
}

import { ArrowRight, Clock, Gauge, Car, MessageSquare } from 'lucide-react';
import { TravelRoute, SelectedPlace } from '@/types';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useBookingFlow } from '@/hooks/useBookingFlow';
import { ODISHA_PRESET_LOCATIONS } from '@/data/odishaPlaces';
import { isWhatsAppConfigured, getWhatsAppUrl } from '@/lib/contactUtils';
import { brandConfig } from '@/data/brandConfig';

export interface RouteCardProps {
  route: TravelRoute;
  index?: number;
  onSelectRoute?: (route: TravelRoute) => void;
}

export function RouteCard({ route, index, onSelectRoute }: RouteCardProps) {
  const { openBooking } = useBookingFlow();
  const whatsappReady = isWhatsAppConfigured();

  const handleEnquiry = () => {
    if (onSelectRoute) {
      onSelectRoute(route);
      return;
    }

    const matchedPickup: SelectedPlace =
      ODISHA_PRESET_LOCATIONS.find((p) => p.displayName.includes(route.origin)) || {
        displayName: route.origin,
        coordinates: route.originCoords || { lat: 20.2961, lng: 85.8245 },
      };

    const matchedDrop: SelectedPlace =
      ODISHA_PRESET_LOCATIONS.find((p) => p.displayName.includes(route.destination)) || {
        displayName: route.destination,
        coordinates: route.destinationCoords || { lat: 19.8135, lng: 85.8312 },
      };

    openBooking({
      tripType: 'one-way',
      pickupLocation: route.origin,
      dropLocation: route.destination,
      pickupPlace: matchedPickup,
      dropPlace: matchedDrop,
    });
  };

  const handleWhatsAppRoute = () => {
    const text = `Hello ${brandConfig.brandName}, I would like to enquire about a cab for the ${route.origin} to ${route.destination} route (approx. ${route.distanceKm} km). Please share vehicle availability and quote.`;
    window.open(getWhatsAppUrl(text), '_blank', 'noopener,noreferrer');
  };

  // Formatted 2-digit numeral (e.g. 01, 02)
  const numeralStr = index !== undefined ? String(index + 1).padStart(2, '0') : '';

  return (
    <Card hoverEffect className="relative p-5 sm:p-6 flex flex-col justify-between h-full bg-white border border-slate-200 rounded-2xl shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-slate-300 group">
      <div>
        {/* Top Header with Route Numeral and Badges */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            {route.isPopular && (
              <Badge variant="amber" size="sm" className="font-bold text-[10px] uppercase tracking-wider bg-amber-500 text-slate-950 border-amber-400">
                Popular Route
              </Badge>
            )}
            <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
              Direct Highway
            </span>
          </div>

          {numeralStr && (
            <span className="text-3xl font-light text-slate-300 tracking-tighter select-none font-mono">
              {numeralStr}
            </span>
          )}
        </div>

        {/* Origin to Destination Headline */}
        <div className="flex items-center gap-2 flex-wrap text-base sm:text-lg font-black text-slate-900 mb-2.5 group-hover:text-blue-600 transition-colors">
          <span>{route.origin}</span>
          <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 border border-slate-200">
            <ArrowRight className="w-3 h-3" />
          </div>
          <span className="text-blue-600">{route.destination}</span>
        </div>

        {/* Distance & Duration Badges */}
        <div className="flex items-center gap-2 text-xs text-slate-600 mb-3.5 flex-wrap">
          <div className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200 font-semibold text-[11px]">
            <Gauge className="w-3 h-3 text-blue-600" />
            <span>Approx. {route.distanceKm} km</span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200 font-semibold text-[11px]">
            <Clock className="w-3 h-3 text-blue-600" />
            <span>{route.durationEst}</span>
          </div>
        </div>

        {/* Route Highlights */}
        <p className="text-xs text-slate-600 leading-relaxed mb-4">
          {route.highlight}
        </p>

        {/* Popular Cabs Available */}
        <div className="mb-5 pt-3 border-t border-dashed border-slate-200">
          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
            <Car className="w-3 h-3 text-blue-600" /> Recommended Fleet:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {route.popularCabs.map((cab, idx) => (
              <span
                key={idx}
                className="text-xs bg-slate-100 text-slate-800 px-2 py-0.5 rounded-md font-medium border border-slate-200"
              >
                {cab}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons: Dual CTA */}
      <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
        <Button
          variant="primary"
          size="sm"
          onClick={handleEnquiry}
          className="flex-1 text-xs font-bold shadow-sm min-h-[42px]"
          rightIcon={<ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />}
        >
          Book Cab for this Route
        </Button>

        {whatsappReady && (
          <button
            type="button"
            onClick={handleWhatsAppRoute}
            className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-full bg-[#1F6F3F] hover:bg-[#155A30] text-white flex items-center justify-center shrink-0 shadow-sm transition-all hover:scale-105 cursor-pointer"
            title="Enquire on WhatsApp"
            aria-label={`Enquire route ${route.origin} to ${route.destination} on WhatsApp`}
          >
            <MessageSquare className="w-4 h-4" />
          </button>
        )}
      </div>
    </Card>
  );
}

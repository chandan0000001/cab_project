import { RouteCalculationResult } from '@/types';
import { Gauge, Clock, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';

export interface RouteSummaryProps {
  route: RouteCalculationResult;
  tripType?: 'one-way' | 'round-trip' | 'local-rental';
  className?: string;
}

export function RouteSummary({ route, tripType = 'one-way', className = '' }: RouteSummaryProps) {
  return (
    <div
      role="region"
      aria-label="Route Distance and Duration Summary"
      className={`bg-white rounded-xl border border-navy-100 p-4 sm:p-5 shadow-sm space-y-3.5 ${className}`}
    >
      {/* Route Header with Origin and Destination */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-navy-100">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-600 shrink-0" />
            <span className="font-bold text-navy-950 text-sm sm:text-base">
              {route.pickup.displayName}
            </span>
          </div>

          <ArrowRight className="w-4 h-4 text-navy-400 shrink-0" />

          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
            <span className="font-bold text-brand-700 text-sm sm:text-base">
              {route.destination.displayName}
            </span>
          </div>
        </div>

        <span className="text-[11px] font-semibold text-navy-500 bg-sand-50 px-2 py-0.5 rounded border border-navy-100 self-start sm:self-auto">
          {tripType === 'round-trip' ? 'Outbound Route View' : 'Highway Driving Route'}
        </span>
      </div>

      {/* Metrics Row: Road Distance & Est. Duration */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 rounded-lg bg-sand-50 border border-navy-100/80 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-brand-50 text-brand-700 flex items-center justify-center shrink-0">
            <Gauge className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-navy-500 uppercase tracking-wide">
              Road Distance
            </p>
            <p className="text-base sm:text-lg font-black text-navy-950">
              {route.distanceText}
            </p>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-sand-50 border border-navy-100/80 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-navy-500 uppercase tracking-wide">
              Est. Driving Time
            </p>
            <p className="text-base sm:text-lg font-black text-navy-950">
              {route.durationText}
            </p>
          </div>
        </div>
      </div>

      {/* Route Disclaimer & Addresses */}
      <div className="pt-2 text-[11px] text-navy-500 space-y-1">
        <div className="flex items-start gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-navy-400 shrink-0 mt-0.5" />
          <p className="truncate">
            <strong className="text-navy-700">Pickup:</strong> {route.pickup.formattedAddress || route.pickup.displayName}
          </p>
        </div>
        <div className="flex items-start gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-navy-400 shrink-0 mt-0.5" />
          <p className="truncate">
            <strong className="text-navy-700">Destination:</strong> {route.destination.formattedAddress || route.destination.displayName}
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-navy-400 pt-1">
          <ShieldCheck className="w-3.5 h-3.5 text-brand-600 shrink-0" />
          <span>Calculated via OpenStreetMap / OSRM road routing. Final itinerary & vehicle options confirmed upon enquiry.</span>
        </div>
      </div>
    </div>
  );
}

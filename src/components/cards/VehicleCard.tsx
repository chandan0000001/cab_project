import { Users, Briefcase, Wind, CheckCircle2, MessageSquare, ArrowRight } from 'lucide-react';
import { Vehicle } from '@/types';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useBookingFlow } from '@/hooks/useBookingFlow';
import { isWhatsAppConfigured, getWhatsAppUrl } from '@/lib/contactUtils';
import { brandConfig } from '@/data/brandConfig';

export interface VehicleCardProps {
  vehicle: Vehicle;
  onEnquire?: (vehicle: Vehicle) => void;
}

export function VehicleCard({ vehicle, onEnquire }: VehicleCardProps) {
  const { openBooking } = useBookingFlow();
  const whatsappReady = isWhatsAppConfigured();

  const handleEnquiry = () => {
    if (onEnquire) {
      onEnquire(vehicle);
      return;
    }
    openBooking({
      vehiclePreference: `${vehicle.name} (${vehicle.categoryLabel})`,
      passengerCount: `${vehicle.seatingCapacity} Passengers`,
    });
  };

  const handleWhatsAppEnquiry = () => {
    const text = `Hello ${brandConfig.brandName}, I would like to enquire about renting a ${vehicle.name} (${vehicle.categoryLabel}, ${vehicle.seatingCapacity} seats). Please confirm availability and quotation.`;
    window.open(getWhatsAppUrl(text), '_blank', 'noopener,noreferrer');
  };

  return (
    <Card hoverEffect className="flex flex-col h-full bg-white group border border-slate-200 rounded-2xl shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-slate-300 overflow-hidden">
      {/* Vehicle Image Container - Clean light studio presentation inspired by RDB Travels */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-gradient-to-b from-[#FAF8F5] to-[#F1EDE7] p-3 flex items-center justify-center border-b border-navy-100">
        <img
          src={vehicle.imageUrl}
          alt={vehicle.name}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-105"
        />

        {/* Category & Status Badges */}
        <div className="absolute top-3 left-3 flex gap-1.5 items-center flex-wrap">
          <Badge variant="navy" className="bg-navy-950/85 text-white backdrop-blur-sm border-navy-800 font-bold text-[10px] uppercase tracking-wider">
            {vehicle.categoryLabel}
          </Badge>
          {vehicle.badge && (
            <Badge variant="amber" className="bg-amber-500 text-navy-950 font-extrabold border-amber-400 text-[10px]">
              {vehicle.badge}
            </Badge>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="text-[10px] font-extrabold uppercase tracking-wider text-brand-700 mb-0.5">
            {vehicle.categoryLabel}
          </div>

          <h3 className="text-lg sm:text-xl font-black text-navy-950 group-hover:text-brand-600 transition-colors tracking-tight">
            {vehicle.name}
          </h3>
          <p className="text-xs text-navy-500 font-medium">
            Seats {vehicle.seatingCapacity} + driver
          </p>

          <p className="mt-2 text-xs text-navy-600 line-clamp-2 leading-relaxed">
            {vehicle.idealFor}
          </p>

          {/* Quick Specs Grid */}
          <div className="grid grid-cols-3 gap-2 my-3 p-2 bg-sand-100/70 rounded-xl border border-navy-200/60 text-center">
            <div className="flex flex-col items-center">
              <span className="flex items-center gap-1 text-xs font-bold text-navy-900">
                <Users className="w-3.5 h-3.5 text-brand-600" /> {vehicle.seatingCapacity}
              </span>
              <span className="text-[9px] font-semibold text-navy-500 mt-0.5 uppercase tracking-wider">Capacity</span>
            </div>
            <div className="flex flex-col items-center border-x border-navy-200">
              <span className="flex items-center gap-1 text-xs font-bold text-navy-900">
                <Briefcase className="w-3.5 h-3.5 text-brand-600" /> {vehicle.luggageCapacity} Bags
              </span>
              <span className="text-[9px] font-semibold text-navy-500 mt-0.5 uppercase tracking-wider">Luggage</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="flex items-center gap-1 text-xs font-bold text-navy-900">
                <Wind className="w-3.5 h-3.5 text-brand-600" /> {vehicle.hasAC ? 'AC' : 'Non-AC'}
              </span>
              <span className="text-[9px] font-semibold text-navy-500 mt-0.5 uppercase tracking-wider">Climate</span>
            </div>
          </div>

          {/* Inclusions Feature List (RDB-style green checks) */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center text-xs text-navy-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-2 shrink-0" />
              <span>Includes commercial permit, driver, fuel & AC</span>
            </div>
            <div className="flex items-center text-xs text-navy-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-2 shrink-0" />
              <span>Doorstep pickup across Berhampur & transit hubs</span>
            </div>
          </div>
        </div>

        {/* Pricing / Booking Dual CTA */}
        <div className="pt-3 border-t border-navy-100 flex items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            onClick={handleEnquiry}
            className="flex-1 text-xs font-bold shadow-saffron py-2.5 min-h-[42px]"
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
          >
            Book This Cab
          </Button>

          {whatsappReady && (
            <button
              type="button"
              onClick={handleWhatsAppEnquiry}
              className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-full bg-[#1F6F3F] hover:bg-[#155A30] text-white flex items-center justify-center shrink-0 shadow-whatsapp transition-all hover:scale-105 cursor-pointer"
              title="Enquire on WhatsApp"
              aria-label={`Enquire about ${vehicle.name} on WhatsApp`}
            >
              <MessageSquare className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </Card>
  );
}

import { Users, Briefcase, Wind, CheckCircle2, MessageSquare, ArrowRight } from 'lucide-react';
import { Vehicle } from '@/types';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useBookingFlow } from '@/hooks/useBookingFlow';
import { isWhatsAppConfigured, getWhatsAppUrl } from '@/lib/contactUtils';
import { brandConfig } from '@/data/brandConfig';
import { sound } from '@/lib/sound';

export interface VehicleCardProps {
  vehicle: Vehicle;
  onEnquire?: (vehicle: Vehicle) => void;
}

export function VehicleCard({ vehicle, onEnquire }: VehicleCardProps) {
  const { openBooking } = useBookingFlow();
  const whatsappReady = isWhatsAppConfigured();

  const handleEnquiry = () => {
    sound.playPop();
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
    sound.playTap();
    const text = `Hello ${brandConfig.brandName}, I would like to enquire about renting a ${vehicle.name} (${vehicle.categoryLabel}, ${vehicle.seatingCapacity} seats). Please confirm availability and quotation.`;
    window.open(getWhatsAppUrl(text), '_blank', 'noopener,noreferrer');
  };

  return (
    <Card hoverEffect className="flex flex-col h-full bg-white group border border-slate-200 rounded-2xl shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-blue-400 overflow-hidden">
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-50 p-3 flex items-center justify-center border-b border-slate-100">
        <img
          src={vehicle.imageUrl}
          alt={vehicle.name}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute top-3 left-3 flex gap-1.5 items-center flex-wrap">
          <span className="bg-blue-50 text-blue-700 border border-blue-200 font-bold text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-2xs">
            {vehicle.categoryLabel}
          </span>
          {vehicle.badge && (
            <span className="bg-slate-900 text-white font-bold text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-2xs">
              {vehicle.badge}
            </span>
          )}
        </div>
      </div>

      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-blue-600 mb-0.5 font-sans">
            {vehicle.categoryLabel}
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors tracking-tight">
            {vehicle.name}
          </h3>
          <p className="text-xs text-slate-600 font-medium mt-0.5">
            Seats {vehicle.seatingCapacity} + professional driver
          </p>

          <p className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {vehicle.idealFor}
          </p>

          <div className="grid grid-cols-3 gap-2 my-3 p-2.5 bg-slate-50 rounded-xl border border-slate-200/80 text-center">
            <div className="flex flex-col items-center">
              <span className="flex items-center gap-1 text-xs font-bold text-slate-900">
                <Users className="w-3.5 h-3.5 text-blue-600" /> {vehicle.seatingCapacity}
              </span>
              <span className="text-[9px] font-semibold text-slate-600 mt-0.5 uppercase tracking-wider">Capacity</span>
            </div>
            <div className="flex flex-col items-center border-x border-slate-200">
              <span className="flex items-center gap-1 text-xs font-bold text-slate-900">
                <Briefcase className="w-3.5 h-3.5 text-blue-600" /> {vehicle.luggageCapacity} Bags
              </span>
              <span className="text-[9px] font-semibold text-slate-600 mt-0.5 uppercase tracking-wider">Luggage</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="flex items-center gap-1 text-xs font-bold text-slate-900">
                <Wind className="w-3.5 h-3.5 text-blue-600" /> {vehicle.hasAC ? 'AC' : 'Non-AC'}
              </span>
              <span className="text-[9px] font-semibold text-slate-600 mt-0.5 uppercase tracking-wider">Climate</span>
            </div>
          </div>

          <div className="space-y-1.5 pt-1">
            <div className="flex items-center text-xs text-slate-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-2 shrink-0" />
              <span>Commercial permit, verified driver & fuel included</span>
            </div>
            <div className="flex items-center text-xs text-slate-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-2 shrink-0" />
              <span>Doorstep pickup across Berhampur & transit hubs</span>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            onClick={handleEnquiry}
            className="flex-1 text-xs font-bold py-2.5 min-h-[42px] rounded-full"
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
          >
            Reserve Vehicle
          </Button>

          {whatsappReady && (
            <button
              type="button"
              onClick={handleWhatsAppEnquiry}
              className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-full bg-[#1F6F3F] hover:bg-[#155A30] text-white flex items-center justify-center shrink-0 border border-emerald-500/30 shadow-sm transition-all hover:scale-105 cursor-pointer"
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

import { MapPin, Navigation, Calendar, ArrowRight, MessageSquare } from 'lucide-react';
import { Destination, SelectedPlace } from '@/types';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useBookingFlow } from '@/hooks/useBookingFlow';
import { ODISHA_PRESET_LOCATIONS } from '@/data/odishaPlaces';
import { isWhatsAppConfigured, getWhatsAppUrl } from '@/lib/contactUtils';
import { brandConfig } from '@/data/brandConfig';
import { sound } from '@/lib/sound';

export interface DestinationCardProps {
  destination: Destination;
  onEnquire?: (destination: Destination) => void;
}

// Helper to get clean, natural destination short name for CTA button
const getDestinationShortName = (name: string): string => {
  const cleaned = name.replace(/^Maa\s+/i, '').trim();
  if (cleaned.startsWith('Tara Tarini')) return 'Tara Tarini';
  if (cleaned.startsWith('Gopalpur')) return 'Gopalpur';
  if (cleaned.startsWith('Tampara')) return 'Tampara';
  if (cleaned.startsWith('Daringbadi')) return 'Daringbadi';
  if (cleaned.startsWith('Taptapani')) return 'Taptapani';
  if (cleaned.startsWith('Chilika')) return 'Chilika';
  if (cleaned.startsWith('Puri')) return 'Puri';
  if (cleaned.startsWith('Bhubaneswar')) return 'Bhubaneswar';
  return cleaned.split(' (')[0].split(' &')[0].split(' ')[0] || 'Tour';
};

export function DestinationCard({ destination, onEnquire }: DestinationCardProps) {
  const { openBooking } = useBookingFlow();
  const whatsappReady = isWhatsAppConfigured();

  const handleEnquiry = () => {
    sound.playPop();
    if (onEnquire) {
      onEnquire(destination);
      return;
    }

    // Match destination preset if available
    const matchedPlace: SelectedPlace | null =
      ODISHA_PRESET_LOCATIONS.find((p) =>
        destination.name.toLowerCase().includes(p.displayName.toLowerCase()) ||
        p.displayName.toLowerCase().includes(destination.name.toLowerCase().split(' ')[0])
      ) || {
        displayName: destination.name,
        formattedAddress: `${destination.name}, ${destination.location}, Odisha`,
        coordinates: destination.coordinates || { lat: 19.8135, lng: 85.8312 },
        placeId: destination.id,
      };

    openBooking({
      tripType: 'one-way',
      dropLocation: destination.name,
      dropPlace: matchedPlace,
    });
  };

  const handleWhatsAppEnquiry = () => {
    sound.playTap();
    const text = `Hello ${brandConfig.brandName}, I would like to enquire about booking a cab/tour package to ${destination.name} (${destination.location}). Please share travel options and quotation.`;
    window.open(getWhatsAppUrl(text), '_blank', 'noopener,noreferrer');
  };

  const hasCollage = destination.collageImages && destination.collageImages.length >= 3;

  return (
    <Card hoverEffect className="flex flex-col h-full bg-white group border border-slate-200 rounded-2xl shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-blue-400 overflow-hidden">
      {hasCollage ? (
        <div className="relative h-56 w-full overflow-hidden bg-slate-950">
          <div className="grid grid-cols-3 h-full gap-1 p-1 bg-slate-900">
            {destination.collageImages!.slice(0, 3).map((item, idx) => (
              <div key={idx} className="relative h-full overflow-hidden rounded group/tile">
                <img
                  src={item.url}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover/tile:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <span className="absolute bottom-1.5 left-1 right-1 text-center text-[9px] font-bold text-white leading-tight px-1 py-0.5 rounded bg-black/75 backdrop-blur-xs truncate block">
                  {item.title}
                </span>
              </div>
            ))}
          </div>

          <div className="absolute top-3 inset-x-3 z-10 flex items-center justify-between gap-2 pointer-events-none">
            <span className="bg-slate-950/90 text-white backdrop-blur-md border border-white/20 text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center min-w-0 shadow-xs max-w-[62%] sm:max-w-[70%]">
              <MapPin className="w-3 h-3 text-blue-400 mr-1 shrink-0" />
              <span className="truncate">{destination.location}</span>
            </span>

            <span className="bg-blue-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs uppercase tracking-wider shrink-0">
              Curated Circuit
            </span>
          </div>
        </div>
      ) : (
        <div className="relative h-52 w-full overflow-hidden bg-slate-900">
          <img
            src={destination.imageUrl}
            alt={destination.name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
          
          <div className="absolute top-3 inset-x-3 z-10 flex items-center justify-between gap-2 pointer-events-none">
            <span className="bg-slate-950/90 text-white backdrop-blur-md border border-white/20 text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center min-w-0 shadow-xs max-w-[62%] sm:max-w-[70%]">
              <MapPin className="w-3 h-3 text-blue-400 mr-1 shrink-0" />
              <span className="truncate">{destination.location}</span>
            </span>

            <span className="bg-slate-900/90 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-white/10 uppercase tracking-wider shrink-0 shadow-xs">
              {destination.circuit === 'coastal-pilgrimage' ? 'Temple Circuit' : 'Outstation Tour'}
            </span>
          </div>
        </div>
      )}

      {/* Body Details */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="mb-2">
            <h3 className="text-lg sm:text-xl font-black tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
              {destination.name}
            </h3>
            {destination.tagline && (
              <p className="text-xs text-blue-600 font-semibold mt-0.5 line-clamp-1">
                {destination.tagline}
              </p>
            )}
          </div>

          <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed mb-3">
            {destination.description}
          </p>

          <div className="space-y-1.5 py-2.5 px-3 text-xs text-slate-700 mb-3 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2">
              <Navigation className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span>
                <strong className="font-bold text-slate-900">From Berhampur:</strong> {destination.distanceFromBerhampur || destination.distanceFromBhubaneswar}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span>
                <strong className="font-bold text-slate-900">Best Season:</strong> {destination.bestTimeToVisit}
              </span>
            </div>
          </div>

          {/* Key Sightseeing Highlights */}
          <div className="mb-2">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 font-sans">
              Curated Highlights:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {destination.keyHighlights.map((highlight, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-slate-50 text-slate-800 px-2.5 py-0.5 rounded-md border border-slate-200 font-medium"
                >
                  {highlight}
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
            className="flex-1 font-bold text-xs py-2.5 min-h-[42px] rounded-full"
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
          >
            Book {getDestinationShortName(destination.name)} Cab
          </Button>

          {whatsappReady && (
            <button
              type="button"
              onClick={handleWhatsAppEnquiry}
              className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-full bg-[#1F6F3F] hover:bg-[#155A30] text-white flex items-center justify-center shrink-0 border border-emerald-500/30 shadow-xs transition-all hover:scale-105 cursor-pointer"
              title="Tour Inquiry on WhatsApp"
              aria-label={`Enquire about ${destination.name} on WhatsApp`}
            >
              <MessageSquare className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </Card>
  );
}

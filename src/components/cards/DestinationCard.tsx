import { MapPin, Navigation, Calendar, ArrowRight, MessageSquare } from 'lucide-react';
import { Destination, SelectedPlace } from '@/types';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useBookingFlow } from '@/hooks/useBookingFlow';
import { ODISHA_PRESET_LOCATIONS } from '@/data/odishaPlaces';
import { isWhatsAppConfigured, getWhatsAppUrl } from '@/lib/contactUtils';
import { brandConfig } from '@/data/brandConfig';

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
    const text = `Hello ${brandConfig.brandName}, I would like to enquire about booking a cab/tour package to ${destination.name} (${destination.location}). Please share travel options and quotation.`;
    window.open(getWhatsAppUrl(text), '_blank', 'noopener,noreferrer');
  };

  const hasCollage = destination.collageImages && destination.collageImages.length >= 3;

  return (
    <Card hoverEffect className="flex flex-col h-full bg-white group border border-slate-200 rounded-2xl shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-slate-300 overflow-hidden">
      {/* Image Container: 3-Photo Collage or Single Clean Landscape */}
      {hasCollage ? (
        <div className="relative h-56 w-full overflow-hidden bg-navy-950">
          <div className="grid grid-cols-3 h-full gap-1 p-1 bg-navy-900">
            {destination.collageImages!.slice(0, 3).map((item, idx) => (
              <div key={idx} className="relative h-full overflow-hidden rounded group/tile">
                <img
                  src={item.url}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover/tile:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/20 to-transparent" />
                <span className="absolute bottom-1.5 left-1 right-1 text-center text-[10px] font-extrabold text-white leading-tight drop-shadow-sm px-1 py-0.5 rounded bg-black/60 backdrop-blur-xs">
                  {item.title}
                </span>
              </div>
            ))}
          </div>

          <div className="absolute top-3 left-3 z-10">
            <Badge variant="navy" className="bg-navy-950/90 text-white backdrop-blur-sm border-navy-800 text-[10px] font-semibold">
              <MapPin className="w-3 h-3 text-brand-400 mr-1" />
              {destination.location}
            </Badge>
          </div>

          <div className="absolute top-3 right-3 z-10">
            <span className="bg-amber-500 text-navy-950 text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-sm uppercase tracking-wider">
              3-in-1 Circuit
            </span>
          </div>

          <div className="absolute bottom-7 left-3 right-3 text-white pointer-events-none">
            <h3 className="text-lg font-black tracking-tight text-white drop-shadow-md">
              {destination.name}
            </h3>
          </div>
        </div>
      ) : (
        <div className="relative h-52 w-full overflow-hidden bg-sand-100">
          <img
            src={destination.imageUrl}
            alt={destination.name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/30 to-transparent" />
          
          <div className="absolute top-3 left-3">
            <Badge variant="navy" className="bg-navy-950/90 text-white backdrop-blur-sm border-navy-800 text-xs font-semibold">
              <MapPin className="w-3 h-3 text-brand-400 mr-1" />
              {destination.location}
            </Badge>
          </div>

          <div className="absolute bottom-3 left-3 right-3 text-white">
            <h3 className="text-xl font-black tracking-tight text-white drop-shadow-sm">
              {destination.name}
            </h3>
            <p className="text-xs text-amber-200 mt-0.5 line-clamp-1 drop-shadow-sm font-medium">
              {destination.tagline}
            </p>
          </div>
        </div>
      )}

      {/* Body Details */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
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
            <p className="text-[11px] font-bold text-navy-500 uppercase tracking-wider mb-2">
              Key Attractions:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {destination.keyHighlights.map((highlight, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-sand-100 text-navy-800 px-2.5 py-0.5 rounded-md border border-navy-200/60 font-medium"
                >
                  {highlight}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons: Dual CTA */}
        <div className="pt-3 border-t border-navy-100 flex items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            onClick={handleEnquiry}
            className="flex-1 font-bold shadow-saffron text-xs"
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
          >
            Enquire Cab for {getDestinationShortName(destination.name)}
          </Button>

          {whatsappReady && (
            <button
              type="button"
              onClick={handleWhatsAppEnquiry}
              className="w-9 h-9 rounded-full bg-[#1F6F3F] hover:bg-[#155A30] text-white flex items-center justify-center shrink-0 shadow-whatsapp transition-all hover:scale-105 cursor-pointer"
              title="Tour Inquiry on WhatsApp"
              aria-label={`Enquire ${destination.name} on WhatsApp`}
            >
              <MessageSquare className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </Card>
  );
}

import { Car, RotateCcw, Clock, Plane, Map, Compass, ArrowRight, CheckCircle2, Info } from 'lucide-react';
import { serviceCategories } from '@/data/services';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useBookingFlow } from '@/hooks/useBookingFlow';
import { ODISHA_PRESET_LOCATIONS } from '@/data/odishaPlaces';

export function ServiceCategories() {
  const { openBooking } = useBookingFlow();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'car':
        return <Car className="w-6 h-6 text-brand-600" />;
      case 'repeat':
        return <RotateCcw className="w-6 h-6 text-brand-600" />;
      case 'clock':
        return <Clock className="w-6 h-6 text-brand-600" />;
      case 'plane':
        return <Plane className="w-6 h-6 text-brand-600" />;
      case 'map':
        return <Map className="w-6 h-6 text-brand-600" />;
      case 'compass':
        return <Compass className="w-6 h-6 text-brand-600" />;
      default:
        return <Car className="w-6 h-6 text-brand-600" />;
    }
  };

  const handleEnquiry = (serviceId: string) => {
    switch (serviceId) {
      case 'one-way-cab':
        openBooking({ tripType: 'one-way' });
        break;
      case 'round-trip-cab':
        openBooking({ tripType: 'round-trip' });
        break;
      case 'local-hourly-rental':
        openBooking({ tripType: 'local-rental' });
        break;
      case 'airport-transfers':
        openBooking({
          tripType: 'one-way',
          pickupLocation: 'Bhubaneswar Airport (Biju Patnaik International Airport)',
          pickupPlace: ODISHA_PRESET_LOCATIONS[0],
        });
        break;
      case 'outstation-travel':
        openBooking({ tripType: 'one-way' });
        break;
      case 'odisha-sightseeing':
        openBooking({
          tripType: 'round-trip',
          dropLocation: 'Puri Jagannath Temple',
          dropPlace: ODISHA_PRESET_LOCATIONS[2],
        });
        break;
      default:
        openBooking({ tripType: 'one-way' });
        break;
    }
  };

  return (
    <section id="services-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <SectionHeading
          eyebrow="Transportation Services"
          title="Designed for Every Travel Requirement"
          subtitle="Whether commuting between commercial hubs, arriving at the airport, or planning an extended coastal holiday, select the appropriate transit format."
          className="mb-0"
        />

        {/* Clear Notice: Proposed Categories */}
        <div className="flex items-center gap-2 p-2.5 rounded-lg bg-sand-100 border border-navy-200/70 text-navy-700 text-xs shrink-0 self-start md:self-auto">
          <Info className="w-4 h-4 text-brand-600 shrink-0" />
          <span>Proposed service offerings pending owner fleet confirmation</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {serviceCategories.map((service) => (
          <Card
            key={service.id}
            hoverEffect
            className="flex flex-col justify-between h-full bg-white group border-navy-100/90"
          >
            <div>
              {/* Card Header with Icon and Proposed Badge */}
              <div className="p-6 pb-4 flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center transition-colors group-hover:bg-brand-600 group-hover:text-white">
                  {getIcon(service.iconName)}
                </div>
                {service.isProposed && (
                  <Badge variant="navy" size="sm" className="text-[10px] uppercase font-semibold text-navy-500">
                    Proposed Service
                  </Badge>
                )}
              </div>

              {/* Title & Tagline */}
              <div className="px-6 pb-2">
                <h3 className="text-xl font-bold text-navy-950 group-hover:text-brand-700 transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs font-semibold text-brand-700 mt-0.5">
                  {service.tagline}
                </p>
                <p className="text-sm text-navy-600 mt-2.5 leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Bullet Features */}
              <div className="px-6 py-4 space-y-1.5 border-t border-navy-50 mt-3">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center text-xs text-navy-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-600 mr-2 shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Enquiry Action: Launches Unified Booking Flow */}
            <div className="p-6 pt-3 border-t border-navy-100">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEnquiry(service.id)}
                className="w-full justify-between hover:bg-brand-50 hover:text-brand-700 hover:border-brand-300"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Enquire for {service.title}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

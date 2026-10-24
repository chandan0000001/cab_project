import { useState } from 'react';
import { 
  ArrowRight, 
  RotateCcw, 
  Clock, 
  MapPin, 
  Calendar, 
  Compass,
  ShieldCheck
} from 'lucide-react';
import { TripType } from '@/types';
import { useBookingFlow } from '@/hooks/useBookingFlow';
import { Button } from '@/components/ui/Button';
import { ODISHA_PRESET_LOCATIONS } from '@/data/odishaPlaces';

export function QuickJourneyPlanner() {
  const { openBooking } = useBookingFlow();

  const todayStr = new Date().toISOString().split('T')[0];

  const [tripType, setTripType] = useState<TripType>('one-way');
  const [pickupText, setPickupText] = useState('Berhampur');
  const [destinationText, setDestinationText] = useState('Bhubaneswar Airport');
  const [travelDate, setTravelDate] = useState(todayStr);

  const handleLaunchBooking = (e: React.FormEvent) => {
    e.preventDefault();

    // Match preset if exists for coordinates
    const matchedPickup =
      ODISHA_PRESET_LOCATIONS.find((p) =>
        p.displayName.toLowerCase().includes(pickupText.toLowerCase())
      ) || null;

    const matchedDrop =
      ODISHA_PRESET_LOCATIONS.find((p) =>
        p.displayName.toLowerCase().includes(destinationText.toLowerCase())
      ) || null;

    openBooking({
      tripType,
      pickupLocation: pickupText,
      dropLocation: destinationText,
      pickupPlace: matchedPickup,
      dropPlace: matchedDrop,
      travelDate,
    });
  };

  const handlePresetSelect = (origin: string, destination: string) => {
    setPickupText(origin);
    setDestinationText(destination);

    const matchedPickup =
      ODISHA_PRESET_LOCATIONS.find((p) => p.displayName.includes(origin)) || null;
    const matchedDrop =
      ODISHA_PRESET_LOCATIONS.find((p) => p.displayName.includes(destination)) || null;

    openBooking({
      tripType: 'one-way',
      pickupLocation: origin,
      dropLocation: destination,
      pickupPlace: matchedPickup,
      dropPlace: matchedDrop,
      travelDate,
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-5 sm:p-7 text-slate-900 space-y-4 relative">
      {/* Card Header */}
      <div className="border-b border-slate-200 pb-3">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-blue-600" /> Instant Cab Quotation
          </span>
          <span className="text-[10px] bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full font-bold border border-slate-200">
            Odisha Network
          </span>
        </div>
        <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1 tracking-tight">
          Where are you travelling from Berhampur?
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Select your journey starting from Berhampur for instant vehicle matching and direct quote.
        </p>
      </div>

      {/* Trip Type Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-full border border-slate-200">
        {(
          [
            { id: 'one-way', label: 'One Way', icon: ArrowRight },
            { id: 'round-trip', label: 'Round Trip', icon: RotateCcw },
            { id: 'local-rental', label: 'Hourly Rental', icon: Clock },
          ] as const
        ).map((tab) => {
          const Icon = tab.icon;
          const isSelected = tripType === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setTripType(tab.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 text-xs sm:text-sm font-bold py-2 px-3 rounded-full transition-all select-none cursor-pointer ${
                isSelected
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-white/80'
              }`}
              aria-pressed={isSelected}
            >
              <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Form Fields */}
      <form onSubmit={handleLaunchBooking} className="space-y-3.5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label htmlFor="planner-pickup-input" className="text-xs font-bold text-slate-700 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-blue-600" /> Pickup Location
            </label>
            <input
              id="planner-pickup-input"
              type="text"
              required
              value={pickupText}
              onChange={(e) => setPickupText(e.target.value)}
              placeholder="e.g. Berhampur / BAM Stn / MKCG"
              aria-label="Pickup Location in Berhampur"
              className="w-full bg-slate-50 text-slate-900 font-medium border border-slate-300 rounded-xl py-2.5 px-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="planner-dest-input" className="text-xs font-bold text-slate-700 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-700" />
              {tripType === 'local-rental' ? 'City / Area' : 'Destination'}
            </label>
            <input
              id="planner-dest-input"
              type="text"
              required={tripType !== 'local-rental'}
              value={destinationText}
              onChange={(e) => setDestinationText(e.target.value)}
              placeholder={tripType === 'local-rental' ? 'e.g. Berhampur City / MKCG Hospital' : 'e.g. Bhubaneswar Airport / Puri'}
              aria-label={tripType === 'local-rental' ? 'City or Area for Rental' : 'Drop Destination'}
              className="w-full bg-slate-50 text-slate-900 font-medium border border-slate-300 rounded-xl py-2.5 px-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label htmlFor="planner-date-input" className="text-xs font-bold text-slate-700 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-blue-600" /> Travel Date
          </label>
          <input
            id="planner-date-input"
            type="date"
            min={todayStr}
            value={travelDate}
            onChange={(e) => setTravelDate(e.target.value)}
            aria-label="Travel Date"
            className="w-full bg-slate-50 text-slate-900 font-medium border border-slate-300 rounded-xl py-2.5 px-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
          />
        </div>

        {/* Action Button: Solid Orange CTA */}
        <div className="pt-1">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full font-bold text-sm sm:text-base py-3 min-h-[48px] shadow-sm"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Check Availability & Get Quote
          </Button>
        </div>
      </form>

      {/* Popular Corridors Quick-Pill Shortcut Starting from Berhampur */}
      <div className="pt-2 border-t border-slate-200 space-y-2">
        <div className="flex items-center gap-1 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
          <Compass className="w-3.5 h-3.5 text-blue-600" />
          <span>Popular Routes from Berhampur:</span>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <button
            type="button"
            onClick={() => handlePresetSelect('Berhampur', 'Bhubaneswar Airport')}
            aria-label="Route preset: Berhampur to Bhubaneswar Airport"
            className="text-xs sm:text-sm bg-slate-100 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 border border-slate-200 rounded-full px-4 py-2 min-h-[44px] flex items-center text-slate-800 font-semibold transition-colors cursor-pointer"
          >
            Berhampur → Bhubaneswar Airport
          </button>
          <button
            type="button"
            onClick={() => handlePresetSelect('Berhampur', 'Puri')}
            aria-label="Route preset: Berhampur to Puri"
            className="text-xs sm:text-sm bg-slate-100 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 border border-slate-200 rounded-full px-4 py-2 min-h-[44px] flex items-center text-slate-800 font-semibold transition-colors cursor-pointer"
          >
            Berhampur → Puri
          </button>
          <button
            type="button"
            onClick={() => handlePresetSelect('Berhampur', 'Gopalpur-on-Sea')}
            aria-label="Route preset: Berhampur to Gopalpur Beach"
            className="text-xs sm:text-sm bg-slate-100 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 border border-slate-200 rounded-full px-4 py-2 min-h-[44px] flex items-center text-slate-800 font-semibold transition-colors cursor-pointer"
          >
            Berhampur → Gopalpur Beach
          </button>
          <button
            type="button"
            onClick={() => handlePresetSelect('Berhampur', 'Tara Tarini')}
            aria-label="Route preset: Berhampur to Tara Tarini"
            className="text-xs sm:text-sm bg-slate-100 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 border border-slate-200 rounded-full px-4 py-2 min-h-[44px] flex items-center text-slate-800 font-semibold transition-colors cursor-pointer"
          >
            Berhampur → Tara Tarini
          </button>
          <button
            type="button"
            onClick={() => handlePresetSelect('Berhampur', 'Tampara Lake')}
            aria-label="Route preset: Berhampur to Tampara Lake"
            className="text-xs sm:text-sm bg-slate-100 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 border border-slate-200 rounded-full px-4 py-2 min-h-[44px] flex items-center text-slate-800 font-semibold transition-colors cursor-pointer"
          >
            Berhampur → Tampara Lake
          </button>
          <button
            type="button"
            onClick={() => handlePresetSelect('Berhampur', 'Daringbadi')}
            aria-label="Route preset: Berhampur to Daringbadi"
            className="text-xs sm:text-sm bg-slate-100 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 border border-slate-200 rounded-full px-4 py-2 min-h-[44px] flex items-center text-slate-800 font-semibold transition-colors cursor-pointer"
          >
            Berhampur → Daringbadi
          </button>
          <button
            type="button"
            onClick={() => handlePresetSelect('Berhampur Railway Station (BAM)', 'MKCG Medical College')}
            aria-label="Route preset: BAM Railway Station to MKCG Medical College"
            className="text-xs sm:text-sm bg-slate-100 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 border border-slate-200 rounded-full px-4 py-2 min-h-[44px] flex items-center text-slate-800 font-semibold transition-colors cursor-pointer"
          >
            BAM Station → MKCG Hospital
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-500 font-medium">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
        <span>Direct reservation desk • Commercial yellow-plate cabs • Fast confirmation</span>
      </div>
    </div>
  );
}

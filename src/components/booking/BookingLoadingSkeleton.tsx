import { Loader2 } from 'lucide-react';

export function BookingLoadingSkeleton() {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Loading booking desk"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm animate-in fade-in duration-150"
    >
      <div className="bg-white rounded-2xl max-w-lg w-full p-8 shadow-2xl border border-navy-100 flex flex-col items-center justify-center text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-brand-50 flex items-center justify-center text-brand-600">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
        <div>
          <h3 className="font-bold text-lg text-navy-950">Initializing Booking Desk</h3>
          <p className="text-xs text-navy-500 mt-1">Loading travel options and route preview engine...</p>
        </div>
      </div>
    </div>
  );
}

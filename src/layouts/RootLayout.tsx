import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '@/layouts/Header';
import { Footer } from '@/layouts/Footer';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { BookingProvider } from '@/context/BookingContext';
import { useBookingFlow } from '@/hooks/useBookingFlow';
import { BookingLoadingSkeleton } from '@/components/booking/BookingLoadingSkeleton';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

// Lazy load the full interactive booking modal and route search workflow
const LazyBookingModal = lazy(() =>
  import('@/components/booking/BookingModal').then((module) => ({ default: module.BookingModal }))
);

// Lazy load the promotion offer popup to keep initial bundle lean
const LazyWinterOfferPopup = lazy(() =>
  import('@/components/promotions/WinterOfferPopup').then((module) => ({ default: module.WinterOfferPopup }))
);

// Only evaluate and download BookingModal bundle when user actually opens booking
function OnDemandBookingModal() {
  const { isBookingOpen } = useBookingFlow();
  if (!isBookingOpen) return null;
  return (
    <Suspense fallback={<BookingLoadingSkeleton />}>
      <LazyBookingModal />
    </Suspense>
  );
}

export function RootLayout() {
  // Ensure top scroll on every route change
  useScrollToTop();

  return (
    <BookingProvider>
      <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-blue-600 selection:text-white">
        {/* Skip to Main Content Link for Keyboard Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-md focus:shadow-lg focus:outline-none"
        >
          Skip to main content
        </a>

        {/* Main Header with Book a Cab entry point */}
        <Header />

        {/* Page Content Outlet with Suspense Fallback */}
        <main id="main-content" className="flex-1 focus:outline-none">
          <Suspense fallback={<LoadingSpinner label="Loading page..." className="min-h-[50vh]" />}>
            <Outlet />
          </Suspense>
        </main>

        {/* On-Demand Booking Modal (Zero Initial Bundle Cost) */}
        <OnDemandBookingModal />

        {/* Interactive Winter & Festival Offer Pop-up */}
        <Suspense fallback={null}>
          <LazyWinterOfferPopup />
        </Suspense>

        {/* Main Footer */}
        <Footer />
      </div>
    </BookingProvider>
  );
}

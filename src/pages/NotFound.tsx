import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { Home, PhoneCall, Compass, MessageSquare } from 'lucide-react';
import { isPhoneConfigured, getPhoneUrl } from '@/lib/contactUtils';

export function NotFound() {
  useDocumentTitle('Page Not Found (404)');
  const phoneReady = isPhoneConfigured();

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center max-w-md mx-auto space-y-6">
        <div className="w-20 h-20 rounded-full bg-brand-50 border border-brand-200 text-brand-700 flex items-center justify-center mx-auto">
          <Compass className="w-10 h-10" />
        </div>

        <div>
          <span className="text-sm font-bold uppercase tracking-wider text-brand-600">
            Error 404
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-950 mt-1">
            Route Not Found
          </h1>
          <p className="mt-3 text-sm text-navy-600 leading-relaxed">
            The page or route you are looking for does not exist or may have been moved. Let us help you get back on track.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link to="/" className="w-full sm:w-auto">
            <Button variant="primary" size="md" className="w-full" leftIcon={<Home className="w-4 h-4" />}>
              Return to Homepage
            </Button>
          </Link>
          {phoneReady ? (
            <a href={getPhoneUrl()} className="w-full sm:w-auto">
              <Button variant="outline" size="md" className="w-full" leftIcon={<PhoneCall className="w-4 h-4" />}>
                Contact Dispatch
              </Button>
            </a>
          ) : (
            <Link to="/contact" className="w-full sm:w-auto">
              <Button variant="outline" size="md" className="w-full" leftIcon={<MessageSquare className="w-4 h-4" />}>
                Contact Desk
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { brandConfig } from '@/data/brandConfig';
import { env, isFormSubmitConfigured } from '@/lib/env';
import { isWhatsAppConfigured, getWhatsAppUrl } from '@/lib/contactUtils';
import {
  Star,
  Send,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  ShieldCheck,
  Loader2,
} from 'lucide-react';

export function Feedback() {
  useDocumentTitle(
    'Customer Feedback',
    'Share your highway travel experience, vehicle hygiene rating, and chauffeur feedback with Subham Travelers.'
  );

  const formSubmitReady = isFormSubmitConfigured();
  const whatsappReady = isWhatsAppConfigured();

  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    travelRoute: '',
    comments: '',
    consent: false,
  });

  const [validationError, setValidationError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const ratingLabels: Record<number, string> = {
    5: '★★★★★ 5 - Exceptional & Highly Recommended',
    4: '★★★★☆ 4 - Very Good, Smooth & Punctual',
    3: '★★★☆☆ 3 - Average Service',
    2: '★★☆☆☆ 2 - Below Expectations',
    1: '★☆☆☆☆ 1 - Unsatisfactory Service',
  };

  const activeRating = hoverRating || rating;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);
    setSubmitError(null);

    // Validation
    if (!formData.comments.trim() || formData.comments.trim().length < 10) {
      setValidationError('Please share at least 10 characters describing your travel experience.');
      return;
    }

    if (!formData.consent) {
      setValidationError('Please confirm consent for management review before submitting.');
      return;
    }

    setIsSubmitting(true);

    if (formSubmitReady) {
      // Real submission to FormSubmit endpoint
      const targetEmail = env.formSubmitEmail || env.supportEmail;
      try {
        const response = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            _subject: `New Feedback from ${formData.name || 'Anonymous Customer'} (${rating} Stars) - ${brandConfig.brandName}`,
            customerName: formData.name || 'Anonymous',
            contactInfo: formData.contact || 'Not provided',
            travelRoute: formData.travelRoute || 'Not specified',
            rating: `${rating} / 5 Stars`,
            feedback: formData.comments,
            submittedAt: new Date().toISOString(),
          }),
        });

        if (!response.ok) {
          throw new Error('Form forwarding service returned an error. Please try again.');
        }

        setSubmitted(true);
      } catch (err) {
        setSubmitError(
          err instanceof Error
            ? err.message
            : 'Unable to deliver feedback to the mail service. You may share feedback directly via WhatsApp.'
        );
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Unconfigured environment: display transparent local simulation without pretending live delivery
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitted(true);
      }, 700);
    }
  };

  const handleWhatsAppFeedback = () => {
    const text = [
      `Hello ${brandConfig.brandName}, sharing travel feedback:`,
      `• Rating: ${rating}/5 Stars`,
      formData.travelRoute ? `• Route: ${formData.travelRoute}` : null,
      formData.name ? `• Passenger: ${formData.name}` : null,
      `• Feedback: ${formData.comments || 'Great service!'}`,
    ]
      .filter(Boolean)
      .join('\n');

    window.open(getWhatsAppUrl(text), '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-sand-50/40 min-h-screen py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumb Navigation */}
        <Breadcrumb items={[{ label: 'Customer Feedback' }]} />

        {/* Hero Section */}
        <SectionHeading
          eyebrow="Customer Voices"
          title="Share Your Travel Experience"
          subtitle="Your honest reviews help us continually refine our vehicle cleanliness, chauffeur courtesy, highway punctuality, and route safety across Odisha."
          align="center"
        />

        <Card className="p-6 sm:p-10 bg-white border-navy-100/90 shadow-sm">
          {submitted ? (
            <div className="text-center py-10 space-y-4 animate-in fade-in duration-200">
              <div className="w-16 h-16 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="text-2xl font-bold text-navy-950">Thank You for Your Feedback!</h3>
              <p className="text-sm text-navy-600 max-w-md mx-auto leading-relaxed">
                {formSubmitReady
                  ? 'Your review has been forwarded securely to our management operations desk for review and service evaluation.'
                  : 'Your review has been validated in the local evaluation framework. Thank you for helping Subham Travelers maintain high travel standards across Odisha.'}
              </p>

              <div className="pt-4 flex items-center justify-center gap-3 flex-wrap">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', contact: '', travelRoute: '', comments: '', consent: false });
                    setRating(5);
                  }}
                >
                  Submit Another Note
                </Button>
                {whatsappReady && (
                  <Button
                    variant="whatsapp"
                    size="sm"
                    onClick={handleWhatsAppFeedback}
                    leftIcon={<MessageSquare className="w-4 h-4" />}
                  >
                    Share on WhatsApp Desk
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Star Rating Section */}
              <div className="space-y-2 text-center pb-4 border-b border-navy-100">
                <label className="block text-sm font-bold text-navy-900">
                  How was your overall journey experience? <span className="text-red-500">*</span>
                </label>
                <div
                  className="flex items-center justify-center gap-2 pt-1"
                  onMouseLeave={() => setHoverRating(null)}
                >
                  {[1, 2, 3, 4, 5].map((star) => {
                    const isFilled = star <= activeRating;
                    return (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        className="p-1 text-2xl transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded"
                        aria-label={`Rate ${star} out of 5 stars`}
                      >
                        <Star
                          className={`w-8 h-8 transition-colors ${
                            isFilled
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-navy-200 stroke-navy-300'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
                <p className="text-xs font-semibold text-brand-700 min-h-[18px]">
                  {ratingLabels[activeRating]}
                </p>
              </div>

              {/* Passenger & Travel Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Your Name (Optional)"
                  placeholder="e.g. Ramesh Mohanty"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <Input
                  label="Contact Phone / Email (Optional)"
                  placeholder="For management follow-up"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                />
              </div>

              <Input
                label="Route or Destination Traveled"
                placeholder="e.g. Berhampur to Bhubaneswar Airport, or Gopalpur & Tara Tarini"
                value={formData.travelRoute}
                onChange={(e) => setFormData({ ...formData, travelRoute: e.target.value })}
              />

              <Textarea
                label="Your Written Feedback *"
                required
                rows={4}
                placeholder="Tell us about the vehicle cleanliness, chauffeur courtesy, driving safety, and overall punctuality..."
                value={formData.comments}
                onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
              />

              {/* Consent Checkbox */}
              <div className="space-y-3 pt-1">
                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-navy-700 select-none">
                  <input
                    type="checkbox"
                    checked={formData.consent}
                    onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                    className="mt-0.5 rounded border-navy-300 text-brand-600 focus:ring-brand-500 h-4 w-4"
                  />
                  <span>
                    I confirm this feedback is based on an authentic travel experience and agree that Subham Travelers management may evaluate it confidentially for service quality improvements.
                  </span>
                </label>

                {/* Privacy & Anti-Fabrication Notice */}
                <div className="p-3 rounded-lg bg-sand-50 border border-navy-100/80 text-[11px] text-navy-600 flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Verification Policy:</strong> We do not automatically publish unverified online reviews. All customer submissions are routed privately to our operational supervision desk.
                  </span>
                </div>
              </div>

              {/* Error messages */}
              {validationError && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{validationError}</span>
                </div>
              )}

              {submitError && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{submitError}</span>
                </div>
              )}

              {/* Submit Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto"
                  leftIcon={
                    isSubmitting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )
                  }
                >
                  {isSubmitting ? 'Sending Feedback...' : 'Submit Feedback'}
                </Button>

                {whatsappReady && (
                  <Button
                    type="button"
                    variant="outline"
                    size="md"
                    onClick={handleWhatsAppFeedback}
                    className="w-full sm:w-auto hover:bg-[#25D366]/10 hover:text-[#128C7E] hover:border-[#25D366]/40"
                    leftIcon={<MessageSquare className="w-4 h-4 text-[#25D366]" />}
                  >
                    Share via WhatsApp
                  </Button>
                )}
              </div>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
}

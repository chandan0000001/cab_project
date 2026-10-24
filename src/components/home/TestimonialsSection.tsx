import { Link } from 'react-router-dom';
import { demoTestimonials } from '@/data/testimonials';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { MessageSquare, Quote, Info, ArrowRight } from 'lucide-react';

export function TestimonialsSection() {
  return (
    <section id="reviews-preview-section" className="bg-sand-50 py-16 sm:py-20 border-y border-navy-100 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <SectionHeading
            eyebrow="Passenger Feedback"
            title="Service Quality & Passenger Experiences"
            subtitle="We hold ourselves accountable to high hygiene and punctuality standards. See how we structure our passenger reviews."
            className="mb-0"
          />

          <Link to="/feedback" className="shrink-0">
            <Button
              variant="secondary"
              size="md"
              leftIcon={<MessageSquare className="w-4 h-4" />}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Share Your Feedback
            </Button>
          </Link>
        </div>

        {/* Truth in Advertising Notice */}
        <div className="mb-8 p-3.5 rounded-xl bg-white border border-navy-200/80 text-xs text-navy-700 flex items-start gap-2.5 max-w-3xl shadow-subtle">
          <Info className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
          <p>
            <strong>Review Format Disclosure:</strong> The entries shown below illustrate the feedback format we collect from verified travelers. Subham Travelers does not fabricate five-star ratings. Genuine passenger reviews will populate here as trips are completed.
          </p>
        </div>

        {/* Demo Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {demoTestimonials.map((review) => (
            <Card
              key={review.id}
              className="p-6 bg-white flex flex-col justify-between border-navy-100 h-full relative"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <Badge variant="navy" size="sm" className="text-[10px] uppercase font-semibold">
                    {review.date}
                  </Badge>
                  <Quote className="w-5 h-5 text-brand-300" />
                </div>

                <p className="text-sm text-navy-700 italic leading-relaxed mb-6">
                  "{review.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-navy-100">
                <h4 className="font-bold text-sm text-navy-950">{review.clientName}</h4>
                <p className="text-xs text-brand-700 font-medium mt-0.5">{review.travelRoute}</p>
                <p className="text-[11px] text-navy-500 mt-0.5">{review.location}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

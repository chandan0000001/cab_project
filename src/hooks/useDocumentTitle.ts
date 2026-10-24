import { useEffect } from 'react';
import { brandConfig } from '@/data/brandConfig';

/**
 * Sets page title and updates meta description.
 */
export function useDocumentTitle(title?: string, description?: string) {
  useEffect(() => {
    const fullTitle = title 
      ? `${title} | ${brandConfig.brandName}`
      : `${brandConfig.brandName} | Reliable Cab Booking & Odisha Tours`;
    
    document.title = fullTitle;

    if (description) {
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', description);
      }
    }
  }, [title, description]);
}

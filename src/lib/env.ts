/**
 * Application environment configuration helper
 * Provides type-safe access to Vite environment variables with graceful fallback values.
 */

export const env = {
  /**
   * Photon Geocoding API endpoint (OpenStreetMap-based geocoding)
   * Default public endpoint: https://photon.komoot.io/api
   */
  photonApiUrl: import.meta.env.VITE_PHOTON_API_URL || 'https://photon.komoot.io/api',

  /**
   * OSRM Driving Routing API endpoint (OpenStreetMap-based routing)
   * Default public demo endpoint: https://router.project-osrm.org
   */
  osrmApiUrl: import.meta.env.VITE_OSRM_API_URL || 'https://router.project-osrm.org',

  /**
   * Official WhatsApp Support Number (e.g., 919876543210)
   */
  whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER || '910000000000',

  /**
   * Direct Phone Support Number
   */
  supportPhone: import.meta.env.VITE_SUPPORT_PHONE || '+91 00000 00000',

  /**
   * Primary Contact Email Address
   */
  supportEmail: import.meta.env.VITE_SUPPORT_EMAIL || 'contact@subhamtravelers.com',

  /**
   * FormSubmit recipient email for customer feedback forwarding
   */
  formSubmitEmail: import.meta.env.VITE_FORMSUBMIT_EMAIL || '',

  /**
   * Base Site URL
   */
  siteUrl: import.meta.env.VITE_SITE_URL || 'http://localhost:5173',
};

/**
 * Checks whether FormSubmit has been configured with an active recipient email
 */
export function isFormSubmitConfigured(): boolean {
  const targetEmail = env.formSubmitEmail || (env.supportEmail !== 'contact@subhamtravelers.com' ? env.supportEmail : '');
  return Boolean(targetEmail && targetEmail.includes('@') && !targetEmail.includes('placeholder'));
}

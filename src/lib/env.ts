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
   * Official WhatsApp Support Number (+91 63712 58522)
   */
  whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER || '916371258522',

  /**
   * Direct Phone Support Number
   */
  supportPhone: import.meta.env.VITE_SUPPORT_PHONE || '+91 63712 58522',

  /**
   * Primary Contact Email Address
   */
  supportEmail: import.meta.env.VITE_SUPPORT_EMAIL || 'subhamratha@gmail.com',

  /**
   * FormSubmit recipient email for customer feedback forwarding
   */
  formSubmitEmail: import.meta.env.VITE_FORMSUBMIT_EMAIL || 'subhamratha@gmail.com',

  /**
   * Base Site URL (Vercel Project: berhampur_cab)
   */
  siteUrl: import.meta.env.VITE_SITE_URL || 'https://berhampur-cab.vercel.app',
};

/**
 * Checks whether FormSubmit has been configured with an active recipient email
 */
export function isFormSubmitConfigured(): boolean {
  const targetEmail = env.formSubmitEmail || env.supportEmail;
  return Boolean(targetEmail && targetEmail.includes('@') && !targetEmail.includes('placeholder'));
}

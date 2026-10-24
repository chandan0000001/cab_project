/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Royal Sapphire Blue (Canonical modern, executive transport & cab operator palette)
        brand: {
          50: '#EFF6FF',   // subtle icy tint
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',  // bright accent
          500: '#2563EB',  // PRIMARY canonical Royal Blue
          600: '#1D4ED8',  // deep royal blue (WCAG AAA compliant text on white)
          700: '#1E40AF',
          800: '#1E3A8A',
          900: '#0F172A',
          950: '#0A0F1D',
        },
        // Warm Ink (Near-black, never cold sterile blue)
        ink: {
          50: '#FBF9F6',
          100: '#F5F2EB',
          200: '#E8E2D6',
          300: '#D4CCBC',
          400: '#9E9688',
          500: '#6A6460',  // ink mute
          600: '#4A4640',  // ink soft
          700: '#2E2A25',
          800: '#1A1815',  // ink primary
          900: '#12100E',
          950: '#0F0E0C',  // ink deep
        },
        // Navy alias mapped to warm dark ink so existing components immediately look warm & rich
        navy: {
          50: '#FAF8F5',
          100: '#F2EFE9',
          200: '#E4DFD5',
          300: '#CBC4B5',
          400: '#8E8678',
          500: '#625A4E',
          600: '#433C33',
          700: '#2A251F',
          800: '#1A1713',
          900: '#13110E',
          950: '#0C0A08',
        },
        // Warm Cream & Surface backgrounds (70% dominant)
        sand: {
          50: '#FFFDF9',
          100: '#FFFBF5',
          200: '#FFF8EE',
          300: '#F5F0E6',
          400: '#EBE4D5',
        },
        // WhatsApp Forest Green
        whatsapp: {
          DEFAULT: '#1F6F3F',
          hover: '#155A30',
          light: '#E1F0E5',
          bright: '#25D366',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(26, 24, 21, 0.05)',
        'card': '0 2px 8px 0 rgba(26, 24, 21, 0.06), 0 1px 2px -1px rgba(26, 24, 21, 0.04)',
        'card-hover': '0 14px 36px -4px rgba(26, 24, 21, 0.12), 0 4px 12px -2px rgba(26, 24, 21, 0.05)',
        'elevated': '0 20px 48px -8px rgba(26, 24, 21, 0.14), 0 8px 16px -4px rgba(26, 24, 21, 0.06)',
        'brand': '0 6px 20px -2px rgba(37, 99, 235, 0.28)',
        'whatsapp': '0 6px 20px -2px rgba(31, 111, 63, 0.28)',
      },
    },
  },
  plugins: [],
}

# Subham Travelers — Web Application

> **Subham Travelers** is a cab and travel enquiry website serving customers throughout Odisha, India. Built with React 18, Vite 6, TypeScript, Tailwind CSS, Leaflet, OpenStreetMap, Photon Geocoding, and OSRM Routing.

---

## 🗺️ Free & Open-Source Mapping Stack (Phase 3)

The application uses an entirely **free and open-source mapping stack** with zero dependency on Google Maps Platform:

1. **Map Rendering:** [Leaflet](https://leafletjs.com/) (`leaflet` + `react-leaflet`) with official OpenStreetMap tiles (`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`).
2. **Location Autocomplete:** [Photon API](https://photon.komoot.io/) by Komoot (OpenStreetMap-based geocoding, biased to Odisha/India coordinates).
3. **Driving Route Calculation:** [OSRM (Open Source Routing Machine)](https://project-osrm.org/) road driving API (`https://router.project-osrm.org`).
4. **Animated Route Visualization:** Leaflet Polyline with progressive road route rendering and a moving directional vehicle indicator following the actual road curvature.
5. **No Fare Disclosure:** Strictly complies with product guidelines by displaying road distance and estimated driving duration without displaying any fare, pricing, or currency rates.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or higher (Tested on Node v24.18.0)
- **npm**: v9.0.0 or higher (Tested on npm 11.16.0)

### 1. Installation

```bash
# Install project dependencies
npm install
```

### 2. Environment Configuration

Copy the example environment configuration:

```bash
cp .env.example .env
```

| Variable | Description | Default Endpoint |
| :--- | :--- | :--- |
| `VITE_PHOTON_API_URL` | Photon Geocoding API | `https://photon.komoot.io/api` |
| `VITE_OSRM_API_URL` | OSRM Driving Routing API | `https://router.project-osrm.org` |
| `VITE_WHATSAPP_NUMBER` | Business WhatsApp number (Country code + digits, no `+`) | `910000000000` |
| `VITE_SUPPORT_PHONE` | Direct phone support display string | `+91 00000 00000` |
| `VITE_SUPPORT_EMAIL` | Official enquiry email address | `contact@subhamtravelers.com` |
| `VITE_SITE_URL` | Canonical site URL | `http://localhost:5173` |

### 3. Run Development Server

```bash
npm run dev
```

The application will be accessible at: `http://localhost:5173/`

### 4. Build for Production & Linting

```bash
# Run ESLint validation
npm run lint

# Compile TypeScript and bundle production assets
npm run build

# Preview production build locally
npm run preview
```

---

## 🛣️ Odisha Regional Corridors Supported

The application features comprehensive intercity routes spanning all parts of Odisha:

1. **Southern & Hill Corridors:**
   - **Bhubaneswar ⇄ Malkangiri** (615 km, ~12 hrs) — Southern tribal heartland, Balimela reservoir, Satiguda dam.
   - **Bhubaneswar ⇄ Phulbani** (215 km, ~4 hrs 45 mins) — Kandhamal hill district, sal reserves, Putudi falls.
   - **Bhubaneswar ⇄ Daringbadi** (250 km, ~5 hrs 30 mins) — "Kashmir of Odisha", pine valleys, coffee gardens.
   - **Berhampur ⇄ Daringbadi** (125 km, ~3 hrs 15 mins) — Ganjam to Kandhamal scenic mountain ascent.
   - **Bhubaneswar ⇄ Koraput / Jeypore** (500 km, ~10 hrs 30 mins) — Deomali peak, Duduma falls, coffee plantations.
   - **Bhubaneswar ⇄ Berhampur** (170 km, ~3 hrs 30 mins) — NH-16 Silk City commercial link.

2. **Coastal & Heritage Corridors:**
   - **Bhubaneswar ⇄ Puri** (60 km, ~1 hr 15 mins) — NH-316 Jagannath Temple expressway.
   - **Bhubaneswar ⇄ Konark** (65 km, ~1 hr 30 mins) — UNESCO Sun Temple & Chandrabhaga Marine Drive.
   - **Bhubaneswar ⇄ Chilika Lake (Satapada)** (110 km, ~2 hrs 15 mins) — Dolphin sanctuary & coastal seafood.
   - **Bhubaneswar ⇄ Cuttack** (30 km, ~45 mins) — Twin-city SCB Medical, High Court, & Silver Filigree corridor.
   - **Berhampur ⇄ Puri** (155 km, ~3 hrs 15 mins) — Coastal pilgrimage transit.

3. **Western & Northern Corridors:**
   - **Bhubaneswar ⇄ Sambalpur** (280 km, ~5 hrs 30 mins) — Hirakud Dam, Samaleswari Temple, handloom hub.
   - **Bhubaneswar ⇄ Rourkela** (330 km, ~6 hrs 30 mins) — Steel City via Biju Expressway.

---

## 📁 Architecture & File Layout

```
src/
├── services/
│   ├── geocodingService.ts     # Photon API geocoding with Odisha presets fallback
│   └── routingService.ts       # OSRM driving route engine (distance, duration, geometry)
├── components/
│   ├── maps/
│   │   ├── LocationAutocomplete.tsx # Accessible search input with Photon & presets
│   │   ├── RouteMap.tsx             # Interactive Leaflet map & animated directional marker
│   │   └── RouteSummary.tsx         # Road distance and driving duration display
│   ├── home/
│   │   ├── HeroSection.tsx          # Hero banner with trust row
│   │   ├── TripSearchForm.tsx       # Trip search desk with dynamic route calculation
│   │   ├── PopularRoutes.tsx        # Intercity corridors with regional filter tabs
│   │   └── ...
```

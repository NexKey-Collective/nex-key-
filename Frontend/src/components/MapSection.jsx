import { useState } from 'react'
import { Link } from 'react-router-dom'

const MAP_LOCATIONS = [
  {
    id: 1,
    name: 'Maple Grove Estate',
    address: '2847 Maple Grove Drive',
    city: 'Austin, TX',
    price: '$425,000',
    type: 'Fix & Flip',
    description: 'ARV of $580K with solid equity upside in a fast-growing Austin suburb.',
    x: '27%',
    y: '44%',
  },
  {
    id: 2,
    name: 'Ocean View Retreat',
    address: '1523 Ocean View Blvd',
    city: 'Miami, FL',
    price: '$385,000',
    type: 'STR',
    description: 'Generating $6,800/mo — turnkey furnished short-term rental in a top coastal market.',
    x: '65%',
    y: '66%',
  },
  {
    id: 3,
    name: 'Summit Ridge Cabin',
    address: '4192 Summit Ridge Lane',
    city: 'Denver, CO',
    price: '$295,000',
    type: 'Wholesale',
    description: '$85K below market. Fast close preferred — ideal for investors who move quickly.',
    x: '44%',
    y: '24%',
  },
  {
    id: 4,
    name: 'Parkside Modern',
    address: '8634 Parkside Ave',
    city: 'Seattle, WA',
    price: '$475,000',
    type: 'Co-Living',
    description: '6 rooms grossing $7,200/mo. Seller finance available with 20% down.',
    x: '16%',
    y: '60%',
  },
  {
    id: 5,
    name: 'Riverside Terrace',
    address: '5721 Riverside Terrace',
    city: 'Portland, OR',
    price: '$520,000',
    type: 'MTR',
    description: '$4,200/mo mid-term rental steps from a major tech employment hub.',
    x: '74%',
    y: '36%',
  },
]

const TYPE_BADGE = {
  'Fix & Flip': 'bg-orange-50 text-orange-600',
  STR:          'bg-sky-50 text-sky-600',
  Wholesale:    'bg-emerald-50 text-emerald-600',
  'Co-Living':  'bg-violet-50 text-violet-600',
  MTR:          'bg-amber-50 text-amber-600',
}

function MapPin({ location, isSelected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={[
        'absolute -translate-x-1/2 -translate-y-full flex flex-col items-center transition-all duration-200 group z-10 focus:outline-none',
        isSelected ? 'scale-125 z-20' : 'hover:scale-110',
      ].join(' ')}
      style={{ left: location.x, top: location.y }}
    >
      {/* Price bubble */}
      <span
        className={[
          'mb-1 px-2.5 py-1 rounded-full text-[12px] font-semibold whitespace-nowrap shadow-md transition-all duration-200',
          isSelected
            ? 'bg-brand text-white opacity-100 translate-y-0'
            : 'bg-white text-brand border border-brand/20 shadow-sm opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0',
        ].join(' ')}
      >
        {location.price}
      </span>

      {/* Pin circle */}
      <div
        className={[
          'flex items-center justify-center rounded-full border-2 border-white shadow-lg transition-all duration-200',
          isSelected ? 'w-5 h-5 bg-brand' : 'w-4 h-4 bg-brand group-hover:bg-brand-dark',
        ].join(' ')}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-white" />
      </div>

      {/* Pin tail */}
      <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent border-t-brand" />
    </button>
  )
}

function LocationCard({ location }) {
  const badge = TYPE_BADGE[location.type] ?? 'bg-gray-100 text-gray-600'

  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
      <span className={`inline-block text-[12px] font-semibold px-3 py-1 rounded-full mb-3 ${badge}`}>
        {location.type}
      </span>

      <div className="flex items-start justify-between gap-2 mb-1">
        <h3 className="text-[17px] font-bold text-dark leading-snug">{location.name}</h3>
        <span className="text-[17px] font-bold text-brand shrink-0">{location.price}</span>
      </div>

      <div className="flex items-center gap-1.5 text-[13px] text-text-muted mb-3">
        <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        {location.address}, {location.city}
      </div>

      <p className="text-[14px] text-text-muted leading-relaxed mb-5">{location.description}</p>

      <Link
        to="/deals"
        className="flex items-center justify-center gap-2 w-full bg-brand text-white text-[15px] font-semibold px-6 py-3 rounded-2xl shadow-[0_4px_6px_rgba(255,90,95,0.25)] hover:bg-brand-dark transition-all duration-200 active:scale-95"
      >
        View Deal
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  )
}

function MapControls({ onZoomIn, onZoomOut }) {
  return (
    <div className="absolute right-4 bottom-14 flex flex-col bg-white border border-gray-100 rounded-xl shadow-md overflow-hidden z-10">
      <button
        onClick={onZoomIn}
        className="flex items-center justify-center w-9 h-9 text-text-body text-lg font-bold border-b border-gray-100 hover:bg-bg-light hover:text-brand transition-colors"
        aria-label="Zoom in"
      >
        +
      </button>
      <button
        onClick={onZoomOut}
        className="flex items-center justify-center w-9 h-9 text-text-body text-lg font-bold hover:bg-bg-light hover:text-brand transition-colors"
        aria-label="Zoom out"
      >
        −
      </button>
    </div>
  )
}

export default function MapSection() {
  const [selected, setSelected] = useState(MAP_LOCATIONS[0])

  return (
    <section id="map" className="bg-bg-light py-20 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-14">
          <h2 className="text-[36px] lg:text-[42px] font-bold text-dark tracking-tight mb-3">
            Explore Deals Near You
          </h2>
          <p className="text-text-muted text-[18px] max-w-lg mx-auto leading-relaxed">
            Discover nearby Nexkey deals, spaces, and opportunities by location.
          </p>
        </div>

        {/* Body: left panel + map */}
        <div className="flex flex-col lg:flex-row gap-6 items-stretch">

          {/* LEFT — search / filters / selected card */}
          <div className="flex flex-col gap-5 lg:w-[360px] shrink-0">

            {/* Search input */}
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search city, zip, or address..."
                className="w-full bg-white border border-gray-200 rounded-2xl pl-12 pr-4 py-3.5 text-[15px] text-dark placeholder:text-text-faint outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand/30 transition-all shadow-sm"
              />
            </div>

            {/* Filter chips */}
            <div className="flex flex-wrap gap-2">
              {['All', 'Fix & Flip', 'STR', 'Wholesale', 'MTR', 'Co-Living'].map((f) => (
                <button
                  key={f}
                  className="px-4 py-1.5 rounded-full border border-gray-200 bg-white text-[13px] font-medium text-text-body hover:border-brand/40 hover:text-brand transition-all duration-150"
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-[11px] font-semibold text-text-faint uppercase tracking-widest whitespace-nowrap">
                Selected Deal
              </span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Selected location card */}
            <LocationCard location={selected} />

            <p className="text-[13px] text-text-muted text-center">
              Showing <span className="font-semibold text-dark">{MAP_LOCATIONS.length}</span> deals on the map —{' '}
              <Link to="/deals" className="text-brand hover:underline font-medium">View all</Link>
            </p>
          </div>

          {/* RIGHT — map mockup */}
          <div
            className="flex-1 relative rounded-3xl overflow-hidden border border-black/[0.08] shadow-sm min-h-[480px] lg:min-h-0"
            style={{
              backgroundColor: '#e8e3d6',
              backgroundImage: `
                linear-gradient(rgba(0,0,0,0.035) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,0,0,0.035) 1px, transparent 1px)
              `,
              backgroundSize: '44px 44px',
            }}
          >
            {/* Static SVG "streets" layer */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              preserveAspectRatio="none"
              viewBox="0 0 800 520"
            >
              {/* Main horizontal roads */}
              <line x1="0" y1="170" x2="800" y2="170" stroke="white" strokeWidth="14" opacity="0.75" />
              <line x1="0" y1="330" x2="800" y2="330" stroke="white" strokeWidth="9" opacity="0.55" />
              <line x1="0" y1="430" x2="800" y2="430" stroke="white" strokeWidth="6" opacity="0.4" />
              {/* Main vertical roads */}
              <line x1="210" y1="0" x2="210" y2="520" stroke="white" strokeWidth="14" opacity="0.75" />
              <line x1="490" y1="0" x2="490" y2="520" stroke="white" strokeWidth="9" opacity="0.55" />
              <line x1="670" y1="0" x2="670" y2="520" stroke="white" strokeWidth="6" opacity="0.4" />
              {/* Diagonal boulevard */}
              <path d="M0,230 Q200,190 420,270 T800,250" stroke="white" strokeWidth="9" fill="none" opacity="0.45" />
              {/* City blocks */}
              <rect x="40"  y="50"  width="140" height="100" rx="5" fill="white" opacity="0.18" />
              <rect x="230" y="50"  width="90"  height="100" rx="5" fill="white" opacity="0.13" />
              <rect x="340" y="50"  width="130" height="100" rx="5" fill="white" opacity="0.15" />
              <rect x="510" y="50"  width="130" height="100" rx="5" fill="white" opacity="0.13" />
              <rect x="40"  y="210" width="140" height="100" rx="5" fill="white" opacity="0.15" />
              <rect x="230" y="210" width="230" height="100" rx="5" fill="white" opacity="0.12" />
              <rect x="510" y="210" width="130" height="100" rx="5" fill="white" opacity="0.18" />
              <rect x="40"  y="370" width="140" height="40"  rx="5" fill="white" opacity="0.12" />
              <rect x="230" y="370" width="230" height="40"  rx="5" fill="white" opacity="0.15" />
              <rect x="510" y="370" width="130" height="40"  rx="5" fill="white" opacity="0.13" />
              {/* Park patch */}
              <rect x="690" y="180" width="90"  height="130" rx="8" fill="#a8cc88" opacity="0.45" />
              <rect x="700" y="192" width="70"  height="106" rx="5" fill="#96ba78" opacity="0.4"  />
              {/* Water feature */}
              <ellipse cx="130" cy="430" rx="80" ry="30" fill="#a8c8e8" opacity="0.35" />
            </svg>

            {/* Search overlay bar */}
            <div className="absolute top-4 left-4 right-4 z-10 flex gap-2">
              <div className="flex-1 flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-white/70 rounded-xl px-4 py-2.5 shadow-sm">
                <svg className="w-4 h-4 text-text-muted shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="text-[14px] text-text-faint select-none">Search this area…</span>
              </div>
              <button className="flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-white/70 rounded-xl px-4 py-2.5 shadow-sm text-[14px] font-medium text-text-body hover:bg-white transition-colors shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
                </svg>
                Filter
              </button>
            </div>

            {/* Pins */}
            {MAP_LOCATIONS.map((loc) => (
              <MapPin
                key={loc.id}
                location={loc}
                isSelected={selected?.id === loc.id}
                onClick={() => setSelected(loc)}
              />
            ))}

            {/* Zoom controls */}
            <MapControls
              onZoomIn={() => {}}
              onZoomOut={() => {}}
            />

            {/* Bottom badges */}
            <div className="absolute bottom-3 left-4 text-[11px] text-text-faint bg-white/75 px-2.5 py-1 rounded-full select-none">
              NexKey Map · Demo Data
            </div>
            <div className="absolute bottom-3 right-4 flex items-center gap-1.5 bg-white border border-gray-100 rounded-full px-3 py-1.5 shadow-sm text-[13px] font-medium text-dark">
              <span className="w-2 h-2 rounded-full bg-brand shrink-0" />
              {MAP_LOCATIONS.length} deals nearby
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function BedIcon() {
  return (
    <svg className="w-4 h-4 text-[#717171]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l1-1V7a1 1 0 011-1h14a1 1 0 011 1v4l1 1M3 12v6h18v-6M3 12h18" />
    </svg>
  )
}

function BathIcon() {
  return (
    <svg className="w-4 h-4 text-[#717171]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 12h16M4 12a2 2 0 01-2-2V7a2 2 0 012-2h3l2 2h9a2 2 0 012 2v3M4 12v5a2 2 0 002 2h12a2 2 0 002-2v-5" />
    </svg>
  )
}

function SqftIcon() {
  return (
    <svg className="w-4 h-4 text-[#717171]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V5a1 1 0 011-1h3M4 16v3a1 1 0 001 1h3m10-15h3a1 1 0 011 1v3m-4 12h3a1 1 0 001-1v-3" />
    </svg>
  )
}

function PinIcon() {
  return (
    <svg className="w-4 h-4 text-[#717171] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
}

export default function DealTypeCard({ deal }) {
  return (
    <div className="bg-white border border-black/[0.08] rounded-2xl overflow-hidden flex flex-col transition-all duration-200 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:-translate-y-0.5 cursor-pointer group">
      {/* Image */}
      <div className="relative h-56 bg-[#f7f7f7] overflow-hidden shrink-0">
        <img
          src={deal.image}
          alt={deal.address}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        {deal.badge && (
          <span
            className="absolute top-4 left-4 bg-white text-[#1a1a1a] text-[13px] font-medium px-3 py-1.5 rounded-full shadow-sm border border-black/[0.06]"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {deal.badge}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-4 px-6 pt-6 pb-5">
        {/* Price + address */}
        <div>
          <p
            className="text-[#1a1a1a] text-[28px] leading-none mb-2"
            style={{ fontFamily: "'Archivo Black', sans-serif" }}
          >
            {deal.price}
          </p>
          <div className="flex items-center gap-1.5 text-[14px] text-[#717171]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            <PinIcon />
            <span>{deal.address}</span>
          </div>
          <p className="text-[14px] text-[#717171] mt-0.5 pl-[22px]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {deal.city}
          </p>
        </div>

        {/* Beds / Baths / Sqft */}
        <div className="flex items-center gap-6 pb-4 border-b border-black/[0.08]">
          <span className="flex items-center gap-2 text-[16px] font-medium text-[#1a1a1a]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            <BedIcon /> {deal.beds}
          </span>
          <span className="flex items-center gap-2 text-[16px] font-medium text-[#1a1a1a]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            <BathIcon /> {deal.baths}
          </span>
          <span className="flex items-center gap-2 text-[16px] font-medium text-[#1a1a1a]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            <SqftIcon /> {deal.sqft}
          </span>
        </div>

        {/* Stat row */}
        <div className="flex items-center justify-between">
          <span className="text-[14px] text-[#717171]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {deal.statLabel}
          </span>
          <span className="text-[16px] font-medium text-[#1a1a1a]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {deal.statValue}
          </span>
        </div>
      </div>
    </div>
  )
}

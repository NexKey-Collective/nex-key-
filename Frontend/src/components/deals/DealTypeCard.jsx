import { useNavigate } from "react-router-dom";

// Exit strategy tag colors (matching Airtable's color scheme)
const EXIT_STRATEGY_COLORS = {
  LTR: { bg: "#dbeafe", text: "#1e40af" },
  MTR: { bg: "#ede9fe", text: "#5b21b6" },
  STR: { bg: "#d1fae5", text: "#065f46" },
  Wrap: { bg: "#d1fae5", text: "#047857" },
  "Co-living": { bg: "#fef9c3", text: "#854d0e" },
  Homestead: { bg: "#fce7f3", text: "#9d174d" },
  "Tax Depreciation": { bg: "#fee2e2", text: "#991b1b" },
  "Lease Option": { bg: "#e0e7ff", text: "#3730a3" },
  "Sober Living / Assisted Living": { bg: "#fef3c7", text: "#92400e" },
  "Fix and Flip": { bg: "#ffedd5", text: "#9a3412" },
  BRRRR: { bg: "#cffafe", text: "#155e75" },
};

const DEFAULT_EXIT_COLOR = { bg: "#f3f4f6", text: "#374151" };

function BedIcon() {
  return (
    <svg className="w-4 h-4 text-[#717171]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l1-1V7a1 1 0 011-1h14a1 1 0 011 1v4l1 1M3 12v6h18v-6M3 12h18" />
    </svg>
  );
}

function BathIcon() {
  return (
    <svg className="w-4 h-4 text-[#717171]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 12h16M4 12a2 2 0 01-2-2V7a2 2 0 012-2h3l2 2h9a2 2 0 012 2v3M4 12v5a2 2 0 002 2h12a2 2 0 002-2v-5" />
    </svg>
  );
}

function SqftIcon() {
  return (
    <svg className="w-4 h-4 text-[#717171]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V5a1 1 0 011-1h3M4 16v3a1 1 0 001 1h3m10-15h3a1 1 0 011 1v3m-4 12h3a1 1 0 001-1v-3" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg className="w-4 h-4 text-[#717171] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

export default function DealTypeCard({ deal }) {
  const navigate = useNavigate();

  const hasExitStrategies = deal.exitStrategies && deal.exitStrategies.length > 0;
  const hasWebsiteTags = deal.websiteTags && deal.websiteTags.length > 0;

  return (
    <div
      onClick={() => navigate(`/deals/${deal.id}`)}
      className="bg-white border border-black/[0.08] rounded-2xl overflow-hidden flex flex-col transition-all duration-200 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:-translate-y-0.5 cursor-pointer group"
    >
      {/* Image */}
      <div className="relative h-56 bg-[#f7f7f7] overflow-hidden shrink-0">
        <img
          src={deal.image}
          alt={deal.address}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />

        {/* Deal type badge — top left */}
        {deal.badge && (
          <span
            className="absolute top-4 left-4 bg-white text-[#1a1a1a] text-[12px] font-medium px-3 py-1.5 rounded-full shadow-sm border border-black/[0.06]"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {deal.badge}
          </span>
        )}

        {/* Exit strategy + custom tag badges — bottom left */}
        {(hasExitStrategies || hasWebsiteTags) && (
          <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
            {(deal.exitStrategies || []).map((strategy) => {
              const colors = EXIT_STRATEGY_COLORS[strategy] || DEFAULT_EXIT_COLOR;
              return (
                <span
                  key={strategy}
                  className="text-[11px] font-medium px-2.5 py-1 rounded-full"
                  style={{
                    backgroundColor: colors.bg,
                    color: colors.text,
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  {strategy}
                </span>
              );
            })}
            {(deal.websiteTags || []).map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-medium px-2.5 py-1 rounded-full"
                style={{
                  backgroundColor: "#fce7f3",
                  color: "#9d174d",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
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
  );
}
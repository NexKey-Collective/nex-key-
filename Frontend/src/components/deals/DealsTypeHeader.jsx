import { useState, useRef, useEffect } from "react";
import FilterPanel from "./FilterPanel";

const DEAL_TYPES = ["All", "Creative", "Cash", "Novation", "Rent To Own", "Stack"];
const CREATIVE_SUBTYPES = ["Subto", "Hybrid", "Seller Finance"];

function Dropdown({ label, active, children, onClear }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative shrink-0" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className={[
          "flex items-center gap-1.5 px-4 py-2 rounded-full border text-[14px] font-medium transition-all",
          active
            ? "bg-[#ff5a5f]/10 border-[#ff5a5f] text-[#ff5a5f]"
            : "bg-white border-black/[0.10] text-[#1a1a1a] hover:border-black/20",
        ].join(" ")}
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {label}
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 bg-white border border-black/[0.08] rounded-2xl z-50 p-4 min-w-[260px]"
          style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.10)" }}>
          {children}
          {active && (
            <button onClick={() => { onClear(); setOpen(false); }}
              className="mt-3 w-full text-[13px] text-[#ff5a5f] hover:underline text-center"
              style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Clear
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default function DealsTypeHeader({
  activeFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  onLogout,
  onInlineFilters,
  onApplyPanel,
  panelFilters,
  onPanelFiltersChange,
  activeFilterCount = 0,
}) {
  const [panelOpen, setPanelOpen] = useState(false);

  // Inline filter state
  const [beds, setBeds] = useState("any");
  const [baths, setBaths] = useState("any");
  const [entryMin, setEntryMin] = useState("");
  const [entryMax, setEntryMax] = useState("");
  const [rateMin, setRateMin] = useState("");
  const [rateMax, setRateMax] = useState("");

  const bedsActive = beds !== "any" || baths !== "any";
  const entryActive = entryMin !== "" || entryMax !== "";
  const rateActive = rateMin !== "" || rateMax !== "";

  const bedsLabel = bedsActive
    ? [beds !== "any" && `${beds}+ bd`, baths !== "any" && `${baths}+ ba`].filter(Boolean).join(", ")
    : "Beds & Baths";

  const entryLabel = entryActive
    ? `${entryMin ? `$${Number(entryMin).toLocaleString()}` : "$0"} – ${entryMax ? `$${Number(entryMax).toLocaleString()}` : "Any"}`
    : "Entry Fee";

  const rateLabel = rateActive ? `${rateMin || "0"}% – ${rateMax || "Any"}%` : "Interest Rate";

  const pushInlineFilters = (overrides = {}) => {
    const b = overrides.beds ?? beds;
    const ba = overrides.baths ?? baths;
    const eMin = overrides.entryMin ?? entryMin;
    const eMax = overrides.entryMax ?? entryMax;
    const rMin = overrides.rateMin ?? rateMin;
    const rMax = overrides.rateMax ?? rateMax;
    const tab = overrides.tab ?? activeFilter;

    const filters = {};
    if (b !== "any") filters.minBeds = parseInt(b);
    if (ba !== "any") filters.minBaths = parseInt(ba);
    if (eMin) filters.minEntryFee = parseFloat(eMin);
    if (eMax) filters.maxEntryFee = parseFloat(eMax);
    if (rMin) filters.rateMin = parseFloat(rMin);
    if (rMax) filters.rateMax = parseFloat(rMax);
    if (tab === "Cash") filters.dealType = "Cash";
    if (tab === "Novation") filters.dealType = "Novation";
    if (tab === "Rent To Own") filters.dealType = "Rent To Own";
    if (tab === "Stack") filters.dealType = "Stack";
    if (tab === "Creative") filters.dealTypes = CREATIVE_SUBTYPES;

    onInlineFilters && onInlineFilters(filters);
  };

  const handleTabChange = (type) => {
    onFilterChange(type);
    pushInlineFilters({ tab: type });
  };

  return (
    <>
      <div className="bg-white border-b border-black/[0.06] sticky top-0 z-40">

        {/* Row 1: Logo + Sign Out */}
        <div className="flex items-center justify-between px-8 h-[60px] border-b border-black/[0.06]">
          <a href="/" className="flex items-center gap-2.5">
            <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none">
              <rect width="48" height="48" rx="10" fill="#ff5a5f" fillOpacity="0.12" />
              <path d="M24 10L8 22V38H18V28H30V38H40V22L24 10Z" fill="#ff5a5f" />
              <rect x="21" y="31" width="6" height="7" rx="1" fill="white" />
            </svg>
            <div className="flex flex-col leading-none">
              <span className="text-[#ff5a5f] text-[18px] tracking-[-0.5px]" style={{ fontFamily: "'Archivo Black', sans-serif" }}>NexKey</span>
              <span className="text-[#ff5a5f] text-[9px] tracking-[1.4px] uppercase mt-0.5" style={{ fontFamily: "'Archivo Black', sans-serif" }}>COLLECTIVE</span>
            </div>
          </a>

          {onLogout && (
            <button onClick={onLogout}
              className="flex items-center gap-2 text-[14px] text-[#717171] hover:text-[#1a1a1a] transition-colors font-medium"
              style={{ fontFamily: "'DM Sans', sans-serif" }}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign Out
            </button>
          )}
        </div>

        {/* Row 2: Search + tabs + dropdowns + filter icon */}
        <div className="flex items-center gap-3 px-8 py-3 overflow-x-auto scrollbar-hide">

          {/* Search */}
          <div className="relative shrink-0">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-[#717171]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by city or state..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-[600px] bg-white border border-black/[0.10] rounded-full pl-9 pr-4 py-2 text-[14px] text-[#1a1a1a] placeholder:text-[rgba(26,26,26,0.4)] outline-none focus:ring-2 focus:ring-[#ff5a5f]/20 focus:border-[#ff5a5f]/40 transition-all"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            />
          </div>

          {/* Deal type tabs */}
          {DEAL_TYPES.map((type) => {
            const isActive = activeFilter === type;
            return (
              <button key={type} onClick={() => handleTabChange(type)}
                className={["shrink-0 px-5 py-2 rounded-full text-[14px] font-medium transition-all border",
                  isActive ? "bg-[#ff5a5f]/15 text-[#ff5a5f] border-[#ff5a5f]/30" : "text-[#1a1a1a] hover:bg-black/[0.04] border-transparent"].join(" ")}
                style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {type}
              </button>
            );
          })}

          <div className="w-px h-6 bg-black/[0.08] shrink-0 mx-1" />

          {/* Beds & Baths */}
          <Dropdown label={bedsLabel} active={bedsActive}
            onClear={() => { setBeds("any"); setBaths("any"); pushInlineFilters({ beds: "any", baths: "any" }); }}>
            <p className="text-[12px] text-[#717171] mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>Bedrooms (min)</p>
            <div className="flex gap-1.5 mb-4">
              {["any", "1", "2", "3", "4"].map((v) => (
                <button key={v} onClick={() => { setBeds(v); pushInlineFilters({ beds: v }); }}
                  className={["flex-1 py-1.5 rounded-full border text-[12px] transition-all",
                    beds === v ? "bg-[#ff5a5f]/10 border-[#ff5a5f] text-[#ff5a5f]" : "bg-white border-black/[0.08] text-[#1a1a1a]"].join(" ")}
                  style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {v === "any" ? "Any" : `${v}+`}
                </button>
              ))}
            </div>
            <p className="text-[12px] text-[#717171] mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>Bathrooms (min)</p>
            <div className="flex gap-1.5">
              {["any", "1", "2", "3"].map((v) => (
                <button key={v} onClick={() => { setBaths(v); pushInlineFilters({ baths: v }); }}
                  className={["flex-1 py-1.5 rounded-full border text-[12px] transition-all",
                    baths === v ? "bg-[#ff5a5f]/10 border-[#ff5a5f] text-[#ff5a5f]" : "bg-white border-black/[0.08] text-[#1a1a1a]"].join(" ")}
                  style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {v === "any" ? "Any" : `${v}+`}
                </button>
              ))}
            </div>
          </Dropdown>

          {/* Entry Fee */}
          <Dropdown label={entryLabel} active={entryActive}
            onClear={() => { setEntryMin(""); setEntryMax(""); pushInlineFilters({ entryMin: "", entryMax: "" }); }}>
            <p className="text-[12px] text-[#717171] mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>Entry fee range</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 flex items-center gap-1 bg-[#f7f7f7] border border-black/[0.08] rounded-xl px-3 py-2">
                <span className="text-[#717171] text-[13px]">$</span>
                <input type="number" placeholder="Min" value={entryMin}
                  onChange={(e) => setEntryMin(e.target.value)} onBlur={() => pushInlineFilters()}
                  className="bg-transparent outline-none text-[13px] text-[#1a1a1a] w-full placeholder:text-[#b0b0b0]" />
              </div>
              <span className="text-[#717171] text-[13px]">–</span>
              <div className="flex-1 flex items-center gap-1 bg-[#f7f7f7] border border-black/[0.08] rounded-xl px-3 py-2">
                <span className="text-[#717171] text-[13px]">$</span>
                <input type="number" placeholder="Max" value={entryMax}
                  onChange={(e) => setEntryMax(e.target.value)} onBlur={() => pushInlineFilters()}
                  className="bg-transparent outline-none text-[13px] text-[#1a1a1a] w-full placeholder:text-[#b0b0b0]" />
              </div>
            </div>
          </Dropdown>

          {/* Interest Rate */}
          <Dropdown label={rateLabel} active={rateActive}
            onClear={() => { setRateMin(""); setRateMax(""); pushInlineFilters({ rateMin: "", rateMax: "" }); }}>
            <p className="text-[12px] text-[#717171] mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>Interest rate range</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 flex items-center gap-1 bg-[#f7f7f7] border border-black/[0.08] rounded-xl px-3 py-2">
                <span className="text-[#717171] text-[13px]">%</span>
                <input type="number" placeholder="Min" value={rateMin} step="0.1"
                  onChange={(e) => setRateMin(e.target.value)} onBlur={() => pushInlineFilters()}
                  className="bg-transparent outline-none text-[13px] text-[#1a1a1a] w-full placeholder:text-[#b0b0b0]" />
              </div>
              <span className="text-[#717171] text-[13px]">–</span>
              <div className="flex-1 flex items-center gap-1 bg-[#f7f7f7] border border-black/[0.08] rounded-xl px-3 py-2">
                <span className="text-[#717171] text-[13px]">%</span>
                <input type="number" placeholder="Max" value={rateMax} step="0.1"
                  onChange={(e) => setRateMax(e.target.value)} onBlur={() => pushInlineFilters()}
                  className="bg-transparent outline-none text-[13px] text-[#1a1a1a] w-full placeholder:text-[#b0b0b0]" />
              </div>
            </div>
          </Dropdown>

          {/* All filters icon */}
          <button
            onClick={() => setPanelOpen(true)}
            className={["flex items-center justify-center w-10 h-10 rounded-full border transition-all shrink-0",
              activeFilterCount > 0
                ? "bg-[#ff5a5f]/10 border-[#ff5a5f] text-[#ff5a5f]"
                : "bg-white border-black/[0.10] text-[#1a1a1a] hover:border-black/20"].join(" ")}
            title="More filters"
          >
            {activeFilterCount > 0 ? (
              <span className="text-[12px] font-bold">{activeFilterCount}</span>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h18M6 10h12M10 15h4" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {panelOpen && (
        <FilterPanel
          values={panelFilters}
          onChange={onPanelFiltersChange}
          onApply={onApplyPanel}
          onClose={() => setPanelOpen(false)}
        />
      )}
    </>
  );
}
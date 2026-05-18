const DEAL_TYPES = [
  "Subto",
  "Hybrid",
  "Seller Finance",
  "Cash",
  "Novation",
  "Rent To Own",
  "Stack",
];

const EXIT_STRATEGIES = [
  "LTR",
  "MTR",
  "STR",
  "Wrap",
  "Co-living",
  "Homestead",
  "Tax Depreciation",
  "Lease Option",
  "Sober Living / Assisted Living",
  "Fix and Flip",
  "BRRRR",
];

export default function FilterPanel({ values, onChange, onApply, onClose }) {
  const {
    dealTypes = [],
    exitStrategies = [],
    monthlyMin = 0,
    monthlyMax = 5000,
    furnished = "any",
    pool = "any",
    multiUnit = "any",
  } = values;

  const set = (key, val) => onChange({ ...values, [key]: val });

  const toggleDealType = (val) => {
    const updated = dealTypes.includes(val)
      ? dealTypes.filter((v) => v !== val)
      : [...dealTypes, val];
    set("dealTypes", updated);
  };

  const toggleExit = (val) => {
    const updated = exitStrategies.includes(val)
      ? exitStrategies.filter((v) => v !== val)
      : [...exitStrategies, val];
    set("exitStrategies", updated);
  };

  const handleReset = () => {
    onChange({
      dealTypes: [],
      exitStrategies: [],
      monthlyMin: 0,
      monthlyMax: 5000,
      furnished: "any",
      pool: "any",
      multiUnit: "any",
    });
  };

  const handleApply = () => {
    const filters = {};
    if (dealTypes.length > 0) filters.dealTypes = dealTypes;
    if (exitStrategies.length > 0) filters.exitStrategies = exitStrategies;
    if (monthlyMin > 0) filters.monthlyMin = monthlyMin;
    if (monthlyMax < 5000) filters.monthlyMax = monthlyMax;
    if (furnished !== "any") filters.furnished = furnished;
    if (pool !== "any") filters.hasPool = pool;
    if (multiUnit !== "any") filters.multiUnit = multiUnit;
    onApply(filters);
    onClose();
  };

  const fillLeft = `${(monthlyMin / 5000) * 100}%`;
  const fillRight = `${((5000 - monthlyMax) / 5000) * 100}%`;
  const BAR_HEIGHTS = [60, 30, 45, 55, 40, 50, 35, 48, 42, 38, 52, 30, 28, 45, 32, 20, 38, 15, 25, 30];
  const maxBar = Math.max(...BAR_HEIGHTS);

  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-50" onClick={onClose} />
      <div
        className="fixed top-0 right-0 h-full w-full max-w-[480px] bg-white z-50 overflow-y-auto"
        style={{ fontFamily: "'DM Sans', sans-serif", boxShadow: "-8px 0 32px rgba(0,0,0,0.12)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 pt-8 pb-6 border-b border-black/[0.08]">
          <h2 className="text-[22px] text-[#1a1a1a]" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
            Filters
          </h2>
          <button onClick={onClose} className="text-[#717171] hover:text-[#1a1a1a] transition-colors p-1">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-8 py-6 flex flex-col gap-8">

          {/* Deal Type */}
          <div>
            <p className="text-[15px] font-medium text-[#1a1a1a] mb-1">Deal type</p>
            <p className="text-[13px] text-[#717171] mb-3">Select one or more specific deal types</p>
            <div className="flex flex-wrap gap-2">
              {DEAL_TYPES.map((val) => {
                const active = dealTypes.includes(val);
                return (
                  <button
                    key={val}
                    onClick={() => toggleDealType(val)}
                    className={[
                      "px-5 py-2 rounded-full border text-[14px] transition-all",
                      active
                        ? "bg-[#ff5a5f]/10 border-[#ff5a5f] text-[#ff5a5f]"
                        : "bg-white border-black/[0.08] text-[#1a1a1a] hover:border-[#ff5a5f]/40",
                    ].join(" ")}
                  >
                    {val}
                  </button>
                );
              })}
            </div>
          </div>

          <hr className="border-black/[0.06]" />

          {/* Exit Strategy */}
          <div>
            <p className="text-[15px] font-medium text-[#1a1a1a] mb-1">Exit strategy</p>
            <p className="text-[13px] text-[#717171] mb-3">Select one or more — stacks with deal type filter</p>
            <div className="flex flex-wrap gap-2">
              {EXIT_STRATEGIES.map((val) => {
                const active = exitStrategies.includes(val);
                return (
                  <button
                    key={val}
                    onClick={() => toggleExit(val)}
                    className={[
                      "px-5 py-2 rounded-full border text-[14px] transition-all",
                      active
                        ? "bg-[#ff5a5f]/10 border-[#ff5a5f] text-[#ff5a5f]"
                        : "bg-white border-black/[0.08] text-[#1a1a1a] hover:border-[#ff5a5f]/40",
                    ].join(" ")}
                  >
                    {val}
                  </button>
                );
              })}
            </div>
          </div>

          <hr className="border-black/[0.06]" />

          {/* Monthly Payment */}
          <div>
            <p className="text-[15px] font-medium text-[#1a1a1a] mb-3">Monthly payment</p>
            <div className="flex justify-between text-[13px] text-[#717171] mb-2">
              <span>$0</span><span>$5K+</span>
            </div>
            <div className="flex items-end gap-[3px] h-10 mb-2">
              {BAR_HEIGHTS.map((h, i) => (
                <div key={i} className="flex-1 rounded-t-sm"
                  style={{ height: `${(h / maxBar) * 100}%`, background: "#ff5a5f", opacity: 0.4, minHeight: "4px" }} />
              ))}
            </div>
            <div className="relative h-1.5 bg-black/[0.08] rounded-full mb-4 mx-2">
              <div className="absolute top-0 h-full bg-[#ff5a5f] rounded-full pointer-events-none"
                style={{ left: fillLeft, right: fillRight }} />
              <div className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white border-2 border-[#ff5a5f] pointer-events-none"
                style={{ left: `calc(${fillLeft} - 10px)` }} />
              <div className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white border-2 border-[#ff5a5f] pointer-events-none"
                style={{ right: `calc(${fillRight} - 10px)` }} />
              <input type="range" min="0" max="5000" step="100" value={monthlyMin}
                onChange={(e) => set("monthlyMin", Math.min(parseInt(e.target.value), monthlyMax - 100))}
                className="absolute inset-0 w-full opacity-0 cursor-pointer h-full" style={{ zIndex: 3 }} />
              <input type="range" min="0" max="5000" step="100" value={monthlyMax}
                onChange={(e) => set("monthlyMax", Math.max(parseInt(e.target.value), monthlyMin + 100))}
                className="absolute inset-0 w-full opacity-0 cursor-pointer h-full" style={{ zIndex: 4 }} />
            </div>
            <div className="flex items-center gap-3">
              <input type="number" step="100" placeholder="Min"
                value={monthlyMin === 0 ? "" : monthlyMin}
                onChange={(e) => set("monthlyMin", Math.min(parseInt(e.target.value) || 0, monthlyMax - 100))}
                className="flex-1 bg-[#f7f7f7] border border-black/[0.08] rounded-xl px-4 py-3 text-[14px] text-[#1a1a1a] placeholder:text-[#b0b0b0] outline-none" />
              <span className="text-[#717171]">–</span>
              <input type="number" step="100" placeholder="Max"
                value={monthlyMax === 5000 ? "" : monthlyMax}
                onChange={(e) => set("monthlyMax", Math.max(parseInt(e.target.value) || 5000, monthlyMin + 100))}
                className="flex-1 bg-[#f7f7f7] border border-black/[0.08] rounded-xl px-4 py-3 text-[14px] text-[#1a1a1a] placeholder:text-[#b0b0b0] outline-none" />
            </div>
          </div>

          <hr className="border-black/[0.06]" />

          <ToggleRow label="Furnished" value={furnished} onChange={(v) => set("furnished", v)} />
          <ToggleRow label="Pool" value={pool} onChange={(v) => set("pool", v)} />
          <ToggleRow label="Multi-unit" value={multiUnit} onChange={(v) => set("multiUnit", v)} />

        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-black/[0.08] px-8 py-5 flex items-center gap-4">
          <button onClick={handleReset}
            className="text-[14px] font-medium text-[#717171] hover:text-[#1a1a1a] underline transition-colors">
            Reset all
          </button>
          <button onClick={handleApply}
            className="flex-1 bg-[#ff5a5f] text-white text-[15px] font-bold py-3.5 rounded-2xl shadow-[0_4px_6px_rgba(255,90,95,0.25)] hover:bg-[#e0484d] transition-all active:scale-95">
            Apply filters
          </button>
        </div>
      </div>
    </>
  );
}

function ToggleRow({ label, value, onChange }) {
  return (
    <div>
      <p className="text-[15px] font-medium text-[#1a1a1a] mb-3">{label}</p>
      <div className="flex gap-2">
        {["any", "Yes", "No"].map((v) => (
          <button key={v} onClick={() => onChange(v)}
            className={["px-6 py-2 rounded-full border text-[14px] transition-all",
              value === v
                ? "bg-[#ff5a5f]/10 border-[#ff5a5f] text-[#ff5a5f]"
                : "bg-white border-black/[0.08] text-[#1a1a1a] hover:border-[#ff5a5f]/40"].join(" ")}>
            {v === "any" ? "Any" : v}
          </button>
        ))}
      </div>
    </div>
  );
}
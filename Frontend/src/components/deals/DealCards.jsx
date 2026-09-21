import {
  Bookmark,
  Heart,
  Target,
  ArrowRight,
  MapPin,
  Bed,
  Bath,
  Ruler,
  Lock,
} from "lucide-react";
import { ImageWithFallback } from "../public/ImageWithFallback";
import { palette, dealTypeColors } from "../public/theme";
const { sand, card, text, coral, blush, muted, line } = palette;
function DealTypeBadge({ type, className = "" }) {
  const c = dealTypeColors[type] || { bg: sand, fg: muted };
  return (
    <span
      style={{ background: c.bg, color: c.fg }}
      className={`rounded-full px-2.5 py-1 text-[11px] ${className}`}
    >
      {type}
    </span>
  );
}
function SaveBtn({ loggedIn, saved, onSave, floating }) {
  const active = loggedIn && saved;
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onSave();
      }}
      style={
        floating
          ? {
              background: "rgba(255,255,255,0.92)",
              color: active ? coral : muted,
            }
          : { background: active ? blush : sand, color: active ? coral : muted }
      }
      className="w-9 h-9 rounded-full grid place-items-center shrink-0 transition-colors hover:text-[#ff5a5f]"
      aria-label={saved ? "Unsave deal" : "Save deal"}
      aria-pressed={Boolean(saved)}
      title={loggedIn ? "Save deal" : "Sign up to save"}
    >
      {loggedIn ? (
        <Heart size={16} fill={active ? coral : "none"} />
      ) : (
        <Bookmark size={16} />
      )}
    </button>
  );
}
function ScorePill({ n, className = "" }) {
  if (n == null) return null;
  return (
    <span
      style={{ background: coral, color: "#fff" }}
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] ${className}`}
    >
      <Target size={12} /> {n}
    </span>
  );
}
function Stat({ label, value }) {
  return (
    <div>
      <p className="text-[11px]" style={{ color: muted }}>
        {label}
      </p>
      <p
        className="text-[14px] leading-tight mt-0.5"
        style={{ fontWeight: 600, color: text }}
      >
        {value}
      </p>
    </div>
  );
}
function LockedScore({ onGate, className = "" }) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onGate();
      }}
      style={{ background: "rgba(38,33,28,0.55)", color: "#fff" }}
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] backdrop-blur-sm ${className}`}
      title="Sign up to see your match score"
    >
      <Lock size={11} /> Match Score
    </button>
  );
}
function GridCard({ d, loggedIn, saved, onSave, onView }) {
  return (
    <div
      style={{ background: card, borderColor: line }}
      className="rounded-[1.25rem] border shadow-sm overflow-hidden flex flex-col"
    >
      <div className="relative aspect-[16/10] bg-[#e9e2d7]">
        <ImageWithFallback
          src={d.image}
          alt={d.name}
          className="w-full h-full object-cover"
        />
        <DealTypeBadge type={d.dealType} className="absolute top-3 left-3" />
        <div className="absolute top-3 right-3">
          <SaveBtn loggedIn={loggedIn} saved={saved} onSave={onSave} floating />
        </div>
        {loggedIn ? (
          <ScorePill n={d.matchScore} className="absolute bottom-3 left-3" />
        ) : (
          <LockedScore onGate={onSave} className="absolute bottom-3 left-3" />
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h4 className="text-[16px]" style={{ fontWeight: 600, color: text }}>
          {d.name}
        </h4>
        <p
          className="mt-0.5 inline-flex items-center gap-1 text-[12px]"
          style={{ color: muted }}
        >
          <MapPin size={12} /> {d.location}
        </p>
        <p
          className="mt-2 text-[20px]"
          style={{ fontWeight: 600, color: coral }}
        >
          {d.price}
        </p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <Stat label="Monthly Payment" value={d.monthlyPayment} />
          <Stat label="Entry Fee" value={d.entryFee} />
        </div>
        <div
          className="mt-3 flex items-center gap-4 text-[12px]"
          style={{ color: muted }}
        >
          <span className="inline-flex items-center gap-1">
            <Bed size={13} />
            {d.beds}
          </span>
          <span className="inline-flex items-center gap-1">
            <Bath size={13} />
            {d.baths}
          </span>
          <span className="inline-flex items-center gap-1">
            <Ruler size={13} />
            {d.sqft}
          </span>
        </div>
        <div className="mt-4 flex flex-col gap-2">
          <button
            onClick={onView}
            style={{ background: coral }}
            className="group w-full inline-flex items-center justify-center gap-1.5 text-white rounded-full py-2.5 text-[13px]"
          >
            View Details{" "}
            <ArrowRight
              size={15}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </button>
          <button
            onClick={onSave}
            style={{
              background: saved ? blush : sand,
              color: saved ? coral : text,
            }}
            className="w-full inline-flex items-center justify-center gap-1.5 rounded-full py-2.5 text-[13px] hover:brightness-95 transition"
          >
            {loggedIn ? (
              <>
                <Heart size={14} fill={saved ? coral : "none"} />{" "}
                {saved ? "Saved" : "Save Deal"}
              </>
            ) : (
              <>
                <Bookmark size={14} /> Sign Up to Save
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
function CompactCard({ d, loggedIn, saved, onSave, onView }) {
  return (
    <div
      onClick={onView}
      onKeyDown={(e) => {
        if (
          e.target === e.currentTarget &&
          (e.key === "Enter" || e.key === " ")
        ) {
          e.preventDefault();
          onView();
        }
      }}
      role="button"
      tabIndex={0}
      style={{ background: card, borderColor: line }}
      className="text-left rounded-[1rem] border shadow-sm overflow-hidden flex flex-col cursor-pointer"
    >
      <div className="relative aspect-[16/11] bg-[#e9e2d7]">
        <ImageWithFallback
          src={d.image}
          alt={d.name}
          className="w-full h-full object-cover"
        />
        <DealTypeBadge type={d.dealType} className="absolute top-2 left-2" />
        <div className="absolute top-2 right-2">
          <SaveBtn loggedIn={loggedIn} saved={saved} onSave={onSave} floating />
        </div>
        {loggedIn && (
          <ScorePill n={d.matchScore} className="absolute bottom-2 left-2" />
        )}
      </div>
      <div className="p-3 flex flex-col flex-1">
        <h4
          className="text-[14px] leading-tight truncate"
          style={{ fontWeight: 600, color: text }}
        >
          {d.name}
        </h4>
        <p className="mt-0.5 text-[11px] truncate" style={{ color: muted }}>
          {d.location}
        </p>
        <p
          className="mt-2 text-[15px]"
          style={{ fontWeight: 600, color: coral }}
        >
          {d.price}
        </p>
      </div>
    </div>
  );
}
function ListRow({ d, loggedIn, saved, onSave, onView }) {
  return (
    <div
      style={{ background: card, borderColor: line }}
      className="rounded-[1.25rem] border shadow-sm overflow-hidden flex flex-col sm:flex-row"
    >
      <div className="relative sm:w-52 shrink-0 aspect-[16/10] sm:aspect-auto bg-[#e9e2d7]">
        <ImageWithFallback
          src={d.image}
          alt={d.name}
          className="w-full h-full object-cover"
        />
        <DealTypeBadge type={d.dealType} className="absolute top-3 left-3" />
      </div>
      <div className="flex-1 p-4 flex flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h4
              className="text-[16px]"
              style={{ fontWeight: 600, color: text }}
            >
              {d.name}
            </h4>
            <p
              className="mt-0.5 inline-flex items-center gap-1 text-[12px]"
              style={{ color: muted }}
            >
              <MapPin size={12} /> {d.location}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {loggedIn && d.matchScore != null && (
              <span
                style={{ background: blush, color: coral }}
                className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[12px]"
              >
                <Target size={13} /> {d.matchScore ?? "\u2014"}
              </span>
            )}
            <SaveBtn loggedIn={loggedIn} saved={saved} onSave={onSave} />
          </div>
        </div>
        <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Stat label={d.priceLabel} value={d.price} />
          <Stat label="Monthly Payment" value={d.monthlyPayment} />
          <Stat label="Entry Fee" value={d.entryFee} />
          <Stat label="Interest Rate" value={d.interestRate} />
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2 pt-1">
          <button
            onClick={onView}
            style={{ background: coral }}
            className="group inline-flex items-center gap-1.5 text-white rounded-full px-4 py-2 text-[13px]"
          >
            View Details{" "}
            <ArrowRight
              size={15}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </button>
          <button
            onClick={onSave}
            style={{
              background: saved ? blush : sand,
              color: saved ? coral : text,
            }}
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] hover:brightness-95 transition"
          >
            {loggedIn ? (
              <>
                <Heart size={14} fill={saved ? coral : "none"} />{" "}
                {saved ? "Saved" : "Save Deal"}
              </>
            ) : (
              <>
                <Bookmark size={14} /> Sign Up to Save
              </>
            )}
          </button>
          <span
            className="ml-auto inline-flex items-center gap-3 text-[12px]"
            style={{ color: muted }}
          >
            <span className="inline-flex items-center gap-1">
              <Bed size={13} />
              {d.beds}
            </span>
            <span className="inline-flex items-center gap-1">
              <Bath size={13} />
              {d.baths}
            </span>
            <span className="inline-flex items-center gap-1">
              <Ruler size={13} />
              {d.sqft}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
function MapListCard({ d, loggedIn, saved, onSave, active, onHover, onView }) {
  return (
    <div
      id={`property-${d.id}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (
          e.target === e.currentTarget &&
          (e.key === "Enter" || e.key === " ")
        ) {
          e.preventDefault();
          onView();
        }
      }}
      onFocus={() => onHover(d.id)}
      onMouseEnter={() => onHover(d.id)}
      onMouseLeave={() => onHover(void 0)}
      onClick={onView}
      style={{ background: card, borderColor: active ? coral : line }}
      className="rounded-[1.25rem] border shadow-sm overflow-hidden flex transition-colors cursor-pointer"
    >
      <div className="relative w-32 shrink-0 bg-[#e9e2d7]">
        <ImageWithFallback
          src={d.image}
          alt={d.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 p-3 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h4
            className="text-[14px] leading-tight truncate"
            style={{ fontWeight: 600, color: text }}
          >
            {d.name}
          </h4>
          <SaveBtn loggedIn={loggedIn} saved={saved} onSave={onSave} />
        </div>
        <p className="mt-0.5 text-[11px] truncate" style={{ color: muted }}>
          {d.location}
        </p>
        <div className="mt-1.5 flex items-center gap-2">
          <DealTypeBadge type={d.dealType} />
          {loggedIn && d.matchScore != null && (
            <span
              style={{ color: coral }}
              className="inline-flex items-center gap-0.5 text-[12px]"
            >
              <Target size={12} /> {d.matchScore ?? "\u2014"}
            </span>
          )}
        </div>
        <p
          className="mt-1.5 text-[16px]"
          style={{ fontWeight: 600, color: coral }}
        >
          {d.price}
        </p>
      </div>
    </div>
  );
}
function TableView({ deals, loggedIn, favs, onSaveFor, onViewDeal, onGate }) {
  const cols = [
    "Property",
    "Location",
    "Deal Type",
    "Price / Entry Fee",
    "Entry Fee",
    "Monthly",
    "Interest",
    "Match",
    "",
  ];
  return (
    <div
      style={{ background: card, borderColor: line }}
      className="rounded-[1.25rem] border shadow-sm overflow-hidden"
    >
      <div className="overflow-x-auto">
        <table
          className="w-full border-collapse text-[13px]"
          style={{ color: text }}
        >
          <thead>
            <tr style={{ background: sand }}>
              {cols.map((c, i) => (
                <th
                  key={i}
                  style={{ borderColor: line, color: muted }}
                  className="text-left px-4 py-3 border-b whitespace-nowrap"
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {deals.map((d) => {
              const dt = dealTypeColors[d.dealType] || { bg: sand, fg: muted };
              const saved = favs.has(d.id);
              return (
                <tr
                  key={d.id}
                  onClick={() => onViewDeal(d)}
                  className="hover:bg-[#f6f1ea] transition-colors cursor-pointer"
                >
                  <td
                    style={{ borderColor: line }}
                    className="px-4 py-2.5 border-b"
                  >
                    <div className="flex items-center gap-3 min-w-[220px]">
                      <ImageWithFallback
                        src={d.image}
                        alt={d.name}
                        className="w-10 h-10 rounded-lg object-cover bg-[#e9e2d7] shrink-0"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onViewDeal(d);
                        }}
                        style={{ fontWeight: 600 }}
                        className="text-left"
                      >
                        {d.name}
                      </button>
                    </div>
                  </td>
                  <td
                    style={{ borderColor: line, color: muted }}
                    className="px-4 py-2.5 border-b whitespace-nowrap"
                  >
                    {d.location}
                  </td>
                  <td
                    style={{ borderColor: line }}
                    className="px-4 py-2.5 border-b whitespace-nowrap"
                  >
                    <span
                      style={{ background: dt.bg, color: dt.fg }}
                      className="rounded-full px-2.5 py-1 text-[11px]"
                    >
                      {d.dealType}
                    </span>
                  </td>
                  <td
                    style={{ borderColor: line, color: coral, fontWeight: 600 }}
                    className="px-4 py-2.5 border-b whitespace-nowrap"
                  >
                    {d.price}
                  </td>
                  <td
                    style={{ borderColor: line }}
                    className="px-4 py-2.5 border-b whitespace-nowrap"
                  >
                    {d.entryFee}
                  </td>
                  <td
                    style={{ borderColor: line }}
                    className="px-4 py-2.5 border-b whitespace-nowrap"
                  >
                    {d.monthlyPayment}
                  </td>
                  <td
                    style={{ borderColor: line }}
                    className="px-4 py-2.5 border-b whitespace-nowrap"
                  >
                    {d.interestRate}
                  </td>
                  <td
                    style={{ borderColor: line }}
                    className="px-4 py-2.5 border-b whitespace-nowrap"
                  >
                    {loggedIn ? (
                      <span
                        style={{ color: coral }}
                        className="inline-flex items-center gap-1"
                      >
                        <Target size={13} /> {d.matchScore ?? "\u2014"}
                      </span>
                    ) : (
                      <LockedScore onGate={onGate} />
                    )}
                  </td>
                  <td
                    style={{ borderColor: line }}
                    className="px-4 py-2.5 border-b"
                  >
                    <div className="flex items-center gap-1.5 justify-end">
                      <SaveBtn
                        loggedIn={loggedIn}
                        saved={saved}
                        onSave={onSaveFor(d.id)}
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onViewDeal(d);
                        }}
                        style={{ background: coral }}
                        className="inline-flex items-center gap-1 text-white rounded-full px-3 py-1.5 text-[12px] whitespace-nowrap"
                      >
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export {
  CompactCard,
  DealTypeBadge,
  GridCard,
  ListRow,
  MapListCard,
  TableView,
};

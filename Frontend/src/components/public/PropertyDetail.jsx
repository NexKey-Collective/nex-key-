import { lazy, Suspense, useState } from "react";
import { Link } from "react-router-dom";
import { useSavedDeals } from "../../hooks/useSavedDeals";
const DealsMap = lazy(() => import("../deals/DealsMap"));
import {
  ArrowLeft,
  MapPin,
  Bed,
  Bath,
  Ruler,
  Bookmark,
  Heart,
  Lock,
  Sparkles,
  Check,
  Target,
  ChevronDown,
  Home,
  Wallet,
  Landmark,
  Handshake,
  FileText,
} from "lucide-react";
import { ImageWithFallback } from "./ImageWithFallback";
import { palette, sans, dealTypeColors } from "./theme";
const { sand, card, text, coral, blush, muted, line } = palette;
const money = (n) => (n == null ? "\u2014" : "$" + Number(n).toLocaleString());
const value = (n) => (n == null || n === "" ? "\u2014" : String(n));
const galleryFor = (d) => [d.image].filter(Boolean);
function buildInvestmentSections(d) {
  const r = d.raw;
  const rows = (items) =>
    items.map(([label, value2]) => ({ label, value: value2 }));
  return {
    propertyInfo: rows([
      ["Deal Type", value(r.dealType)],
      ["Full Address", value(r.fullAddress || r.address)],
      ["City", value(r.city)],
      ["State", value(r.state)],
      ["Zip Code", value(r.zipCode)],
      ["Bedrooms", value(r.bedCount)],
      ["Bathrooms", value(r.bathCount)],
      ["HOA Restrictions", value(r.hoaRestrictions)],
      ["Multi-unit", value(r.multiUnit)],
      ["Furnished", value(r.furnished)],
      ["Has Pool", value(r.hasPool)],
    ]),
    financial: rows([
      ["Entry Fee", money(r.entryFee)],
      ["Assignment Fee", money(r.assignmentFee)],
      ["Total Monthly Payment", money(r.totalMonthlyPayment)],
      ["Loan Rate", d.interestRate],
    ]),
    loan: rows([
      ["Loan Rate", d.interestRate],
      ["PITI", money(r.pitiLoan)],
      ["Total Monthly Payment", money(r.totalMonthlyPayment)],
    ]),
    carryback: [],
    notes:
      r.notes || "Additional notes have not been provided for this listing.",
  };
}
function InvestmentRows({ rows }) {
  return (
    <div className="grid sm:grid-cols-2 gap-x-8">
      {rows.map((r) => (
        <div
          key={r.label}
          className="flex items-center justify-between gap-4 py-2.5 border-b"
          style={{ borderColor: line }}
        >
          <span className="text-[14px]" style={{ color: muted }}>
            {r.label}
          </span>
          <span
            className="text-[14px] text-right"
            style={{ fontWeight: 600, color: text }}
          >
            {r.value}
          </span>
        </div>
      ))}
    </div>
  );
}
function AccordionCard({ title, Icon, defaultOpen, children }) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div
      style={{ background: card, borderColor: line }}
      className="rounded-[1.5rem] border shadow-sm overflow-hidden"
    >
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-3 p-6 text-left"
      >
        <span className="flex items-center gap-3">
          <span
            style={{ background: blush, color: coral }}
            className="w-9 h-9 rounded-xl grid place-items-center shrink-0"
          >
            <Icon size={16} />
          </span>
          <span
            className="text-[17px]"
            style={{ fontWeight: 600, color: text }}
          >
            {title}
          </span>
        </span>
        <ChevronDown
          size={18}
          style={{ color: muted }}
          className={
            open ? "rotate-180 transition-transform" : "transition-transform"
          }
        />
      </button>
      {open && <div className="px-6 pb-6">{children}</div>}
    </div>
  );
}
function DetailRow({ label, value: value2 }) {
  return (
    <div
      className="flex items-center justify-between py-2.5"
      style={{ borderColor: line }}
    >
      <span className="text-[14px]" style={{ color: muted }}>
        {label}
      </span>
      <span className="text-[14px]" style={{ fontWeight: 600, color: text }}>
        {value2}
      </span>
    </div>
  );
}
function LockedCard({ title, blurb, onGate }) {
  return (
    <div
      style={{ background: card, borderColor: line }}
      className="rounded-[1.5rem] border shadow-sm p-6 relative overflow-hidden"
    >
      <div className="flex items-center gap-2">
        <span
          style={{ background: blush, color: coral }}
          className="w-9 h-9 rounded-xl grid place-items-center"
        >
          <Lock size={16} />
        </span>
        <h3 className="text-[17px]" style={{ fontWeight: 600, color: text }}>
          {title}
        </h3>
      </div>
      <p className="mt-3 text-[14px] leading-relaxed" style={{ color: muted }}>
        {blurb}
      </p>
      <button
        onClick={onGate}
        style={{ background: coral }}
        className="mt-4 inline-flex items-center gap-1.5 text-white rounded-full px-5 py-2.5 text-[13px]"
      >
        <Sparkles size={15} /> Unlock with a free account
      </button>
    </div>
  );
}
function PublicPropertyDetail({ deal, loggedIn, onBack, onGate }) {
  const gallery = galleryFor(deal);
  const inv = buildInvestmentSections(deal);
  const [active, setActive] = useState(0);
  const { saved: savedIds, toggle, error: saveError } = useSavedDeals();
  const saved = savedIds.has(deal.id);
  const dt = dealTypeColors[deal.dealType] || { bg: sand, fg: muted };
  const onSave = () => {
    if (!loggedIn) {
      onGate();
      return;
    }
    toggle(deal.id);
  };
  return (
    <div
      style={{ background: sand, color: text, ...sans }}
      className="public-site min-h-screen pb-28"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <button
          onClick={onBack}
          style={{ background: card, color: text, borderColor: line }}
          className="inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-[13px] shadow-sm hover:brightness-95 transition"
        >
          <ArrowLeft size={15} /> Back to Buy Deals
        </button>
        {/* Gallery */}
        <div
          className={
            gallery.length > 1
              ? "mt-5 grid lg:grid-cols-[1.6fr_1fr] gap-3"
              : "mt-5 max-w-4xl"
          }
        >
          <div className="relative rounded-[1.5rem] overflow-hidden bg-[#e9e2d7] aspect-[16/10]">
            <ImageWithFallback
              src={gallery[active]}
              alt={deal.name}
              className="w-full h-full object-cover"
            />
            <span
              style={{ background: dt.bg, color: dt.fg }}
              className="absolute top-4 left-4 rounded-full px-3 py-1 text-[12px]"
            >
              {deal.dealType}
            </span>
          </div>
          {gallery.length > 1 && (
            <div className="grid grid-cols-4 lg:grid-cols-2 gap-3">
              {gallery.slice(0, 4).map((g, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  style={{ borderColor: active === i ? coral : "transparent" }}
                  className="relative rounded-[1rem] overflow-hidden bg-[#e9e2d7] aspect-[4/3] border-2"
                >
                  <ImageWithFallback
                    src={g}
                    alt={`View ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
        {/* Header */}
        <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1
              className="text-[clamp(1.7rem,3vw,2.4rem)] leading-tight"
              style={{ fontWeight: 600 }}
            >
              {deal.name}
            </h1>
            <p
              className="mt-1.5 inline-flex items-center gap-1.5 text-[15px]"
              style={{ color: muted }}
            >
              <MapPin size={16} /> {deal.location}
            </p>
            <div
              className="mt-3 flex items-center gap-5 text-[14px]"
              style={{ color: muted }}
            >
              <span className="inline-flex items-center gap-1.5">
                <Bed size={16} /> {deal.beds} Beds
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Bath size={16} /> {deal.baths} Baths
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Ruler size={16} /> {deal.sqft} sqft
              </span>
            </div>
          </div>
          <div className="text-right">
            {loggedIn && deal.matchScore != null && (
              <span
                style={{ background: coral, color: "#fff" }}
                className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-[12px] mb-2"
              >
                <Target size={13} /> {deal.matchScore} Match
              </span>
            )}
            <p className="text-[13px]" style={{ color: muted }}>
              Entry Fee
            </p>
            <p
              className="text-[clamp(1.8rem,3.5vw,2.6rem)] leading-none"
              style={{ fontWeight: 600, color: coral }}
            >
              {deal.price}
            </p>
          </div>
        </div>
        {/* Body */}
        <div className="mt-6 grid lg:grid-cols-[1.6fr_1fr] gap-4 items-start">
          <div className="space-y-4">
            {/* Description */}
            <div
              style={{ background: card, borderColor: line }}
              className="rounded-[1.5rem] border shadow-sm p-6"
            >
              <h3 className="text-[17px]" style={{ fontWeight: 600 }}>
                About this property
              </h3>
              <p
                className="mt-3 text-[15px] leading-relaxed"
                style={{ color: muted }}
              >
                {deal.raw.description ||
                  "Review the property information and investment terms below. Contact the team for additional details about this opportunity."}
              </p>
              <ul className="mt-4 grid sm:grid-cols-2 gap-2.5">
                {(deal.raw.exitStrategies || []).map((v) => (
                  <li
                    key={v}
                    className="flex items-center gap-2 text-[14px]"
                    style={{ color: text }}
                  >
                    <span
                      style={{ background: blush, color: coral }}
                      className="w-6 h-6 rounded-full grid place-items-center shrink-0"
                    >
                      <Check size={13} />
                    </span>
                    {v}
                  </li>
                ))}
              </ul>
            </div>
            {/* Property details */}
            <div
              style={{ background: card, borderColor: line }}
              className="rounded-[1.5rem] border shadow-sm p-6"
            >
              <h3 className="text-[17px] mb-1" style={{ fontWeight: 600 }}>
                Property details
              </h3>
              <div
                className="grid sm:grid-cols-2 gap-x-8 divide-y sm:divide-y-0"
                style={{ borderColor: line }}
              >
                {[
                  { label: "Bedrooms", value: value(deal.raw.bedCount) },
                  { label: "Bathrooms", value: value(deal.raw.bathCount) },
                  { label: "Furnished", value: value(deal.raw.furnished) },
                  { label: "Pool", value: value(deal.raw.hasPool) },
                  { label: "Multi-unit", value: value(deal.raw.multiUnit) },
                  { label: "COE Date", value: value(deal.raw.coeDate) },
                ].map((s) => (
                  <DetailRow key={s.label} label={s.label} value={s.value} />
                ))}
              </div>
            </div>
            {/* Location */}
            <div
              style={{ background: card, borderColor: line }}
              className="rounded-[1.5rem] border shadow-sm p-6"
            >
              <h3 className="text-[17px]" style={{ fontWeight: 600 }}>
                Location
              </h3>
              <p
                className="mt-1.5 inline-flex items-center gap-1.5 text-[14px]"
                style={{ color: muted }}
              >
                <MapPin size={15} /> {deal.location}
              </p>
              <div className="mt-4">
                <Suspense fallback={<p>Loading map…</p>}>
                  <DealsMap
                    deals={[
                      { ...deal, address: deal.name, city: deal.location },
                    ]}
                    selected={deal.id}
                    onSelect={() => {}}
                    hideSearch
                  />
                </Suspense>
              </div>
            </div>
          </div>
          {/* Right rail */}
          <div className="space-y-4 lg:sticky lg:top-24">
            {/* Basic investment info */}
            <div
              style={{ background: card, borderColor: line }}
              className="rounded-[1.5rem] border shadow-sm p-6"
            >
              <h3 className="text-[17px]" style={{ fontWeight: 600 }}>
                Investment snapshot
              </h3>
              <div className="mt-3 divide-y" style={{ borderColor: line }}>
                <DetailRow label="Deal Type" value={deal.dealType} />
                <DetailRow label="Entry Fee" value={deal.entryFee} />
                <DetailRow
                  label="Monthly Payment"
                  value={deal.monthlyPayment}
                />
                <DetailRow label="Interest Rate" value={deal.interestRate} />
              </div>
              <button
                onClick={onSave}
                style={{
                  background: saved ? blush : sand,
                  color: saved ? coral : text,
                }}
                className="mt-4 w-full inline-flex items-center justify-center gap-1.5 rounded-full py-2.5 text-[13px] hover:brightness-95 transition"
              >
                {loggedIn ? (
                  <>
                    <Heart size={15} fill={saved ? coral : "none"} />{" "}
                    {saved ? "Saved" : "Save Deal"}
                  </>
                ) : (
                  <>
                    <Bookmark size={15} /> Sign Up to Save
                  </>
                )}
              </button>
            </div>
            {saveError && (
              <p role="alert" className="text-red-700 text-sm">
                {saveError}
              </p>
            )}
            <div
              style={{ background: card, borderColor: line }}
              className="rounded-[1.5rem] border shadow-sm p-6"
            >
              <h2 className="text-[17px] font-semibold">Your next step</h2>
              <p className="mt-2 text-sm" style={{ color: muted }}>
                Set your investment criteria and explore opportunities that fit
                your goals.
              </p>
              {loggedIn ? (
                <Link
                  to="/my-buy-box"
                  className="mt-4 flex justify-center rounded-full bg-brand text-white py-3 text-sm"
                >
                  My Buy Box
                </Link>
              ) : (
                <button
                  onClick={onGate}
                  className="mt-4 w-full rounded-full bg-brand text-white py-3 text-sm"
                >
                  Create Free Account
                </button>
              )}
              {/^https?:\/\//.test(deal.raw.googleDriveStorage || "") && (
                <a
                  href={deal.raw.googleDriveStorage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex items-center justify-center gap-2 rounded-full bg-[#f6f1ea] py-3 text-sm"
                >
                  <FileText size={16} /> View Documents
                </a>
              )}
            </div>
          </div>
        </div>
        {/* Investment Details — collapsible cards appended below the property info */}
        <div className="mt-8">
          <h2
            className="text-[clamp(1.3rem,2.4vw,1.7rem)] leading-tight"
            style={{ fontWeight: 600 }}
          >
            Investment Details
          </h2>
          <p className="mt-1.5 text-[14px]" style={{ color: muted }}>
            Full property, financial, loan, and carryback breakdown.
          </p>
          <div className="mt-4 space-y-3">
            <AccordionCard title="Property Information" Icon={Home} defaultOpen>
              <InvestmentRows rows={inv.propertyInfo} />
            </AccordionCard>
            <AccordionCard title="Financial Overview" Icon={Wallet}>
              <InvestmentRows rows={inv.financial} />
            </AccordionCard>
            <AccordionCard title="Loan Details" Icon={Landmark}>
              <InvestmentRows rows={inv.loan} />
            </AccordionCard>
            <AccordionCard title="Carryback Details" Icon={Handshake}>
              {inv.carryback.length ? (
                <InvestmentRows rows={inv.carryback} />
              ) : (
                <p className="text-sm" style={{ color: muted }}>
                  Carryback terms have not been provided for this listing.
                </p>
              )}
            </AccordionCard>
            <AccordionCard title="Notes" Icon={FileText}>
              <p
                className="text-[14px] leading-relaxed"
                style={{ color: muted }}
              >
                {inv.notes}
              </p>
            </AccordionCard>
          </div>
        </div>
      </div>
      {/* Sticky CTA (guests only) */}
      {!loggedIn && (
        <div className="fixed bottom-0 inset-x-0 z-40 px-4 pb-4">
          <div
            style={{ background: coral }}
            className="max-w-4xl mx-auto rounded-full shadow-2xl px-5 sm:px-7 py-3.5 flex items-center justify-between gap-3 text-white"
          >
            <p className="text-[14px] sm:text-[15px] min-w-0 truncate">
              <span style={{ fontWeight: 600 }}>Unlock the full deal.</span>
              <span className="hidden sm:inline">
                {" "}
                Save deals and define your investment criteria.
              </span>
            </p>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={onGate}
                style={{ background: "#fff", color: coral }}
                className="rounded-full px-5 py-2.5 text-[14px]"
              >
                Sign Up
              </button>
              <Link
                to="/login"
                className="rounded-full px-4 py-2.5 text-[14px] border border-white/50"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export { PublicPropertyDetail };

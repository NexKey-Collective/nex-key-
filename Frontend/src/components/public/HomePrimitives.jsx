import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { palette } from "./theme";
const { sand, card, text, coral, blush, muted, line } = palette;
function Pill({ children }) {
  return (
    <span
      style={{ background: blush, color: coral }}
      className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px]"
    >
      {children}
    </span>
  );
}
function SectionHead({ eyebrow, title, sub, center }) {
  return (
    <div className={center ? "text-center max-w-2xl mx-auto" : "max-w-2xl"}>
      {eyebrow && (
        <p
          className="text-[13px] uppercase tracking-wider"
          style={{ color: coral, fontWeight: 600 }}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className="mt-2 text-[clamp(1.7rem,3.2vw,2.4rem)] leading-tight"
        style={{ fontWeight: 600, color: text }}
      >
        {title}
      </h2>
      {sub && (
        <p
          className="mt-3 text-[16px] leading-relaxed"
          style={{ color: muted }}
        >
          {sub}
        </p>
      )}
    </div>
  );
}
function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{ background: card, borderColor: line }}
      className="rounded-[1.25rem] border shadow-sm overflow-hidden"
    >
      <button
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="text-[16px]" style={{ fontWeight: 600, color: text }}>
          {q}
        </span>
        <span
          style={{
            background: open ? coral : sand,
            color: open ? "#fff" : coral,
          }}
          className="w-8 h-8 rounded-full grid place-items-center shrink-0 transition-colors"
        >
          {open ? <Minus size={16} /> : <Plus size={16} />}
        </span>
      </button>
      {open && (
        <p
          className="px-5 pb-5 -mt-1 text-[15px] leading-relaxed"
          style={{ color: muted }}
        >
          {a}
        </p>
      )}
    </div>
  );
}
export { FaqItem, Pill, SectionHead };

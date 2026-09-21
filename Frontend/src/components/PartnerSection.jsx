import {
  ArrowRight,
  Sparkles,
  Coins,
  LineChart,
  Handshake,
  ShieldCheck,
  Network,
} from "lucide-react";
import { palette } from "./public/theme";
import { PARTNER_BENEFITS } from "./public/content";
import { SectionHead } from "./public/HomePrimitives";
import { usePublicSite } from "./public/PublicSiteContext";
const { sand, card, text, coral, blush, muted, line } = palette;
const featureIcons = [Sparkles, Coins, LineChart];
const benefitIcons = [Handshake, ShieldCheck, Network, LineChart];
function PartnerSection() {
  const { loggedIn, onBrowseDeals, onGate } = usePublicSite();
  const ctaPrimary = loggedIn ? "My Buy Box" : "Create Free Account";
  const ctaStart = loggedIn ? "My Buy Box" : "Get Started";
  return (
    <section
      id="partner"
      className="scroll-mt-32 max-w-6xl mx-auto px-4 sm:px-6 py-14"
    >
      <SectionHead
        eyebrow="Partner With NexKey"
        title="A partnership designed around your success"
        center
      />
      <div className="mt-8 grid sm:grid-cols-2 gap-4">
        {PARTNER_BENEFITS.map((b, i) => {
          const Icon = benefitIcons[i % benefitIcons.length];
          return (
            <div
              key={b.title}
              style={{ background: card, borderColor: line }}
              className="rounded-[1.5rem] border shadow-sm p-6 flex gap-4"
            >
              <span
                style={{ background: blush, color: coral }}
                className="w-12 h-12 rounded-2xl grid place-items-center shrink-0"
              >
                <Icon size={22} />
              </span>
              <div>
                <h3 className="text-[18px]" style={{ fontWeight: 600 }}>
                  {b.title}
                </h3>
                <p
                  className="mt-1.5 text-[15px] leading-relaxed"
                  style={{ color: muted }}
                >
                  {b.body}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-6 flex justify-center">
        <button
          onClick={onGate}
          style={{ background: coral }}
          className="group inline-flex items-center gap-2 text-white rounded-full px-7 py-3.5 text-[15px]"
        >
          {loggedIn ? "My Buy Box" : "Become a Partner"}{" "}
          <ArrowRight
            size={17}
            className="transition-transform group-hover:translate-x-1"
          />
        </button>
      </div>
    </section>
  );
}
export { PartnerSection as default };

import {
  Sparkles,
  Coins,
  LineChart,
  Handshake,
  ShieldCheck,
  Network,
} from "lucide-react";
import { palette } from "./public/theme";
import { FEATURES } from "./public/content";
import { SectionHead } from "./public/HomePrimitives";
import { usePublicSite } from "./public/PublicSiteContext";
const { sand, card, text, coral, blush, muted, line } = palette;
const featureIcons = [Sparkles, Coins, LineChart];
const benefitIcons = [Handshake, ShieldCheck, Network, LineChart];
function WhyChooseSection() {
  const { loggedIn, onBrowseDeals, onGate } = usePublicSite();
  const ctaPrimary = loggedIn ? "My Buy Box" : "Create Free Account";
  const ctaStart = loggedIn ? "My Buy Box" : "Get Started";
  return (
    <section
      id="why"
      className="scroll-mt-32 max-w-6xl mx-auto px-4 sm:px-6 py-14"
    >
      <SectionHead
        eyebrow="Why Choose NexKey"
        title="Everything you need to invest with confidence"
        center
      />
      <div className="mt-8 grid md:grid-cols-3 gap-4">
        {FEATURES.map((f, i) => {
          const Icon = featureIcons[i];
          return (
            <div
              key={f.title}
              style={{ background: i === 1 ? sand : card, borderColor: line }}
              className="rounded-[1.75rem] border shadow-sm p-7"
            >
              <span
                style={{ background: blush, color: coral }}
                className="w-14 h-14 rounded-2xl grid place-items-center"
              >
                <Icon size={24} />
              </span>
              <h3 className="mt-5 text-[20px]" style={{ fontWeight: 600 }}>
                {f.title}
              </h3>
              <p
                className="mt-2 text-[15px] leading-relaxed"
                style={{ color: muted }}
              >
                {f.body}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
export { WhyChooseSection as default };

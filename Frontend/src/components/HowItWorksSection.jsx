import {
  Sparkles,
  Coins,
  LineChart,
  Handshake,
  ShieldCheck,
  Network,
} from "lucide-react";
import { palette } from "./public/theme";
import { STEPS } from "./public/content";
import { SectionHead } from "./public/HomePrimitives";
import { usePublicSite } from "./public/PublicSiteContext";
const { sand, card, text, coral, blush, muted, line } = palette;
const featureIcons = [Sparkles, Coins, LineChart];
const benefitIcons = [Handshake, ShieldCheck, Network, LineChart];
function HowItWorksSection() {
  const { loggedIn, onBrowseDeals, onGate } = usePublicSite();
  const ctaPrimary = loggedIn ? "My Buy Box" : "Create Free Account";
  const ctaStart = loggedIn ? "My Buy Box" : "Get Started";
  return (
    <section
      id="how"
      className="scroll-mt-32 max-w-6xl mx-auto px-4 sm:px-6 py-14"
    >
      <div
        style={{ background: sand }}
        className="rounded-[2.5rem] p-8 md:p-12"
      >
        <SectionHead
          eyebrow="How Partnership Works"
          title="From sign-up to closing in three steps"
          center
        />
        <div className="mt-10 grid md:grid-cols-3 gap-8">
          {STEPS.map((s) => (
            <div key={s.n} className="text-center">
              <span
                style={{ background: coral }}
                className="mx-auto w-16 h-16 rounded-full grid place-items-center text-[22px] text-white"
              >
                {s.n}
              </span>
              <h3 className="mt-5 text-[19px]" style={{ fontWeight: 600 }}>
                {s.title}
              </h3>
              <p
                className="mt-2 text-[15px] leading-relaxed"
                style={{ color: muted }}
              >
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export { HowItWorksSection as default };

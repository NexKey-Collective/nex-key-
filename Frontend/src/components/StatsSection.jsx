import {
  Sparkles,
  Coins,
  LineChart,
  Handshake,
  ShieldCheck,
  Network,
} from "lucide-react";
import { palette } from "./public/theme";
import { STATS, PARTNER_STATS } from "./public/content";
import { usePublicSite } from "./public/PublicSiteContext";
const { sand, card, text, coral, blush, muted, line } = palette;
const featureIcons = [Sparkles, Coins, LineChart];
const benefitIcons = [Handshake, ShieldCheck, Network, LineChart];
function StatsSection() {
  const { loggedIn, onBrowseDeals, onGate } = usePublicSite();
  const ctaPrimary = loggedIn ? "My Buy Box" : "Create Free Account";
  const ctaStart = loggedIn ? "My Buy Box" : "Get Started";
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
      <div
        style={{ background: coral }}
        className="rounded-[2.5rem] px-6 sm:px-10 py-12 text-white"
      >
        <h2
          className="text-center text-[clamp(1.6rem,3vw,2.2rem)]"
          style={{ fontWeight: 600 }}
        >
          Proven results at scale
        </h2>
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[...STATS.slice(0, 2), ...PARTNER_STATS.slice(0, 2)].map((s) => (
            <div key={s.label} className="text-center">
              <p
                className="text-[clamp(1.8rem,4vw,2.8rem)] leading-none"
                style={{ fontWeight: 600 }}
              >
                {s.value}
              </p>
              <p
                className="mt-2 text-[13px]"
                style={{ color: "rgba(255,255,255,0.85)" }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export { StatsSection as default };

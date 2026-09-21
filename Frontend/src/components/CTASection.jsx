import {
  Sparkles,
  Coins,
  LineChart,
  Handshake,
  ShieldCheck,
  Network,
} from "lucide-react";
import { palette } from "./public/theme";
import { usePublicSite } from "./public/PublicSiteContext";
const { sand, card, text, coral, blush, muted, line } = palette;
const featureIcons = [Sparkles, Coins, LineChart];
const benefitIcons = [Handshake, ShieldCheck, Network, LineChart];
function CTASection() {
  const { loggedIn, onBrowseDeals, onGate } = usePublicSite();
  const ctaPrimary = loggedIn ? "My Buy Box" : "Create Free Account";
  const ctaStart = loggedIn ? "My Buy Box" : "Get Started";
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
      <div
        style={{ background: coral }}
        className="rounded-[2.5rem] px-8 py-16 text-center text-white"
      >
        <h2
          className="text-[clamp(2rem,4vw,3.2rem)] leading-tight max-w-2xl mx-auto"
          style={{ fontWeight: 600 }}
        >
          Start building your real estate portfolio today
        </h2>
        <p
          className="mt-4 text-[16px] max-w-xl mx-auto"
          style={{ color: "rgba(255,255,255,0.9)" }}
        >
          Join 5,000+ investors sourcing vetted, off-market deals on NexKey.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={onGate}
            style={{ background: "#fff", color: coral }}
            className="rounded-full px-7 py-4 text-[15px]"
          >
            {ctaPrimary}
          </button>
          <button
            onClick={onBrowseDeals}
            className="rounded-full px-7 py-4 text-[15px] border border-white/50"
          >
            Browse Deals
          </button>
        </div>
      </div>
    </section>
  );
}
export { CTASection as default };

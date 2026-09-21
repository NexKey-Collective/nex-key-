import { ImageWithFallback } from "./public/ImageWithFallback";
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
import { HERO, STATS, HERO_IMAGE } from "./public/content";
import { Pill } from "./public/HomePrimitives";
import { usePublicSite } from "./public/PublicSiteContext";
const { sand, card, text, coral, blush, muted, line } = palette;
const featureIcons = [Sparkles, Coins, LineChart];
const benefitIcons = [Handshake, ShieldCheck, Network, LineChart];
function HeroSection() {
  const { loggedIn, onBrowseDeals, onGate } = usePublicSite();
  const ctaPrimary = loggedIn ? "My Buy Box" : "Create Free Account";
  const ctaStart = loggedIn ? "My Buy Box" : "Get Started";
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-6">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-center">
        <div>
          <Pill>
            <Sparkles size={14} /> {HERO.eyebrow}
          </Pill>
          <h1
            className="mt-5 text-[clamp(2.4rem,5vw,4rem)] leading-[1.05] tracking-tight"
            style={{ fontWeight: 600 }}
          >
            Premium real estate,{" "}
            <span style={{ color: coral }}>made simple.</span>
          </h1>
          <p
            className="mt-5 max-w-lg text-[17px] leading-relaxed"
            style={{ color: muted }}
          >
            {HERO.subtitle}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <button
              onClick={onBrowseDeals}
              style={{ background: coral }}
              className="group inline-flex items-center gap-2 text-white rounded-full px-7 py-3.5 text-[15px]"
            >
              {HERO.primaryCta}{" "}
              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
            <button
              onClick={onGate}
              style={{ background: sand, color: text }}
              className="rounded-full px-7 py-3.5 text-[15px]"
            >
              {ctaPrimary}
            </button>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
            {STATS.slice(0, 3).map((s) => (
              <div key={s.label}>
                <p
                  className="text-[clamp(1.4rem,2.6vw,2rem)] leading-none"
                  style={{ fontWeight: 600, color: coral }}
                >
                  {s.value}
                </p>
                <p className="mt-1 text-[13px]" style={{ color: muted }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative rounded-[2rem] overflow-hidden bg-[#e9e2d7] aspect-[4/3] lg:aspect-[5/6]">
          <ImageWithFallback
            src={HERO_IMAGE}
            alt="Warm modern home"
            className="w-full h-full object-cover"
          />
          <div
            style={{ background: "rgba(255,255,255,0.94)" }}
            className="absolute bottom-4 left-4 right-4 rounded-2xl px-4 py-3 flex items-center gap-3 shadow-lg"
          >
            <span
              style={{ background: blush, color: coral }}
              className="w-10 h-10 rounded-full grid place-items-center"
            >
              <LineChart size={18} />
            </span>
            <div>
              <p className="text-[12px]" style={{ color: muted }}>
                Your next investment
              </p>
              <p className="text-[16px]" style={{ fontWeight: 600 }}>
                Explore available properties
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export { HeroSection as default };

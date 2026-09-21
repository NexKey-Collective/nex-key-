import { ImageWithFallback } from "./public/ImageWithFallback";
import {
  Sparkles,
  Coins,
  LineChart,
  Check,
  Handshake,
  ShieldCheck,
  Network,
} from "lucide-react";
import { palette } from "./public/theme";
import { ABOUT } from "./public/content";
import { SectionHead } from "./public/HomePrimitives";
import { usePublicSite } from "./public/PublicSiteContext";
const { sand, card, text, coral, blush, muted, line } = palette;
const featureIcons = [Sparkles, Coins, LineChart];
const benefitIcons = [Handshake, ShieldCheck, Network, LineChart];
function AboutSection() {
  const { loggedIn, onBrowseDeals, onGate } = usePublicSite();
  const ctaPrimary = loggedIn ? "My Buy Box" : "Create Free Account";
  const ctaStart = loggedIn ? "My Buy Box" : "Get Started";
  return (
    <section
      id="about"
      className="scroll-mt-32 max-w-6xl mx-auto px-4 sm:px-6 py-14"
    >
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div className="relative rounded-[2rem] overflow-hidden bg-[#e9e2d7] aspect-[4/3]">
          <ImageWithFallback
            src={ABOUT.image}
            alt="Modern home interior"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <SectionHead
            eyebrow={ABOUT.eyebrow}
            title={ABOUT.title}
            sub={ABOUT.body}
          />
          <ul className="mt-6 space-y-3">
            {ABOUT.points.map((p) => (
              <li
                key={p}
                className="flex items-start gap-3 text-[15px]"
                style={{ color: text }}
              >
                <span
                  style={{ background: blush, color: coral }}
                  className="w-7 h-7 rounded-full grid place-items-center shrink-0"
                >
                  <Check size={15} />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
export { AboutSection as default };

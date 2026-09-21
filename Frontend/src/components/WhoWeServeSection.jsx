import {
  Sparkles,
  Coins,
  LineChart,
  Users,
  Handshake,
  ShieldCheck,
  Network,
} from "lucide-react";
import { palette } from "./public/theme";
import { AUDIENCES } from "./public/content";
import { SectionHead } from "./public/HomePrimitives";
import { usePublicSite } from "./public/PublicSiteContext";
const { sand, card, text, coral, blush, muted, line } = palette;
const featureIcons = [Sparkles, Coins, LineChart];
const benefitIcons = [Handshake, ShieldCheck, Network, LineChart];
function WhoWeServeSection() {
  const { loggedIn, onBrowseDeals, onGate } = usePublicSite();
  const ctaPrimary = loggedIn ? "My Buy Box" : "Create Free Account";
  const ctaStart = loggedIn ? "My Buy Box" : "Get Started";
  return (
    <section
      id="serve"
      className="scroll-mt-32 max-w-6xl mx-auto px-4 sm:px-6 py-14"
    >
      <SectionHead
        eyebrow="Who We Serve"
        title="Built for everyone in the deal"
        center
      />
      <div className="mt-8 grid md:grid-cols-3 gap-4">
        {AUDIENCES.map((a) => (
          <div
            key={a.title}
            style={{ background: card, borderColor: line }}
            className="rounded-[1.75rem] border shadow-sm p-7"
          >
            <span
              style={{ background: blush, color: coral }}
              className="w-12 h-12 rounded-2xl grid place-items-center"
            >
              <Users size={22} />
            </span>
            <h3 className="mt-4 text-[20px]" style={{ fontWeight: 600 }}>
              {a.title}
            </h3>
            <p
              className="mt-2 text-[15px] leading-relaxed"
              style={{ color: muted }}
            >
              {a.body}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {a.points.map((pt) => (
                <span
                  key={pt}
                  style={{ background: sand, color: text }}
                  className="rounded-full px-3 py-1 text-[12px]"
                >
                  {pt}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
export { WhoWeServeSection as default };

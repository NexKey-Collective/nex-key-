import { ImageWithFallback } from "./public/ImageWithFallback";
import {
  Sparkles,
  Coins,
  LineChart,
  Star,
  Quote,
  Handshake,
  ShieldCheck,
  Network,
} from "lucide-react";
import { palette } from "./public/theme";
import { AFFILIATES } from "./public/content";
import { SectionHead } from "./public/HomePrimitives";
import { usePublicSite } from "./public/PublicSiteContext";
const { sand, card, text, coral, blush, muted, line } = palette;
const featureIcons = [Sparkles, Coins, LineChart];
const benefitIcons = [Handshake, ShieldCheck, Network, LineChart];
function TestimonialsSection() {
  const { loggedIn, onBrowseDeals, onGate } = usePublicSite();
  const ctaPrimary = loggedIn ? "My Buy Box" : "Create Free Account";
  const ctaStart = loggedIn ? "My Buy Box" : "Get Started";
  return (
    <section
      id="testimonials"
      className="scroll-mt-32 max-w-6xl mx-auto px-4 sm:px-6 py-14"
    >
      <SectionHead eyebrow="Testimonials" title="Loved by our network" center />
      <div className="mt-8 grid md:grid-cols-3 gap-4">
        {AFFILIATES.map((a) => (
          <figure
            key={a.id}
            style={{ background: card, borderColor: line }}
            className="rounded-[1.75rem] border shadow-sm p-7"
          >
            <Quote size={26} style={{ color: coral }} />
            <blockquote className="mt-3 text-[16px] leading-relaxed">
              “{a.quote}”
            </blockquote>
            <div className="mt-4 flex gap-0.5" style={{ color: coral }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={14} fill={coral} />
              ))}
            </div>
            <figcaption className="mt-5 flex items-center gap-3">
              <ImageWithFallback
                src={a.image}
                alt={a.name}
                className="w-11 h-11 rounded-full object-cover bg-[#e9e2d7]"
              />
              <div>
                <p className="text-[15px]" style={{ fontWeight: 600 }}>
                  {a.name}
                </p>
                <p className="text-[13px]" style={{ color: muted }}>
                  {a.role}
                </p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
export { TestimonialsSection as default };

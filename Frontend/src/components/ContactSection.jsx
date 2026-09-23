import {
  Sparkles,
  Coins,
  LineChart,
  Mail,
  Phone,
  Clock,
  Handshake,
  ShieldCheck,
  Network,
} from "lucide-react";
import { palette } from "./public/theme";
import { CONTACT } from "./public/content";
import { SectionHead } from "./public/HomePrimitives";
import { usePublicSite } from "./public/PublicSiteContext";
const { sand, card, text, coral, blush, muted, line } = palette;
const featureIcons = [Sparkles, Coins, LineChart];
const benefitIcons = [Handshake, ShieldCheck, Network, LineChart];
function ContactSection() {
  const { loggedIn, onBrowseDeals, onGate } = usePublicSite();
  const ctaPrimary = loggedIn ? "My Buy Box" : "Create Free Account";
  const ctaStart = loggedIn ? "My Buy Box" : "Get Started";
  return (
    <section
      id="contact"
      className="scroll-mt-32 max-w-6xl mx-auto px-4 sm:px-6 py-14"
    >
      <div
        style={{ background: sand }}
        className="rounded-[2.5rem] p-8 md:p-12 grid lg:grid-cols-2 gap-8 items-center"
      >
        <div>
          <SectionHead
            eyebrow={CONTACT.eyebrow}
            title={CONTACT.title}
            sub={CONTACT.body}
          />
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={onGate}
              style={{ background: coral }}
              className="inline-flex items-center gap-2 text-white rounded-full px-7 py-3.5 text-[15px]"
            >
              {ctaStart}
            </button>
            <button
              onClick={onBrowseDeals}
              style={{ background: card, color: text, borderColor: line }}
              className="inline-flex items-center gap-2 rounded-full border px-7 py-3.5 text-[15px]"
            >
              Browse Deals
            </button>
          </div>
        </div>
        <div className="grid gap-3">
          {[
            { Icon: Mail, label: "Email", value: CONTACT.email },
            { Icon: Phone, label: CONTACT.phoneLabel, value: CONTACT.phone },
            { Icon: Clock, label: "Hours", value: CONTACT.hours },
          ].map(({ Icon, label, value }) => (
            <div
              key={label}
              style={{ background: card, borderColor: line }}
              className="rounded-[1.25rem] border shadow-sm p-5 flex items-center gap-4"
            >
              <span
                style={{ background: blush, color: coral }}
                className="w-12 h-12 rounded-2xl grid place-items-center shrink-0"
              >
                <Icon size={20} />
              </span>
              <div>
                <p className="text-[13px]" style={{ color: muted }}>
                  {label}
                </p>
                <p className="text-[16px]" style={{ fontWeight: 600 }}>
                  {value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export { ContactSection as default };

import { Link } from "react-router-dom";
import { Mail, Phone, Clock } from "lucide-react";
import { palette } from "./public/theme";
import { CONTACT } from "./public/content";
import { usePublicSite } from "./public/PublicSiteContext";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";

const { line, muted, text, sand } = palette;

const EXPLORE_LINKS = [
  { label: "Home", to: "/" },
  { label: "Buy Deals", to: "/deals" },
  { label: "My Buy Box", to: "/my-buy-box" },
  { label: "About NexKey", to: "/#about" },
];

const COMPANY_LINKS = [
  { label: "Why Choose NexKey", to: "/#why" },
  { label: "Who We Serve", to: "/#serve" },
  { label: "How Partnership Works", to: "/#how" },
  { label: "FAQ", to: "/#faq" },
];

function FooterLink({ to, onClick, children }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="text-[13px] hover:text-brand transition-colors"
      style={{ color: muted }}
    >
      {children}
    </Link>
  );
}

function Footer() {
  const { user } = useAuth();
  const { onGate } = usePublicSite();

  return (
    <footer style={{ borderColor: line, background: sand }} className="border-t">
      <div className="max-w-6xl mx-auto px-6 py-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
        {/* Brand */}
        <div className="flex flex-col gap-3 max-w-xs">
          <img src={logo} alt="NexKey Collective" className="h-7 w-auto" />
          <p className="text-[13px] leading-relaxed" style={{ color: muted }}>
            Premium real estate investment opportunities — off-market deals,
            creative financing, and data-driven insights.
          </p>
        </div>

        {/* Explore */}
        <div>
          <h3
            className="text-[12px] font-semibold uppercase tracking-wide mb-3"
            style={{ color: text }}
          >
            Explore
          </h3>
          <ul className="flex flex-col gap-2">
            {EXPLORE_LINKS.map((link) => (
              <li key={link.label}>
                <FooterLink
                  to={link.to}
                  onClick={(event) => {
                    if (link.to === "/my-buy-box" && !user) {
                      event.preventDefault();
                      onGate();
                    }
                  }}
                >
                  {link.label}
                </FooterLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3
            className="text-[12px] font-semibold uppercase tracking-wide mb-3"
            style={{ color: text }}
          >
            Company
          </h3>
          <ul className="flex flex-col gap-2">
            {COMPANY_LINKS.map((link) => (
              <li key={link.label}>
                <FooterLink to={link.to}>{link.label}</FooterLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3
            className="text-[12px] font-semibold uppercase tracking-wide mb-3"
            style={{ color: text }}
          >
            Contact
          </h3>
          <ul className="flex flex-col gap-2 text-[13px]" style={{ color: muted }}>
            <li className="flex items-center gap-2">
              <Mail size={14} className="shrink-0" />
              <a
                href={`mailto:${CONTACT.email}`}
                className="hover:text-brand transition-colors"
              >
                {CONTACT.email}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={14} className="shrink-0" />
              <span>{CONTACT.phone}</span>
            </li>
            <li className="flex items-center gap-2">
              <Clock size={14} className="shrink-0" />
              <span>{CONTACT.hours}</span>
            </li>
          </ul>
        </div>
      </div>

      <div style={{ borderColor: line }} className="border-t">
        <div
          className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[12px]"
          style={{ color: muted }}
        >
          <span>
            © {new Date().getFullYear()} NexKey Collective. All rights
            reserved.
          </span>
          <span>Strategic real estate investment.</span>
        </div>
      </div>
    </footer>
  );
}
export { Footer as default };

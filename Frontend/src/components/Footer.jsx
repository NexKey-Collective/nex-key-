import { Link } from "react-router-dom";
import { palette } from "./public/theme";
import logo from "../assets/logo.png";

const { line, muted } = palette;

const FOOTER_LINKS = [
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Terms of Service", to: "/terms" },
  { label: "Contact", to: "/#contact" },
];

function Footer() {
  return (
    <footer style={{ borderColor: line }} className="border-t bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-[64px] flex items-center justify-between">
        <Link to="/" className="flex items-center shrink-0">
          <img src={logo} alt="NexKey Collective" className="h-7 w-auto" />
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="text-[13px] font-medium hover:text-brand transition-colors"
              style={{ color: muted }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <span className="text-[13px] shrink-0" style={{ color: muted }}>
          © {new Date().getFullYear()} NexKey Collective
        </span>
      </div>
    </footer>
  );
}
export { Footer as default };

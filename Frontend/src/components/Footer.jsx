import { Link } from "react-router-dom";
import { palette } from "./public/theme";
import { usePublicSite } from "./public/PublicSiteContext";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";

const { line, muted } = palette;

const EXPLORE_LINKS = [
  { label: "Home", to: "/" },
  { label: "Buy Deals", to: "/deals" },
  { label: "My Buy Box", to: "/my-buy-box" },
  { label: "About NexKey", to: "/#about" },
];

function Footer() {
  const { user } = useAuth();
  const { onGate } = usePublicSite();

  return (
    <footer style={{ borderColor: line }} className="border-t bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-[64px] flex items-center justify-between">
        <Link to="/" className="flex items-center shrink-0">
          <img src={logo} alt="NexKey Collective" className="h-7 w-auto" />
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {EXPLORE_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              onClick={(event) => {
                if (link.to === "/my-buy-box" && !user) {
                  event.preventDefault();
                  onGate();
                }
              }}
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

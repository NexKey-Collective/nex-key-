import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { usePublicSite } from "./public/PublicSiteContext";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Buy Deals", to: "/deals" },
  { label: "My Buy Box", to: "/my-buy-box" },
  { label: "About NexKey", to: "/#about" },
];

export default function Header() {
  const { onGate } = usePublicSite();
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleAuthClick = async () => {
    if (user) {
      await logout();
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  return (
    <header className="bg-white/85 backdrop-blur-md border-b border-[#ece5db] sticky top-0 z-50 font-['DM_Sans']">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-[64px] flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center shrink-0">
          <img src={logo} alt="NexKey Collective" className="h-9 w-auto" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.to === "/"
                ? location.pathname === "/"
                : location.pathname === link.to ||
                  (link.to === "/deals" &&
                    location.pathname.startsWith("/deals/"));
            return (
              <Link
                key={link.label}
                to={link.to}
                onClick={(event) => {
                  if (link.to === "/my-buy-box" && !user) {
                    event.preventDefault();
                    onGate();
                  }
                }}
                className={[
                  "text-[14px] font-medium px-4 py-2 rounded-full transition-colors",
                  isActive
                    ? "bg-[#f6f1ea] text-[#26211c]"
                    : "text-[#8a8175] hover:text-[#26211c]",
                ].join(" ")}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-6">
          <button
            onClick={handleAuthClick}
            className="text-[14px] font-medium text-dark hover:text-brand transition-colors"
          >
            {user ? "Sign Out" : "Log In"}
          </button>
          {!user && (
            <Link
              to="/login?mode=signup"
              className="bg-brand text-white text-[15px] font-semibold px-6 py-2.5 rounded-full hover:bg-brand-dark transition-all duration-200 active:scale-95"
            >
              Sign Up
            </Link>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-text-body"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="text-[14px] font-medium text-text-muted"
              onClick={(event) => { setMenuOpen(false); if (link.to === "/my-buy-box" && !user) { event.preventDefault(); onGate(); } }}
            >
              {link.label}
            </Link>
          ))}
          <hr className="border-gray-100" />
          <button
            onClick={handleAuthClick}
            className="text-left text-[14px] font-medium text-dark"
          >
            {user ? "Sign Out" : "Log In"}
          </button>
          {!user && (
            <Link
              to="/login?mode=signup"
              className="bg-brand text-white text-[15px] font-semibold px-6 py-3 rounded-full text-center"
            >
              Sign Up
            </Link>
          )}
        </div>
      )}
    </header>
  );
}

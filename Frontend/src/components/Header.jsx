import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Buy Deals", to: "/deals" },
  { label: "My Buy Box", to: "/my-buy-box" },
  { label: "About NexKey", to: "/#about" },
];

export default function Header() {
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
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <span className="w-9 h-9 rounded-full bg-brand text-white font-bold text-[18px] flex items-center justify-center">
            N
          </span>
          <span className="text-[19px] font-bold text-dark tracking-tight">
            NextKey Collective
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.to === "/"
                ? location.pathname === "/"
                : location.pathname === link.to;
            return (
              <Link
                key={link.label}
                to={link.to}
                className={[
                  "text-[15px] font-medium px-4 py-2 rounded-full transition-colors",
                  isActive
                    ? "bg-[#f4f1ea] text-dark"
                    : "text-text-muted hover:text-text-body",
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
            className="text-[15px] font-medium text-dark hover:text-brand transition-colors"
          >
            {user ? "Sign Out" : "Log In"}
          </button>
          {!user && (
            <Link
              to="/login"
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
              className="text-[15px] font-medium text-text-muted"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <hr className="border-gray-100" />
          <button
            onClick={handleAuthClick}
            className="text-left text-[15px] font-medium text-dark"
          >
            {user ? "Sign Out" : "Log In"}
          </button>
          {!user && (
            <Link
              to="/login"
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
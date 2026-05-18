import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const logoUrl =
  "https://www.figma.com/api/mcp/asset/46534dde-dcc6-460c-90c8-9085a4d7b587";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

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
        <Link to="/" className="flex items-center shrink-0">
          <img
            src={logoUrl}
            alt="NexKey Collective"
            className="h-10 w-auto object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className="text-[15px] font-medium text-text-muted hover:text-text-body transition-colors"
          >
            Home
          </Link>
          <Link
            to="/deals"
            className="text-[15px] font-medium text-text-muted hover:text-text-body transition-colors"
          >
            Deals
          </Link>
          <Link
            to="/map"
            className="text-[15px] font-medium text-text-muted hover:text-text-body transition-colors"
          >
            Map
          </Link>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={handleAuthClick}
            className="flex items-center gap-2 text-[14px] font-semibold text-text-body hover:text-brand transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            {user ? "Sign Out" : "Sign In"}
          </button>
          {!user && (
            <Link
              to="/login"
              className="bg-brand text-white text-[14px] font-bold px-6 py-2.5 rounded-2xl shadow-[0_4px_6px_rgba(255,90,95,0.25)] hover:bg-brand-dark transition-all duration-200 active:scale-95"
            >
              Get Started
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
          <Link to="/" className="text-[15px] font-medium text-text-muted">
            Home
          </Link>
          <Link to="/deals" className="text-[15px] font-medium text-text-muted">
            Deals
          </Link>
          <Link to="/map" className="text-[15px] font-medium text-text-muted">
            Map
          </Link>
          <hr className="border-gray-100" />
          <button
            onClick={handleAuthClick}
            className="text-left text-[14px] font-semibold text-text-body"
          >
            {user ? "Sign Out" : "Sign In"}
          </button>
          {!user && (
            <Link
              to="/login"
              className="bg-brand text-white text-[14px] font-bold px-6 py-3 rounded-2xl text-center"
            >
              Get Started
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
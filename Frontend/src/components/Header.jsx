import { useState } from 'react'
import { Link } from 'react-router-dom'

const logoUrl = 'https://www.figma.com/api/mcp/asset/46534dde-dcc6-460c-90c8-9085a4d7b587'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center shrink-0">
          <img src={logoUrl} alt="NexKey Collective" className="h-10 w-auto object-contain" />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="relative text-[15px] font-medium text-brand after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-brand after:rounded-full">
            Home
          </a>
          <Link to="/deals" className="text-[15px] font-medium text-text-muted hover:text-text-body transition-colors">Deals</Link>
          <Link to="/map" className="text-[15px] font-medium text-text-muted hover:text-text-body transition-colors">Map</Link>
          <a href="#buybox" className="text-[15px] font-medium text-text-muted hover:text-text-body transition-colors">My Buy Box</a>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <button className="flex items-center gap-2 text-[14px] font-semibold text-text-body hover:text-brand transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Sign In
          </button>
          <button className="bg-brand text-white text-[14px] font-bold px-6 py-2.5 rounded-2xl shadow-[0_4px_6px_rgba(255,90,95,0.25)] hover:bg-brand-dark transition-all duration-200 active:scale-95">
            Get Started
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-text-body"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4">
          <a href="#" className="text-[15px] font-medium text-brand">Home</a>
          <Link to="/deals" className="text-[15px] font-medium text-text-muted">Deals</Link>
          <Link to="/map" className="text-[15px] font-medium text-text-muted">Map</Link>
          <a href="#buybox" className="text-[15px] font-medium text-text-muted">My Buy Box</a>
          <hr className="border-gray-100" />
          <button className="text-left text-[14px] font-semibold text-text-body">Sign In</button>
          <button className="bg-brand text-white text-[14px] font-bold px-6 py-3 rounded-2xl text-center">Get Started</button>
        </div>
      )}
    </header>
  )
}

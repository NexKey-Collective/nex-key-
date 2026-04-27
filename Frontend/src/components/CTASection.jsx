import { Link } from 'react-router-dom'
export default function CTASection() {
  return (
    <section className="bg-white py-24 px-6 border-t border-gray-100">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-[40px] lg:text-[48px] font-bold text-dark tracking-tight mb-4">
          Start Building Your Real Estate<br className="hidden sm:block" /> Portfolio Today
        </h2>
        <p className="text-text-muted text-[18px] max-w-xl mx-auto mb-10 leading-relaxed">
          Join thousands of investors who trust NexKey for premium deals, creative financing, and unmatched market intelligence.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button className="flex items-center gap-2 bg-brand text-white text-[18px] font-medium px-8 py-4 rounded-2xl shadow-[0_4px_6px_rgba(255,90,95,0.25)] hover:bg-brand-dark transition-all duration-200 active:scale-95">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Get Started Free
          </button>
          <Link to="/deals" className="flex items-center gap-2 border-2 border-brand text-brand text-[18px] font-medium px-8 py-4 rounded-2xl hover:bg-red-50 transition-all duration-200 active:scale-95">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            Explore Deals
          </Link>
        </div>

        <div className="flex items-center justify-center gap-2 text-text-muted text-[14px]">
          <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          No credit card required &bull; Full access to marketplace &bull; Cancel anytime
        </div>
      </div>
    </section>
  )
}

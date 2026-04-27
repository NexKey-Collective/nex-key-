import { Link } from 'react-router-dom'

const heroImageUrl = 'https://www.figma.com/api/mcp/asset/aaae204a-d8c7-4b28-ae61-895d50e9db84'

export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(153deg, #ff5a5f 0%, #ff4a4a 100%)' }}
    >
      <div className="max-w-7xl mx-auto px-6 py-20 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div className="flex flex-col gap-0">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 border border-white/30 rounded-full px-4 py-2 w-fit mb-8">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <span className="text-white text-[14px] font-semibold">Trusted by 5,000+ Investors</span>
            </div>

            {/* Heading */}
            <h1 className="text-[48px] lg:text-[52px] font-bold text-white leading-[1.1] tracking-tight mb-6">
              Premium Real Estate<br />Investment Opportunities
            </h1>

            {/* Subtext */}
            <p className="text-[18px] text-white/90 leading-relaxed mb-8 max-w-xl">
              Access exclusive off-market deals, creative financing solutions, and data-driven insights. Build wealth through strategic real estate investments.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-10">
              <Link to="/deals" className="flex items-center gap-2 bg-white text-brand text-[18px] font-medium px-8 py-4 rounded-2xl hover:bg-gray-50 transition-all duration-200 active:scale-95 shadow-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Browse Deals
              </Link>
              <button className="border-2 border-white text-white text-[18px] font-medium px-8 py-4 rounded-2xl hover:bg-white/10 transition-all duration-200 active:scale-95">
                Learn More
              </button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-6 border-t border-white/30">
              <div>
                <p className="text-[28px] font-bold text-white leading-tight">$125M+</p>
                <p className="text-[14px] text-white/80 mt-0.5">Transaction Volume</p>
              </div>
              <div>
                <p className="text-[28px] font-bold text-white leading-tight">850+</p>
                <p className="text-[14px] text-white/80 mt-0.5">Properties Closed</p>
              </div>
              <div>
                <p className="text-[28px] font-bold text-white leading-tight">14.2%</p>
                <p className="text-[14px] text-white/80 mt-0.5">Avg. Annual ROI</p>
              </div>
            </div>
          </div>

          {/* Right: Image */}
          <div className="relative hidden lg:block">
            <div
              className="relative rounded-3xl p-2"
              style={{ background: 'linear-gradient(140deg, rgba(255,90,95,0.2) 0%, transparent 100%)' }}
            >
              <img
                src={heroImageUrl}
                alt="Luxury property"
                className="w-full h-[480px] object-cover rounded-2xl shadow-2xl"
              />
            </div>

            {/* Floating stat card */}
            <div className="absolute -left-6 bottom-16 bg-white rounded-2xl shadow-2xl px-6 py-4 flex items-center gap-3 min-w-[200px]">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div>
                <p className="text-[12px] text-text-muted leading-tight">Monthly New Deals</p>
                <p className="text-[20px] font-bold text-dark leading-tight">42 Properties</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

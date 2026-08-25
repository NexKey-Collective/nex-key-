import { Link } from 'react-router-dom'

const heroImageUrl =
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80'

const stats = [
  { value: '$125M+', label: 'Transaction Volume' },
  { value: '850+', label: 'Properties Closed' },
  { value: '14.2%', label: 'Avg. Annual ROI' },
]

export default function HeroSection() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div className="flex flex-col gap-0">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 bg-red-50 text-brand rounded-full px-4 py-1.5 w-fit mb-6">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l1.9 5.8L20 9l-5.8 1.9L12 17l-1.9-6.1L4 9l6.1-1.2z" />
              </svg>
              <span className="text-[14px] font-semibold">Trusted by 5,000+ investors</span>
            </div>

            {/* Heading */}
            <h1 className="text-[52px] lg:text-[58px] font-bold text-dark leading-[1.05] tracking-tight mb-6">
              Premium real estate,{' '}
              <span className="text-brand">made simple.</span>
            </h1>

            {/* Subtext */}
            <p className="text-[18px] text-text-muted leading-relaxed mb-8 max-w-xl">
              Access exclusive off-market deals, creative financing solutions, and
              data-driven insights. Build lasting wealth through strategic real estate
              investments.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-10">
              <Link
                to="/deals"
                className="flex items-center gap-2 bg-brand text-white text-[16px] font-semibold px-7 py-3.5 rounded-full hover:bg-brand-dark transition-all duration-200 active:scale-95"
              >
                Browse Deals
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                to="/login"
                className="bg-[#f4f1ea] text-dark text-[16px] font-semibold px-7 py-3.5 rounded-full hover:bg-[#ece7db] transition-all duration-200 active:scale-95"
              >
                Create Free Account
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-10">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="text-[26px] font-bold text-brand leading-tight">{s.value}</p>
                  <p className="text-[14px] text-text-muted mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Image */}
          <div className="relative hidden lg:block">
            <img
              src={heroImageUrl}
              alt="Luxury property"
              className="w-full h-[560px] object-cover rounded-3xl shadow-xl"
            />

            {/* Overlay stat card */}
            <div className="absolute left-5 right-5 bottom-5 bg-white rounded-2xl shadow-xl px-5 py-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 17l6-6 4 4 8-8m0 0h-5m5 0v5" />
                </svg>
              </div>
              <div>
                <p className="text-[13px] text-text-muted leading-tight">Monthly new deals</p>
                <p className="text-[18px] font-bold text-dark leading-tight">42 Properties</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

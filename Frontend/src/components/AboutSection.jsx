const stats = [
  { value: '100+', label: 'Creative Finance Closings' },
  { value: 'All-in-One', label: 'Unified Platform' },
  { value: 'Tech-Forward', label: 'Modern Solutions' },
  { value: '24/7', label: 'Support Available' },
]

export default function AboutSection() {
  return (
    <section className="bg-white py-24 px-6 border-t border-gray-100">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        {/* Left: Content */}
        <div>
          <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 rounded-full px-4 py-1.5 mb-6">
            <svg className="w-4 h-4 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-brand text-[14px] font-semibold">About Us</span>
          </div>

          <h2 className="text-[36px] font-bold text-dark tracking-tight mb-6">About NexKey Collective</h2>

          <div className="flex flex-col gap-5 text-[16px] text-text-muted leading-relaxed mb-8">
            <p>
              NexKey unifies the real estate investing ecosystem — bringing together investors, wholesalers, and connectors on a single powerful platform. We make it easier to find, finance, and close the right deals.
            </p>
            <p>
              We help real estate investors close more of the right deals with the right terms. Whether you're hunting for cash flow, appreciation, or creative finance opportunities, NexKey has the tools and the team to make it happen.
            </p>
            <p>
              Stop bouncing from place to place. We're committed to building the most comprehensive real estate investment platform — one that saves you time, reduces risk, and maximizes returns on every transaction.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <button className="flex items-center gap-2 bg-brand text-white text-[18px] font-medium px-8 py-4 rounded-2xl shadow-[0_4px_6px_rgba(255,90,95,0.25)] hover:bg-brand-dark transition-all duration-200 active:scale-95">
              Learn More About Us
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button className="flex items-center gap-2 border-2 border-brand text-brand text-[18px] font-medium px-8 py-4 rounded-2xl hover:bg-red-50 transition-all duration-200 active:scale-95">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Join Our Community
            </button>
          </div>
        </div>

        {/* Right: Stat cards */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="card p-8 flex flex-col items-center justify-center text-center gap-2">
              <p className="text-[36px] lg:text-[40px] font-bold text-dark leading-tight">{s.value}</p>
              <p className="text-[15px] text-text-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

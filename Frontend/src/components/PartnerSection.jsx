const benefits = [
  {
    icon: (
      <svg className="w-7 h-7 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    title: 'Deal Flow That Fits',
    desc: 'Set your Buy Box once and receive matched, underwritten opportunities automatically — no more sifting through listings.',
  },
  {
    icon: (
      <svg className="w-7 h-7 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: 'Aligned Incentives',
    desc: 'We only succeed when you close. Our specialists guide financing, diligence, and negotiation end to end.',
  },
  {
    icon: (
      <svg className="w-7 h-7 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'A Network at Scale',
    desc: 'Tap a nationwide acquisition network of 5,000+ investors, wholesalers, and agents moving real inventory.',
  },
  {
    icon: (
      <svg className="w-7 h-7 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    title: 'Transparent by Default',
    desc: 'Comps, projections, and inspection reports on every deal. Invest with full visibility, never a black box.',
  },
]

export default function PartnerSection() {
  return (
    <section className="bg-bg-light py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-brand text-[14px] font-bold uppercase tracking-wide mb-3">Partner With NexKey</p>
          <h2 className="text-[36px] font-bold text-dark tracking-tight">
            A partnership designed around your success
          </h2>
        </div>

        {/* Benefit Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {benefits.map((b) => (
            <div key={b.title} className="card p-7 flex flex-col gap-4">
              <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center">
                {b.icon}
              </div>
              <h3 className="text-[18px] font-bold text-dark">{b.title}</h3>
              <p className="text-[14px] text-text-muted leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <button className="flex items-center gap-2 mx-auto bg-brand text-white text-[16px] font-semibold px-8 py-4 rounded-full hover:bg-brand-dark transition-all duration-200 active:scale-95">
            Become a Partner
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

const partners = [
  {
    name: 'Marcus Rodriguez',
    location: 'Miami, FL',
    role: 'Wholesale Specialist',
    deals: 24,
    quote: '"NexKey has been my go-to partner for closing wholesale deals. Their buyer network is unmatched and the process is seamless every time."',
    initials: 'MR',
    color: 'bg-orange-100 text-orange-600',
  },
  {
    name: 'Sarah Chen',
    location: 'Los Angeles, CA',
    role: 'Real Estate Agent',
    deals: 18,
    quote: '"Working with NexKey has opened up creative financing opportunities I never knew existed. My clients are closing deals that would have been impossible before."',
    initials: 'SC',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    name: 'David Thompson',
    location: 'Austin, TX',
    role: 'Investment Advisor',
    deals: 31,
    quote: '"I\'ve been partnering with NexKey for over 2 years. Their platform makes it easy to find qualified buyers and the team always delivers on their promises."',
    initials: 'DT',
    color: 'bg-green-100 text-green-600',
  },
  {
    name: 'Jennifer Martinez',
    location: 'Phoenix, AZ',
    role: 'Property Scout',
    deals: 15,
    quote: '"The partnership program is straightforward and profitable. Submit a deal, get feedback fast, and earn a great commission. Highly recommend."',
    initials: 'JM',
    color: 'bg-purple-100 text-purple-600',
  },
]

const affiliateStats = [
  { value: '150+', label: 'Active Partners', sub: 'Across 35 States' },
  { value: '$2.3M+', label: 'Commissions Paid', sub: 'Lifetime Total' },
  { value: '89%', label: 'Deal Close Rate', sub: 'Industry Leading' },
  { value: '12 Days', label: 'Avg. Review Time', sub: 'Deal to Close' },
]

function StarRating() {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function AffiliatesSection() {
  return (
    <section className="bg-bg-light py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 rounded-full px-4 py-1.5 mb-4">
            <svg className="w-4 h-4 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            <span className="text-brand text-[14px] font-semibold">Featured Partners</span>
          </div>
          <h2 className="text-[36px] font-bold text-dark tracking-tight">Meet Our Top Affiliates</h2>
          <p className="text-text-muted text-[16px] mt-4 leading-relaxed">
            Success stories from our network of trusted partners and affiliates across the country.
          </p>
        </div>

        {/* Partner cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {partners.map((p) => (
            <div key={p.name} className="card p-8">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold shrink-0 ${p.color}`}>
                    {p.initials}
                  </div>
                  <div>
                    <h3 className="text-[20px] font-bold text-dark">{p.name}</h3>
                    <div className="flex items-center gap-1.5 text-[14px] text-text-muted mt-0.5">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {p.location}
                    </div>
                    <span className="inline-block mt-2 bg-gray-100 text-text-body text-[12px] font-medium px-3 py-1 rounded-full">
                      {p.role}
                    </span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <span className="text-[28px] font-bold text-dark">{p.deals}</span>
                  </div>
                  <p className="text-[12px] text-text-muted">Deals Referred</p>
                </div>
              </div>
              <StarRating />
              <p className="text-[15px] text-text-muted italic leading-relaxed mt-3">{p.quote}</p>
            </div>
          ))}
        </div>

        {/* Affiliate Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {affiliateStats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-[40px] font-bold text-dark leading-tight">{s.value}</p>
              <p className="text-[16px] font-semibold text-text-body mt-1">{s.label}</p>
              <p className="text-[13px] text-text-muted">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-[20px] font-semibold text-dark mb-4">Want to be featured as a top partner?</p>
          <button className="flex items-center gap-2 mx-auto bg-brand text-white text-[18px] font-medium px-8 py-4 rounded-2xl shadow-[0_4px_6px_rgba(255,90,95,0.25)] hover:bg-brand-dark transition-all duration-200 active:scale-95">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            Apply to Partner Network
          </button>
        </div>
      </div>
    </section>
  )
}

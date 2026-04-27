const audiences = [
  {
    icon: (
      <svg className="w-8 h-8 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Investors',
    desc: 'Simplify your portfolio growth in one place with no traditional bank financing required. Access off-market deals that match your exact investment strategy.',
    items: [
      'No traditional bank financing required',
      'Work with your existing investment strategies',
      'Collaborative process development',
      'Streamlined portfolio management',
    ],
  },
  {
    icon: (
      <svg className="w-8 h-8 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
    title: 'Wholesalers',
    desc: 'You bring deals, we get buyers. Get timely feedback, access to qualified buyers, and professional support to close deals faster.',
    items: [
      'Fast deal evaluation and feedback',
      'Direct access to qualified buyers',
      'Real-time progress tracking',
      'Professional negotiation assistance',
    ],
  },
  {
    icon: (
      <svg className="w-8 h-8 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Connectors',
    desc: 'The first site to embrace connectors! Spread the love and earn rewards for every deal you help bring together in our network.',
    items: [
      'Pioneer connector-friendly platform',
      'Connect buyers with opportunities',
      'Earn commissions on referrals',
      'Build your network value',
    ],
  },
]

export default function WhoWeServeSection() {
  return (
    <section className="bg-bg-light py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-[36px] font-bold text-dark tracking-tight">Who We Serve</h2>
          <p className="text-text-muted text-[16px] mt-4 leading-relaxed">
            Seasoned investors and home buyers alike can benefit from our platform. Discover how NexKey works for your specific role.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {audiences.map((a) => (
            <div key={a.title} className="card p-8 flex flex-col gap-5">
              <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center">
                {a.icon}
              </div>
              <div>
                <h3 className="text-[22px] font-bold text-dark mb-2">{a.title}</h3>
                <p className="text-[15px] text-text-muted leading-relaxed">{a.desc}</p>
              </div>
              <ul className="flex flex-col gap-2 mt-1">
                {a.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[14px] text-text-body">
                    <span className="mt-2 w-1.5 h-1.5 bg-brand rounded-full shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

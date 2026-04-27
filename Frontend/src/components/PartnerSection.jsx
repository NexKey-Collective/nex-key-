const benefits = [
  {
    icon: (
      <svg className="w-7 h-7 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Earn Competitive Income',
    desc: 'Receive referral fees or assignment-based commissions on every deal you bring. Our transparent structure ensures you always know what you\'ll earn.',
  },
  {
    icon: (
      <svg className="w-7 h-7 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: 'Access Finance Expertise',
    desc: 'Work with our creative finance team that specializes in non-traditional deal structures — seller financing, subject-to, wrap mortgages, and more.',
  },
  {
    icon: (
      <svg className="w-7 h-7 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Trusted Acquisition Team',
    desc: 'Partner with a proven team that has closed hundreds of deals across multiple markets. Our track record speaks for itself.',
  },
  {
    icon: (
      <svg className="w-7 h-7 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Fast Collaboration',
    desc: 'Simple submission process with quick reviews and transparent timelines. Submit a deal today and get feedback within 48 hours.',
  },
]

const steps = [
  {
    num: '1',
    title: 'Submit a Lead or Opportunity',
    desc: 'Share property details, seller information, or buyer requirements through our streamlined submission form.',
  },
  {
    num: '2',
    title: 'NexKey Reviews & Structures the Deal',
    desc: 'Our acquisition team evaluates the opportunity, performs due diligence, and structures the best possible deal terms.',
  },
  {
    num: '3',
    title: 'Get Paid When the Deal Closes',
    desc: 'Receive your commission or referral fee promptly after closing. No delays, no surprises.',
  },
]

const partnerStats = [
  { value: '150+', label: 'Active Partners' },
  { value: '$45M+', label: 'Deals Closed' },
  { value: '$2.3M+', label: 'Partner Commissions Paid' },
]

export default function PartnerSection() {
  return (
    <section className="bg-white py-24 px-6 border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-[36px] font-bold text-dark tracking-tight">Partner With NexKey</h2>
          <p className="text-text-muted text-[16px] mt-4 leading-relaxed">
            Join our network of affiliates, wholesalers, and real estate professionals. Earn competitive income while helping investors find the right deals.
          </p>
        </div>

        {/* Benefit Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
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

        {/* How it works */}
        <div className="max-w-2xl mx-auto mb-20">
          <div className="text-center mb-10">
            <h3 className="text-[28px] font-bold text-dark">How Partnership Works</h3>
            <p className="text-text-muted text-[16px] mt-2">Three simple steps to start earning with NexKey</p>
          </div>
          <div className="flex flex-col gap-0">
            {steps.map((s, i) => (
              <div key={s.num} className="flex gap-6">
                {/* Step number + line */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-brand text-white font-bold text-[18px] rounded-full flex items-center justify-center shrink-0">
                    {s.num}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-0.5 h-16 bg-gray-200 my-1" />
                  )}
                </div>
                {/* Content */}
                <div className="pb-10 pt-2">
                  <h4 className="text-[18px] font-bold text-dark mb-1">{s.title}</h4>
                  <p className="text-[15px] text-text-muted leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Partner Stats */}
        <div className="grid sm:grid-cols-3 gap-6 mb-16 bg-bg-light rounded-2xl p-8">
          {partnerStats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-[48px] font-bold text-dark leading-tight">{s.value}</p>
              <p className="text-[16px] text-text-muted mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Testimonial */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <blockquote className="text-[18px] text-text-body italic leading-relaxed mb-6">
            "Working with NexKey has been exceptional. Their team is responsive, knowledgeable, and genuinely invested in seeing deals close successfully."
          </blockquote>
          <p className="text-[16px] font-bold text-dark">Marcus Rodriguez</p>
          <p className="text-[14px] text-text-muted">Wholesale Partner, Miami FL</p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h3 className="text-[32px] font-bold text-dark mb-3">Ready to Start Partnering?</h3>
          <p className="text-text-muted text-[16px] mb-8 max-w-xl mx-auto">
            Join our growing network of successful partners and start earning competitive commissions today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="flex items-center gap-2 bg-brand text-white text-[18px] font-medium px-8 py-4 rounded-2xl shadow-[0_4px_6px_rgba(255,90,95,0.25)] hover:bg-brand-dark transition-all duration-200 active:scale-95">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              Become a Partner
            </button>
            <button className="flex items-center gap-2 border-2 border-brand text-brand text-[18px] font-medium px-8 py-4 rounded-2xl hover:bg-red-50 transition-all duration-200 active:scale-95">
              Submit a Deal
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

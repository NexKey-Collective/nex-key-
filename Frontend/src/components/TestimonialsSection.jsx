const testimonials = [
  {
    name: 'Marcus Rodriguez',
    role: 'Portfolio Investor',
    location: 'Austin, TX',
    quote:
      "NextKey's off-market pipeline let me close four cash-flowing rentals in a single quarter. The underwriting is airtight.",
    initials: 'MR',
    color: 'bg-orange-100 text-orange-600',
  },
  {
    name: 'Sarah Chen',
    role: 'Wholesaler',
    location: 'Seattle, WA',
    quote:
      'I assigned three contracts in my first month. The buyer network is the real deal — serious investors, fast closes.',
    initials: 'SC',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    name: 'David Thompson',
    role: 'Broker',
    location: 'Denver, CO',
    quote:
      'My investment clients finally have deals worth their time. The co-branded listings have grown my business 3x.',
    initials: 'DT',
    color: 'bg-green-100 text-green-600',
  },
]

export default function TestimonialsSection() {
  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-brand text-[14px] font-bold uppercase tracking-wide mb-3">Testimonials</p>
          <h2 className="text-[36px] font-bold text-dark tracking-tight">Loved by our network</h2>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="card p-8 flex flex-col gap-5">
              <p className="text-[15px] text-text-body leading-relaxed">"{t.quote}"</p>
              <div className="flex items-center gap-3 mt-auto pt-2">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-[15px] font-bold shrink-0 ${t.color}`}>
                  {t.initials}
                </div>
                <div>
                  <p className="text-[15px] font-bold text-dark leading-tight">{t.name}</p>
                  <p className="text-[13px] text-text-muted">{t.role} · {t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

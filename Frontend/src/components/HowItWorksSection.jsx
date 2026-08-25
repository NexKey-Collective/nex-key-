const steps = [
  {
    num: '01',
    title: 'Set Your Buy Box',
    desc: 'Tell us your markets, budget, and strategy. We tailor deal flow to your exact criteria.',
  },
  {
    num: '02',
    title: 'Review Vetted Deals',
    desc: 'Get underwritten opportunities with comps, projections, and inspection reports.',
  },
  {
    num: '03',
    title: 'Close With Confidence',
    desc: 'Our team handles financing, escrow, and closing so you can scale your portfolio.',
  },
]

export default function HowItWorksSection() {
  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-brand text-[14px] font-bold uppercase tracking-wide mb-3">How Partnership Works</p>
          <h2 className="text-[36px] font-bold text-dark tracking-tight">
            From sign-up to closing in three steps
          </h2>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((s) => (
            <div key={s.num} className="card p-8 flex flex-col gap-4">
              <span className="text-[15px] font-bold text-brand">{s.num}</span>
              <h3 className="text-[20px] font-bold text-dark">{s.title}</h3>
              <p className="text-[15px] text-text-muted leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

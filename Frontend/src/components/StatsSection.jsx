const stats = [
  { value: '$125M+', label: 'Transaction Volume' },
  { value: '850+', label: 'Properties Closed' },
  { value: '150+', label: 'Markets Covered' },
  { value: '$2.3M+', label: 'Avg. Deal Size' },
]

export default function StatsSection() {
  return (
    <section className="bg-dark py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-white text-[28px] font-bold tracking-tight mb-12">
          Proven results at scale
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-[40px] font-bold text-white leading-tight">{s.value}</p>
              <p className="text-[15px] text-white/60 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

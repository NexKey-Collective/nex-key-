import { Link } from 'react-router-dom'

const info = [
  {
    label: 'Email',
    value: 'hello@nexkey.com',
    icon: (
      <svg className="w-5 h-5 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: 'Phone',
    value: '1-800-NEXKEY',
    icon: (
      <svg className="w-5 h-5 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  {
    label: 'Hours',
    value: 'Mon–Fri · 8am–7pm CT',
    icon: (
      <svg className="w-5 h-5 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
]

export default function ContactSection() {
  return (
    <section className="bg-bg-light py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-brand text-[14px] font-bold uppercase tracking-wide mb-3">Contact</p>
        <h2 className="text-[36px] font-bold text-dark tracking-tight mb-4">Let's find your next deal</h2>
        <p className="text-text-muted text-[16px] max-w-xl mx-auto mb-10 leading-relaxed">
          Questions about a property, financing, or getting started? Our investment specialists are ready to help.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-14">
          <Link
            to="/login"
            className="bg-brand text-white text-[16px] font-semibold px-7 py-3.5 rounded-full hover:bg-brand-dark transition-all duration-200 active:scale-95"
          >
            Get Started
          </Link>
          <Link
            to="/deals"
            className="bg-[#f4f1ea] text-dark text-[16px] font-semibold px-7 py-3.5 rounded-full hover:bg-[#ece7db] transition-all duration-200 active:scale-95"
          >
            Browse Deals
          </Link>
        </div>

        <div className="grid sm:grid-cols-3 gap-8">
          {info.map((i) => (
            <div key={i.label} className="flex flex-col items-center gap-2">
              <div className="w-11 h-11 bg-red-50 rounded-full flex items-center justify-center">
                {i.icon}
              </div>
              <p className="text-[13px] text-text-muted">{i.label}</p>
              <p className="text-[15px] font-semibold text-dark">{i.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

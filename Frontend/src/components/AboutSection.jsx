const aboutImageUrl =
  'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=80'

const checklist = [
  'Every deal underwritten before it reaches you',
  'Creative financing structures built around your goals',
  'A dedicated specialist from first look to closing',
]

export default function AboutSection() {
  return (
    <section id="about" className="bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        {/* Left: Image */}
        <img
          src={aboutImageUrl}
          alt="Modern home exterior"
          className="w-full h-[440px] object-cover rounded-3xl shadow-lg"
        />

        {/* Right: Content */}
        <div>
          <p className="text-brand text-[14px] font-bold uppercase tracking-wide mb-4">
            About NexKey
          </p>

          <h2 className="text-[36px] lg:text-[40px] font-bold text-dark tracking-tight leading-tight mb-6">
            A smarter way to invest in real estate
          </h2>

          <p className="text-[16px] text-text-muted leading-relaxed mb-8">
            NexKey connects serious investors with vetted, off-market opportunities and
            creative financing — all backed by transparent underwriting. We've replaced the
            guesswork of real estate investing with data, structure, and a nationwide network
            you can trust.
          </p>

          <div className="flex flex-col gap-4">
            {checklist.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <span className="w-6 h-6 bg-red-50 rounded-full flex items-center justify-center shrink-0">
                  <svg className="w-3.5 h-3.5 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="text-[16px] text-dark">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

import { useState } from 'react'

const faqs = [
  {
    q: 'What is a Buy Box and why do I need one?',
    a: "A Buy Box is your investment criteria — markets, price range, property type, and strategy. Setting one lets us match you automatically with deals that fit, instead of you sifting through listings that don't.",
  },
  {
    q: 'Do I need an account to browse deals?',
    a: 'You can preview featured opportunities without an account, but creating a free account unlocks full deal details, underwriting data, and the ability to save and inquire on properties.',
  },
  {
    q: 'What kinds of financing do you support?',
    a: 'We support traditional financing as well as creative structures — seller financing, subject-to, wraps, and partnership deals — depending on what fits the property and your goals.',
  },
  {
    q: 'How are deals vetted?',
    a: "Every deal is underwritten by our acquisition team with comps, ROI projections, and inspection reports before it's listed, so you're working from verified numbers, not guesswork.",
  },
  {
    q: 'Is NexKey available in my market?',
    a: "We operate across 150+ markets nationwide and are actively expanding. Set your Buy Box and we'll let you know as soon as matching deal flow is available in your area.",
  },
]

function FAQItem({ item, isOpen, onToggle }) {
  return (
    <div className="border-b border-gray-100">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-6 text-left"
      >
        <span className="text-[17px] font-semibold text-dark">{item.q}</span>
        <svg
          className={`w-5 h-5 text-brand shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
      {isOpen && (
        <p className="text-[15px] text-text-muted leading-relaxed pb-6 pr-10">{item.a}</p>
      )}
    </div>
  )
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-brand text-[14px] font-bold uppercase tracking-wide mb-3">FAQ</p>
          <h2 className="text-[36px] font-bold text-dark tracking-tight">Frequently asked questions</h2>
        </div>

        <div>
          {faqs.map((item, i) => (
            <FAQItem
              key={item.q}
              item={item}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

import { Link } from 'react-router-dom'
export default function CTASection() {
  return (
    <section className="bg-white py-24 px-6 border-t border-gray-100">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-[40px] lg:text-[48px] font-bold text-dark tracking-tight mb-4">
          Start building your real estate<br className="hidden sm:block" /> portfolio today
        </h2>
        <p className="text-text-muted text-[18px] max-w-xl mx-auto mb-10 leading-relaxed">
          Join 5,000+ investors sourcing vetted, off-market deals on NexKey.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/login"
            className="bg-brand text-white text-[16px] font-semibold px-7 py-3.5 rounded-full hover:bg-brand-dark transition-all duration-200 active:scale-95"
          >
            Create Free Account
          </Link>
          <Link
            to="/deals"
            className="bg-[#f4f1ea] text-dark text-[16px] font-semibold px-7 py-3.5 rounded-full hover:bg-[#ece7db] transition-all duration-200 active:scale-95"
          >
            Browse Deals
          </Link>
        </div>
      </div>
    </section>
  )
}
